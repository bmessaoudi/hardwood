import { useState } from 'react';
import { ChevronDown, AlertTriangle } from 'lucide-react';
import { PHASES, MISTAKES_TO_AVOID } from '../data/phases';

const ACCENT = { rust: '#c4654d', tan: '#a8895f', moss: '#5d7a5a' };

export function PlanTab() {
  const [openId, setOpenId] = useState<string | null>('p1');

  return (
    <div className="space-y-6">
      <header>
        <div className="label">Il piano</div>
        <h1 className="font-display font-bold text-[28px] text-ink leading-[1.15] mt-1">
          8–10 settimane, 3 fasi.
        </h1>
        <p className="font-body text-sm text-ink-muted mt-2">
          La progressione conta più della velocità. Salta una fase e paghi più avanti.
        </p>
      </header>

      <section className="space-y-3">
        {PHASES.map((p) => {
          const open = openId === p.id;
          return (
            <article
              key={p.id}
              className="card"
              style={{ borderLeft: `4px solid ${ACCENT[p.color]}` }}
            >
              <button
                onClick={() => setOpenId(open ? null : p.id)}
                className="w-full text-left px-5 py-4 flex items-center gap-3"
                aria-expanded={open}
              >
                <div className="flex-1">
                  <div className="label" style={{ color: ACCENT[p.color] }}>
                    {p.weeks}
                  </div>
                  <div className="font-display font-bold text-xl text-ink leading-tight mt-0.5">
                    {p.title}
                  </div>
                  <div className="font-body text-xs text-ink-muted">{p.subtitle}</div>
                </div>
                <ChevronDown
                  size={18}
                  strokeWidth={1.6}
                  className={`text-ink-muted transition-transform ${
                    open ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {open && (
                <div className="px-5 pb-5 pt-1 space-y-4 border-t border-border-soft">
                  <p className="font-body text-[15px] text-ink-body leading-snug pt-3">
                    {p.goal}
                  </p>
                  <div>
                    <div className="label mb-2">Cosa fai</div>
                    <ul className="space-y-1.5">
                      {p.focus.map((f) => (
                        <li
                          key={f}
                          className="flex gap-2 font-body text-[14px] text-ink-body"
                        >
                          <span
                            className="mt-2 w-1 h-1 rounded-full shrink-0"
                            style={{ background: ACCENT[p.color] }}
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="label mb-2">Settimana tipo</div>
                    <ul className="card divide-y divide-border-soft">
                      {p.weeklyTemplate.map((s) => (
                        <li
                          key={s.day}
                          className="flex items-center gap-3 px-3 py-2.5"
                        >
                          <span className="label-wide w-9">{s.day}</span>
                          <span className="font-body text-[13px] text-ink-body">
                            {s.activity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {p.notes.length > 0 && (
                    <div className="card-accent px-4 py-3">
                      <div className="label mb-1.5">Note</div>
                      <ul className="space-y-1">
                        {p.notes.map((n) => (
                          <li key={n} className="font-body text-[13px] text-ink-body">
                            · {n}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </section>

      <section className="card-accent px-5 py-5">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={16} strokeWidth={1.8} className="text-rust" />
          <h3 className="font-display font-bold text-lg text-ink">
            3 errori da evitare
          </h3>
        </div>
        <ul className="space-y-3.5">
          {MISTAKES_TO_AVOID.map((m, i) => (
            <li key={m.title}>
              <div className="font-display font-semibold text-[15px] text-ink leading-tight">
                <span className="text-rust">{i + 1}.</span> {m.title}
              </div>
              <p className="font-body text-[13px] text-ink-body mt-1 leading-snug">
                {m.body}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
