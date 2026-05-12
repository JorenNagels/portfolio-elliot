import ExportedImage from 'next-image-export-optimizer';
import FadeIn from './FadeIn';
import { portfolioImages } from '@/lib/data';

export default function Photos() {
  return (
    <section id="photos" className="px-6 sm:px-12 py-24">
      <FadeIn as="p" className="text-[0.68rem] tracking-[0.22em] uppercase text-gold mb-3 flex items-center gap-3">
        <span className="block w-7 h-px bg-gold" />
        On stage
      </FadeIn>
      <FadeIn as="h2" className="font-display text-[clamp(2.2rem,5vw,3.8rem)] tracking-[0.04em] leading-none mb-2">
        In the moment
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-12">
        {portfolioImages.map((src) => (
          <div key={src} className="relative overflow-hidden aspect-[4/5] bg-mid group">
            <ExportedImage
              src={src}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
