import { useMemo, useState } from 'react';
import { Download, Upload, Trash2 } from 'lucide-react';
import type { Session, SessionType } from '../lib/types';
import { SESSION_TYPE_META } from '../lib/types';
import { SessionList } from '../components/SessionList';
import { exportAll, importAll, clearAll } from '../lib/storage';

interface Props {
  sessions: Session[];
  onDelete: (id: number) => void;
  onReload: () => void;
}

const FILTERS: { id: SessionType | 'all'; label: string }[] = [
  { id: 'all', label: 'Tutte' },
  { id: 'gym', label: SESSION_TYPE_META.gym.short },
  { id: 'cardio', label: SESSION_TYPE_META.cardio.short },
  { id: 'court', label: SESSION_TYPE_META.court.short },
  { id: 'mobility', label: SESSION_TYPE_META.mobility.short },
  { id: 'rest', label: SESSION_TYPE_META.rest.short },
];

export function HistoryTab({ sessions, onDelete, onReload }: Props) {
  const [filter, setFilter] = useState<SessionType | 'all'>('all');
  const [status, setStatus] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const list = filter === 'all' ? sessions : sessions.filter((s) => s.type === filter);
    return [...list].sort((a, b) => b.timestamp - a.timestamp);
  }, [sessions, filter]);

  const handleExport = () => {
    const json = exportAll();
    const today = new Date().toISOString().split('T')[0];
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hardwood-export-${today}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatus('Esportazione completata.');
    setTimeout(() => setStatus(null), 2500);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const text = await file.text();
      const replace = window.confirm(
        'Sostituire i dati esistenti? OK = sostituisci, Annulla = unisci'
      );
      try {
        const { added } = importAll(text, replace ? 'replace' : 'merge');
        setStatus(`Importate ${added} sessioni.`);
        onReload();
      } catch (err) {
        setStatus('File non valido.');
        console.error(err);
      } finally {
        setTimeout(() => setStatus(null), 3000);
      }
    };
    input.click();
  };

  const handleWipe = () => {
    if (
      window.confirm(
        'Cancellare tutti i dati locali? Operazione non reversibile.'
      )
    ) {
      clearAll();
      onReload();
      setStatus('Dati cancellati.');
      setTimeout(() => setStatus(null), 2500);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <div className="label">Storico</div>
        <h1 className="font-display font-bold text-[28px] text-ink leading-[1.15] mt-1">
          Tutto quello che hai fatto.
        </h1>
        <p className="font-body text-sm text-ink-muted mt-2">
          {sessions.length === 0
            ? 'Niente ancora — registra la prima sessione.'
            : `${sessions.length} ${sessions.length === 1 ? 'sessione' : 'sessioni'} totali.`}
        </p>
      </header>

      <section>
        <div className="flex gap-1.5 overflow-x-auto scroll-hide -mx-5 px-5 pb-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`pill whitespace-nowrap ${filter === f.id ? 'pill-active' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <section>
        <SessionList sessions={filtered} onDelete={onDelete} detailed />
      </section>

      <section>
        <h3 className="font-display font-semibold text-base text-ink mb-3">
          Backup
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button onClick={handleExport} className="btn-secondary">
            <Download size={14} strokeWidth={1.6} />
            Esporta dati
          </button>
          <button onClick={handleImport} className="btn-secondary">
            <Upload size={14} strokeWidth={1.6} />
            Importa dati
          </button>
        </div>
        <button
          onClick={handleWipe}
          className="mt-3 w-full font-body text-xs text-ink-faint hover:text-rust transition-colors flex items-center justify-center gap-1.5 py-2"
        >
          <Trash2 size={12} strokeWidth={1.6} />
          Cancella tutti i dati locali
        </button>
        {status && (
          <div className="mt-3 font-body text-xs text-moss text-center">{status}</div>
        )}
      </section>
    </div>
  );
}
