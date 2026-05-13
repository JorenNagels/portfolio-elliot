import ExportedImage from 'next-image-export-optimizer';
import FadeIn from './FadeIn';
import { heroImage } from '@/lib/data';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-20 sm:px-12"
    >
      <ExportedImage
        src={heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(10,10,10,0.97) 30%, rgba(10,10,10,0.6) 65%, rgba(10,10,10,0.2) 100%)',
        }}
      />
      {/* faint gold grid */}
      <div className="hero-grid-overlay absolute inset-0 opacity-[0.04]" />

      <FadeIn
        as="p"
        className="relative mb-5 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.2em] text-gold"
      >
        <span className="block h-px w-10 bg-gold" />
        Event Host · Motivational speaker
      </FadeIn>

      <FadeIn
        as="h1"
        className="relative font-display text-[clamp(4.5rem,12vw,9rem)] leading-[0.92] tracking-[0.02em]"
      >
        ELLIOT
        <br />
        <span className="text-gold">BARHAM</span>
      </FadeIn>

      <FadeIn
        as="p"
        className="relative mt-6 max-w-[520px] text-[1.05rem] leading-[1.8] opacity-80"
      >
        Trusted by the world&apos;s biggest brands — from Amazon to Nike. Delivering dedicated
        professionalism with unmatched energy and a rare ability to connect with any audience.
      </FadeIn>

      <FadeIn className="relative mt-10 flex flex-wrap gap-4">
        <a
          href="#clips"
          className="bg-gold px-8 py-[0.85rem] text-[0.8rem] font-medium uppercase tracking-[0.1em] text-black transition hover:-translate-y-px hover:bg-gold-light"
        >
          Watch me in action
        </a>
        <a
          href="#contact"
          className="border border-white/30 bg-transparent px-8 py-[0.85rem] text-[0.8rem] font-medium uppercase tracking-[0.1em] text-white transition hover:border-gold hover:text-gold"
        >
          Book Elliot
        </a>
      </FadeIn>
    </section>
  );
}
