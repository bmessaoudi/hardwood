interface Props {
  streak: number;
  weekCount: number;
  totalSessions: number;
}

export function StatsRow({ streak, weekCount, totalSessions }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Stat value={streak} caption="giorni streak" accent />
      <Stat value={weekCount} caption="questa settimana" />
      <Stat value={totalSessions} caption="totali" />
    </div>
  );
}

function Stat({
  value,
  caption,
  accent,
}: {
  value: number;
  caption: string;
  accent?: boolean;
}) {
  return (
    <div className="card px-3 py-4 text-center">
      <div
        className={`font-display font-bold leading-none ${
          accent ? 'text-rust' : 'text-ink'
        } text-[40px]`}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {value}
      </div>
      <div className="label mt-2">{caption}</div>
    </div>
  );
}
