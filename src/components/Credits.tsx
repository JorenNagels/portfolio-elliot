import FadeIn from './FadeIn';
import { brands } from '@/lib/data';

export default function Credits() {
  // Duplicate brands for seamless infinite loop
  const loop = [...brands, ...brands];

  return (
    <section id="brands" className="bg-mid px-6 py-24 sm:px-12">
      <FadeIn
        as="p"
        className="mb-3 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.22em] text-gold"
      >
        <span className="block h-px w-7 bg-gold" />
        Who I do it for
      </FadeIn>
      <FadeIn
        as="h2"
        className="mb-2 font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-none tracking-[0.04em]"
      >
        Trusted by
        <br />
        the world&apos;s biggest brands
      </FadeIn>
      <FadeIn as="p" className="mt-8 max-w-[540px] text-base leading-[1.8] opacity-70">
        From esports arenas to corporate stages, I&apos;ve had the privilege of representing some of
        the most recognisable brands in the world.
      </FadeIn>

      <FadeIn className="carousel-mask relative mt-10 overflow-hidden">
        <div className="flex w-max animate-scroll-brands gap-0">
          {loop.map((b, i) => (
            <div
              key={`${b.name}-${i}`}
              className="carousel-item flex h-20 w-40 flex-shrink-0 items-center justify-center border-r border-gold-faint px-6"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/images/brands/${b.file}`}
                alt={b.name}
                className="brand-img max-h-10 max-w-[100px] object-contain"
              />
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
