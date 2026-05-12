import FadeIn from './FadeIn';
import { services } from '@/lib/data';

export default function Services() {
  return (
    <section id="services" className="px-6 sm:px-12 py-24">
      <FadeIn as="p" className="text-[0.68rem] tracking-[0.22em] uppercase text-gold mb-3 flex items-center gap-3">
        <span className="block w-7 h-px bg-gold" />
        What I do
      </FadeIn>
      <FadeIn as="h2" className="font-display text-[clamp(2.2rem,5vw,3.8rem)] tracking-[0.04em] leading-none mb-2">
        “This man kills it
        <br />
        with audience interaction!”
      </FadeIn>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-px mt-12 border border-gold-faint">
        {services.map((s) => (
          <FadeIn
            key={s.num}
            className="group relative overflow-hidden bg-mid p-10 hover:bg-[#1f1e17] transition-colors"
          >
            <span className="absolute top-0 left-0 right-0 h-[2px] bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            <div className="font-display text-5xl leading-none mb-4 text-gold/15">{s.num}</div>
            <p className="text-base font-medium mb-2">{s.title}</p>
            <p className="text-[0.88rem] opacity-60 leading-[1.7]">{s.desc}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
