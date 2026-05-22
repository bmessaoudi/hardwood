import { Plus, Flame } from 'lucide-react';
import type { Phase, Session } from '../lib/types';
import { PHASES } from '../data/phases';
import { PhaseCard, PhasePill } from '../components/PhaseCard';
import { StatsRow } from '../components/StatsRow';
import { SessionList } from '../components/SessionList';
import { calcStreak, weeklyCount, todayISO } from '../lib/streak';

interface Props {
  sessions: Session[];
  phase: Phase;
  onChangePhase: (p: Phase) => void;
  onOpenSessionModal: () => void;
  onGoToHistory: () => void;
}

const PHASE_ACCENT: Record<'rust' | 'tan' | 'moss', string> = {
  rust: '#c4654d',
  tan: '#a8895f',
  moss: '#5d7a5a',
};

export function TodayTab({
  sessions,
  phase,
  onChangePhase,
  onOpenSessionModal,
  onGoToHistory,
}: Props) {
  const phaseInfo = PHASES.find((p) => p.id === phase)!;
  const streak = calcStreak(sessions);
  const weekCount = weeklyCount(sessions);
  const lastThree = [...sessions]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 3);

  const todayLabel = new Date().toLocaleDateString('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const todayDay = new Date().toLocaleDateString('it-IT', {
    weekday: 'short',
  });

  const todaySlot = phaseInfo.weeklyTemplate.find((s) =>
    s.day.toLowerCase().startsWith(todayDay.toLowerCase().slice(0, 3))
  );

  const alreadyLoggedToday = sessions.some((s) => s.date === todayISO());

  return (
    <div className="space-y-6">
      <header>
        <div className="label">{todayLabel}</div>
        <h1 className="font-display font-bold text-[32px] text-ink leading-[1.1] mt-1">
          Bentornato in palestra.
        </h1>
        <p className="font-body text-sm text-ink-muted mt-1.5">
          Diario di allenamento. Niente fronzoli.
        </p>
      </header>

      <section>
        <div className="label mb-2">Fase corrente</div>
        <div className="flex gap-2">
          {PHASES.map((p) => (
            <PhasePill
              key={p.id}
              phase={p}
              active={p.id === phase}
              onClick={() => onChangePhase(p.id)}
            />
          ))}
        </div>
      </section>

      <PhaseCard phase={phaseInfo} />

      <StatsRow streak={streak} weekCount={weekCount} totalSessions={sessions.length} />

      <section>
        <button
          onClick={onOpenSessionModal}
          className="w-full bg-rust hover:bg-[#b35742] transition-colors text-page font-body font-medium px-5 py-4 rounded-card flex items-center justify-center gap-2 text-[15px]"
        >
          <Plus size={18} strokeWidth={2} />
          Registra sessione di oggi
        </button>
        {alreadyLoggedToday && (
          <div className="flex items-center justify-center gap-1.5 mt-2.5 font-body text-xs text-moss">
            <Flame size={13} strokeWidth={1.8} />
            Sessione di oggi già registrata. Continua così.
          </div>
        )}
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="font-display font-semibold text-lg text-ink">
            Programma settimanale
          </h3>
          <div className="label">Fase {phaseInfo.number}</div>
        </div>
        <ul className="card divide-y divide-border-soft">
          {phaseInfo.weeklyTemplate.map((slot) => {
            const isToday = slot.day
              .toLowerCase()
              .startsWith(todayDay.toLowerCase().slice(0, 3));
            return (
              <li
                key={slot.day}
                className={`flex items-center gap-3 px-4 py-3 ${
                  isToday ? 'bg-card-accent' : ''
                }`}
              >
                <div
                  className="w-9 label-wide"
                  style={{
                    color: isToday ? PHASE_ACCENT[phaseInfo.color] : undefined,
                  }}
                >
                  {slot.day}
                </div>
                <div
                  className={`font-body text-[14px] flex-1 ${
                    isToday ? 'text-ink font-medium' : 'text-ink-body'
                  }`}
                >
                  {slot.activity}
                </div>
                {isToday && (
                  <span
                    className="label-wide"
                    style={{ color: PHASE_ACCENT[phaseInfo.color] }}
                  >
                    oggi
                  </span>
                )}
              </li>
            );
          })}
        </ul>
        {todaySlot && (
          <div className="mt-2 font-body text-xs text-ink-muted">
            Suggerimento di oggi:{' '}
            <span className="text-ink font-medium">{todaySlot.activity}</span>.
          </div>
        )}
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="font-display font-semibold text-lg text-ink">
            Ultime sessioni
          </h3>
          <button
            onClick={onGoToHistory}
            className="font-body text-xs text-link underline underline-offset-2"
          >
            Vedi tutte
          </button>
        </div>
        <SessionList sessions={lastThree} empty="Nessuna sessione ancora. La prima è la più difficile." />
      </section>
    </div>
  );
}
