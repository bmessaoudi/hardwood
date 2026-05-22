import { MOBILITY } from '../data/mobility';
import { VideoLink } from '../components/VideoLink';

export function MobilityTab() {
  return (
    <div className="space-y-6">
      <header>
        <div className="label">Mobilità</div>
        <h1 className="font-display font-bold text-[28px] text-ink leading-[1.15] mt-1">
          10 minuti che valgono tutto il resto.
        </h1>
        <p className="font-body text-sm text-ink-muted mt-2">
          Routine completa in circa 10 minuti. Falla ogni giorno o quasi, soprattutto i giorni di campetto.
        </p>
      </header>

      <ul className="space-y-3">
        {MOBILITY.map((m, i) => (
          <li key={m.name} className="card px-4 py-4">
            <div className="flex items-start gap-3">
              <span className="label-wide text-ink-faint tabular-nums mt-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-[16px] text-ink leading-tight">
                  {m.name}
                </h3>
                <div className="font-body text-[12px] text-ink-faint mt-0.5">
                  {m.duration} · {m.area}
                </div>
                <p className="font-body text-[13px] text-ink-body mt-2 leading-snug">
                  {m.notes}
                </p>
                <div className="mt-2.5">
                  <VideoLink url={m.videoUrl} label={m.videoLabel} small />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="card-accent px-4 py-4">
        <p className="font-body text-[13px] text-ink-body leading-snug">
          Se devi sceglierne solo tre nelle giornate corte:{' '}
          <span className="text-ink font-medium">World’s Greatest Stretch</span>,{' '}
          <span className="text-ink font-medium">90/90 hip switch</span>,{' '}
          <span className="text-ink font-medium">ankle dorsiflexion</span>.
        </p>
      </div>
    </div>
  );
}
