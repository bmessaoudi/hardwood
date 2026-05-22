export interface Fundamental {
  rank: number;
  title: string;
  why: string;
  drill: string;
}

export interface DrillResource {
  title: string;
  channel: string;
  url: string;
}

export interface DrillGroup {
  category: string;
  description: string;
  videos: DrillResource[];
}

export const FUNDAMENTALS: Fundamental[] = [
  {
    rank: 1,
    title: 'Ball handling con due palloni',
    why: 'La mano debole è quella che hai perso. La recuperi solo costringendoti a usarla — un pallone per mano la rende un obbligo, non una scelta.',
    drill: 'Palleggio simultaneo 60 sec, poi alternato, poi crossover ritmato. 3 serie.',
  },
  {
    rank: 2,
    title: 'Tiro libero',
    why: 'È l’unica situazione in cui non sei stanco e nessuno ti difende. Se non li metti puliti adesso, in partita sarà peggio. Costruisci una routine identica ogni volta.',
    drill: '50 tiri liberi suddivisi in serie da 10. Annota i fatti su 50.',
  },
  {
    rank: 3,
    title: 'Form shooting da vicino',
    why: 'Prima di alzare il tiro lontano, sistema il gomito e la rotazione del polso a 2 metri. Tutta la meccanica nasce lì.',
    drill: '5 angoli vicino al ferro, 10 tiri ad angolo, solo dopo arretri.',
  },
  {
    rank: 4,
    title: 'Tiro in corsa (terzo tempo)',
    why: 'Cambia tutto rispetto al tiro fermo: ritmo, equilibrio, scelta del piede. Lo perdi per primo e lo ritrovi solo facendolo.',
    drill: 'Linea di fondo → terzo tempo a destra ×10, poi a sinistra ×10. Senza salto pieno fino a settimana 6.',
  },
  {
    rank: 5,
    title: 'Difesa: posizione di base',
    why: 'A 30 anni l’energia sprecata in difesa non recuperi più. Posizione bassa, piedi che scivolano, mani attive — è meno faticoso di quanto sembra se la tecnica è giusta.',
    drill: 'Defensive slide da linea di fondo a metà campo, andata e ritorno. 3 serie.',
  },
];

export const DRILL_GROUPS: DrillGroup[] = [
  {
    category: 'Ball handling',
    description: 'Mano debole, cambi di mano, ritmo.',
    videos: [
      {
        title: 'Two-ball dribbling routine',
        channel: 'Get Handles',
        url: 'https://www.youtube.com/watch?v=8gQfM_Iib2A',
      },
      {
        title: 'Stationary dribbling — 5 livelli',
        channel: 'Coach Daniel',
        url: 'https://www.youtube.com/watch?v=Z0Z6gXcAdj0',
      },
      {
        title: 'Pro hop & jab series',
        channel: 'I’M POSSIBLE Training',
        url: 'https://www.youtube.com/watch?v=H7AZqxqsM5g',
      },
    ],
  },
  {
    category: 'Tiro',
    description: 'Form, libero, tiro in corsa.',
    videos: [
      {
        title: 'Tiro libero — costruisci la routine',
        channel: 'Pure Sweat (Drew Hanlen)',
        url: 'https://www.youtube.com/watch?v=zPZyqi7-eAU',
      },
      {
        title: 'Form shooting per chi torna a giocare',
        channel: 'Shot Mechanics',
        url: 'https://www.youtube.com/watch?v=Tbe9YqA5JfQ',
      },
      {
        title: 'Tiro in corsa — fondamentali',
        channel: 'Coach Collin Castellaw',
        url: 'https://www.youtube.com/watch?v=8RG31rgnu1c',
      },
    ],
  },
  {
    category: 'Conditioning specifico',
    description: 'Cambi di direzione, esplosività controllata.',
    videos: [
      {
        title: 'Basketball-specific conditioning',
        channel: 'I’M POSSIBLE Training',
        url: 'https://www.youtube.com/watch?v=H1g9wA_NQ_Q',
      },
      {
        title: 'Lateral quickness drills',
        channel: 'Coach Godwin',
        url: 'https://www.youtube.com/watch?v=Hu_yPm9hZ7w',
      },
    ],
  },
];

export const COURT_FOCUS_OPTIONS = [
  'Ball handling',
  'Tiro libero',
  'Tiro fermo',
  'Tiro in corsa',
  'Conditioning',
  'Difesa',
  '1vs1 / 3vs3',
];
