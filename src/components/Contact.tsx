import FadeIn from './FadeIn';

export default function Contact() {
  return (
    <section id="contact" className="px-6 sm:px-12 py-24 bg-gold text-black">
      <FadeIn as="p" className="text-[0.68rem] tracking-[0.22em] uppercase mb-3 flex items-center gap-3 text-black/55">
        <span className="block w-7 h-px bg-black/40" />
        Let&apos;s work together
      </FadeIn>
      <FadeIn as="h2" className="font-display text-[clamp(2.2rem,5vw,3.8rem)] tracking-[0.04em] leading-none mb-2 text-black">
        Book Elliot
      </FadeIn>

      <FadeIn className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <p className="text-base leading-[1.8] opacity-75 max-w-[420px]">
          Available for stage hosting, corporate events, brand activations, TV presenting, and more
          — worldwide. Get in touch to discuss your event.
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[0.9rem] pb-4 border-b border-black/15">
            <span className="text-base opacity-50">✉</span>
            <div>
              <a
                href="mailto:elliot@dreamteamproductions.co.uk"
                className="text-black font-medium hover:underline"
              >
                elliot@dreamteamproductions.co.uk
              </a>
              <p className="text-[0.75rem] opacity-55 italic mt-1">For bookings &amp; enquiries</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[0.9rem]">
            <span className="text-base opacity-50">📍</span>
            <div>Based in the UK — available globally</div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
