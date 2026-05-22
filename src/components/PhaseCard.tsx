import type { PhaseInfo } from '../data/phases';

const ACCENT: Record<PhaseInfo['color'], string> = {
  rust: '#c4654d',
  tan: '#a8895f',
  moss: '#5d7a5a',
};

interface Props {
  phase: PhaseInfo;
  compact?: boolean;
}

export function PhaseCard({ phase, compact }: Props) {
  return (
    <article
      className="card relative pl-5 pr-5 py-5"
      style={{ borderLeft: `4px solid ${ACCENT[phase.color]}` }}
    >
      <div className="label mb-2">{phase.weeks} · Fase {phase.number}</div>
      <h2 className="font-display font-bold text-2xl leading-tight mb-1">
        {phase.title}
      </h2>
      <p className="font-body text-sm text-ink-muted mb-3">{phase.subtitle}</p>

      {!compact && (
        <>
          <p className="font-body text-[15px] text-ink-body mb-4 leading-snug">
            {phase.goal}
          </p>
          <ul className="space-y-2 mb-4">
            {phase.focus.map((f) => (
              <li key={f} className="flex gap-2 text-[14px] text-ink-body leading-snug">
                <span
                  className="mt-2 w-1 h-1 rounded-full shrink-0"
                  style={{ background: ACCENT[phase.color] }}
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}

export function PhasePill({
  phase,
  active,
  onClick,
}: {
  phase: PhaseInfo;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`flex-1 px-2.5 py-2 rounded-card border transition-colors text-left ${
        active
          ? 'bg-ink text-page border-ink'
          : 'bg-card text-ink-muted border-border hover:bg-card-accent'
      }`}
    >
      <div
        className={`label-wide ${active ? 'text-page/70' : ''}`}
        style={!active ? { color: ACCENT[phase.color] } : undefined}
      >
        Fase {phase.number}
      </div>
      <div className="font-display font-semibold text-[15px] leading-tight mt-0.5">
        {phase.title}
      </div>
    </button>
  );
}
