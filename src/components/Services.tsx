import ExportedImage from 'next-image-export-optimizer';
import FadeIn from './FadeIn';
import { services } from '@/lib/data';

export default function Services() {
  const [lead, ...rest] = services;

  return (
    <section id="services" className="px-6 py-24 sm:px-12">
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

      <div className="mt-12 grid gap-12 md:grid-cols-[3fr_2fr]">
        <FadeIn className="flex flex-col">
          <div className="relative aspect-[4/5] overflow-hidden bg-mid md:aspect-auto md:min-h-[420px] md:flex-1">
            <ExportedImage
              src={lead.image}
              alt={lead.imageAlt}
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
          <h3 className="mt-6 font-display text-[2.4rem] leading-none tracking-[0.03em]">
            {lead.title}
          </h3>
          <p className="mt-3 max-w-[480px] text-base leading-[1.8] opacity-70">{lead.desc}</p>
        </FadeIn>

        <div className="flex flex-col gap-12">
          {rest.map((s) => (
            <FadeIn key={s.title}>
              <div className="relative aspect-[3/2] overflow-hidden bg-mid">
                <ExportedImage
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-5 font-display text-[1.6rem] leading-none tracking-[0.03em]">
                {s.title}
              </h3>
              <p className="mt-2 text-[0.92rem] leading-[1.7] opacity-60">{s.desc}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
