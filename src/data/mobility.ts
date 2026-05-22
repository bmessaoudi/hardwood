export interface MobilityExercise {
  name: string;
  duration: string;
  area: string;
  notes: string;
  videoUrl: string;
  videoLabel?: string;
}

export const MOBILITY: MobilityExercise[] = [
  {
    name: 'World’s Greatest Stretch',
    duration: '5 ripetizioni per lato',
    area: 'Tutto il corpo',
    notes:
      'Da affondo in avanti, mano a terra, ruota torace e braccio verso il cielo. Apre anca, dorsale e spalle in un colpo solo. Fallo per primo.',
    videoUrl: 'https://www.youtube.com/watch?v=cs0jhYg7r38',
    videoLabel: 'World’s Greatest Stretch',
  },
  {
    name: '90/90 hip switch',
    duration: '8 switch per lato',
    area: 'Anche, rotazione interna ed esterna',
    notes:
      'Seduto con gambe a 90°. Alterna il lato lentamente, busto eretto. Sblocca quello che si è chiuso anni alla scrivania.',
    videoUrl: 'https://www.youtube.com/watch?v=mUS2Ywmc4HE',
    videoLabel: '90/90 hip mobility',
  },
  {
    name: 'Ankle dorsiflexion (knee to wall)',
    duration: '10 ripetizioni per lato',
    area: 'Caviglia',
    notes:
      'Piede a ~10 cm dal muro, tocca il muro col ginocchio senza staccare il tallone. Se non ci arrivi, hai trovato la priorità #1.',
    videoUrl: 'https://www.youtube.com/watch?v=Tn2RxJ7n5UY',
    videoLabel: 'Knee-to-wall ankle test',
  },
  {
    name: 'Thoracic spine opener (foam roller)',
    duration: '60 secondi',
    area: 'Dorsale',
    notes:
      'Foam roller sotto le scapole, mani dietro la nuca, estendi indietro respirando. Recupera la mobilità che il PC ti ha rubato.',
    videoUrl: 'https://www.youtube.com/watch?v=4BOTvaRaDjI',
    videoLabel: 'Thoracic extension',
  },
  {
    name: 'Cossack squat',
    duration: '6 per lato',
    area: 'Adduttori, anche',
    notes:
      'Squat laterale: scarica il peso da un lato, l’altra gamba dritta. Prepara i cambi di direzione esplosivi.',
    videoUrl: 'https://www.youtube.com/watch?v=lLEjyOAB6Lk',
    videoLabel: 'Cossack squat',
  },
  {
    name: 'Cat-cow',
    duration: '10 cicli lenti',
    area: 'Colonna',
    notes:
      'A quattro zampe, alterna inarcamento e curvatura. Respira lento: 4 sec inspirando, 4 espirando.',
    videoUrl: 'https://www.youtube.com/watch?v=K9bK0BwKFjs',
    videoLabel: 'Cat-cow stretch',
  },
  {
    name: 'Calf stretch al muro',
    duration: '45 sec per lato',
    area: 'Polpacci, achilleo',
    notes:
      'Mani al muro, una gamba indietro tesa, tallone a terra. È prevenzione achilleo — non è negoziabile a 30 anni.',
    videoUrl: 'https://www.youtube.com/watch?v=Wb8O0CqOaTU',
    videoLabel: 'Calf stretch',
  },
];
