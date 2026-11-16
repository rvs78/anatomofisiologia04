// Textos del vídeo tutorial (sense veu: tot és text en pantalla i subtítols).
export type Lang = 'ca' | 'es';
export const FPS = 30;
export const SCENES = [
  { id: 'intro', sec: 4 }, { id: 'map', sec: 6 }, { id: 'levels', sec: 7 },
  { id: 'drag', sec: 7 }, { id: 'help', sec: 6 }, { id: 'case', sec: 6 },
] as const;
export const TOTAL = SCENES.reduce((a, s) => a + s.sec, 0) * FPS;

export const T = {
  ca: {
    title: 'Com es juga', brand: 'Sentits Clínic',
    sub: {
      intro: 'Sentits Clínic: patologies de la vista, l\'oïda, l\'olfacte, el gust i el tacte.',
      map: 'Tria una de les cinc estacions. Les pots fer en l\'ordre que vulguis.',
      levels: 'Cada estació té quatre nivells, de més fàcil a més difícil.',
      drag: 'Arrossega cada cromo fins a l\'estructura que falla. També pots tocar el cromo i després el punt.',
      help: 'Si t\'encalles, demana una pista. Encert +10, error −3, pista −5.',
      case: 'Amb les cinc estacions fetes, atén pacients a la farmàcia i desa l\'informe en PDF per a Classroom.',
    },
    stations: ['Vista', 'Oïda', 'Olfacte', 'Gust', 'Tacte i pell'],
    levels: [['Observa', 'Vídeo i làmina'], ['Localitza', 'Arrossega a l\'estructura'], ['Comprèn', 'Simuladors i imatges'], ['Relaciona', 'Causa, signes i tractament']],
    chip: 'Cataracta', target: 'Cristal·lí', help: ['Pista', 'Glossari', 'Descripció'],
    score: [['Encert', '+10'], ['Error', '−3'], ['Pista', '−5'], ['Ratxa de 3', '+15']],
    caseT: 'Cas clínic', report: 'Informe en PDF → Classroom',
  },
  es: {
    title: 'Cómo se juega', brand: 'Sentits Clínic',
    sub: {
      intro: 'Sentits Clínic: patologías de la vista, el oído, el olfato, el gusto y el tacto.',
      map: 'Elige una de las cinco estaciones. Las puedes hacer en el orden que quieras.',
      levels: 'Cada estación tiene cuatro niveles, de más fácil a más difícil.',
      drag: 'Arrastra cada cromo hasta la estructura que falla. También puedes tocar el cromo y después el punto.',
      help: 'Si te atascas, pide una pista. Acierto +10, error −3, pista −5.',
      case: 'Con las cinco estaciones hechas, atiende pacientes en la farmacia y guarda el informe en PDF para Classroom.',
    },
    stations: ['Vista', 'Oído', 'Olfato', 'Gusto', 'Tacto y piel'],
    levels: [['Observa', 'Vídeo y lámina'], ['Localiza', 'Arrastra a la estructura'], ['Comprende', 'Simuladores e imágenes'], ['Relaciona', 'Causa, signos y tratamiento']],
    chip: 'Catarata', target: 'Cristalino', help: ['Pista', 'Glosario', 'Descripción'],
    score: [['Acierto', '+10'], ['Error', '−3'], ['Pista', '−5'], ['Racha de 3', '+15']],
    caseT: 'Caso clínico', report: 'Informe en PDF → Classroom',
  },
};
export const COLORS = { cover: '#22194d', cover2: '#2f2466', page: '#f2b42c', dot: '#e2a015', paper: '#fffdf8', paper2: '#f6f1e4', foil: '#ffd86b', ink: '#1b1533', ok: '#13804c', err: '#c81e3a',
  st: ['#0b7a83', '#b1500f', '#5b6f1e', '#a3245e', '#7a4a2a'], farm: '#1f8a4c' };
export const ORGAN = ['ull', 'orella', 'nas', 'llengua', 'pell'];
