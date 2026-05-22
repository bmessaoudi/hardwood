import { useEffect, useState } from 'react';
import type { TabId } from './components/TabBar';
import { TabBar } from './components/TabBar';
import { SessionModal } from './components/SessionModal';
import { TodayTab } from './tabs/TodayTab';
import { PlanTab } from './tabs/PlanTab';
import { GymTab } from './tabs/GymTab';
import { MobilityTab } from './tabs/MobilityTab';
import { CardioTab } from './tabs/CardioTab';
import { BasketTab } from './tabs/BasketTab';
import { HistoryTab } from './tabs/HistoryTab';
import type { Phase, Session } from './lib/types';
import {
  getSessions,
  setSessions as persistSessions,
  getCurrentPhase,
  setCurrentPhase as persistPhase,
} from './lib/storage';

function App() {
  const [tab, setTab] = useState<TabId>('today');
  const [sessions, setSessions] = useState<Session[]>(() => getSessions());
  const [phase, setPhase] = useState<Phase>(() => getCurrentPhase());
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    persistSessions(sessions);
  }, [sessions]);

  useEffect(() => {
    persistPhase(phase);
  }, [phase]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [tab]);

  const handleSave = (s: Session) => {
    setSessions((prev) => [s, ...prev]);
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Eliminare questa sessione?')) {
      setSessions((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const reloadFromStorage = () => {
    setSessions(getSessions());
    setPhase(getCurrentPhase());
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TabBar active={tab} onChange={setTab} />

      <main className="flex-1 max-w-page w-full mx-auto px-5 py-8">
        {tab === 'today' && (
          <TodayTab
            sessions={sessions}
            phase={phase}
            onChangePhase={setPhase}
            onOpenSessionModal={() => setModalOpen(true)}
            onGoToHistory={() => setTab('history')}
          />
        )}
        {tab === 'plan' && <PlanTab />}
        {tab === 'gym' && <GymTab />}
        {tab === 'mobility' && <MobilityTab />}
        {tab === 'cardio' && <CardioTab />}
        {tab === 'basket' && <BasketTab />}
        {tab === 'history' && (
          <HistoryTab
            sessions={sessions}
            onDelete={handleDelete}
            onReload={reloadFromStorage}
          />
        )}
      </main>

      <footer className="max-w-page w-full mx-auto px-5 py-10 text-center border-t border-border-soft mt-6">
        <p className="font-display italic text-[15px] text-ink-muted">
          “La progressione conta più della velocità.”
        </p>
        <p className="label mt-3">Hardwood · diario di allenamento</p>
      </footer>

      <SessionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}

export default App;
