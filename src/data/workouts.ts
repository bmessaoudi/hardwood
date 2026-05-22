export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  notes: string;
  videoUrl: string;
  videoLabel?: string;
  callout?: boolean;
}

export interface Workout {
  id: 'A' | 'B';
  title: string;
  subtitle: string;
  duration: string;
  exercises: Exercise[];
}

export const WORKOUTS: Workout[] = [
  {
    id: 'A',
    title: 'Workout A',
    subtitle: 'Spinta',
    duration: '~ 50 minuti',
    exercises: [
      {
        name: 'Squat con bilanciere',
        sets: '4',
        reps: '6–8',
        notes:
          'Discesa controllata fino a femori paralleli. Ginocchia in linea con le punte dei piedi. Parti col 50% di quello che ricordi di sollevare a 18 anni.',
        videoUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8',
        videoLabel: 'Squat University — squat tecnica',
      },
      {
        name: 'Panca piana',
        sets: '4',
        reps: '6–8',
        notes:
          'Scapole retratte e appoggiate, gomiti a ~45°, contatto leggero sul petto. Niente rimbalzo.',
        videoUrl: 'https://www.youtube.com/watch?v=4Y2ZdHCOXok',
        videoLabel: 'Jeff Nippard — panca piana',
      },
      {
        name: 'Affondi camminati con manubri',
        sets: '3',
        reps: '10 per gamba',
        notes:
          'Ginocchio anteriore stabile, busto eretto, passo lungo. Lavora anche stabilità laterale.',
        videoUrl: 'https://www.youtube.com/watch?v=L8fvypPrzzs',
        videoLabel: 'Athlean-X — affondi',
      },
      {
        name: 'Spinte sopra la testa con manubri',
        sets: '3',
        reps: '8–10',
        notes:
          'Seduto o in piedi. Niente iperestensione lombare. Se la spalla scricchiola, scala il carico.',
        videoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog',
        videoLabel: 'Jeff Nippard — overhead press',
      },
      {
        name: 'Plank',
        sets: '3',
        reps: '40–60 sec',
        notes:
          'Bacino neutro, sguardo a terra, glutei attivi. Meglio 40 secondi puliti che 90 storti.',
        videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c',
        videoLabel: 'Athlean-X — plank corretto',
      },
    ],
  },
  {
    id: 'B',
    title: 'Workout B',
    subtitle: 'Tirata',
    duration: '~ 50 minuti',
    exercises: [
      {
        name: 'Stacco rumeno con bilanciere',
        sets: '4',
        reps: '6–8',
        notes:
          'È l’esercizio che probabilmente non conosci. Schiena dritta, ginocchia morbide, scendi spingendo il bacino indietro fino a sentire i femorali tirare. Allena la catena posteriore — esattamente quella che ti manca dopo anni alla scrivania.',
        videoUrl: 'https://www.youtube.com/watch?v=jEy_czb3RKA',
        videoLabel: 'Squat University — Romanian Deadlift',
        callout: true,
      },
      {
        name: 'Trazioni o lat machine',
        sets: '4',
        reps: '6–10',
        notes:
          'Se non chiudi 6 trazioni clean, sostituisci con lat machine presa larga. Niente strappi col collo.',
        videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
        videoLabel: 'Athlean-X — trazioni',
      },
      {
        name: 'Rematore con bilanciere',
        sets: '3',
        reps: '8–10',
        notes:
          'Busto inclinato a ~45°, tira verso l’addome basso. Schiena neutra, niente rimbalzi.',
        videoUrl: 'https://www.youtube.com/watch?v=kBWAon7ItDw',
        videoLabel: 'Jeff Nippard — barbell row',
      },
      {
        name: 'Hip thrust con bilanciere',
        sets: '3',
        reps: '8–10',
        notes:
          'Spalle su panca, bilanciere su anche (con pad). Spingi col glute, non con la schiena.',
        videoUrl: 'https://www.youtube.com/watch?v=LM8XHLYJoYs',
        videoLabel: 'Bret Contreras — hip thrust',
      },
      {
        name: 'Dead bug',
        sets: '3',
        reps: '8 per lato',
        notes:
          'Lombare ben aderente a terra, movimenti lenti delle gambe contrapposte alle braccia. Migliora il controllo core in modo specifico per cambi di direzione.',
        videoUrl: 'https://www.youtube.com/watch?v=g_BYB0R-4Ws',
        videoLabel: 'Squat University — dead bug',
      },
    ],
  },
];
