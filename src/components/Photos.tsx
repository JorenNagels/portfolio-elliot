import ExportedImage from 'next-image-export-optimizer';
import FadeIn from './FadeIn';
import DragScroll from './DragScroll';
import { portfolioImages, services, type PortfolioPhoto } from '@/lib/data';

const usedInServices = new Set(services.map((s) => s.image));
const gallery = portfolioImages.filter((p) => !usedInServices.has(p.src));

// Put each photo in the currently shortest row so all rows end at roughly the same length
function splitIntoRows(photos: PortfolioPhoto[], count: number) {
  const rows: PortfolioPhoto[][] = Array.from({ length: count }, () => []);
  const widths = new Array(count).fill(0);
  for (const p of photos) {
    const i = widths.indexOf(Math.min(...widths));
    rows[i].push(p);
    widths[i] += p.w / p.h;
  }
  return rows;
}

const mobileRows = splitIntoRows(gallery, 4);
const desktopRows = splitIntoRows(gallery, 3);

function Photo({ p }: { p: PortfolioPhoto }) {
  return (
    <div
      className="relative h-32 flex-shrink-0 overflow-hidden bg-mid sm:h-44 md:h-52"
      style={{ aspectRatio: `${p.w} / ${p.h}` }}
    >
      <ExportedImage
        src={p.src}
        alt=""
        fill
        draggable={false}
        sizes="(min-width: 768px) 320px, (min-width: 640px) 270px, 200px"
        className="pointer-events-none object-cover"
      />
    </div>
  );
}

function Rows({ rows, className }: { rows: PortfolioPhoto[][]; className: string }) {
  return (
    <div className={`w-max flex-col gap-3 ${className}`}>
      {rows.map((row, i) => (
        <div key={i} className="flex gap-3 pl-6 pr-6 sm:pl-12 sm:pr-12">
          {row.map((p) => (
            <Photo key={p.src} p={p} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Photos() {
  return (
    <section id="photos" className="py-24">
      <div className="px-6 sm:px-12">
        <FadeIn
          as="h2"
          className="mb-2 font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-none tracking-[0.04em]"
        >
          In the moment
        </FadeIn>
      </div>

      <FadeIn className="mr-6 mt-12 sm:mr-12">
        <DragScroll className="scrollbar-hide carousel-mask overflow-x-auto">
          {/* Only one layout is displayed; lazy images in the hidden one never load */}
          <Rows rows={mobileRows} className="flex sm:hidden" />
          <Rows rows={desktopRows} className="hidden sm:flex" />
        </DragScroll>
      </FadeIn>
    </section>
  );
}
