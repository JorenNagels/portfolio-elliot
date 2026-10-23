'use client';

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import ExportedImage from 'next-image-export-optimizer';
import type { PortfolioPhoto } from '@/lib/data';

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
// The track holds [previous, current, next]; at rest the current slide fills the screen
const REST = 'translate3d(-100%, 0, 0)';

type Props = {
  photos: PortfolioPhoto[];
  children: ReactNode;
};

type Gesture = {
  id: number;
  startX: number;
  startY: number;
  // Where the track was when the finger landed (it may have been mid-slide)
  originX: number;
  originY: number;
  axis: 'x' | 'y' | null;
  samples: { x: number; y: number; t: number }[];
};

type Running = { anims: Animation[]; done: () => void; shift: number };

function Frame({ p }: { p: PortfolioPhoto }) {
  return (
    <div
      data-photo
      className="relative cursor-grab bg-mid active:cursor-grabbing"
      style={{
        aspectRatio: `${p.w} / ${p.h}`,
        width: `min(92vw, calc(82dvh * ${p.w / p.h}))`,
      }}
    >
      <ExportedImage
        src={p.src}
        alt=""
        fill
        sizes="92vw"
        loading="eager"
        draggable={false}
        className="object-contain"
      />
    </div>
  );
}

const duration = (ms: number) =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : ms;

// Set the end value inline and animate to it from wherever the element currently is
function play(el: HTMLElement, prop: 'transform' | 'opacity', to: string, ms: number) {
  const from = getComputedStyle(el)[prop];
  el.style[prop] = to;
  return el.animate({ [prop]: [from, to] }, { duration: duration(ms), easing: EASE });
}

// Opens a full-screen viewer when any [data-photo-index] element inside children is clicked
export default function PhotoViewer({ photos, children }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const shade = useRef<HTMLDivElement>(null);
  const gesture = useRef<Gesture | null>(null);
  const running = useRef<Running | null>(null);
  const closing = useRef(false);
  const dragged = useRef(false);
  const [index, setIndex] = useState<number | null>(null);
  const count = photos.length;
  const at = (d: number) => photos[((index ?? 0) + d + count) % count];

  // Runs right after the slides re-order for a new photo, before paint, so the swap is invisible
  useLayoutEffect(() => {
    if (track.current) track.current.style.transform = REST;
  }, [index]);

  const run = (anims: Animation[], done: () => void, shift = 0) => {
    const r = { anims, done, shift };
    running.current = r;
    anims[0].onfinish = () => {
      if (running.current !== r) return;
      running.current = null;
      done();
    };
  };

  // Finish any slide in flight now, keeping the photos exactly where they are on screen
  const interrupt = () => {
    const r = running.current;
    const el = track.current;
    if (!r || !el || !shade.current) return;
    const m = new DOMMatrix(getComputedStyle(el).transform);
    const opacity = getComputedStyle(shade.current).opacity;
    running.current = null;
    r.anims.forEach((a) => a.cancel());
    flushSync(r.done);
    // After moving on a photo, the one on screen sits a slot further left/right in the track
    m.m41 += r.shift * el.clientWidth;
    el.style.transform = m.toString();
    shade.current.style.opacity = opacity;
  };

  // Place the track while dragging: down/up drags shrink the photo and fade the background
  const place = (x: number, y: number) => {
    const progress = Math.min(Math.abs(y) / (dialog.current?.clientHeight || 1), 1);
    track.current!.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${1 - progress * 0.25})`;
    shade.current!.style.opacity = String(Math.max(0, 1 - progress * 1.6));
    // Shrinking the track would pull the neighbouring photos into view
    showNeighbours(y === 0);
  };

  const showNeighbours = (visible: boolean) => {
    const slides = track.current?.children;
    if (!slides) return;
    for (const i of [0, 2]) (slides[i] as HTMLElement).style.visibility = visible ? '' : 'hidden';
  };

  const slide = (d: -1 | 0 | 1, velocity = 0) => {
    const el = track.current;
    if (!el || !shade.current) return;
    const w = el.clientWidth;
    const from = new DOMMatrix(getComputedStyle(el).transform);
    const toX = -w - d * w;
    // Carry on at the speed of the flick, within sensible bounds
    const distance = Math.hypot(toX - from.m41, from.m42);
    const ms = Math.min(450, Math.max(200, distance / Math.max(Math.abs(velocity), 1.2)));
    run(
      [play(el, 'transform', `translate3d(${toX}px, 0, 0)`, ms), play(shade.current, 'opacity', '1', ms)],
      () => {
        showNeighbours(true);
        if (d === 0) el.style.transform = REST;
        else setIndex((i) => (i === null ? i : (i + d + count) % count));
      },
      d,
    );
  };

  const go = (d: -1 | 1) => {
    if (gesture.current || closing.current) return;
    interrupt();
    slide(d);
  };

  const dismiss = (direction = 0) => {
    const el = dialog.current;
    if (!el || closing.current) return;
    closing.current = true;
    running.current = null;
    if (direction && track.current && shade.current) {
      const x = new DOMMatrix(getComputedStyle(track.current).transform).m41;
      play(track.current, 'transform', `translate3d(${x}px, ${direction * el.clientHeight}px, 0) scale(0.75)`, 280);
      play(shade.current, 'opacity', '0', 280);
    }
    play(el, 'opacity', '0', direction ? 280 : 180).onfinish = () => el.close();
  };

  const open = (i: number) => {
    const el = dialog.current;
    if (!el) return;
    flushSync(() => setIndex(i));
    el.showModal();
    // Focus the viewer rather than its first button, which would show a focus ring on arrow keys
    el.focus();
    run(
      [
        el.animate({ opacity: [0, 1] }, { duration: duration(220), easing: EASE }),
        track.current!.animate(
          { transform: ['translate3d(-100%, 0, 0) scale(0.94)', REST] },
          { duration: duration(320), easing: EASE },
        ),
      ],
      () => {},
    );
  };

  const onClick = (e: React.MouseEvent) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>('[data-photo-index]');
    if (target) open(Number(target.dataset.photoIndex));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragged.current = false;
    if (gesture.current || closing.current || !e.isPrimary || e.button !== 0) return;
    if ((e.target as HTMLElement).closest('button')) return;
    interrupt();
    const m = new DOMMatrix(getComputedStyle(track.current!).transform);
    gesture.current = {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: m.m41,
      originY: m.m42,
      axis: null,
      samples: [],
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const g = gesture.current;
    if (!g || e.pointerId !== g.id) return;
    const dx = e.clientX - g.startX;
    const dy = e.clientY - g.startY;
    if (!g.axis) {
      if (Math.hypot(dx, dy) < 8) return;
      // Lock to one direction so a sideways swipe never drifts vertically and vice versa
      g.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      dialog.current!.setPointerCapture(e.pointerId);
    }
    g.samples.push({ x: e.clientX, y: e.clientY, t: e.timeStamp });
    if (g.axis === 'x') place(g.originX + dx, g.originY);
    else place(g.originX, g.originY + dy);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const g = gesture.current;
    if (!g || e.pointerId !== g.id) return;
    gesture.current = null;
    if (!g.axis) return; // A tap: the click handler decides what it does
    dragged.current = true;

    // Release speed over the last 100ms, in px/ms along the locked axis
    const recent = g.samples.filter((s) => s.t > e.timeStamp - 100);
    const first = recent[0];
    const last = recent[recent.length - 1];
    const dt = first && last ? last.t - first.t : 0;
    const velocity = dt > 0 ? (g.axis === 'x' ? last.x - first.x : last.y - first.y) / dt : 0;
    const released = e.type === 'pointerup';
    const m = new DOMMatrix(getComputedStyle(track.current!).transform);

    if (g.axis === 'x') {
      const offset = m.m41 + track.current!.clientWidth;
      const flick = Math.abs(velocity) > 0.3 && Math.sign(velocity) === Math.sign(offset);
      const far = Math.abs(offset) > track.current!.clientWidth * 0.2;
      slide(released && (far || flick) ? (offset < 0 ? 1 : -1) : 0, velocity);
    } else {
      const flick = Math.abs(velocity) > 0.5 && Math.sign(velocity) === Math.sign(m.m42);
      const far = Math.abs(m.m42) > dialog.current!.clientHeight * 0.15;
      if (released && (far || flick)) dismiss(Math.sign(m.m42));
      else slide(0, velocity);
    }
  };

  const control =
    'absolute flex h-12 w-12 items-center justify-center rounded-full border border-gold-faint bg-black/55 text-xl text-gold backdrop-blur-sm transition hover:border-gold hover:bg-black/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold';

  return (
    <div onClick={onClick}>
      {children}

      <dialog
        ref={dialog}
        aria-label="Photo viewer"
        tabIndex={-1}
        onClose={() => {
          closing.current = false;
          running.current = null;
          gesture.current = null;
          dialog.current!.style.opacity = '';
          shade.current!.style.opacity = '';
          setIndex(null);
        }}
        onCancel={(e) => {
          e.preventDefault();
          dismiss();
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(1);
          if (e.key === 'ArrowLeft') go(-1);
        }}
        // Tapping anywhere but the photo or a control closes the viewer; the click ending a drag doesn't
        onClick={(e) => {
          if (dragged.current) dragged.current = false;
          else if (!(e.target as HTMLElement).closest('[data-photo], button')) dismiss();
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="m-0 h-dvh max-h-none w-screen max-w-none touch-none select-none overflow-hidden bg-transparent p-0 text-white outline-none backdrop:bg-transparent"
      >
        <div ref={shade} className="absolute inset-0 bg-black/95" />

        {index !== null && (
          <>
            <div ref={track} className="relative flex h-full will-change-transform">
              {/* Keyed by photo so the neighbours' loaded images are reused when the index moves */}
              {[-1, 0, 1].map((d) => (
                <div key={at(d).src} className="flex h-full w-full flex-shrink-0 items-center justify-center">
                  <Frame p={at(d)} />
                </div>
              ))}
            </div>

            {/* Fetch the photos after the next one too, so quick stepping stays instant */}
            <div className="hidden" aria-hidden>
              {[2, 3].map((d) => (
                <ExportedImage
                  key={at(d).src}
                  src={at(d).src}
                  alt=""
                  width={at(d).w}
                  height={at(d).h}
                  sizes="92vw"
                  loading="eager"
                />
              ))}
            </div>
          </>
        )}

        <button type="button" onClick={() => dismiss()} aria-label="Close" className={`${control} right-4 top-4`}>
          <span aria-hidden>✕</span>
        </button>
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className={`${control} left-4 top-1/2 hidden -translate-y-1/2 sm:flex`}
        >
          <span aria-hidden>←</span>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className={`${control} right-4 top-1/2 hidden -translate-y-1/2 sm:flex`}
        >
          <span aria-hidden>→</span>
        </button>
      </dialog>
    </div>
  );
}
