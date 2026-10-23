'use client';

import { useRef, useState, type ReactNode } from 'react';
import ExportedImage from 'next-image-export-optimizer';
import type { PortfolioPhoto } from '@/lib/data';

const pad = (n: number) => String(n).padStart(2, '0');

type Props = {
  photos: PortfolioPhoto[];
  children: ReactNode;
};

// Opens a full-screen viewer when any [data-photo-index] element inside children is clicked
export default function PhotoViewer({ photos, children }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const count = photos.length;
  const photo = index === null ? null : photos[index];

  const step = (d: number) => setIndex((i) => (i === null ? i : (i + d + count) % count));
  const close = () => dialog.current?.close();

  const onClick = (e: React.MouseEvent) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>('[data-photo-index]');
    if (!target) return;
    setIndex(Number(target.dataset.photoIndex));
    dialog.current?.showModal();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  };

  const control =
    'absolute flex h-12 w-12 items-center justify-center rounded-full border border-gold-faint bg-black/55 text-xl text-gold backdrop-blur-sm transition hover:border-gold hover:bg-black/75';

  return (
    <div onClick={onClick}>
      {children}

      <dialog
        ref={dialog}
        aria-label="Photo viewer"
        onClose={() => setIndex(null)}
        onKeyDown={onKeyDown}
        // Clicks on the dialog itself land outside the photo and controls
        onClick={(e) => e.target === e.currentTarget && close()}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
        className="m-0 h-dvh max-h-none w-screen max-w-none items-center justify-center bg-black/95 p-0 text-white backdrop:bg-black/80 open:flex"
      >
        {photo && (
          <div
            className="relative bg-mid"
            style={{
              aspectRatio: `${photo.w} / ${photo.h}`,
              width: `min(92vw, calc(82dvh * ${photo.w / photo.h}))`,
            }}
          >
            <ExportedImage
              key={photo.src}
              src={photo.src}
              alt=""
              fill
              sizes="92vw"
              className="object-contain"
            />
          </div>
        )}

        <button type="button" onClick={close} aria-label="Close" className={`${control} right-4 top-4`}>
          <span aria-hidden>✕</span>
        </button>
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous photo"
          className={`${control} left-4 top-1/2 hidden -translate-y-1/2 sm:flex`}
        >
          <span aria-hidden>←</span>
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next photo"
          className={`${control} right-4 top-1/2 hidden -translate-y-1/2 sm:flex`}
        >
          <span aria-hidden>→</span>
        </button>

        {index !== null && (
          <span
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.72rem] tracking-[0.15em] text-gold/80"
            aria-live="polite"
          >
            {pad(index + 1)} / {pad(count)}
          </span>
        )}
      </dialog>
    </div>
  );
}
