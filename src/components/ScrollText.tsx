'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollText({
  text,
  fontSize = '2rem',
  centered = false,
}: {
  text: string;
  fontSize?: string;
  centered?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start = windowH * 0.8;
      const end = windowH * 0.1;
      const total = rect.height + (start - end);
      const scrolled = start - rect.top;
      setProgress(Math.min(1, Math.max(0, scrolled / total)));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const words = text.split(' ');
  const revealedCount = Math.floor(progress * words.length);

  return (
    <div
      ref={ref}
      style={{
        fontSize,
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        textAlign: centered ? 'center' : 'left',
      }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            color: i < revealedCount ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.08)',
            transition: 'color 0.5s ease',
            marginRight: '0.3em',
            display: 'inline',
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
