import FadeIn from './FadeIn';
import {brands} from '@/lib/data';

export default function Credits() {
	// Duplicate brands for seamless infinite loop
	const loop = [...brands, ...brands];

	return (
		<section id="brands" className="px-6 sm:px-12 py-24 bg-mid">
			<FadeIn as="p" className="text-[0.68rem] tracking-[0.22em] uppercase text-gold mb-3 flex items-center gap-3">
				<span className="block w-7 h-px bg-gold"/>
				Who I do it for
			</FadeIn>
			<FadeIn as="h2" className="font-display text-[clamp(2.2rem,5vw,3.8rem)] tracking-[0.04em] leading-none mb-2">
				Trusted by
				<br/>
				the world&apos;s biggest brands
			</FadeIn>
			<FadeIn as="p" className="mt-8 text-base opacity-70 max-w-[540px] leading-[1.8]">
				From esports arenas to corporate stages, I&apos;ve had the privilege of representing some of
				the most recognisable brands in the world.
			</FadeIn>

			<FadeIn className="mt-10 overflow-hidden carousel-mask relative">
				<div className="flex gap-0 w-max animate-scroll-brands">
					{loop.map((b, i) => (
						<div
							key={`${b.name}-${i}`}
							className="carousel-item flex items-center justify-center w-40 h-20 flex-shrink-0 px-6 border-r border-gold-faint"
						>
							<img
								src={`/images/brands/${b.file}`}
								alt={b.name}
								className="brand-img max-w-[100px] max-h-10 object-contain"
							/>
						</div>
					))}
				</div>
			</FadeIn>
		</section>
	);
}
