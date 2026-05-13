import FadeIn from './FadeIn';

export default function Contact() {
  return (
    <section id="contact" className="bg-gold px-6 py-24 text-black sm:px-12">
      <FadeIn
        as="p"
        className="mb-3 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.22em] text-black/55"
      >
        <span className="block h-px w-7 bg-black/40" />
        Let&apos;s work together
      </FadeIn>
      <FadeIn
        as="h2"
        className="mb-2 font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-none tracking-[0.04em] text-black"
      >
        Book Elliot
      </FadeIn>

      <FadeIn className="mt-10 grid grid-cols-1 items-start gap-12 md:grid-cols-2">
        <p className="max-w-[420px] text-base leading-[1.8] opacity-75">
          I'd love to help your next event come to life! Drop me a line via email and let's start
          planning how we can work together.
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 border-b border-black/15 pb-4 text-[0.9rem]">
            <span className="text-base opacity-50">✉</span>
            <div>
              <a
                href="mailto:elliot@dreamteamproductions.co.uk"
                className="font-medium text-black hover:underline"
              >
                elliot@dreamteamproductions.co.uk
              </a>
              <p className="mt-1 text-[0.75rem] italic opacity-55">For bookings &amp; enquiries</p>
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
