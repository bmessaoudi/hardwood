import { X, Dumbbell, Footprints, Target, StretchHorizontal, MoonStar } from 'lucide-react';
import type { Session, SessionType } from '../lib/types';
import { SESSION_TYPE_META } from '../lib/types';
import { formatDateIT } from '../lib/streak';

const ICONS: Record<SessionType, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  gym: Dumbbell,
  cardio: Footprints,
  court: Target,
  mobility: StretchHorizontal,
  rest: MoonStar,
};

const ACCENT: Record<SessionType, string> = {
  gym: '#c4654d',
  cardio: '#a8895f',
  court: '#8a4a2a',
  mobility: '#5d7a5a',
  rest: '#8a7a5e',
};

interface Props {
  sessions: Session[];
  onDelete?: (id: number) => void;
  detailed?: boolean;
  empty?: React.ReactNode;
}

export function SessionList({ sessions, onDelete, detailed, empty }: Props) {
  if (sessions.length === 0) {
    return (
      <div className="card px-5 py-8 text-center">
        <p className="font-body text-sm text-ink-muted">
          {empty ?? 'Nessuna sessione ancora. Inizia oggi.'}
        </p>
      </div>
    );
  }
  return (
    <ul className="space-y-2">
      {sessions.map((s) => (
        <SessionRow
          key={s.id}
          session={s}
          onDelete={onDelete}
          detailed={detailed}
        />
      ))}
    </ul>
  );
}

function SessionRow({
  session,
  onDelete,
  detailed,
}: {
  session: Session;
  onDelete?: (id: number) => void;
  detailed?: boolean;
}) {
  const Icon = ICONS[session.type];
  const meta = SESSION_TYPE_META[session.type];

  return (
    <li
      className="card px-4 py-3 flex gap-3 items-start"
      style={{ borderLeft: `3px solid ${ACCENT[session.type]}` }}
    >
      <div
        className="shrink-0 w-9 h-9 rounded-card flex items-center justify-center"
        style={{ background: '#f0e4cc', color: ACCENT[session.type] }}
        aria-hidden
      >
        <Icon size={17} strokeWidth={1.6} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <div className="font-display font-semibold text-[15px] text-ink truncate">
            {meta.label}
            {session.type === 'gym' && session.gymWorkout
              ? ` — Workout ${session.gymWorkout}`
              : ''}
          </div>
          <div className="label whitespace-nowrap">
            {formatDateIT(session.date)}
          </div>
        </div>

        {detailed ? (
          <DetailBody session={session} />
        ) : (
          <ShortSummary session={session} />
        )}
      </div>

      {onDelete && (
        <button
          onClick={() => onDelete(session.id)}
          aria-label="Elimina sessione"
          className="shrink-0 -mr-1 -mt-1 p-1.5 text-ink-faint hover:text-rust transition-colors"
        >
          <X size={15} strokeWidth={1.6} />
        </button>
      )}
    </li>
  );
}

function ShortSummary({ session }: { session: Session }) {
  switch (session.type) {
    case 'gym':
      return (
        <div className="font-body text-xs text-ink-muted mt-0.5">
          {Object.keys(session.gymExercises ?? {}).length} esercizi
          {session.notes ? ` · ${truncate(session.notes, 50)}` : ''}
        </div>
      );
    case 'cardio':
      return (
        <div className="font-body text-xs text-ink-muted mt-0.5">
          {session.cardioDuration ? `${session.cardioDuration} min` : 'corsa Z2'}
          {session.cardioAvgHR ? ` · ${session.cardioAvgHR} bpm` : ''}
          {session.cardioPerceivedEffort ? ` · sforzo ${session.cardioPerceivedEffort}/10` : ''}
        </div>
      );
    case 'court':
      return (
        <div className="font-body text-xs text-ink-muted mt-0.5">
          {session.courtDuration ? `${session.courtDuration} min` : 'campetto'}
          {session.courtFocus?.length
            ? ` · ${session.courtFocus.slice(0, 2).join(', ')}${
                session.courtFocus.length > 2 ? '…' : ''
              }`
            : ''}
        </div>
      );
    case 'mobility':
      return (
        <div className="font-body text-xs text-ink-muted mt-0.5">
          {(session.mobilityCompleted ?? []).length} esercizi
        </div>
      );
    case 'rest':
      return session.notes ? (
        <div className="font-body text-xs text-ink-muted mt-0.5">
          {truncate(session.notes, 70)}
        </div>
      ) : null;
  }
}

function DetailBody({ session }: { session: Session }) {
  return (
    <div className="mt-2 space-y-1.5">
      {session.type === 'gym' && session.gymExercises && (
        <ul className="space-y-1">
          {Object.entries(session.gymExercises).map(([name, value]) => (
            <li
              key={name}
              className="font-body text-[13px] text-ink-body flex justify-between gap-3"
            >
              <span className="text-ink-muted">{name}</span>
              <span className="text-ink font-medium tabular-nums">{value}</span>
            </li>
          ))}
        </ul>
      )}
      {session.type === 'cardio' && (
        <dl className="grid grid-cols-3 gap-3 text-[13px]">
          {session.cardioDuration && (
            <DT label="Durata" value={`${session.cardioDuration} min`} />
          )}
          {session.cardioAvgHR && (
            <DT label="FC media" value={`${session.cardioAvgHR} bpm`} />
          )}
          {session.cardioPerceivedEffort && (
            <DT label="Sforzo" value={`${session.cardioPerceivedEffort}/10`} />
          )}
        </dl>
      )}
      {session.type === 'court' && (
        <div className="space-y-1.5">
          {session.courtDuration && (
            <div className="font-body text-[13px] text-ink-body">
              <span className="text-ink-muted">Durata</span>{' '}
              <span className="text-ink font-medium">{session.courtDuration} min</span>
            </div>
          )}
          {session.courtFocus?.length ? (
            <div className="flex flex-wrap gap-1.5">
              {session.courtFocus.map((f) => (
                <span key={f} className="pill text-[11px] py-1 px-2">
                  {f}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      )}
      {session.type === 'mobility' && session.mobilityCompleted?.length ? (
        <ul className="text-[13px] text-ink-body space-y-0.5">
          {session.mobilityCompleted.map((m) => (
            <li key={m} className="text-ink-muted">
              · {m}
            </li>
          ))}
        </ul>
      ) : null}
      {session.notes && (
        <div className="font-body text-[13px] text-ink-body italic border-l-2 border-border pl-3 mt-2">
          {session.notes}
        </div>
      )}
    </div>
  );
}

function DT({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label">{label}</dt>
      <dd className="font-display text-ink text-base mt-0.5">{value}</dd>
    </div>
  );
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n).trimEnd() + '…' : s;
}
