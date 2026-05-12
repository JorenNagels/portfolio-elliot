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
		<section id="testimonial" className="px-6 sm:px-12 py-24" style={{background: '#0d0c08'}}>
			<FadeIn as="p" className="text-[0.68rem] tracking-[0.22em] uppercase text-gold mb-3 flex items-center gap-3">
				<span className="block w-7 h-px bg-gold"/>
				What people have to say
			</FadeIn>
			<FadeIn as="h2" className="font-display text-[clamp(2.2rem,5vw,3.8rem)] tracking-[0.04em] leading-none mb-12">
				The &quot;it&quot; factor
				<br/>
				that can&apos;t be taught
			</FadeIn>

			<FadeIn className="-mx-6 sm:-mx-12 mt-12">
				<div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide pl-6 sm:pl-12 pr-6 sm:pr-12 scroll-pl-6 sm:scroll-pl-12 pb-4">
					<div className="flex items-stretch gap-6">
						{testimonials.map((t, idx) => (
							<blockquote
								key={idx}
								className="snap-start shrink-0 w-[min(440px,88vw)] flex flex-col bg-[#14130d] border-l-2 border-gold pl-8 pr-7 py-9"
							>
								<div
									className="font-display text-[5rem] text-gold/25 leading-[0.7] mb-3"
									aria-hidden="true"
								>
									&ldquo;
								</div>
								<div className="text-[0.95rem] leading-[1.8] opacity-85 font-light italic mb-8 space-y-6 flex-1">
									{t.paragraphs.map((para, i) => (
										<p key={i}>{para.map(renderSegment)}</p>
									))}
								</div>
								<footer className="not-italic">
									<span className="block text-[0.95rem] font-medium">{t.author}</span>
									<span className="block text-[0.8rem] opacity-55 tracking-[0.05em] mt-[3px]">
										{t.role}
									</span>
								</footer>
							</blockquote>
						))}
					</div>
				</div>
				<p className="mt-6 px-6 sm:px-12 text-[0.68rem] tracking-[0.22em] uppercase text-gold/60 flex items-center gap-2">
					Swipe <span className="nudge-right inline-block">→</span>
				</p>
			</FadeIn>
		</section>
	);
}