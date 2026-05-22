import { ExternalLink } from 'lucide-react';
import { ZONE_2 } from '../data/cardio';

export function CardioTab() {
  return (
    <div className="space-y-6">
      <header>
        <div className="label">Corsa lenta · Zona 2</div>
        <h1 className="font-display font-bold text-[28px] text-ink leading-[1.15] mt-1">
          {ZONE_2.title}
        </h1>
        <p className="font-body text-[15px] text-ink-body mt-3 leading-snug">
          {ZONE_2.intro}
        </p>
      </header>

      <section className="card-accent px-4 py-4">
        <div className="label mb-1.5">{ZONE_2.hrFormula.label}</div>
        <p className="font-body text-[14px] text-ink-body">{ZONE_2.hrFormula.body}</p>
      </section>

      <section>
        <h3 className="font-display font-semibold text-lg text-ink mb-3">
          Come si fa
        </h3>
        <ol className="space-y-3">
          {ZONE_2.steps.map((s) => (
            <li key={s.n} className="card px-4 py-3.5">
              <div className="flex items-start gap-3">
                <span className="font-display font-bold text-rust text-2xl leading-none tabular-nums">
                  {s.n}
                </span>
                <div className="flex-1">
                  <div className="font-display font-semibold text-[15px] text-ink leading-tight">
                    {s.title}
                  </div>
                  <p className="font-body text-[13px] text-ink-body mt-1 leading-snug">
                    {s.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="card px-4 py-4" style={{ borderLeft: '4px solid #5d7a5a' }}>
        <div className="label mb-1.5">Senza orologio cardio?</div>
        <h4 className="font-display font-semibold text-[16px] text-ink">
          {ZONE_2.talkTest.title}
        </h4>
        <p className="font-body text-[14px] text-ink-body mt-2 leading-snug">
          {ZONE_2.talkTest.body}
        </p>
      </section>

      <section>
        <h3 className="font-display font-semibold text-lg text-ink mb-3">
          Per approfondire
        </h3>
        <ul className="space-y-2">
          {ZONE_2.reads.map((r) => (
            <li key={r.url}>
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer noopener"
                className="card px-4 py-3 flex items-start gap-3 hover:bg-card-accent transition-colors"
              >
                <div className="flex-1">
                  <div className="font-display font-semibold text-[14px] text-ink leading-tight">
                    {r.title}
                  </div>
                  <div className="font-body text-[12px] text-ink-muted mt-1">
                    {r.hint}
                  </div>
                </div>
                <ExternalLink
                  size={14}
                  strokeWidth={1.6}
                  className="text-ink-faint shrink-0 mt-1"
                />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
