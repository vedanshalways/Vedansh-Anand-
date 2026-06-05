import Reveal from '@/components/Reveal';

const links = [
  { label: 'LinkedIn ↗', href: 'https://linkedin.com/in/vedansh-anand-175600360' },
  { label: 'Quantaify ↗', href: 'https://quantaify.org' },
  { label: 'Amria ↗', href: 'https://amria.org' },
];

export default function ContactPage() {
  return (
    <div className="px-8 md:px-14 pt-36 pb-28">
      <Reveal>
        <h1
          className="font-bold text-white leading-[0.88] tracking-[-0.04em] mb-14"
          style={{ fontSize: 'clamp(3.5rem, 11vw, 9rem)' }}
        >
          Let&apos;s build<br />something.
        </h1>
      </Reveal>

      <Reveal delay={100}>
        <p className="text-white/40 text-lg mb-14 max-w-md leading-relaxed">
          Open to projects, collabs, or a good conversation about tech and startups.
        </p>
      </Reveal>

      <Reveal delay={180}>
        <div className="flex flex-wrap gap-3">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 border border-white/15 rounded-full text-white/50 text-sm hover:border-white/40 hover:text-white transition-all duration-150"
            >
              {l.label}
            </a>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
