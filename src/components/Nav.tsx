const links = [
  { href: '#services', label: 'What I do' },
  { href: '#brands', label: 'Brands' },
  { href: '#clips', label: 'Clips' },
  { href: '#testimonial', label: 'Testimonial' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-[100] flex items-center justify-between border-b border-gold-faint bg-black/90 px-6 py-5 backdrop-blur-md sm:px-12">
      <div className="font-display text-[1.4rem] tracking-[0.12em] text-gold">Elliot Barham</div>
      <ul className="hidden list-none gap-8 sm:flex">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-[0.78rem] uppercase tracking-[0.1em] text-white opacity-70 transition hover:text-gold hover:opacity-100"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
