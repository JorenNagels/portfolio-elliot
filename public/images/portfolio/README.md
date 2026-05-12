# Portfolio photos

Drop **two** files in this directory:

- `photo-1.jpg` — fills the left half of the photo strip
- `photo-2.jpg` — fills the right half of the photo strip

Each is rendered at 50% width × 460px height with `object-fit: cover`, so anything close to a 16:9 / 4:3 landscape crop works well. Aim for ~1200×800 each.

The site references these files as `/images/portfolio/photo-1.jpg` and `/images/portfolio/photo-2.jpg` (see `src/components/Photos.tsx`).
