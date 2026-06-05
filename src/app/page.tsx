'use client';

import Link from 'next/link';
import Reveal from '@/components/Reveal';
import ScrollText from '@/components/ScrollText';
import dynamic from 'next/dynamic';
import GradualBlur from '@/components/GradualBlur';
const Aurora = dynamic(() => import('@/components/Aurora'), { ssr: false });

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7))', pointerEvents: 'none' }} />

        <div className="relative text-center px-6">
          <p className="text-[11px] uppercase tracking-[0.45em] text-white/35 mb-8"
            style={{ animation: 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}>
            10th grade · Sammamish, WA
          </p>
          <h1 className="font-bold text-white leading-[0.88] tracking-[-0.04em] mb-8"
            style={{ fontSize: 'clamp(4.5rem, 13vw, 10.5rem)', animation: 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
            Vedansh<br />Anand
          </h1>
          <p className="text-white/45 text-base mb-10"
            style={{ animation: 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s both' }}>
            Developer · Founder · Builder
          </p>
          <div className="flex gap-3 justify-center"
            style={{ animation: 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both' }}>
            <a href="#work" className="px-7 py-2.5 bg-white text-black font-semibold rounded-full text-xs tracking-[0.12em] uppercase hover:bg-white/90 transition-colors">
              Work
            </a>
            <a href="#contact" className="px-7 py-2.5 border border-white/20 text-white/70 font-semibold rounded-full text-xs tracking-[0.12em] uppercase hover:border-white/50 hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 text-[9px] tracking-[0.4em] uppercase">
          <span>Scroll</span>
          <span className="animate-bounce">↓</span>
        </div>
      </section>

      {/* ── SCROLL TEXT ── */}
      <section className="px-8 md:px-14 py-32 md:py-48 flex justify-center">
        <div className="max-w-3xl w-full">
          <ScrollText
            text="Add your description here."
            fontSize="45px"
            centered
          />
        </div>
      </section>

      {/* ── ABOUT / SCHOOL ── */}
      <section className="border-t border-white/8 px-8 md:px-14 py-24">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20 items-center">

          {/* photo */}
          <Reveal className="shrink-0">
            <div className="w-72 md:w-96 aspect-[3/4] rounded-2xl overflow-hidden bg-white/5 border border-white/8 flex items-center justify-center text-white/15 text-xs tracking-widest uppercase">
              {/* Replace with: <img src="/me.jpg" alt="Vedansh Anand" className="w-full h-full object-cover" /> */}
              Your photo
            </div>
          </Reveal>

          {/* school copy */}
          <Reveal delay={80} className="flex-1">
            <p className="text-white/20 text-[10px] uppercase tracking-[0.4em] mb-5">School</p>
            <h3 className="font-bold text-white text-3xl md:text-4xl tracking-[-0.02em] leading-tight mb-5">
              Eastside Catholic<br />High School
            </h3>
            <p className="text-white/50 text-lg leading-relaxed mb-7">
              Add a few sentences about your school experience here — clubs, classes, community, what it means to you.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-white/25 text-sm">
              <span>Sammamish, WA</span>
              <span className="text-white/10">·</span>
              <span>10th Grade</span>
              <span className="text-white/10">·</span>
              <span>National Honor Society</span>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── MARQUEE SECTION ── */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center">
        {/* top color fade — blends section above into Aurora */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '10rem', background: 'linear-gradient(to bottom, black, transparent)', zIndex: 11, pointerEvents: 'none' }} />
        {/* Aurora background */}
        <div className="absolute inset-0">
          <Aurora
            colorStops={['#B497CF', '#6644aa', '#3a2060']}
            amplitude={1.4}
            blend={0.7}
            speed={0.6}
          />
        </div>
        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        <GradualBlur position="top" height="8rem" strength={3} divCount={6} curve="bezier" exponential opacity={1} zIndex={10} />
        <GradualBlur position="bottom" height="8rem" strength={3} divCount={6} curve="bezier" exponential opacity={1} zIndex={10} />

        {/* stacked marquee rows */}
        <div className="relative w-full overflow-hidden space-y-6 select-none">
          {[
            { words: ['Drive', 'Vision', 'Build', 'Ship', 'Create', 'Drive', 'Vision', 'Build', 'Ship', 'Create'], dir: 1 },
            { words: ['Code', 'Innovate', 'Execute', 'Lead', 'Focus', 'Code', 'Innovate', 'Execute', 'Lead', 'Focus'], dir: -1 },
            { words: ['Robotics', 'AI', 'Fintech', 'Startups', 'Impact', 'Robotics', 'AI', 'Fintech', 'Startups', 'Impact'], dir: 1 },
            { words: ['Relentless', 'Curious', 'Hungry', 'Focused', 'Bold', 'Relentless', 'Curious', 'Hungry', 'Focused', 'Bold'], dir: -1 },
          ].map((row, ri) => (
            <div key={ri} className="flex whitespace-nowrap" style={{
              animation: `marquee${row.dir > 0 ? 'Fwd' : 'Rev'} ${18 + ri * 4}s linear infinite`,
            }}>
              {[...row.words, ...row.words, ...row.words].map((word, wi) => (
                <span key={wi} className="inline-flex items-center gap-4 px-6">
                  <span className="font-bold text-white/80 uppercase tracking-[0.1em]"
                    style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                    {word}
                  </span>
                  <span className="text-white/20 text-2xl">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes marqueeFwd {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes marqueeRev {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      {/* ── WORK OVERVIEW ── */}
      <section id="work" className="border-t border-white/8 px-8 md:px-14 py-20">
        <Reveal>
          <div className="flex items-center justify-between mb-10">
            <p className="text-white/20 text-[10px] uppercase tracking-[0.4em]">Work</p>
            <Link href="/projects" className="text-white/25 text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors">
              All projects ↗
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/6 rounded-2xl overflow-hidden">
          {[
            { name: 'Amria', tag: 'AI · Medical', year: '2024', href: 'https://amria.org' },
            { name: 'Quantaify', tag: 'Fintech · iOS', year: '2024', href: 'https://quantaify.org' },
            { name: 'Incredibots', tag: 'Robotics · FTC', year: '2025', href: null },
            { name: 'Nova', tag: 'In progress', year: '2025', href: null },
          ].map((p, i) => (
            <Reveal key={p.name} delay={i * 50}>
              <div className="bg-black px-7 py-8 h-full flex flex-col justify-between gap-6 hover:bg-white/[0.03] transition-colors group">
                <div>
                  <p className="text-white font-semibold text-xl mb-1.5">{p.name}</p>
                  <p className="text-white/30 text-xs tracking-wide">{p.tag}</p>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-white/15 text-xs">{p.year}</span>
                  {p.href && (
                    <a href={p.href} target="_blank" rel="noopener noreferrer"
                      className="text-white/20 text-xs hover:text-white transition-colors">↗</a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>


      {/* ── CONTACT ── */}
      <section id="contact" className="border-t border-white/8 px-8 md:px-14 py-20 pb-32">
        <Reveal>
          <h2 className="font-bold text-white leading-[0.88] tracking-[-0.04em] mb-10"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}>
            Let&apos;s build<br />something.
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="flex flex-wrap gap-3">
            {[
              { l: 'LinkedIn ↗', h: 'https://linkedin.com/in/vedansh-anand-175600360' },
              { l: 'Quantaify ↗', h: 'https://quantaify.org' },
              { l: 'Amria ↗', h: 'https://amria.org' },
            ].map(link => (
              <a key={link.l} href={link.h} target="_blank" rel="noopener noreferrer"
                className="px-6 py-2.5 border border-white/15 rounded-full text-white/50 text-sm hover:border-white/40 hover:text-white transition-all duration-150">
                {link.l}
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px) scale(0.99); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
