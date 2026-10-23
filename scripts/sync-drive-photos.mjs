// Syncs the gallery with the "Elliot's Portfolio → Pics" Google Drive folder.
// Run by .github/workflows/sync-drive-photos.yml, which provides an rclone remote named
// `gdrive` rooted at that folder. Drive is the source of truth: new photos are downscaled
// and appended to `portfolioImages`, photos no longer in Drive are dropped from it.
import {execFileSync} from 'node:child_process';
import {appendFileSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

const DATA_FILE = 'src/lib/data.ts';
const PHOTO_DIR = 'public/images/portfolio';
const URL_PREFIX = '/images/portfolio/';
const MAX_EDGE = 2400;
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

const rclone = (...args) => execFileSync('rclone', args, {encoding: 'utf8'});

// Drive allows any filename; keep repo filenames URL- and TS-string-safe.
const localName = (driveName) => driveName.replace(/[^A-Za-z0-9._-]+/g, '-');

const summary = [];
const log = (line) => {
	console.log(line);
	summary.push(line);
};

const listing = JSON.parse(rclone('lsjson', 'gdrive:', '--files-only')).sort((a, b) =>
	a.ModTime.localeCompare(b.ModTime),
);

// Never wipe the gallery because the folder came back empty (e.g. sharing was revoked).
if (!listing.some((f) => IMAGE_EXT.test(f.Name))) {
	throw new Error('Drive folder has no images — refusing to empty the gallery.');
}

const wanted = new Map(); // local name -> Drive name
for (const f of listing) {
	if (!IMAGE_EXT.test(f.Name)) {
		log(`- Skipped \`${f.Name}\` (only JPG, PNG and WebP are supported)`);
		continue;
	}
	const name = localName(f.Name);
	if (wanted.has(name)) {
		log(`- Skipped duplicate \`${f.Name}\``);
		continue;
	}
	wanted.set(name, f.Name);
}

const source = readFileSync(DATA_FILE, 'utf8');
const block = source.match(/(export const portfolioImages: PortfolioPhoto\[\] = \[\n)([\s\S]*?)(\n\];)/);
if (!block) throw new Error(`Could not find portfolioImages in ${DATA_FILE}`);

const entries = [...block[2].matchAll(/\{src: '([^']+)', w: (\d+), h: (\d+)\}/g)].map((m) => ({
	src: m[1],
	w: Number(m[2]),
	h: Number(m[3]),
}));
if (entries.length !== block[2].split('\n').filter((l) => l.includes('src:')).length) {
	throw new Error(`Unexpected portfolioImages formatting in ${DATA_FILE}`);
}

const have = new Set(entries.map((e) => path.basename(e.src)));
const kept = entries.filter((e) => wanted.has(path.basename(e.src)));
const removed = entries.filter((e) => !wanted.has(path.basename(e.src)));
const toAdd = [...wanted].filter(([name]) => !have.has(name));

const added = [];
if (toAdd.length) {
	const tmp = mkdtempSync(path.join(tmpdir(), 'drive-pics-'));
	const list = path.join(tmp, 'files.txt');
	writeFileSync(list, toAdd.map(([, driveName]) => driveName).join('\n'));
	rclone('copy', 'gdrive:', path.join(tmp, 'pics'), '--files-from-raw', list);

	for (const [name, driveName] of toAdd) {
		// rotate() bakes in EXIF orientation; sharp strips the rest of the metadata (GPS etc.).
		const {width, height} = await sharp(path.join(tmp, 'pics', driveName))
			.rotate()
			.resize({width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true})
			.toFile(path.join(PHOTO_DIR, name));
		added.push({src: URL_PREFIX + name, w: width, h: height});
		log(`- Added \`${name}\` (${width}×${height})`);
	}
	rmSync(tmp, {recursive: true});
}

if (!added.length && !removed.length) {
	log('Gallery already matches Drive — nothing to do.');
} else {
	const lines = [...kept, ...added].map((e) => `\t{src: '${e.src}', w: ${e.w}, h: ${e.h}},`);
	writeFileSync(DATA_FILE, source.replace(block[0], () => block[1] + lines.join('\n') + block[3]));

	// Keep files that other sections (e.g. services) still point at.
	const srcFiles = readdirSync('src', {recursive: true}).filter((f) => /\.tsx?$/.test(f));
	const code = srcFiles.map((f) => readFileSync(path.join('src', f), 'utf8')).join('\n');
	for (const e of removed) {
		const name = path.basename(e.src);
		if (code.includes(e.src)) {
			log(`- Removed \`${name}\` from the gallery (file kept: still used elsewhere on the site)`);
		} else {
			rmSync(path.join(PHOTO_DIR, name), {force: true});
			log(`- Removed \`${name}\``);
		}
	}
}

if (process.env.GITHUB_STEP_SUMMARY) {
	appendFileSync(process.env.GITHUB_STEP_SUMMARY, `## Drive photo sync\n\n${summary.join('\n')}\n`);
}
if (process.env.GITHUB_OUTPUT) {
	appendFileSync(process.env.GITHUB_OUTPUT, `changed=${added.length > 0 || removed.length > 0}\n`);
}
