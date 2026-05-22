export type SessionType = 'gym' | 'cardio' | 'court' | 'mobility' | 'rest';

export type Phase = 'p1' | 'p2' | 'p3';

export interface Session {
  id: number;
  type: SessionType;
  date: string;
  timestamp: number;
  notes?: string;

  gymWorkout?: 'A' | 'B';
  gymExercises?: Record<string, string>;

  cardioDuration?: string;
  cardioAvgHR?: string;
  cardioPerceivedEffort?: number;

  courtDuration?: string;
  courtFocus?: string[];

  mobilityCompleted?: string[];
}

export interface Settings {
  theme?: 'auto' | 'light' | 'dark';
}

export const SESSION_TYPE_META: Record<
  SessionType,
  { label: string; short: string; emoji?: string }
> = {
  gym: { label: 'Palestra', short: 'Palestra' },
  cardio: { label: 'Corsa Zona 2', short: 'Cardio' },
  court: { label: 'Campetto', short: 'Campetto' },
  mobility: { label: 'Mobilità', short: 'Mobilità' },
  rest: { label: 'Riposo attivo', short: 'Riposo' },
};
