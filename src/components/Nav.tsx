const links = [
  { href: '#services', label: 'What I do' },
  { href: '#brands', label: 'Brands' },
  { href: '#clips', label: 'Clips' },
  { href: '#testimonial', label: 'Testimonial' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-6 sm:px-12 py-5 bg-black/90 backdrop-blur-md border-b border-gold-faint">
      <div className="font-display text-[1.4rem] tracking-[0.12em] text-gold">
        Elliot Barham
      </div>
      <ul className="hidden sm:flex gap-8 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-[0.78rem] tracking-[0.1em] uppercase text-white opacity-70 hover:opacity-100 hover:text-gold transition"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
