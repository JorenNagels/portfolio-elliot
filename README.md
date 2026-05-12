# Elliot Barham — Portfolio

Static portfolio site for Elliot Barham (event host, stage presenter, TV presenter). Built with Next.js, exported to static HTML/CSS/JS for hosting on AWS S3 (or any static host).

## Stack

- **Next.js 16** with `output: 'export'` — produces a fully static `/out` directory
- **TypeScript** + **Tailwind CSS**
- **next/font** for Bebas Neue + DM Sans (no Google Fonts CDN at runtime)
- **next-image-export-optimizer** — pre-generates WebP variants + `srcset` at build time

## Commands

```bash
npm install            # install deps
npm run dev            # local preview at http://localhost:3000
npm run build          # optimize images + emit /out for deploy
npx serve out          # sanity-check the static build locally
```

`npm run build` runs `next-image-export-optimizer` (~30s) before `next build`. Each source image becomes 17 WebP variants (10 → 3840 px) so browsers fetch only what they need via `srcset`.

## Project layout

```
src/
├── app/
│   ├── layout.tsx          # fonts, html shell, metadata
│   ├── page.tsx            # composes all sections in order
│   └── globals.css         # Tailwind + keyframes (fade-up, scroll-brands)
├── components/             # one file per page section
│   ├── Nav.tsx · Hero.tsx · Services.tsx · Credits.tsx
│   ├── Clips.tsx · Photos.tsx · Testimonial.tsx
│   ├── Contact.tsx · Footer.tsx
│   └── FadeIn.tsx          # client component — IntersectionObserver wrapper
└── lib/
    └── data.ts             # services, brands, clips, heroImage, portfolioImages

public/
└── images/
    ├── hero/               # one large hero image
    ├── portfolio/          # gallery photos shown in <Photos>
    └── brands/             # SVG logos for the credits carousel
```

## Editing content

Most copy and asset references live in **`src/lib/data.ts`**:

- `services` — the 3 service cards
- `brands` — list of brand carousel logos (filename + display name)
- `clips` — the highlight cards with external links
- `heroImage` — path to the hero background image
- `portfolioImages` — array of photo paths rendered in the gallery grid

Section structure (headings, ordering) lives in the corresponding `src/components/*.tsx` file.

## Adding / replacing images

### Hero (`public/images/hero/`)
One file. Set `heroImage` in `data.ts` to its path. Wide landscape works best (the subject should sit on the right of the frame; the left is darkened with a gradient for legibility).

### Portfolio gallery (`public/images/portfolio/`)
Drop any number of files in. Add their paths to the `portfolioImages` array in `data.ts`. They render in a responsive grid (1 col mobile / 2 tablet / 3 desktop) cropped to 4:5 portrait.

### Brand logos (`public/images/brands/`)
SVG strongly preferred (rendered at max 100×40 px and forced to white via `filter: brightness(0) invert(1)`). To add or reorder, edit the `brands` array in `data.ts`. The carousel duplicates the list internally for the seamless loop — no need to do that manually.

## Deployment (AWS S3)

After `npm run build`:

1. Upload the entire contents of `/out` to your S3 bucket.
2. In S3 → Properties → enable **Static website hosting**, set index document to `index.html` and error document to `404.html`.
3. (Recommended) Put CloudFront in front of the bucket for HTTPS, caching, and a custom domain.

Because `next.config.mjs` has `trailingSlash: true`, every page is emitted as `<path>/index.html`, which S3 serves cleanly at directory-style URLs.

## Image optimization config

Tweakable env vars in `next.config.mjs`:

- `nextImageExportOptimizer_quality` — JPEG/WebP quality (default `75`)
- `nextImageExportOptimizer_storePicturesInWEBP` — toggle WebP output
- `nextImageExportOptimizer_generateAndUseBlurImages` — blur placeholders during load

## Notes

- The original AI-generated HTML is preserved at `elliot-barham-portfolio (1).html` as a reference. Delete it once you're happy with parity.
- Heavy source images (>2 MB) still inflate the build directory, even though browsers only fetch the optimized WebP variants. Compress sources before committing to keep the repo lean.
