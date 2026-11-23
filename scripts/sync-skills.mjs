#!/usr/bin/env node
/**
 * Copies the Agent Skills in `.agents/skills/` into `.claude/skills/`.
 *
 * Why this exists: SKILL.md is an open standard (https://agentskills.io) that Codex,
 * Claude Code and others all read — but each tool only looks in its own directory.
 * Codex scans `.agents/skills/`; Claude Code scans `.claude/skills/` and, per its docs,
 * reads nothing under `.agents/`. There is no setting to point it elsewhere.
 *
 * The usual fix is a symlink, and that is what this repo used to do. It breaks on
 * Windows: git disables `core.symlinks` by default there, so a committed symlink checks
 * out as a small text file containing the target path, and the skill silently never
 * loads. Elliot is on Windows, so copying is the portable answer.
 *
 * So `.agents/skills/` is the single source of truth and is committed; `.claude/skills/`
 * is generated, gitignored, and rebuilt by the `prepare` npm script on every
 * `npm install`. Nothing to remember and no symlinks anywhere.
 *
 *   node scripts/sync-skills.mjs            # quiet unless something changed
 *   node scripts/sync-skills.mjs --verbose  # list what it did
 *
 * If you edit a skill, edit it in `.agents/skills/` and re-run `npm install` (or this
 * script). The generated copies carry a "generated" banner so the wrong one is obvious.
 */

import { cp, lstat, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = join(repoRoot, '.agents', 'skills');
const TARGET = join(repoRoot, '.claude', 'skills');

const verbose = process.argv.includes('--verbose');
const log = (msg) => verbose && console.log(`sync-skills: ${msg}`);

/** Remove a path whether it is a file, a directory, or a symlink to either. */
async function remove(path) {
  let stats;
  try {
    stats = await lstat(path);
  } catch {
    return; // nothing there
  }
  // lstat, not stat: for a symlink we must unlink the LINK. Recursing would delete the
  // files it points at — which here would be the source skills themselves.
  if (stats.isSymbolicLink()) {
    await rm(path, { force: true });
  } else {
    await rm(path, { recursive: true, force: true });
  }
}

/** Add a banner under the YAML frontmatter so an edited copy is obviously the wrong one. */
async function addGeneratedBanner(skillName) {
  const file = join(TARGET, skillName, 'SKILL.md');
  let text;
  try {
    text = await readFile(file, 'utf8');
  } catch {
    return;
  }

  const banner =
    `<!-- GENERATED COPY — do not edit.\n` +
    `     Source of truth: .agents/skills/${skillName}/SKILL.md\n` +
    `     Regenerate with: npm install  (or node scripts/sync-skills.mjs) -->`;

  // Frontmatter must stay the very first thing in the file, so insert after it.
  const match = text.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  const output = match
    ? `${match[0]}\n${banner}\n${text.slice(match[0].length)}`
    : `${banner}\n\n${text}`;

  await writeFile(file, output);
}

let sourceSkills;
try {
  sourceSkills = (await readdir(SOURCE, { withFileTypes: true }))
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
} catch {
  log(`no ${SOURCE} — nothing to do`);
  process.exit(0);
}

if (sourceSkills.length === 0) {
  log('no skills found');
  process.exit(0);
}

// Replace the target wholesale. It is generated and gitignored, so this also clears out
// skills that have been renamed or deleted, and the old symlink if it is still around.
await remove(TARGET);
await mkdir(TARGET, { recursive: true });

for (const name of sourceSkills) {
  await cp(join(SOURCE, name), join(TARGET, name), { recursive: true });
  await addGeneratedBanner(name);
  log(`${name} → .claude/skills/${name}`);
}

log(`synced ${sourceSkills.length} skill(s)`);
