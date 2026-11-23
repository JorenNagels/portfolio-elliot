---
name: deploy
description: Publish Elliot Barham's portfolio to its live site (https://elliot.dreamteamproductions.co.uk). Use whenever the user wants to deploy, ship, release, publish, push live, or "make it live" — and also read this before running any `git tag`, `git push --tags`, `gh workflow run`, or `npm run deploy` command, because publishing here must be confirmed by the user first.
---

# Publishing the portfolio

You **can** publish this site. You must **never** do it without asking first.

<https://elliot.dreamteamproductions.co.uk> is the live portfolio Elliot sends to
prospective clients. A deploy replaces it within a couple of minutes and there is no undo.
So a release is only ever something the user decided to do, never something you did
because it seemed like the natural end of a task.

> **Check → tell them what will ship → ask → publish only on a clear yes.**

Never publish because you finished a feature or think the work looks done. "Yes, deploy"
has to come from the user.

## Step 1 — make sure the change is on `main`

The site publishes from `main`. If the work is on a branch, it needs to land there first:

```bash
gh pr create --fill
```

Don't merge your own work to `main` unless the user asks.

## Step 2 — check the branch is releasable

Safe, changes nothing, run it freely:

```bash
npm run deploy:check
```

It verifies branch/clean tree/sync with origin, builds the site (the image optimizer runs
first, so it takes a minute), **confirms the site is still unindexed**, and prints the
version it would create plus the commits that would ship.

If it fails, fix what it reports and run it again. Don't ask about deploying until it
passes.

If it fails on the **noindex check**, that is serious — the site is deliberately hidden
from search engines. Restore the `robots: { index: false, … }` metadata in
`src/app/layout.tsx` or the `Disallow: /` in `public/robots.txt`. Never work around the
check.

## Step 3 — ask the user

Tell them, briefly and in plain language:

- the version it will create (e.g. `v1.0.13`),
- what's in it — the commit list from `deploy:check`, summarised in human terms,
- that this replaces the live portfolio.

Then ask whether to go ahead. A real question, and then stop and wait.

Good: _"That'll go out as v1.0.13, with the three new gallery photos and the reworded
services copy. It replaces the live portfolio. Publish it?"_

Bad: publishing and then mentioning it. Bad: "I'll deploy now unless you object."

## Step 4 — publish

Only once they've said yes:

```bash
npm run deploy -- --confirm
```

The repo's `.claude/settings.json` (and `.codex/rules/portfolio.rules` for Codex) also
makes that command raise a permission prompt, so the user gets a final click. That prompt
is **not** the same as asking them — do step 3 properly regardless.

For a larger change they may want `npm run deploy -- --minor`. Default is a patch bump.

Afterwards, give them the Actions link the script prints and suggest hard-refreshing the
site (`Cmd+Shift+R`) once it finishes.

## Never do these

Not even when a deploy has been approved — they all bypass the checks:

- `git tag v…` / `git push origin v…` / `git push --tags` — tagging **is** the deploy
- `gh workflow run deploy.yml` — removed as a trigger on purpose
- `gh secret set|delete` — this repo holds a Google Drive service-account key

The `--confirm` flag is not a shortcut around asking. Pass it only when the user actually
answered yes. If they never asked for a deploy, don't raise the subject.

## If something broke on the live site

There's no rollback button — fixing a bad release means shipping a good one:

1. Make the fix on `main`, or revert the bad commit (`git revert <sha>`).
2. `npm run deploy:check`.
3. Ask, then `npm run deploy -- --confirm`.

Tell the user plainly if you think the live site is broken; don't quietly try to patch it.
