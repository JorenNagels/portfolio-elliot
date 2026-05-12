import FadeIn from './FadeIn';
import { clips } from '@/lib/data';

export default function Clips() {
  return (
    <section id="clips" className="px-6 sm:px-12 py-24 bg-black">
      <FadeIn as="p" className="text-[0.68rem] tracking-[0.22em] uppercase text-gold mb-3 flex items-center gap-3">
        <span className="block w-7 h-px bg-gold" />
        See it for yourself
      </FadeIn>
      <FadeIn as="h2" className="font-display text-[clamp(2.2rem,5vw,3.8rem)] tracking-[0.04em] leading-none mb-2">
        Highlights &amp;
        <br />
        showreel
      </FadeIn>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 mt-12">
        {clips.map((c) => (
          <FadeIn
            key={c.href}
            className="relative border border-gold-faint bg-mid p-7 hover:border-gold hover:-translate-y-1 transition"
          >
            {c.views && (
              <div className="absolute top-5 right-5 text-[0.72rem] text-gold/80 bg-gold/10 px-2 py-[3px] tracking-[0.05em]">
                {c.views}
              </div>
            )}
            <p className="text-[0.68rem] tracking-[0.15em] uppercase text-gold mb-3">{c.eyebrow}</p>
            <p className="text-[1.05rem] font-medium mb-2 leading-[1.4]">{c.title}</p>
            <p className="text-[0.85rem] opacity-60 leading-[1.7] mb-5">{c.desc}</p>
            <a
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.75rem] tracking-[0.1em] uppercase text-gold border-b border-gold/30 hover:border-gold pb-[2px] transition"
            >
              Watch clip <span aria-hidden>↗</span>
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
