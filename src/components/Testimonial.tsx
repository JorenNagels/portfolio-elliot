import FadeIn from './FadeIn';

export default function Testimonial() {
  return (
    <section id="testimonial" className="px-6 sm:px-12 py-24" style={{ background: '#0d0c08' }}>
      <FadeIn as="p" className="text-[0.68rem] tracking-[0.22em] uppercase text-gold mb-3 flex items-center gap-3">
        <span className="block w-7 h-px bg-gold" />
        What clients say
      </FadeIn>
      <FadeIn as="h2" className="font-display text-[clamp(2.2rem,5vw,3.8rem)] tracking-[0.04em] leading-none mb-2">
        The &quot;it&quot; factor
        <br />
        that can&apos;t be taught
      </FadeIn>

      <FadeIn className="max-w-[780px] border-l-2 border-gold pl-12 mt-12">
        <div className="font-display text-[6rem] text-gold/25 leading-[0.7] mb-4">&ldquo;</div>
        <p className="text-[1.1rem] leading-[1.9] opacity-85 font-light italic mb-8">
          Elliot&apos;s ability to captivate an audience is truly remarkable. His humor, attention
          to detail, and infectious energy transformed our event into an unforgettable experience.
          One of his many strengths is his{' '}
          <strong className="font-medium not-italic text-gold-light">
            seamless integration of ad reads and key call-outs
          </strong>
          , which he delivers in a manner that is both natural and genuinely humorous.
          <br />
          <br />
          He effortlessly connected with the diverse audience, creating an atmosphere that was both
          inviting and exciting. Elliot possesses a stage presence that is truly rare —{' '}
          <strong className="font-medium not-italic text-gold-light">
            he has the &quot;it&quot; factor that cannot be taught.
          </strong>{' '}
          Alienware was delighted with his work, and we are already planning to collaborate with him
          for future events.
        </p>
        <div className="flex flex-col gap-[3px]">
          <span className="text-[0.95rem] font-medium">Javier Davalos</span>
          <span className="text-[0.8rem] opacity-55 tracking-[0.05em]">
            Head of Community Engagement &amp; Research, Alienware · TwitchCon 2023, Las Vegas
          </span>
        </div>
      </FadeIn>
    </section>
  );
}
