import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-8 md:px-14 py-12 mt-10">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8">

        {/* left — name + tagline */}
        <div>
          <p className="font-bold text-white text-xl tracking-[-0.02em] mb-1">Vedansh Anand</p>
          <p className="text-white/25 text-xs tracking-[0.2em] uppercase">Developer · Founder · Builder</p>
        </div>

        {/* center — nav links */}
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            { label: 'Projects', href: '/projects' },
            { label: 'Activities', href: '/activities' },
            { label: 'Awards', href: '/awards' },
            { label: 'Contact', href: '/contact' },
          ].map(l => (
            <Link key={l.label} href={l.href}
              className="text-white/30 text-xs tracking-[0.15em] uppercase hover:text-white transition-colors duration-150">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* right — external links + copyright */}
        <div className="flex flex-col items-start md:items-end gap-3">
        <div className="flex gap-4 justify-center">
            <a href="https://linkedin.com/in/vedansh-anand-175600360" target="_blank" rel="noopener noreferrer"
              className="text-white/25 text-xs hover:text-white transition-colors">LinkedIn ↗</a>
            <a href="https://quantaify.org" target="_blank" rel="noopener noreferrer"
              className="text-white/25 text-xs hover:text-white transition-colors">Quantaify ↗</a>
            <a href="https://amria.org" target="_blank" rel="noopener noreferrer"
              className="text-white/25 text-xs hover:text-white transition-colors">Amria ↗</a>
          </div>
          <span className="text-white/10 text-[10px] tracking-[0.25em] uppercase">
            © {new Date().getFullYear()} · Sammamish, WA
          </span>

      </div>
    </footer>
  );
}
