import FadeIn from './FadeIn';
import { services } from '@/lib/data';

export default function Services() {
  return (
    <section id="services" className="px-6 py-24 sm:px-12">
      <FadeIn
        as="p"
        className="mb-3 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.22em] text-gold"
      >
        <span className="block h-px w-7 bg-gold" />
        What I do
      </FadeIn>
      <FadeIn
        as="h2"
        className="mb-2 font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-none tracking-[0.04em]"
      >
        “This man kills it
        <br />
        with audience interaction!”
      </FadeIn>
      <FadeIn as="p" className="text-[0.85rem] tracking-[0.05em] opacity-60">
        —{' '}
        <a
          href="https://x.com/Sh0wTig3r/status/1771872700283150472"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold transition hover:text-gold-light"
        >
          @Sh0wTig3r
        </a>{' '}
        on Twitter
      </FadeIn>

      <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-px border border-gold-faint">
        {services.map((s) => (
          <FadeIn
            key={s.num}
            className="group relative overflow-hidden bg-mid p-10 transition-colors hover:bg-[#1f1e17]"
          >
            <span className="absolute left-0 right-0 top-0 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
            <div className="mb-4 font-display text-5xl leading-none text-gold/15">{s.num}</div>
            <p className="mb-2 text-base font-medium">{s.title}</p>
            <p className="text-[0.88rem] leading-[1.7] opacity-60">{s.desc}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
