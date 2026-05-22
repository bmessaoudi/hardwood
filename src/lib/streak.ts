import type { Session } from './types';

export function todayISO(): string {
  const d = new Date();
  const tz = d.getTimezoneOffset() * 60_000;
  return new Date(d.getTime() - tz).toISOString().split('T')[0];
}

function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  const tz = d.getTimezoneOffset() * 60_000;
  return new Date(d.getTime() - tz).toISOString().split('T')[0];
}

function uniqueDates(sessions: Session[]): Set<string> {
  return new Set(sessions.filter((s) => s.type !== 'rest').map((s) => s.date));
}

export function calcStreak(sessions: Session[]): number {
  const dates = uniqueDates(sessions);
  if (dates.size === 0) return 0;

  const today = todayISO();
  const yesterday = addDays(today, -1);

  let cursor: string;
  if (dates.has(today)) cursor = today;
  else if (dates.has(yesterday)) cursor = yesterday;
  else return 0;

  let streak = 0;
  while (dates.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

export function startOfWeekISO(): string {
  const d = new Date();
  const day = d.getDay(); // 0=Sun
  const diff = day === 0 ? -6 : 1 - day; // Monday-anchored
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  const tz = d.getTimezoneOffset() * 60_000;
  return new Date(d.getTime() - tz).toISOString().split('T')[0];
}

export function weeklyCount(sessions: Session[]): number {
  const start = startOfWeekISO();
  return sessions.filter((s) => s.date >= start && s.type !== 'rest').length;
}

export function formatDateIT(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString('it-IT', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}
