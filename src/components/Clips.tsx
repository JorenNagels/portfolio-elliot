import FadeIn from './FadeIn';
import { clips } from '@/lib/data';

export default function Clips() {
  return (
    <section id="clips" className="bg-black px-6 py-24 sm:px-12">
      <FadeIn
        as="p"
        className="mb-3 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.22em] text-gold"
      >
        <span className="block h-px w-7 bg-gold" />
        See it for yourself
      </FadeIn>
      <FadeIn
        as="h2"
        className="mb-2 font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-none tracking-[0.04em]"
      >
        Highlights
      </FadeIn>

      <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
        {clips.map((c) => (
          <FadeIn
            key={c.href}
            className="relative flex flex-col border border-gold-faint bg-mid p-7 transition hover:-translate-y-1 hover:border-gold"
          >
            {c.views && (
              <div className="absolute right-5 top-5 bg-gold/10 px-2 py-[3px] text-[0.72rem] tracking-[0.05em] text-gold/80">
                {c.views}
              </div>
            )}
            <p className="mb-3 text-[0.68rem] uppercase tracking-[0.15em] text-gold">{c.eyebrow}</p>
            <p className="mb-2 text-[1.05rem] font-medium leading-[1.4]">{c.title}</p>
            <p className="mb-5 text-[0.85rem] leading-[1.7] opacity-60">{c.desc}</p>
            <a
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-1.5 self-start border-b border-gold/30 pb-[2px] text-[0.75rem] uppercase tracking-[0.1em] text-gold transition hover:border-gold"
            >
              Watch clip <span aria-hidden>↗</span>
            </a>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
