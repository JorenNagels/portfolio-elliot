import ExportedImage from 'next-image-export-optimizer';
import FadeIn from './FadeIn';
import { portfolioImages, type PortfolioPhoto } from '@/lib/data';

const row1 = portfolioImages.filter((_, i) => i % 2 === 0);
const row2 = portfolioImages.filter((_, i) => i % 2 === 1);

function Photo({ p }: { p: PortfolioPhoto }) {
  return (
    <div
      className="relative h-48 sm:h-60 md:h-72 flex-shrink-0 bg-mid overflow-hidden"
      style={{ aspectRatio: `${p.w} / ${p.h}` }}
    >
      <ExportedImage
        src={p.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 320px, 240px"
        className="object-cover"
      />
    </div>
  );
}

export default function Photos() {
  return (
    <section id="photos" className="py-24">
      <div className="px-6 sm:px-12 flex items-end justify-between gap-6 mb-12">
        <div>
          <FadeIn as="p" className="text-[0.68rem] tracking-[0.22em] uppercase text-gold mb-3 flex items-center gap-3">
            <span className="block w-7 h-px bg-gold" />
            On stage
          </FadeIn>
          <FadeIn as="h2" className="font-display text-[clamp(2.2rem,5vw,3.8rem)] tracking-[0.04em] leading-none">
            In the moment
          </FadeIn>
        </div>
        <FadeIn as="p" className="hidden sm:flex items-center gap-2 text-[0.7rem] tracking-[0.2em] uppercase text-gold/80 pb-2">
          Drag to explore
          <span className="nudge-right inline-block">→</span>
        </FadeIn>
      </div>

      <FadeIn className="overflow-x-auto scrollbar-hide carousel-mask">
        <div className="flex flex-col gap-3 w-max">
          <div className="flex gap-3 px-6 sm:px-12">
            {row1.map((p) => <Photo key={p.src} p={p} />)}
          </div>
          <div className="flex gap-3 px-6 sm:px-12">
            {row2.map((p) => <Photo key={p.src} p={p} />)}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
