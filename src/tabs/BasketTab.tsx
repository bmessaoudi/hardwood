import { ExternalLink } from 'lucide-react';
import { FUNDAMENTALS, DRILL_GROUPS } from '../data/basketball';

export function BasketTab() {
  return (
    <div className="space-y-6">
      <header>
        <div className="label">Basket</div>
        <h1 className="font-display font-bold text-[28px] text-ink leading-[1.15] mt-1">
          Cinque fondamentali, in ordine.
        </h1>
        <p className="font-body text-sm text-ink-muted mt-2">
          Fai questi prima di pensare a step-back, fade-away e cose esotiche. La base prima delle decorazioni.
        </p>
      </header>

      <section className="space-y-3">
        {FUNDAMENTALS.map((f) => (
          <article
            key={f.rank}
            className="card px-4 py-4"
            style={{ borderLeft: '4px solid #c4654d' }}
          >
            <div className="flex items-start gap-3">
              <div
                className="shrink-0 w-9 h-9 rounded-card flex items-center justify-center font-display font-bold text-page bg-rust tabular-nums"
                aria-hidden
              >
                {f.rank}
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-[17px] text-ink leading-tight">
                  {f.title}
                </h3>
                <p className="font-body text-[13px] text-ink-body mt-1.5 leading-snug">
                  {f.why}
                </p>
                <div className="card-accent px-3 py-2 mt-3">
                  <div className="label mb-0.5">Drill</div>
                  <p className="font-body text-[13px] text-ink-body leading-snug">
                    {f.drill}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="space-y-5">
        <h3 className="font-display font-semibold text-xl text-ink">
          Risorse video
        </h3>
        {DRILL_GROUPS.map((g) => (
          <div key={g.category}>
            <div className="flex items-baseline justify-between mb-2">
              <h4 className="font-display font-semibold text-base text-ink">
                {g.category}
              </h4>
              <span className="label">{g.videos.length} video</span>
            </div>
            <p className="font-body text-xs text-ink-muted mb-2">{g.description}</p>
            <ul className="card divide-y divide-border-soft">
              {g.videos.map((v) => (
                <li key={v.url}>
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-card-accent transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-display font-semibold text-[14px] text-ink leading-tight">
                        {v.title}
                      </div>
                      <div className="font-body text-[11px] text-ink-faint mt-0.5 uppercase tracking-label">
                        {v.channel}
                      </div>
                    </div>
                    <ExternalLink size={14} strokeWidth={1.6} className="text-ink-faint" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
