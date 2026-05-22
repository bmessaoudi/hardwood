import { useEffect, useState } from 'react';
import { X, Dumbbell, Footprints, Target, StretchHorizontal, MoonStar } from 'lucide-react';
import type { Session, SessionType } from '../lib/types';
import { WORKOUTS } from '../data/workouts';
import { MOBILITY } from '../data/mobility';
import { COURT_FOCUS_OPTIONS } from '../data/basketball';
import { todayISO } from '../lib/streak';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (session: Session) => void;
}

const TYPE_OPTIONS: { id: SessionType; label: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number }> }[] = [
  { id: 'gym', label: 'Palestra', icon: Dumbbell },
  { id: 'cardio', label: 'Corsa Z2', icon: Footprints },
  { id: 'court', label: 'Campetto', icon: Target },
  { id: 'mobility', label: 'Mobilità', icon: StretchHorizontal },
  { id: 'rest', label: 'Riposo', icon: MoonStar },
];

const PLACEHOLDERS: Record<SessionType, string> = {
  gym: 'Come ti sei sentito? Sonno, energia, qualche dolore?',
  cardio: 'Percorso, condizioni, sensazioni di gambe…',
  court: 'Cosa ti è uscito bene? Cosa ha fatto schifo?',
  mobility: 'Aree più rigide, sensazioni…',
  rest: 'Sonno, stanchezza, come ti senti oggi.',
};

export function SessionModal({ open, onClose, onSave }: Props) {
  const [type, setType] = useState<SessionType>('gym');
  const [date, setDate] = useState(todayISO());
  const [notes, setNotes] = useState('');

  // gym
  const [gymWorkout, setGymWorkout] = useState<'A' | 'B'>('A');
  const [gymExercises, setGymExercises] = useState<Record<string, string>>({});

  // cardio
  const [cardioDuration, setCardioDuration] = useState('');
  const [cardioAvgHR, setCardioAvgHR] = useState('');
  const [cardioEffort, setCardioEffort] = useState(5);

  // court
  const [courtDuration, setCourtDuration] = useState('');
  const [courtFocus, setCourtFocus] = useState<string[]>([]);

  // mobility
  const [mobilityCompleted, setMobilityCompleted] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setType('gym');
      setDate(todayISO());
      setNotes('');
      setGymWorkout('A');
      setGymExercises({});
      setCardioDuration('');
      setCardioAvgHR('');
      setCardioEffort(5);
      setCourtDuration('');
      setCourtFocus([]);
      setMobilityCompleted([]);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSave = () => {
    const id = Date.now();
    const base: Session = {
      id,
      timestamp: id,
      date,
      type,
      notes: notes.trim() || undefined,
    };

    let session: Session = base;
    if (type === 'gym') {
      session = {
        ...base,
        gymWorkout,
        gymExercises: Object.fromEntries(
          Object.entries(gymExercises).filter(([, v]) => v.trim().length > 0)
        ),
      };
    } else if (type === 'cardio') {
      session = {
        ...base,
        cardioDuration: cardioDuration.trim() || undefined,
        cardioAvgHR: cardioAvgHR.trim() || undefined,
        cardioPerceivedEffort: cardioEffort,
      };
    } else if (type === 'court') {
      session = {
        ...base,
        courtDuration: courtDuration.trim() || undefined,
        courtFocus: courtFocus.length ? courtFocus : undefined,
      };
    } else if (type === 'mobility') {
      session = {
        ...base,
        mobilityCompleted: mobilityCompleted.length ? mobilityCompleted : undefined,
      };
    }

    onSave(session);
  };

  const currentWorkout = WORKOUTS.find((w) => w.id === gymWorkout)!;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Registra sessione"
        className="relative w-full sm:max-w-page bg-page border-t sm:border border-border sm:rounded-card max-h-[92vh] flex flex-col animate-slide-up"
        style={{ animation: 'slideUp 220ms ease-out' }}
      >
        <header className="flex items-center justify-between px-5 py-4 border-b border-border-soft">
          <div>
            <div className="label">Nuova sessione</div>
            <h3 className="font-display font-bold text-xl text-ink leading-tight">
              Registra
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Chiudi"
            className="p-2 -mr-2 text-ink-muted hover:text-ink"
          >
            <X size={18} strokeWidth={1.6} />
          </button>
        </header>

        <div className="overflow-y-auto px-5 py-5 space-y-5">
          <div>
            <div className="label mb-2">Tipo di sessione</div>
            <div className="grid grid-cols-5 gap-2">
              {TYPE_OPTIONS.map((o) => {
                const Icon = o.icon;
                const active = type === o.id;
                return (
                  <button
                    key={o.id}
                    onClick={() => setType(o.id)}
                    aria-pressed={active}
                    className={`flex flex-col items-center gap-1 p-2.5 rounded-card border transition-colors ${
                      active
                        ? 'bg-ink text-page border-ink'
                        : 'bg-card text-ink-muted border-border hover:bg-card-accent'
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.6} />
                    <span className="text-[10px] font-medium tracking-wide">
                      {o.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="label block mb-1.5" htmlFor="sess-date">
              Data
            </label>
            <input
              id="sess-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-card border border-border rounded-card px-3 py-2.5 font-body text-sm text-ink"
            />
          </div>

          {type === 'gym' && (
            <div className="space-y-4">
              <div>
                <div className="label mb-2">Workout</div>
                <div className="grid grid-cols-2 gap-2">
                  {WORKOUTS.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => {
                        setGymWorkout(w.id);
                        setGymExercises({});
                      }}
                      aria-pressed={gymWorkout === w.id}
                      className={`p-3 rounded-card border text-left transition-colors ${
                        gymWorkout === w.id
                          ? 'bg-ink text-page border-ink'
                          : 'bg-card text-ink-muted border-border hover:bg-card-accent'
                      }`}
                    >
                      <div
                        className={`font-display font-semibold text-sm ${
                          gymWorkout === w.id ? 'text-page' : 'text-ink'
                        }`}
                      >
                        {w.title}
                      </div>
                      <div className="text-[11px] mt-0.5 opacity-80">{w.subtitle}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="label">Esercizi</div>
                {currentWorkout.exercises.map((ex) => (
                  <div key={ex.name}>
                    <label className="block font-body text-[13px] text-ink-body mb-1">
                      {ex.name}{' '}
                      <span className="text-ink-faint">
                        · {ex.sets}×{ex.reps}
                      </span>
                    </label>
                    <input
                      type="text"
                      inputMode="text"
                      value={gymExercises[ex.name] ?? ''}
                      onChange={(e) =>
                        setGymExercises((prev) => ({
                          ...prev,
                          [ex.name]: e.target.value,
                        }))
                      }
                      placeholder="es. 60kg × 3×8"
                      className="w-full bg-card border border-border rounded-card px-3 py-2 font-body text-sm text-ink tabular-nums"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {type === 'cardio' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label block mb-1.5" htmlFor="cardio-min">
                    Durata (min)
                  </label>
                  <input
                    id="cardio-min"
                    type="number"
                    inputMode="numeric"
                    value={cardioDuration}
                    onChange={(e) => setCardioDuration(e.target.value)}
                    placeholder="30"
                    className="w-full bg-card border border-border rounded-card px-3 py-2.5 font-body text-sm text-ink tabular-nums"
                  />
                </div>
                <div>
                  <label className="label block mb-1.5" htmlFor="cardio-hr">
                    FC media (bpm)
                  </label>
                  <input
                    id="cardio-hr"
                    type="number"
                    inputMode="numeric"
                    value={cardioAvgHR}
                    onChange={(e) => setCardioAvgHR(e.target.value)}
                    placeholder="125"
                    className="w-full bg-card border border-border rounded-card px-3 py-2.5 font-body text-sm text-ink tabular-nums"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label className="label" htmlFor="cardio-effort">
                    Sforzo percepito
                  </label>
                  <span className="font-display font-semibold text-ink tabular-nums">
                    {cardioEffort}/10
                  </span>
                </div>
                <input
                  id="cardio-effort"
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={cardioEffort}
                  onChange={(e) => setCardioEffort(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between mt-1">
                  <span className="label-wide">conversazione</span>
                  <span className="label-wide">limite</span>
                </div>
              </div>
            </div>
          )}

          {type === 'court' && (
            <div className="space-y-4">
              <div>
                <label className="label block mb-1.5" htmlFor="court-min">
                  Durata (min)
                </label>
                <input
                  id="court-min"
                  type="number"
                  inputMode="numeric"
                  value={courtDuration}
                  onChange={(e) => setCourtDuration(e.target.value)}
                  placeholder="45"
                  className="w-full bg-card border border-border rounded-card px-3 py-2.5 font-body text-sm text-ink tabular-nums"
                />
              </div>
              <div>
                <div className="label mb-2">Cosa hai lavorato</div>
                <div className="flex flex-wrap gap-1.5">
                  {COURT_FOCUS_OPTIONS.map((opt) => {
                    const active = courtFocus.includes(opt);
                    return (
                      <button
                        key={opt}
                        onClick={() =>
                          setCourtFocus((prev) =>
                            prev.includes(opt)
                              ? prev.filter((p) => p !== opt)
                              : [...prev, opt]
                          )
                        }
                        aria-pressed={active}
                        className={`pill ${active ? 'pill-active' : ''}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {type === 'mobility' && (
            <div>
              <div className="label mb-2">Esercizi completati</div>
              <ul className="space-y-1.5">
                {MOBILITY.map((m) => {
                  const checked = mobilityCompleted.includes(m.name);
                  return (
                    <li key={m.name}>
                      <label
                        className={`flex items-start gap-3 px-3 py-2.5 rounded-card border cursor-pointer transition-colors ${
                          checked
                            ? 'bg-card-accent border-border'
                            : 'bg-card border-border hover:bg-card-accent'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            setMobilityCompleted((prev) =>
                              prev.includes(m.name)
                                ? prev.filter((p) => p !== m.name)
                                : [...prev, m.name]
                            )
                          }
                          className="mt-1 accent-rust"
                        />
                        <div className="flex-1">
                          <div className="font-display font-semibold text-[14px] text-ink leading-tight">
                            {m.name}
                          </div>
                          <div className="font-body text-[12px] text-ink-faint">
                            {m.duration} · {m.area}
                          </div>
                        </div>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div>
            <label className="label block mb-1.5" htmlFor="notes">
              Note
            </label>
            <textarea
              id="notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={PLACEHOLDERS[type]}
              className="w-full bg-card border border-border rounded-card px-3 py-2.5 font-body text-sm text-ink resize-none"
            />
          </div>
        </div>

        <footer className="px-5 py-4 border-t border-border-soft flex gap-3 safe-bottom">
          <button onClick={onClose} className="btn-secondary flex-1">
            Annulla
          </button>
          <button onClick={handleSave} className="btn-primary flex-[2]">
            Salva sessione
          </button>
        </footer>
      </div>
    </div>
  );
}
