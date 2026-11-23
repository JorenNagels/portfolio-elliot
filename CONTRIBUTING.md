# Working on the portfolio site

A practical guide for making changes to <https://elliot.dreamteamproductions.co.uk>.
Written for people who are **not** developers and are working with a coding assistant
(Claude Code or Codex). You don't need to understand the code — but you do need the few
rules on this page, because the site is live and clients see it.

## The one thing to know first

**The site you edit on your laptop is not the live site.** Changes are invisible to anyone
else until someone deliberately publishes them. You can experiment freely without any risk
of breaking the real site.

Publishing is a separate, deliberate step, described at the bottom.

---

## One-time setup

You need [Node.js](https://nodejs.org) version 20 or newer (the "LTS" download) and
[Git](https://git-scm.com). Then:

```bash
git clone https://github.com/JorenNagels/portfolio-elliot.git
cd portfolio-elliot
npm install
```

`npm install` takes a couple of minutes the first time. It also sets up two things your
assistant needs: a safety hook that stops anything publishing by accident, and the
instructions that teach Claude Code how to release properly. Check it worked:

```bash
git config core.hooksPath     # should print: .githooks
```

Windows is fine — there are no symlinks involved.

### If you use Codex

Codex needs telling once that it can trust this project, otherwise it ignores the safety
rules the repo ships. Add this to your own `~/.codex/config.toml`, with the real path to
where you cloned it:

```toml
[projects."/path/to/portfolio-elliot"]
trust_level = "trusted"
```

With that set, Codex asks before anything that publishes. Without it, the git safety hook
still protects you — you just lose the extra prompts. Claude Code needs no equivalent step.

## Seeing the site

```bash
npm run dev
```

Then open <http://localhost:3000>. That's the whole site running on your own machine.
Leave it running while you work — the browser updates itself when something changes.

`Ctrl+C` in the terminal stops it.

> If your assistant says it has made a change, **look at it in the browser before you
> believe it.** This is the only preview there is; there's no staging site.

## Making a change

Describe what you want in plain English to Claude Code or Codex, in this folder:

> Change the second service to "Awards Host" and update its description.

> Add these three photos to the gallery.

> The testimonial from the BBC job should come first.

Most of the site's words live in one file (`src/lib/data.ts`), so most content changes are
small and safe.

Two things worth asking for every time:

1. **"Show me what you changed and why"** — before you accept it.
2. **"Run `npm run build`"** — the real check. If it passes, the change won't break the
   live site.

## Photos

**The gallery syncs itself from Google Drive** on the 1st of each month. So to add or
remove gallery photos, change them in the Drive folder — not in the repo. Anything you put
in `public/images/portfolio/` by hand gets overwritten at the next sync.

The hero image and brand logos are not synced and can be edited directly.

## Saving your work

```bash
git checkout -b my-change
git add -A
git commit -m "Update services copy"
git push -u origin my-change
```

Then open a **pull request** on GitHub (or just ask your assistant: "open a PR"). Please
don't commit straight to `main`.

---

## Publishing to the live site

**Only do this when you mean it.** It replaces the live site within a couple of minutes,
and there's no undo — fixing a bad release means doing another one.

First, check it's ready. This is safe and changes nothing:

```bash
npm run deploy:check
```

It builds everything and lists exactly which changes would go out. If it reports an error,
fix that first (ask your assistant) and run it again.

Then, to actually publish:

```bash
npm run deploy
```

It shows the version number and asks you to type it in to confirm.

### Letting your assistant publish

You can also just ask Claude Code or Codex to deploy. It's set up to run the checks, tell
you the version and what's in it, **ask you whether to go ahead**, and publish only after
you say yes — with a second yes/no prompt for the command itself.

So it can do the work, but it can't publish anything without you agreeing. If an assistant
ever publishes without asking, or claims it published when it never asked, tell Joren —
that's a bug in the setup, not normal.

### If something looks wrong on the live site

Don't start changing things on `main` in a hurry. Tell Joren. The fix is either a small
correction or undoing the last change, followed by another release.

---

## Two things never to change

**1. The site must stay hidden from Google.** This is deliberate — the site is shared by
direct link with prospective clients, and is not meant to be findable by search. If an
assistant offers to "improve the SEO", add a sitemap, or submit the site to Google, **say
no.** The `deploy:check` command will refuse to publish if this protection goes missing.

**2. Don't touch these folders** unless Joren asks — they control how the site builds and
deploys, and the automatic photo sync:

- `.github/workflows/`
- `scripts/`

Also: never commit a file containing a password, key or token (anything named `.env` or
similar).

## Questions

Ask Joren. Full technical detail is in `AGENTS.md`.
