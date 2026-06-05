'use client';

import { useState } from 'react';
import Reveal from '@/components/Reveal';

const projects = [
  {
    name: 'Amria',
    url: 'amria.org',
    href: 'https://amria.org',
    year: '2024',
    description:
      'Processes CT scans into 3D diagnostic models at 92.35% accuracy using computer vision. Built at the Cascadia JS AI Hackathon — Top 10 out of 300+ attendees.',
    tech: ['Python', 'Computer Vision', '3D Modeling', 'AI/ML'],
  },
  {
    name: 'Quantaify',
    url: 'quantaify.org',
    href: 'https://quantaify.org',
    year: '2024',
    description:
      'Full-stack paper trading platform with real market data, portfolio tracking, and a live leaderboard. Built both the web app and iOS app. Currently ranked 7th on my own platform.',
    tech: ['Next.js', 'Supabase', 'SwiftUI', 'Finnhub API'],
  },
  {
    name: 'Incredibots',
    url: 'FTC Team #26336',
    href: null,
    year: '2025',
    description:
      'Lead programmer for FIRST Tech Challenge Team #26336, DECODE™ season. Built an autonomous vision pipeline using Limelight 3A and Pedro Pathing for smooth Bézier-curve path following.',
    tech: ['Java', 'OpenCV', 'Pedro Pathing', 'Limelight 3A'],
  },
  {
    name: 'Nova',
    url: 'In progress',
    href: null,
    year: '2025',
    description: 'Currently in development. More details coming soon.',
    tech: [],
  },
];

export default function ProjectsPage() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="px-8 md:px-14 pt-36 pb-28">
      <Reveal>
        <p className="text-white/20 text-[10px] uppercase tracking-[0.4em] mb-16">Selected work</p>
      </Reveal>

      <div className="border-t border-white/8">
        {projects.map((p, i) => {
          const isOpen = open === p.name;
          return (
            <Reveal key={p.name} delay={i * 60}>
              <div className="border-b border-white/8">
                <button
                  onClick={() => setOpen(isOpen ? null : p.name)}
                  className="w-full flex items-center justify-between py-7 group text-left"
                >
                  <div className="flex items-baseline gap-5">
                    <span className="text-white/15 text-sm tabular-nums w-6 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="font-bold text-white tracking-[-0.02em] transition-colors duration-150 group-hover:text-white/70"
                      style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
                    >
                      {p.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 shrink-0 ml-6">
                    <span className="text-white/25 text-xs tracking-widest hidden sm:block">{p.year}</span>
                    <span
                      className="text-white/40 text-xl transition-transform duration-300 inline-block"
                      style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    >
                      +
                    </span>
                  </div>
                </button>

                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{ maxHeight: isOpen ? '400px' : '0px', opacity: isOpen ? 1 : 0 }}
                >
                  <div className="pb-8 pl-11 flex flex-col md:flex-row gap-8 md:gap-16">
                    <div className="flex-1">
                      <p className="text-white/55 text-base leading-relaxed mb-5 max-w-xl">
                        {p.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {p.tech.map(t => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-full border border-white/[0.08] text-white/30 text-[11px]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    {p.href && (
                      <div className="shrink-0 self-end md:self-start">
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors duration-150"
                        >
                          {p.url} ↗
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
