import { useState } from 'react';
import { Info } from 'lucide-react';
import { WORKOUTS } from '../data/workouts';
import { VideoLink } from '../components/VideoLink';

export function GymTab() {
  const [active, setActive] = useState<'A' | 'B'>('A');
  const workout = WORKOUTS.find((w) => w.id === active)!;

  return (
    <div className="space-y-6">
      <header>
        <div className="label">Palestra</div>
        <h1 className="font-display font-bold text-[28px] text-ink leading-[1.15] mt-1">
          Due workout, alternati.
        </h1>
        <p className="font-body text-sm text-ink-muted mt-2">
          Spinta lunedì, tirata giovedì. Ogni esercizio ha la sua tecnica — guardare il video la prima volta non è opzionale.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-2">
        {WORKOUTS.map((w) => (
          <button
            key={w.id}
            onClick={() => setActive(w.id)}
            aria-pressed={active === w.id}
            className={`p-3.5 rounded-card border text-left transition-colors ${
              active === w.id
                ? 'bg-ink text-page border-ink'
                : 'bg-card text-ink-muted border-border hover:bg-card-accent'
            }`}
          >
            <div
              className={`font-display font-semibold text-base ${
                active === w.id ? 'text-page' : 'text-ink'
              }`}
            >
              {w.title}
            </div>
            <div className="text-[12px] mt-0.5 opacity-80">{w.subtitle}</div>
          </button>
        ))}
      </div>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display font-bold text-xl text-ink">
            {workout.title} — {workout.subtitle}
          </h2>
          <div className="label">{workout.duration}</div>
        </div>

        <ul className="space-y-3">
          {workout.exercises.map((ex, i) => (
            <li
              key={ex.name}
              className={`${ex.callout ? 'card-accent' : 'card'} px-4 py-4`}
              style={
                ex.callout
                  ? { borderLeft: '4px solid #c4654d' }
                  : undefined
              }
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="label-wide text-ink-faint tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display font-semibold text-[17px] text-ink leading-tight">
                      {ex.name}
                    </h3>
                  </div>
                  {ex.callout && (
                    <div className="mt-1 flex items-center gap-1.5 font-body text-[11px] uppercase tracking-label text-rust font-medium">
                      <Info size={12} strokeWidth={1.8} />
                      L’esercizio che probabilmente non conosci
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <div className="font-display font-bold text-ink tabular-nums text-lg leading-none">
                    {ex.sets}×{ex.reps}
                  </div>
                  <div className="label-wide mt-1">sets × reps</div>
                </div>
              </div>
              <p className="font-body text-[13px] text-ink-body mt-3 leading-snug">
                {ex.notes}
              </p>
              <div className="mt-2.5">
                <VideoLink url={ex.videoUrl} label={ex.videoLabel} small />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
