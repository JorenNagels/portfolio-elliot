import ExportedImage from 'next-image-export-optimizer';
import FadeIn from './FadeIn';
import DragScroll from './DragScroll';
import { portfolioImages, type PortfolioPhoto } from '@/lib/data';

const row1 = portfolioImages.filter((_, i) => i % 2 === 0);
const row2 = portfolioImages.filter((_, i) => i % 2 === 1);

function Photo({ p }: { p: PortfolioPhoto }) {
  return (
    <div
      className="relative h-48 flex-shrink-0 overflow-hidden bg-mid sm:h-60 md:h-72"
      style={{ aspectRatio: `${p.w} / ${p.h}` }}
    >
      <ExportedImage
        src={p.src}
        alt=""
        fill
        draggable={false}
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 320px, 240px"
        className="pointer-events-none object-cover"
      />
    </div>
  );
}

export default function Photos() {
  return (
    <section id="photos" className="py-24">
      <div className="px-6 sm:px-12">
        <FadeIn
          as="p"
          className="mb-3 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.22em] text-gold"
        >
          <span className="block h-px w-7 bg-gold" />
          On stage
        </FadeIn>
        <FadeIn
          as="h2"
          className="mb-2 font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-none tracking-[0.04em]"
        >
          In the moment
        </FadeIn>
      </div>

      <FadeIn className="mr-6 mt-12 sm:mr-12">
        <DragScroll className="scrollbar-hide carousel-mask overflow-x-auto">
          <div className="flex w-max flex-col gap-3">
            <div className="flex gap-3 pl-6 pr-6 sm:pl-12 sm:pr-12">
              {row1.map((p) => (
                <Photo key={p.src} p={p} />
              ))}
            </div>
            <div className="flex gap-3 pl-6 pr-6 sm:pl-12 sm:pr-12">
              {row2.map((p) => (
                <Photo key={p.src} p={p} />
              ))}
            </div>
          </div>
        </DragScroll>
      </FadeIn>
    </section>
  );
}
