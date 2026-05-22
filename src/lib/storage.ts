import type { Phase, Session, Settings } from './types';

const KEYS = {
  sessions: 'hardwood:sessions',
  currentPhase: 'hardwood:currentPhase',
  settings: 'hardwood:settings',
} as const;

function safeParse<T>(raw: string | null, fallback: T): T {
  if (raw == null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function get<T>(key: string, fallback: T): T {
  try {
    return safeParse(localStorage.getItem(key), fallback);
  } catch {
    return fallback;
  }
}

function set<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota / private-mode errors */
  }
}

function remove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    /* noop */
  }
}

export function getSessions(): Session[] {
  const list = get<Session[]>(KEYS.sessions, []);
  return Array.isArray(list) ? list : [];
}

export function setSessions(sessions: Session[]): void {
  set(KEYS.sessions, sessions);
}

export function getCurrentPhase(): Phase {
  const phase = get<string>(KEYS.currentPhase, 'p1');
  return phase === 'p2' || phase === 'p3' ? phase : 'p1';
}

export function setCurrentPhase(phase: Phase): void {
  set(KEYS.currentPhase, phase);
}

export function getSettings(): Settings {
  return get<Settings>(KEYS.settings, {});
}

export function setSettings(settings: Settings): void {
  set(KEYS.settings, settings);
}

export function exportAll(): string {
  return JSON.stringify(
    {
      version: 1,
      exportedAt: new Date().toISOString(),
      sessions: getSessions(),
      currentPhase: getCurrentPhase(),
      settings: getSettings(),
    },
    null,
    2
  );
}

export type ImportMode = 'merge' | 'replace';

export function importAll(json: string, mode: ImportMode): { added: number } {
  const data = JSON.parse(json) as {
    sessions?: Session[];
    currentPhase?: Phase;
    settings?: Settings;
  };

  const incomingSessions = Array.isArray(data.sessions) ? data.sessions : [];

  if (mode === 'replace') {
    setSessions(incomingSessions);
  } else {
    const existing = getSessions();
    const existingIds = new Set(existing.map((s) => s.id));
    const merged = [
      ...existing,
      ...incomingSessions.filter((s) => !existingIds.has(s.id)),
    ];
    setSessions(merged);
  }

  if (data.currentPhase === 'p1' || data.currentPhase === 'p2' || data.currentPhase === 'p3') {
    setCurrentPhase(data.currentPhase);
  }

  if (data.settings && typeof data.settings === 'object') {
    setSettings(data.settings);
  }

  return { added: incomingSessions.length };
}

export function clearAll(): void {
  remove(KEYS.sessions);
  remove(KEYS.currentPhase);
  remove(KEYS.settings);
}
