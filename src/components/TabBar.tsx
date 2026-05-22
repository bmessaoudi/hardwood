import { useEffect, useRef } from 'react';

export type TabId = 'today' | 'plan' | 'gym' | 'mobility' | 'cardio' | 'basket' | 'history';

interface Props {
  active: TabId;
  onChange: (id: TabId) => void;
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'today', label: 'Oggi' },
  { id: 'plan', label: 'Piano' },
  { id: 'gym', label: 'Palestra' },
  { id: 'mobility', label: 'Mobilità' },
  { id: 'cardio', label: 'Corsa' },
  { id: 'basket', label: 'Basket' },
  { id: 'history', label: 'Storico' },
];

export function TabBar({ active, onChange }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeBtnRef.current) {
      activeBtnRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [active]);

  return (
    <div className="sticky top-0 z-30 bg-page/95 backdrop-blur border-b border-border">
      <div className="max-w-page mx-auto px-5">
        <div
          ref={scrollerRef}
          className="flex gap-1 overflow-x-auto scroll-hide py-3"
          role="tablist"
        >
          {TABS.map((t) => {
            const isActive = t.id === active;
            return (
              <button
                key={t.id}
                ref={isActive ? activeBtnRef : null}
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(t.id)}
                className={`whitespace-nowrap px-3.5 py-2 text-[13px] rounded-card transition-colors ${
                  isActive
                    ? 'bg-ink text-page font-display font-semibold'
                    : 'text-ink-muted font-body font-medium hover:text-ink hover:bg-card'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
