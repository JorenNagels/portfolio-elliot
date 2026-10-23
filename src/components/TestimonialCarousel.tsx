'use client';

import { Children, useEffect, useRef, useState, type ReactNode } from 'react';

const pad = (n: number) => String(n).padStart(2, '0');

export default function TestimonialCarousel({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [overflows, setOverflows] = useState(false);
  const count = Children.count(children);

  const items = () => Array.from(ref.current?.firstElementChild?.children ?? []) as HTMLElement[];
  const snapOffset = (el: HTMLElement) => parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setOverflows(el.scrollWidth > el.clientWidth + 1);
      // At the end of the track the last card can't snap to the start edge, so treat it as active.
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
        setActive(count - 1);
        return;
      }
      const target = el.scrollLeft + snapOffset(el);
      let best = 0;
      items().forEach((item, i) => {
        if (Math.abs(item.offsetLeft - target) < Math.abs(items()[best].offsetLeft - target))
          best = i;
      });
      setActive(best);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [count]);

  const goTo = (i: number) => {
    const el = ref.current;
    const item = items()[i];
    if (!el || !item) return;
    el.scrollTo({ left: item.offsetLeft - snapOffset(el), behavior: 'smooth' });
  };

  const arrow =
    'flex h-11 w-11 items-center justify-center rounded-full border border-gold-faint text-lg text-gold transition hover:border-gold disabled:pointer-events-none disabled:opacity-30';

  return (
    <>
      <div
        ref={ref}
        className="scrollbar-hide relative snap-x snap-mandatory scroll-pl-6 overflow-x-auto pl-6 sm:scroll-pl-12 sm:pl-12"
      >
        {/* Trailing gutter lives on the track: the scroller's own right padding is ignored by browsers. */}
        <div className="flex w-max items-stretch gap-4 pr-6 sm:gap-6 sm:pr-0">{children}</div>
      </div>

      {overflows && (
        <div className="mt-6 flex items-center justify-between px-6 sm:px-12">
          <div className="flex items-center">
            {Array.from({ length: count }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === active}
                className="px-1 py-4"
              >
                <span
                  className={`block h-[2px] transition-all duration-300 ${i === active ? 'w-8 bg-gold' : 'w-4 bg-gold/30'}`}
                />
              </button>
            ))}
            <span className="ml-3 text-[0.72rem] tracking-[0.15em] text-gold/80" aria-live="polite">
              {pad(active + 1)} / {pad(count)}
            </span>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Previous testimonial"
              className={arrow}
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active === count - 1}
              aria-label="Next testimonial"
              className={arrow}
            >
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
