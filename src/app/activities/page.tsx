import Reveal from '@/components/Reveal';

const activities = [
  { name: 'Incredibots FTC', sub: 'Lead Programmer & CAD · Team #26336' },
  { name: 'DECA', sub: 'Member · Eastside Catholic' },
  { name: 'Investing Club', sub: 'Member · Equity research' },
  { name: 'National Honor Society', sub: 'Crusader Chapter · inducted 2025' },
  { name: 'JV Tennis', sub: 'Player · Eastside Catholic' },
  { name: 'Cybersecurity', sub: 'Mentee · under Mark Myers' },
];

export default function ActivitiesPage() {
  return (
    <div className="px-8 md:px-14 pt-36 pb-28">
      <Reveal>
        <p className="text-white/20 text-[10px] uppercase tracking-[0.4em] mb-16">Activities</p>
      </Reveal>

      <div className="border-t border-white/8">
        {activities.map((a, i) => (
          <Reveal key={a.name} delay={i * 50}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6 border-b border-white/8">
              <p className="text-white font-medium text-xl">{a.name}</p>
              <p className="text-white/30 text-sm mt-1 sm:mt-0">{a.sub}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
