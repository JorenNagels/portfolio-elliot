#!/usr/bin/env node
/**
 * Gated release for elliot.dreamteamproductions.co.uk.
 *
 * Publishing happens when a `v*` tag lands on GitHub (.github/workflows/deploy.yml builds
 * the static export and deploys it to GitHub Pages). Pushing that tag by hand is a
 * one-command route to the live site, so this script is the only sanctioned way to do it.
 * It:
 *
 *   1. refuses to run unless the repo is in a releasable state (branch, clean tree, synced),
 *   2. builds the site, so a broken build never reaches the live portfolio,
 *   3. shows exactly what would ship, then
 *   4. requires an explicit go-ahead before it tags anything.
 *
 * Step 4 is why this exists: a release should never be a side effect of an agent finishing
 * a task. A person in a terminal gets a prompt and types the version. An agent asks its
 * user first and then passes `--confirm`. Either way a human decided.
 *
 *   npm run deploy:check            # verify the branch is releasable; changes nothing
 *   npm run deploy                  # interactive: prompts for the version to confirm
 *   npm run deploy -- --confirm     # go-ahead already given (what an agent runs)
 *   npm run deploy -- --dry-run     # everything except the tag — rehearse a release
 *   npm run deploy -- --minor       # bump the minor instead of the patch
 *   npm run deploy -- v2.0.0        # release an explicit version
 */

import { execFileSync, execSync } from 'node:child_process';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const RELEASE_BRANCH = 'main';
const REMOTE = 'origin';
const SITE_URL = 'https://elliot.dreamteamproductions.co.uk';

// --- tiny output helpers -------------------------------------------------------------------

const tty = stdout.isTTY;
const paint = (code, s) => (tty ? `\u001b[${code}m${s}\u001b[0m` : s);
const bold = (s) => paint('1', s);
const red = (s) => paint('31', s);
const green = (s) => paint('32', s);
const yellow = (s) => paint('33', s);
const dim = (s) => paint('2', s);

const step = (s) => console.log(`\n${bold('›')} ${bold(s)}`);
const ok = (s) => console.log(`  ${green('✓')} ${s}`);
const info = (s) => console.log(`  ${dim(s)}`);

function fail(headline, ...detail) {
  console.error(`\n${red('✗ ' + headline)}`);
  for (const line of detail) console.error(`  ${line}`);
  console.error('');
  process.exit(1);
}

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();

function run(label, command) {
  info(`${label}…`);
  try {
    execSync(command, { stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8' });
  } catch (err) {
    const output = `${err.stdout ?? ''}${err.stderr ?? ''}`.trimEnd();
    fail(
      `${label} failed — nothing has been tagged or deployed.`,
      'Fix the error below, commit the fix, then run the release again.',
      '',
      ...output.split('\n').slice(-40),
    );
  }
  ok(label);
}

// --- argument parsing ----------------------------------------------------------------------

const argv = process.argv.slice(2);
const checkOnly = argv.includes('--check');
// Runs the whole thing — preflight, build, the confirmation gate — but stops just before
// creating the tag. Useful to rehearse a release, and to test the gate itself.
const dryRun = argv.includes('--dry-run');
const bump = argv.includes('--major') ? 'major' : argv.includes('--minor') ? 'minor' : 'patch';
const explicit = argv.find((a) => /^v?\d+\.\d+\.\d+$/.test(a));

// --- 1. preflight: is this repo releasable? ------------------------------------------------

step('Preflight');

const branch = git('rev-parse', '--abbrev-ref', 'HEAD');
if (branch !== RELEASE_BRANCH) {
  fail(
    `Releases only ship from ${bold(RELEASE_BRANCH)} — you are on ${bold(branch)}.`,
    `Open a pull request and merge into ${RELEASE_BRANCH} first, then release from there.`,
  );
}
ok(`On ${RELEASE_BRANCH}`);

if (git('status', '--porcelain')) {
  fail(
    'You have uncommitted changes.',
    'A release ships the committed state of the branch, so uncommitted work would be',
    'silently left out. Commit or stash it, then run the release again.',
    '',
    ...git('status', '--short').split('\n'),
  );
}
ok('Working tree clean');

info('Fetching from origin…');
try {
  execFileSync('git', ['fetch', REMOTE, '--tags', '--quiet'], { stdio: 'inherit' });
} catch {
  fail('Could not reach origin.', 'Check your network and GitHub access, then try again.');
}

const localHead = git('rev-parse', 'HEAD');
const remoteHead = git('rev-parse', `${REMOTE}/${RELEASE_BRANCH}`);
if (localHead !== remoteHead) {
  const ahead = git('rev-list', '--count', `${REMOTE}/${RELEASE_BRANCH}..HEAD`);
  const behind = git('rev-list', '--count', `HEAD..${REMOTE}/${RELEASE_BRANCH}`);
  fail(
    `Your ${RELEASE_BRANCH} is out of sync with ${REMOTE}/${RELEASE_BRANCH} ` +
      `(${ahead} ahead, ${behind} behind).`,
    behind !== '0'
      ? 'Run `git pull` first — someone else has pushed changes you do not have.'
      : 'Run `git push` first — the tag must point at a commit that exists on GitHub.',
  );
}
ok(`In sync with ${REMOTE}/${RELEASE_BRANCH}`);

// --- 2. work out the version ---------------------------------------------------------------

const tags = git('tag', '--list', 'v*.*.*', '--sort=-v:refname').split('\n').filter(Boolean);
const latest = tags[0] ?? 'v0.0.0';
const [major, minor, patch] = latest.replace(/^v/, '').split('.').map(Number);

const nextVersion = explicit
  ? `v${explicit.replace(/^v/, '')}`
  : bump === 'major'
    ? `v${major + 1}.0.0`
    : bump === 'minor'
      ? `v${major}.${minor + 1}.0`
      : `v${major}.${minor}.${patch + 1}`;

if (tags.includes(nextVersion)) {
  fail(`Tag ${bold(nextVersion)} already exists.`, 'Pick a different version number.');
}
ok(`Current release ${latest} → next ${bold(nextVersion)}`);

// --- 3. build what ships -------------------------------------------------------------------

step('Building (this is the slow bit — the image optimizer runs first)');
run('Site build', 'npm run build');

// The site is deliberately unindexed and that is easy to break by accident, so make it a
// release-blocking check rather than only a line in AGENTS.md.
step('Checking the site is still unindexed');
const layout = execSync('cat src/app/layout.tsx', { encoding: 'utf8' });
if (!/index:\s*false/.test(layout)) {
  fail(
    'The `noindex` robots metadata is missing from src/app/layout.tsx.',
    'This site is shared by direct link only and must not be indexed by search engines',
    'or AI crawlers. Restore `robots: { index: false, follow: false, ... }` in the',
    'metadata export before releasing. See AGENTS.md.',
  );
}
ok('noindex metadata present');

let robots = '';
try {
  robots = execSync('cat public/robots.txt', { encoding: 'utf8' });
} catch {
  fail(
    'public/robots.txt is missing.',
    'It is one of only two things keeping this site out of search results (the other is',
    'the `noindex` metadata in src/app/layout.tsx). Restore it before releasing.',
  );
}
if (!/^\s*Disallow:\s*\/\s*$/m.test(robots)) {
  fail(
    'public/robots.txt no longer blocks crawlers.',
    'It needs a `Disallow: /` line. This site is shared by direct link only and must not',
    'be indexed by search engines or AI crawlers. See AGENTS.md.',
    '',
    'Current contents:',
    ...robots.split('\n').slice(0, 15),
  );
}
ok('robots.txt blocking crawlers');

// --- 4. show what would ship ---------------------------------------------------------------

step('What this release contains');

const log = git('log', '--pretty=  • %s', `${latest}..HEAD`);
if (!log) {
  fail(
    `No new commits since ${latest}.`,
    'There is nothing to release. Make and merge a change first.',
  );
}
console.log(log);

const files = git('diff', '--stat', `${latest}..HEAD`).split('\n');
console.log(dim(`\n  ${files[files.length - 1]?.trim() ?? ''}`));

if (checkOnly) {
  console.log(
    `\n${green('✓ This branch is releasable.')} ${dim('(--check made no changes)')}\n\n` +
      `  To ship it: ${bold('npm run deploy')} in a terminal, which asks you to confirm.\n` +
      `  If you are an agent: summarise the release above for the user and ask whether\n` +
      `  to deploy ${bold(nextVersion)}. Only on a clear yes, run\n` +
      `  ${bold('npm run deploy -- --confirm')}.\n`,
  );
  process.exit(0);
}

// --- 5. confirmation -----------------------------------------------------------------------
//
// A release must always be a decision someone made on purpose — never a side effect of an
// agent "finishing the job". Two ways to give that go-ahead: a person in a terminal, who
// gets the prompt below, or an agent passing `--confirm`, which it may only do after
// asking its user and getting a clear yes (see .agents/skills/deploy/SKILL.md, AGENTS.md).

step('Confirm');

const preConfirmed = argv.includes('--confirm') || argv.includes('--yes');

console.log(
  `\n  About to publish ${bold(nextVersion)} to the ${bold('live site')}:\n` +
    `  ${bold(SITE_URL)}\n\n` +
    `  This is the portfolio Elliot sends to prospective clients. It takes a couple of\n` +
    `  minutes and there is no undo — fixing a bad release means shipping another one.\n`,
);

if (preConfirmed) {
  ok('Confirmed via --confirm');
} else if (stdin.isTTY) {
  const rl = createInterface({ input: stdin, output: stdout });

  let answer;
  try {
    answer = (
      await rl.question(`  Type ${bold(nextVersion)} to deploy, or anything else to cancel: `)
    ).trim();
  } catch {
    // stdin closed or the read was aborted (Ctrl+D, a dying parent, a pty shutting down).
    // No answer means no consent, so cancel quietly rather than let an ABORT_ERR escape.
    answer = null;
  } finally {
    rl.close();
  }

  if (answer !== nextVersion) {
    console.log(`\n${yellow('Cancelled.')} Nothing was tagged or deployed.\n`);
    process.exit(0);
  }
} else {
  console.error(
    `\n${red('✗ Not deploying: nobody has confirmed this release.')}\n\n` +
      `  There is no interactive terminal here, so this script cannot ask. It will not\n` +
      `  publish to a live site on its own.\n\n` +
      `  ${bold('If you are an agent:')} this is the expected path — you just need the\n` +
      `  user's go-ahead first. Show them what ${bold('npm run deploy:check')} printed,\n` +
      `  ask whether to deploy ${bold(nextVersion)}, and once they say yes:\n\n` +
      `      ${bold('npm run deploy -- --confirm')}\n\n` +
      `  Do not pass --confirm unless they actually answered yes. If they did not ask for\n` +
      `  a deploy at all, do not raise one.\n\n` +
      `  ${bold('If you are a person:')} add ${bold('-- --confirm')}, or run\n` +
      `  ${bold('npm run deploy')} in a normal terminal to get the prompt.\n`,
  );
  process.exit(1);
}

// --- 6. ship ------------------------------------------------------------------------------

if (dryRun) {
  console.log(
    `\n${green('✓ Dry run complete.')} ${dim('Everything passed and the gate opened.')}\n` +
      `  ${bold(nextVersion)} was NOT tagged and nothing was deployed.\n` +
      `  Drop ${bold('--dry-run')} to ship it for real.\n`,
  );
  process.exit(0);
}

step('Releasing');
git('tag', nextVersion);
ok(`Tagged ${nextVersion}`);

try {
  // PORTFOLIO_RELEASE tells .githooks/pre-push that this tag has been through the checks
  // and a human approved it. Without it the hook refuses the push, which is what stops any
  // other tool — Codex included — from publishing with a bare `git push origin v…`.
  execFileSync('git', ['push', REMOTE, nextVersion], {
    stdio: 'inherit',
    env: { ...process.env, PORTFOLIO_RELEASE: '1' },
  });
} catch {
  git('tag', '-d', nextVersion);
  fail(
    'Could not push the tag — the local tag has been removed again.',
    'Check your GitHub access and run the release once more.',
  );
}
ok(`Pushed ${nextVersion} — GitHub Actions is deploying now`);

console.log(
  `\n${green('✓ Release started.')}\n\n` +
    `  Watch it:   ${bold('gh run watch $(gh run list --workflow deploy.yml -L1 --json databaseId -q ".[0].databaseId")')}\n` +
    `  Or open:    ${bold('https://github.com/JorenNagels/portfolio-elliot/actions')}\n` +
    `  Then check: ${bold(SITE_URL)} ${dim('(hard-refresh — Cmd+Shift+R)')}\n`,
);
