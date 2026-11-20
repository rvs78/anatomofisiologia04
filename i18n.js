// Textos de la interfície en català (ca) i castellà (es). El contingut és a data/*.js amb b(ca, es).
export const LANGS = ['ca', 'es'];
const KEY = 'sc-lang';

/** Parell bilingüe. */
export const b = (ca, es = ca) => ({ ca, es });

export const UI = {
  ca: {
    langName: 'Català', chooseLang: 'Tria l\'idioma', switchLang: 'Canvia a castellà',
    brandSub: 'RA4 · Patologies dels sentits',
    points: 'Punts', streak: 'Ratxa', streakTitle: 'Encerts seguits. Cada 3, +15 punts', streakBanner: 'Ratxa de 3! +15',
    sound: 'So', soundOff: 'Silencia els sons', soundOn: 'Activa els sons',
    logout: 'Surt i esborra el progrés', logoutAsk: 'Vols sortir? Es perdrà el progrés desat en aquest navegador.', logoutYes: 'Sí, surt', cancel: 'Cancel·la',
    // entrada
    welcomeLead: 'Cinc estacions, una per sentit. A cada una veuràs què falla, on falla i per què, i al final resoldràs casos reals al taulell de la farmàcia.',
    wStep1: '<b>Observa i localitza.</b> Mira l\'animació i situa cada patologia a la seva estructura.',
    wStep2: '<b>Comprèn i relaciona.</b> Simuladors, imatges i la taula de causa, signes i tractament.',
    wStep3: '<b>Cas clínic.</b> Atén tres pacients a la farmàcia. Et recomanem fer-lo després de les estacions.',
    email: 'Correu de l\'institut', password: 'Contrasenya de l\'aula', open: 'Entra a la farmàcia',
    note: 'El progrés es desa en aquest navegador. Si canvies d\'ordinador o fas servir una finestra privada, començaràs de nou.',
    badEmail: 'Escriu el teu correu acabat en @isvh.cat.', badPass: 'La contrasenya no és correcta. Demana-la al professorat.',
    credit: 'Aplicació de Rubén Vallejo', aiCredit: 'Il·lustracions generades amb IA',
    // sobre
    introTitle: 'Com funciona <span>Sentits Clínic</span>',
    introLead: 'Cada estació té quatre nivells que van de més fàcil a més difícil. Si un nivell no et surt, el pots repetir.',
    ia: ['Quatre nivells', 'Observa, Localitza, Comprèn i Relaciona. Cada nivell desbloqueja el següent.'],
    ib: ['Ajuda quan la necessitis', 'Pista en tres graus, glossari, exemple resolt i descripció de cada imatge.'],
    ic: ['Cas clínic', 'Tres pacients al taulell de la farmàcia. Et recomanem fer-lo al final.'],
    introScore: 'Encert +10 · Error −3 · Pista −5 · Ratxa de 3: +15', start: 'Comença',
    howto: 'Com es juga',
    // mapa
    mapTitle: 'Tria una estació', mapLead: 'Pots fer-les en l\'ordre que vulguis. El cas clínic ja és obert: et recomanem fer-lo al final.',
    levelNames: ['Observa', 'Localitza', 'Comprèn', 'Relaciona'],
    stationDone: 'Completada', stationTodo: '{n} de 4 nivells', go: 'Entra', resume: 'Continua', review: 'Repassa',
    caseTitle: 'Cas clínic a la farmàcia', caseLocked: 'Falten {n} estacions: {list}.', caseOpen: 'Tres pacients t\'esperen al taulell.',
    caseDone: 'Cas clínic resolt', toReport: 'Informe final', toReportLocked: 'L\'informe s\'obre quan acabes el cas clínic.',
    // nivell
    back: 'Mapa', objective: 'Objectiu', levelOf: 'Nivell {n} de 4',
    check: 'Comprova', next: 'Següent', continue: 'Continua', finish: 'Acaba el nivell', retry: 'Torna-hi',
    hint: 'Pista', hintN: 'Pista {n}/3', hintCost: '−5 punts', noMoreHints: 'Ja has fet servir les tres pistes.',
    hintElim: 'He tret una opció incorrecta.', hintShow: 'Mira on parpelleja la resposta.',
    glossary: 'Glossari', glossaryTitle: 'Glossari de {st}', description: 'Descripció', close: 'Tanca',
    right: 'Correcte!', wrong: 'No és correcte.', theAnswer: 'La resposta és: {a}.',
    worked: 'Exemple resolt', workedNote: 'Aquest ja està fet perquè vegis com funciona. Fes tu la resta.',
    reviewCard: 'Repàs ràpid', reviewOf: 'Ho has fallat dues vegades. Recorda-ho:', reviewGot: 'Entesos',
    colCause: 'Causa', colSigns: 'Signes i símptomes', colTreat: 'Tractament', colDef: 'Definició', colPath: 'Patologia',
    levelDone: 'Nivell superat', levelFail: 'Encara no', accuracy: 'Encert', passNote: 'Cal un 60 % d\'encert per superar el nivell.',
    nextLevel: 'Nivell següent', toMap: 'Torna al mapa',
    // N1
    capsule: 'Càpsula', capVideo: 'Vídeo', capSteps: 'Pas a pas', capNote: 'Vídeo sense veu: el text de cada pas surt a la pantalla. També pots veure-ho pas a pas.', play: 'Reprodueix', pause: 'Pausa', prev: 'Anterior', replay: 'Torna a veure',
    explore: 'Explora la làmina', exploreHint: 'Toca cada punt per veure què és.', explored: '{n} de {t} explorats',
    view3d: 'Model 3D', view2d: 'Làmina', drag3d: 'Arrossega per girar el model.', no3d: 'Aquest dispositiu no pot mostrar el model 3D.',
    predictTitle: 'Abans de començar: què creus?', predictNote: 'Aquí només sumes: no hi ha penalització.',
    // N2
    dragTitle: 'Arrossega cada cromo fins al punt de l\'estructura que falla', dragHow: 'També pots tocar un cromo i després el punt. Amb teclat: Tab i Enter.', dragShared: 'Un mateix punt pot rebre més d\'un cromo.', dragRecall: 'Recorda:',
    placed: '{n} de {t} col·locats', chips: 'Cromos', target: 'Punt {n}',
    // N3
    optTitle: 'Banc òptic', optLead: 'Mou els lliscadors i tria la lent perquè el focus caigui a la retina.',
    optLength: 'Llargada de l\'ull', optPower: 'Potència del cristal·lí', optLens: 'Lent correctora', optNone: 'Cap',
    optConv: 'Convergent', optDiv: 'Divergent', optCyl: 'Cilíndrica', optFocusOn: 'El focus cau a la retina', optFocusFront: 'El focus cau davant de la retina', optFocusBack: 'El focus cau darrere de la retina', optFocusSplit: 'Hi ha dos focus: la imatge es deforma',
    optAsk: 'Quina lent corregeix aquest ull?', optChallenge: 'Repte {n} de {t}',
    simTitle: 'Les ulleres del pacient', simLead: 'Així veu la plaça una persona amb una alteració. Quina és?', simWarn: 'Aquesta pantalla simula alteracions visuals. Si et molesta, pots continuar sense l\'efecte.', simOff: 'Treu l\'efecte', simOn: 'Mostra l\'efecte',
    simStruct: 'I quina estructura falla?',
    soundTitle: 'On s\'atura el so?', soundLead: 'Toca el punt del camí on es bloqueja el so.', soundKind: 'Quin tipus d\'hipoacúsia és?',
    flavorTitle: 'Gust o sabor?', flavorLead: 'Mou els lliscadors. El sabor sorgeix de la suma dels sentits.',
    flavorTaste: 'Gust (botons gustatius)', flavorSmell: 'Olfacte (nas)', flavorTexture: 'Textura', flavorTemp: 'Temperatura', flavorMeter: 'Sabor percebut', flavorBasic: 'Gustos bàsics',
    flavorQ1: 'Amb el nas tapat (olfacte al mínim), què passa?', flavorQ2: 'I si es perden els botons gustatius però l\'olfacte va bé?',
    wordTitle: 'Laboratori de paraules', wordLead: 'Uneix un prefix i una arrel per anomenar cada alteració.', wordPre: 'Prefixos', wordRoot: 'Arrels', wordBuild: 'Construeix', wordAsk: 'Quina paraula vol dir: «{d}»?',
    orderLead: 'Toca els passos en l\'ordre correcte.', orderReset: 'Torna a començar',
    classifyLead: 'Arrossega cada targeta a la seva columna.',
    abcdeTitle: 'Detectiu ABCDE', abcdeLead: 'Marca els signes d\'alerta que veus i decideix.', abcdeNone: 'Cap signe d\'alerta',
    abcdeA: 'Asimetria', abcdeB: 'Vores irregulars', abcdeC: 'Color desigual', abcdeD: 'Diàmetre gran', abcdeE: 'Evolució',
    abcdeWatch: 'Vigilar', abcdeRefer: 'Derivar', abcdeEnote: 'La E (evolució) no es veu en una sola imatge: pregunta sempre si ha canviat.',
    // N4
    gridTitle: 'Completa la fitxa de cada patologia', gridLead: 'Arrossega cada targeta a la seva casella. Les primeres files t\'ajuden.',
    writeTitle: 'Escriu la paraula', writePh: 'Escriu aquí…', writeTypo: 'Gairebé! Fixa\'t en l\'ortografia: {a}.',
    // cas
    caseLead: 'Escolta el pacient i decideix. Cada decisió té conseqüències.', patient: 'Pacient', step: 'Decisió {n} de {t}',
    caseNext: 'Següent pacient', caseFinish: 'Veure l\'informe',
    // informe
    subject: 'MP0061 Anatomofisiologia i patologia bàsiques · FAR 1L · RA4', done: 'Informe de Sentits Clínic',
    totalTime: 'Temps total', langUsed: 'Idioma', grade: 'Nota', gradeOf: 'sobre 10',
    gradeLevels: { insuf: 'Insuficient', suf: 'Suficient', be: 'Bé', notable: 'Notable', excel: 'Excel·lent' },
    gradeStations: 'Estacions', gradeCase: 'Cas clínic', gradeHow: 'Nota = 1 + 9 × ({w1} % estacions + {w2} % cas clínic). Encert = encerts ÷ (encerts + errors + ½ pistes).',
    pointsTile: 'Punts', errors: 'Errors', hints: 'Pistes', time: 'Temps',
    stationsTitle: 'Estacions', starsCol: 'Estrelles', accCol: 'Encert',
    indTitle: 'Indicadors d\'assoliment (CA de la RA4)', indDone: 'Assolit', indMid: 'En procés', indNo: 'No assolit', indNone: 'Sense dades',
    weakTitle: 'Patologies per repassar', weakSlide: 'diapositiva {n}', noWeak: 'Cap patologia amb errors. Molt bé!',
    caseLog: 'Decisions del cas clínic',
    deliver: 'Lliura l\'informe', deliver1: 'Prem <b>Desa en PDF</b> i tria «Desa com a PDF».', deliver2: 'Obre la tasca a Google Classroom.', deliver3: 'Adjunta el PDF i marca-la com a lliurada.',
    pdf: 'Desa en PDF', classroom: 'Obre Classroom', pdfName: 'Informe Sentits Clínic', footer: 'Anatomofisiologia i patologia bàsiques · CFGM Farmàcia i Parafarmàcia',
    stars: '{n} de 3 estrelles', aiImg: 'Il·lustració generada amb IA',
  },
  es: {
    langName: 'Castellano', chooseLang: 'Elige el idioma', switchLang: 'Cambia al catalán',
    brandSub: 'RA4 · Patologías de los sentidos',
    points: 'Puntos', streak: 'Racha', streakTitle: 'Aciertos seguidos. Cada 3, +15 puntos', streakBanner: '¡Racha de 3! +15',
    sound: 'Sonido', soundOff: 'Silencia los sonidos', soundOn: 'Activa los sonidos',
    logout: 'Sal y borra el progreso', logoutAsk: '¿Quieres salir? Se perderá el progreso guardado en este navegador.', logoutYes: 'Sí, salir', cancel: 'Cancelar',
    welcomeLead: 'Cinco estaciones, una por sentido. En cada una verás qué falla, dónde falla y por qué, y al final resolverás casos reales en el mostrador de la farmacia.',
    wStep1: '<b>Observa y localiza.</b> Mira la animación y sitúa cada patología en su estructura.',
    wStep2: '<b>Comprende y relaciona.</b> Simuladores, imágenes y la tabla de causa, signos y tratamiento.',
    wStep3: '<b>Caso clínico.</b> Atiende a tres pacientes en la farmacia. Te recomendamos hacerlo después de las estaciones.',
    email: 'Correo del instituto', password: 'Contraseña del aula', open: 'Entra en la farmacia',
    note: 'El progreso se guarda en este navegador. Si cambias de ordenador o usas una ventana privada, empezarás de nuevo.',
    badEmail: 'Escribe tu correo acabado en @isvh.cat.', badPass: 'La contraseña no es correcta. Pídela al profesorado.',
    credit: 'Aplicación de Rubén Vallejo', aiCredit: 'Ilustraciones generadas con IA',
    introTitle: 'Cómo funciona <span>Sentits Clínic</span>',
    introLead: 'Cada estación tiene cuatro niveles que van de más fácil a más difícil. Si un nivel no te sale, lo puedes repetir.',
    ia: ['Cuatro niveles', 'Observa, Localiza, Comprende y Relaciona. Cada nivel desbloquea el siguiente.'],
    ib: ['Ayuda cuando la necesites', 'Pista en tres grados, glosario, ejemplo resuelto y descripción de cada imagen.'],
    ic: ['Caso clínico', 'Tres pacientes en el mostrador de la farmacia. Te recomendamos hacerlo al final.'],
    introScore: 'Acierto +10 · Error −3 · Pista −5 · Racha de 3: +15', start: 'Empieza',
    howto: 'Cómo se juega',
    mapTitle: 'Elige una estación', mapLead: 'Puedes hacerlas en el orden que quieras. El caso clínico ya está abierto: te recomendamos hacerlo al final.',
    levelNames: ['Observa', 'Localiza', 'Comprende', 'Relaciona'],
    stationDone: 'Completada', stationTodo: '{n} de 4 niveles', go: 'Entra', resume: 'Continúa', review: 'Repasa',
    caseTitle: 'Caso clínico en la farmacia', caseLocked: 'Faltan {n} estaciones: {list}.', caseOpen: 'Tres pacientes te esperan en el mostrador.',
    caseDone: 'Caso clínico resuelto', toReport: 'Informe final', toReportLocked: 'El informe se abre cuando acabas el caso clínico.',
    back: 'Mapa', objective: 'Objetivo', levelOf: 'Nivel {n} de 4',
    check: 'Comprueba', next: 'Siguiente', continue: 'Continúa', finish: 'Acaba el nivel', retry: 'Vuelve a intentarlo',
    hint: 'Pista', hintN: 'Pista {n}/3', hintCost: '−5 puntos', noMoreHints: 'Ya has usado las tres pistas.',
    hintElim: 'He quitado una opción incorrecta.', hintShow: 'Mira dónde parpadea la respuesta.',
    glossary: 'Glosario', glossaryTitle: 'Glosario de {st}', description: 'Descripción', close: 'Cierra',
    right: '¡Correcto!', wrong: 'No es correcto.', theAnswer: 'La respuesta es: {a}.',
    worked: 'Ejemplo resuelto', workedNote: 'Este ya está hecho para que veas cómo funciona. Haz tú el resto.',
    reviewCard: 'Repaso rápido', reviewOf: 'Lo has fallado dos veces. Recuérdalo:', reviewGot: 'Entendido',
    colCause: 'Causa', colSigns: 'Signos y síntomas', colTreat: 'Tratamiento', colDef: 'Definición', colPath: 'Patología',
    levelDone: 'Nivel superado', levelFail: 'Todavía no', accuracy: 'Acierto', passNote: 'Hace falta un 60 % de acierto para superar el nivel.',
    nextLevel: 'Nivel siguiente', toMap: 'Vuelve al mapa',
    capsule: 'Cápsula', capVideo: 'Vídeo', capSteps: 'Paso a paso', capNote: 'Vídeo sin voz: el texto de cada paso sale en pantalla. También puedes verlo paso a paso.', play: 'Reproduce', pause: 'Pausa', prev: 'Anterior', replay: 'Vuelve a verla',
    explore: 'Explora la lámina', exploreHint: 'Toca cada punto para ver qué es.', explored: '{n} de {t} explorados',
    view3d: 'Modelo 3D', view2d: 'Lámina', drag3d: 'Arrastra para girar el modelo.', no3d: 'Este dispositivo no puede mostrar el modelo 3D.',
    predictTitle: 'Antes de empezar: ¿qué crees?', predictNote: 'Aquí solo sumas: no hay penalización.',
    dragTitle: 'Arrastra cada cromo hasta el punto de la estructura que falla', dragHow: 'También puedes tocar un cromo y después el punto. Con teclado: Tab y Enter.', dragShared: 'Un mismo punto puede recibir más de un cromo.', dragRecall: 'Recuerda:',
    placed: '{n} de {t} colocados', chips: 'Cromos', target: 'Punto {n}',
    optTitle: 'Banco óptico', optLead: 'Mueve los deslizadores y elige la lente para que el foco caiga en la retina.',
    optLength: 'Longitud del ojo', optPower: 'Potencia del cristalino', optLens: 'Lente correctora', optNone: 'Ninguna',
    optConv: 'Convergente', optDiv: 'Divergente', optCyl: 'Cilíndrica', optFocusOn: 'El foco cae en la retina', optFocusFront: 'El foco cae delante de la retina', optFocusBack: 'El foco cae detrás de la retina', optFocusSplit: 'Hay dos focos: la imagen se deforma',
    optAsk: '¿Qué lente corrige este ojo?', optChallenge: 'Reto {n} de {t}',
    simTitle: 'Las gafas del paciente', simLead: 'Así ve la plaza una persona con una alteración. ¿Cuál es?', simWarn: 'Esta pantalla simula alteraciones visuales. Si te molesta, puedes continuar sin el efecto.', simOff: 'Quita el efecto', simOn: 'Muestra el efecto',
    simStruct: '¿Y qué estructura falla?',
    soundTitle: '¿Dónde se detiene el sonido?', soundLead: 'Toca el punto del camino donde se bloquea el sonido.', soundKind: '¿Qué tipo de hipoacusia es?',
    flavorTitle: '¿Gusto o sabor?', flavorLead: 'Mueve los deslizadores. El sabor surge de la suma de los sentidos.',
    flavorTaste: 'Gusto (botones gustativos)', flavorSmell: 'Olfato (nariz)', flavorTexture: 'Textura', flavorTemp: 'Temperatura', flavorMeter: 'Sabor percibido', flavorBasic: 'Gustos básicos',
    flavorQ1: 'Con la nariz tapada (olfato al mínimo), ¿qué pasa?', flavorQ2: '¿Y si se pierden los botones gustativos pero el olfato va bien?',
    wordTitle: 'Laboratorio de palabras', wordLead: 'Une un prefijo y una raíz para nombrar cada alteración.', wordPre: 'Prefijos', wordRoot: 'Raíces', wordBuild: 'Construye', wordAsk: '¿Qué palabra significa: «{d}»?',
    orderLead: 'Toca los pasos en el orden correcto.', orderReset: 'Vuelve a empezar',
    classifyLead: 'Arrastra cada tarjeta a su columna.',
    abcdeTitle: 'Detective ABCDE', abcdeLead: 'Marca los signos de alerta que ves y decide.', abcdeNone: 'Ningún signo de alerta',
    abcdeA: 'Asimetría', abcdeB: 'Bordes irregulares', abcdeC: 'Color desigual', abcdeD: 'Diámetro grande', abcdeE: 'Evolución',
    abcdeWatch: 'Vigilar', abcdeRefer: 'Derivar', abcdeEnote: 'La E (evolución) no se ve en una sola imagen: pregunta siempre si ha cambiado.',
    gridTitle: 'Completa la ficha de cada patología', gridLead: 'Arrastra cada tarjeta a su casilla. Las primeras filas te ayudan.',
    writeTitle: 'Escribe la palabra', writePh: 'Escribe aquí…', writeTypo: '¡Casi! Fíjate en la ortografía: {a}.',
    caseLead: 'Escucha al paciente y decide. Cada decisión tiene consecuencias.', patient: 'Paciente', step: 'Decisión {n} de {t}',
    caseNext: 'Siguiente paciente', caseFinish: 'Ver el informe',
    subject: 'MP0061 Anatomofisiología y patología básicas · FAR 1L · RA4', done: 'Informe de Sentits Clínic',
    totalTime: 'Tiempo total', langUsed: 'Idioma', grade: 'Nota', gradeOf: 'sobre 10',
    gradeLevels: { insuf: 'Insuficiente', suf: 'Suficiente', be: 'Bien', notable: 'Notable', excel: 'Sobresaliente' },
    gradeStations: 'Estaciones', gradeCase: 'Caso clínico', gradeHow: 'Nota = 1 + 9 × ({w1} % estaciones + {w2} % caso clínico). Acierto = aciertos ÷ (aciertos + errores + ½ pistas).',
    pointsTile: 'Puntos', errors: 'Errores', hints: 'Pistas', time: 'Tiempo',
    stationsTitle: 'Estaciones', starsCol: 'Estrellas', accCol: 'Acierto',
    indTitle: 'Indicadores de logro (CE de la RA4)', indDone: 'Logrado', indMid: 'En proceso', indNo: 'No logrado', indNone: 'Sin datos',
    weakTitle: 'Patologías para repasar', weakSlide: 'diapositiva {n}', noWeak: 'Ninguna patología con errores. ¡Muy bien!',
    caseLog: 'Decisiones del caso clínico',
    deliver: 'Entrega el informe', deliver1: 'Pulsa <b>Guarda en PDF</b> y elige «Guardar como PDF».', deliver2: 'Abre la tarea en Google Classroom.', deliver3: 'Adjunta el PDF y márcala como entregada.',
    pdf: 'Guarda en PDF', classroom: 'Abre Classroom', pdfName: 'Informe Sentits Clínic', footer: 'Anatomofisiología y patología básicas · CFGM Farmacia y Parafarmacia',
    stars: '{n} de 3 estrellas', aiImg: 'Ilustración generada con IA',
  },
};

export const INDICATORS = {
  I1: b('Identifica l\'estructura que falla', 'Identifica la estructura que falla'),
  I2: b('Explica el mecanisme del símptoma', 'Explica el mecanismo del síntoma'),
  I3: b('Relaciona causa, signes i tractament', 'Relaciona causa, signos y tratamiento'),
  I4: b('Usa la terminologia mèdica', 'Usa la terminología médica'),
  I5: b('Distingeix gust i sabor; olfacte i sabor', 'Distingue gusto y sabor; olfato y sabor'),
  I6: b('Relaciona sensibilitat, receptors i vies', 'Relaciona sensibilidad, receptores y vías'),
  I7: b('Reconeix criteris d\'alarma i deriva', 'Reconoce criterios de alarma y deriva'),
  I8: b('Aplica-ho a una consulta de farmàcia', 'Lo aplica a una consulta de farmacia'),
};

let lang = 'ca';
try { const l = localStorage.getItem(KEY); if (LANGS.includes(l)) lang = l; } catch { /* sense emmagatzematge */ }
export const getLang = () => lang;
export function setLang(l) {
  if (!LANGS.includes(l)) return;
  lang = l;
  try { localStorage.setItem(KEY, l); } catch { /* sense emmagatzematge */ }
  if (typeof document !== 'undefined') document.documentElement.lang = l;
}
if (typeof document !== 'undefined') document.documentElement.lang = lang;

/** Text de la interfície; {x} es substitueix pels valors donats. */
export function t(key, vars) {
  let v = UI[lang][key] ?? UI.ca[key] ?? key;
  if (vars && typeof v === 'string') v = v.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
  return v;
}
/** Tria la llengua activa d'un objecte {ca, es}. */
export const L = obj => (obj && typeof obj === 'object' && !Array.isArray(obj) && 'ca' in obj ? obj[lang] ?? obj.ca : obj);

/** Banderes en SVG (senyera de 9 franges; bandera d'Espanya sense escut, proporció 1:2:1). */
export const FLAGS = {
  ca: '<svg viewBox="0 0 27 18" aria-hidden="true"><rect width="27" height="18" fill="#FCDD09"/>' + [1, 3, 5, 7].map(i => `<rect y="${i * 2}" width="27" height="2" fill="#DA121A"/>`).join('') + '</svg>',
  es: '<svg viewBox="0 0 27 18" aria-hidden="true"><rect width="27" height="18" fill="#AA151B"/><rect y="4.5" width="27" height="9" fill="#F1BF00"/></svg>',
};
