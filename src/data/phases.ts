import type { Phase } from '../lib/types';

export interface WeeklySlot {
  day: string;
  activity: string;
  type: 'gym' | 'cardio' | 'court' | 'mobility' | 'rest';
}

export interface PhaseInfo {
  id: Phase;
  number: 1 | 2 | 3;
  title: string;
  subtitle: string;
  weeks: string;
  color: 'rust' | 'tan' | 'moss';
  goal: string;
  focus: string[];
  weeklyTemplate: WeeklySlot[];
  notes: string[];
}

export const PHASES: PhaseInfo[] = [
  {
    id: 'p1',
    number: 1,
    title: 'Ricondizionamento',
    subtitle: 'Costruisci la base',
    weeks: 'Settimane 1–3',
    color: 'rust',
    goal: 'Riprendere movimento, abituare tendini e articolazioni al carico, ritrovare un minimo di fiato.',
    focus: [
      'Forza generale 2× a settimana (full body, carichi moderati)',
      'Corsa lenta in Zona 2, 30–40 min',
      'Mobilità 10 min ogni giorno o quasi',
      'Niente campetto: il corpo non è ancora pronto per cambi di direzione esplosivi',
    ],
    weeklyTemplate: [
      { day: 'Lun', activity: 'Palestra — Workout A', type: 'gym' },
      { day: 'Mar', activity: 'Mobilità + camminata', type: 'mobility' },
      { day: 'Mer', activity: 'Corsa lenta 30 min', type: 'cardio' },
      { day: 'Gio', activity: 'Palestra — Workout B', type: 'gym' },
      { day: 'Ven', activity: 'Mobilità', type: 'mobility' },
      { day: 'Sab', activity: 'Corsa lenta 35 min', type: 'cardio' },
      { day: 'Dom', activity: 'Riposo', type: 'rest' },
    ],
    notes: [
      'Se hai dolori articolari nei primi 10 giorni, ridurre intensità non sospendere.',
      'Pesi: stai sul 50–60% di quello che ricordi di sollevare a 18 anni.',
    ],
  },
  {
    id: 'p2',
    number: 2,
    title: 'Reintroduzione basket',
    subtitle: 'Torna sul parquet',
    weeks: 'Settimane 4–6',
    color: 'tan',
    goal: 'Inserire palleggio, tiro, cambi di direzione a basso volume. Mantenere la forza, alzare il fiato.',
    focus: [
      'Palestra ridotta a 2× ma con esercizi più tecnici',
      'Corsa Zona 2 più lunga (40–50 min) o intervalli leggeri',
      '1× campetto a settimana: solo tecnica individuale, niente partite',
      'Mobilità diventa pre-attivazione prima del campetto',
    ],
    weeklyTemplate: [
      { day: 'Lun', activity: 'Palestra — Workout A', type: 'gym' },
      { day: 'Mar', activity: 'Corsa lenta 40 min', type: 'cardio' },
      { day: 'Mer', activity: 'Campetto — tecnica', type: 'court' },
      { day: 'Gio', activity: 'Mobilità', type: 'mobility' },
      { day: 'Ven', activity: 'Palestra — Workout B', type: 'gym' },
      { day: 'Sab', activity: 'Corsa o campetto leggero', type: 'cardio' },
      { day: 'Dom', activity: 'Riposo', type: 'rest' },
    ],
    notes: [
      'Sul campetto: 20 min ball handling + 20 min tiro fermo + 10 min tiro in corsa.',
      'Niente 1vs1, niente 3vs3, niente schiacciate. Davvero.',
    ],
  },
  {
    id: 'p3',
    number: 3,
    title: 'Game shape',
    subtitle: 'Torna a giocare',
    weeks: 'Settimane 7–10',
    color: 'moss',
    goal: 'Mantenere forza, mettere conditioning specifico, alzare il volume sul campo e iniziare situazioni di gioco.',
    focus: [
      'Palestra 1–2× a settimana in mantenimento',
      'Corsa: aggiungi 1 seduta con intervalli (es. 6× 2 min al ritmo della partita)',
      'Campetto 2× a settimana: tecnica + 1vs1 + 3vs3',
      'Mobilità sempre, ma più breve',
    ],
    weeklyTemplate: [
      { day: 'Lun', activity: 'Palestra — Workout A', type: 'gym' },
      { day: 'Mar', activity: 'Campetto — tecnica + 1vs1', type: 'court' },
      { day: 'Mer', activity: 'Intervalli o Zona 2 lunga', type: 'cardio' },
      { day: 'Gio', activity: 'Mobilità + camminata', type: 'mobility' },
      { day: 'Ven', activity: 'Palestra — Workout B', type: 'gym' },
      { day: 'Sab', activity: 'Campetto — 3vs3', type: 'court' },
      { day: 'Dom', activity: 'Riposo', type: 'rest' },
    ],
    notes: [
      'A fine settimana 10 sei pronto per tornare in una squadra amatoriale.',
      'Continua mobilità e una seduta in palestra anche quando giochi regolarmente.',
    ],
  },
];

export const MISTAKES_TO_AVOID = [
  {
    title: 'Tornare al ritmo dei 18 anni',
    body: 'Il sistema cardiovascolare si rimette in 4–6 settimane, i tendini ci mettono il doppio. Se forzi adesso, ti fermi a metà.',
  },
  {
    title: 'Saltare la mobilità',
    body: 'È noiosa, ma è quello che ti tiene caviglie e anche fluide quando cambi direzione. Senza, prima o poi qualcosa si infiamma.',
  },
  {
    title: 'Pesarsi ogni giorno',
    body: 'Il peso oscilla per dieci ragioni che non c’entrano col grasso. Misura la performance — quanti minuti corri, quanti tiri liberi entri — non la bilancia.',
  },
];
