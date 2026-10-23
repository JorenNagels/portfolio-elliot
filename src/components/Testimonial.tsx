import FadeIn from './FadeIn';
import TestimonialCarousel from './TestimonialCarousel';
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
        as="h2"
        className="mb-12 font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-none tracking-[0.04em]"
      >
        The &quot;it&quot; factor
        <br />
        that can&apos;t be taught
      </FadeIn>

      <FadeIn className="-mx-6 mt-12 sm:-mx-12">
        <TestimonialCarousel>
          {testimonials.map((t, idx) => (
            <blockquote
              key={idx}
              className="flex w-[min(440px,82vw)] shrink-0 snap-start flex-col border-l-2 border-gold bg-[#14130d] py-8 pl-6 pr-5 sm:py-9 sm:pl-8 sm:pr-7"
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
        </TestimonialCarousel>
      </FadeIn>
    </section>
  );
}
