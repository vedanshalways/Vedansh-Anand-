import Reveal from '@/components/Reveal';

const honors = [
  { award: 'Most Valuable Player', issuer: 'JV Tennis', date: 'May 2026', desc: '2025–26 season' },
  { award: 'Village Builder Award', issuer: 'JV Tennis', date: 'May 2026', desc: 'Team community & culture' },
  { award: 'Varsity Letter of Community Service', issuer: 'Eastside Catholic', date: 'Jun 2025', desc: '100 verified hours' },
  { award: 'Scholar Athlete Award', issuer: 'JV Tennis', date: 'Apr 2025', desc: '2024–25 season' },
];

export default function AwardsPage() {
  return (
    <div className="px-8 md:px-14 pt-36 pb-28">
      <Reveal>
        <p className="text-white/20 text-[10px] uppercase tracking-[0.4em] mb-16">Recognition</p>
      </Reveal>

      <div className="border-t border-white/8">
        {honors.map((h, i) => (
          <Reveal key={h.award} delay={i * 60}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between py-8 border-b border-white/8 gap-3">
              <div>
                <p className="text-white font-semibold text-xl mb-1">{h.award}</p>
                <p className="text-white/30 text-sm">{h.issuer} · {h.desc}</p>
              </div>
              <span className="text-white/20 text-xs tracking-widest uppercase shrink-0 md:pt-1">{h.date}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
