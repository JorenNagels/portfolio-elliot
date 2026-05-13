import FadeIn from './FadeIn';
import { testimonials, type TestimonialSegment } from '@/lib/data';

function renderSegment(seg: TestimonialSegment, i: number) {
  if (typeof seg === 'string') return <span key={i}>{seg}</span>;
  return (
    <strong key={i} className="font-medium not-italic text-gold-light">
      {seg.highlight}
    </strong>
  );
}

export default function Testimonial() {
  return (
    <section id="testimonial" className="px-6 py-24 sm:px-12" style={{ background: '#0d0c08' }}>
      <FadeIn
        as="p"
        className="mb-3 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.22em] text-gold"
      >
        <span className="block h-px w-7 bg-gold" />
        What people have to say
      </FadeIn>
      <FadeIn
        as="h2"
        className="mb-12 font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-none tracking-[0.04em]"
      >
        The &quot;it&quot; factor
        <br />
        that can&apos;t be taught
      </FadeIn>

      <FadeIn className="-mx-6 mt-12 sm:-mx-12">
        <div className="scrollbar-hide snap-x snap-mandatory scroll-pl-6 overflow-x-auto pb-4 pl-6 pr-6 sm:scroll-pl-12 sm:pl-12 sm:pr-12">
          <div className="flex items-stretch gap-6">
            {testimonials.map((t, idx) => (
              <blockquote
                key={idx}
                className="flex w-[min(440px,88vw)] shrink-0 snap-start flex-col border-l-2 border-gold bg-[#14130d] py-9 pl-8 pr-7"
              >
                <h3 className="mb-6 font-display text-[1.6rem] leading-[1.15] tracking-[0.01em] text-gold-light sm:text-[1.85rem]">
                  &ldquo;{t.title}&rdquo;
                </h3>
                <div className="mb-8 flex-1 space-y-5 text-[0.92rem] font-light italic leading-[1.8] opacity-80">
                  {t.paragraphs.map((para, i) => (
                    <p key={i}>{para.map(renderSegment)}</p>
                  ))}
                </div>
                <footer className="not-italic">
                  <span className="block text-[0.95rem] font-medium">{t.author}</span>
                  <span className="mt-[3px] block text-[0.8rem] tracking-[0.05em] opacity-55">
                    {t.role}
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
