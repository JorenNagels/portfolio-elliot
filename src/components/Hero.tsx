import ExportedImage from 'next-image-export-optimizer';
import FadeIn from './FadeIn';
import { heroImage } from '@/lib/data';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden px-6 sm:px-12 pb-20"
    >
      <ExportedImage
        src={heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover -z-10"
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
      <div className="absolute inset-0 opacity-[0.04] hero-grid-overlay" />

      <FadeIn as="p" className="relative text-[0.7rem] tracking-[0.2em] uppercase text-gold mb-5 flex items-center gap-3">
        <span className="block w-10 h-px bg-gold" />
        Event Host · Stage Presenter · TV Presenter
      </FadeIn>

      <FadeIn as="h1" className="relative font-display text-[clamp(4.5rem,12vw,9rem)] leading-[0.92] tracking-[0.02em]">
        ELLIOT
        <br />
        <span className="text-gold">BARHAM</span>
      </FadeIn>

      <FadeIn as="p" className="relative mt-6 text-[1.05rem] max-w-[520px] opacity-80 leading-[1.8]">
        Trusted by the world&apos;s biggest brands — from Amazon to Nike. Delivering dedicated
        professionalism with unmatched energy and a rare ability to connect with any audience.
      </FadeIn>

      <FadeIn className="relative mt-10 flex flex-wrap gap-4">
        <a
          href="#clips"
          className="bg-gold text-black px-8 py-[0.85rem] text-[0.8rem] font-medium tracking-[0.1em] uppercase hover:bg-gold-light hover:-translate-y-px transition"
        >
          Watch me in action
        </a>
        <a
          href="#contact"
          className="bg-transparent text-white px-8 py-[0.85rem] text-[0.8rem] font-medium tracking-[0.1em] uppercase border border-white/30 hover:border-gold hover:text-gold transition"
        >
          Book Elliot
        </a>
      </FadeIn>

      <div className="hidden sm:flex absolute bottom-8 right-12 text-[0.7rem] tracking-[0.15em] uppercase text-muted items-center gap-[10px] [writing-mode:vertical-rl] after:content-[''] after:block after:w-px after:h-[50px] after:bg-gradient-to-b after:from-muted after:to-transparent">
        Scroll
      </div>
    </section>
  );
}
