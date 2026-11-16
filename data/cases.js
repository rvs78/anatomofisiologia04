// Cas clínic integrat al taulell de la farmàcia. Se'n sortegen 3 de 6.
// Cada pas: 3–4 opcions; ok = opció correcta; fb = retroacció (conseqüència) de cada opció.
// Font: dip. 45–48, 53–55, 86–87 i taules de patologies.
import { b } from '../i18n.js';

export const CASES = [
  {
    id: 'c1', slide: 86, who: b('Dona de 52 anys', 'Mujer de 52 años'),
    say: b('«Em costa llegir el prospecte de prop, tinc el nas congestionat i el menjar no em sap a res. A més, noto formigueig als peus.»',
      '«Me cuesta leer el prospecto de cerca, tengo la nariz congestionada y la comida no me sabe a nada. Además, noto hormigueo en los pies.»'),
    steps: [
      { q: b('La dificultat per llegir de prop, amb quina funció la relaciones?', 'La dificultad para leer de cerca, ¿con qué función la relacionas?'), ind: 'I8', c: 'presbicia',
        opts: [
          { t: b('Enfocament i acomodació del cristal·lí', 'Enfoque y acomodación del cristalino'), ok: true, fb: b('Correcte: cal relacionar-la amb l\'acomodació, sense afirmar una causa única.', 'Correcto: hay que relacionarla con la acomodación, sin afirmar una causa única.') },
          { t: b('Pressió intraocular elevada', 'Presión intraocular elevada'), fb: b('El glaucoma no es manifesta com a dificultat de lectura propera; al principi és asimptomàtic.', 'El glaucoma no se manifiesta como dificultad de lectura cercana; al principio es asintomático.') },
          { t: b('Alteració dels cons', 'Alteración de los conos'), fb: b('Els cons tenen a veure amb el color i el detall, no amb enfocar de prop.', 'Los conos tienen que ver con el color y el detalle, no con enfocar de cerca.') },
        ] },
      { q: b('El menjar no li sap a res. Què li expliques?', 'La comida no le sabe a nada. ¿Qué le explicas?'), ind: 'I5', c: 'sabor',
        opts: [
          { t: b('La congestió redueix l\'aportació de l\'olfacte al sabor', 'La congestión reduce el aporte del olfato al sabor'), ok: true, fb: b('Exacte: gust i sabor no són el mateix; els gustos bàsics continuen.', 'Exacto: gusto y sabor no son lo mismo; los gustos básicos continúan.') },
          { t: b('Ha perdut tots els botons gustatius', 'Ha perdido todos los botones gustativos'), fb: b('No: amb una rinitis els botons gustatius continuen funcionant [dip. 54].', 'No: con una rinitis los botones gustativos siguen funcionando [dip. 54].') },
          { t: b('És una agèusia segura', 'Es una ageusia segura'), fb: b('L\'agèusia és perdre el gust; aquí el problema principal és l\'olfacte.', 'La ageusia es perder el gusto; aquí el problema principal es el olfato.') },
        ] },
      { q: b('I el formigueig als peus?', '¿Y el hormigueo en los pies?'), ind: 'I7', c: 'parestesia',
        opts: [
          { t: b('És una parestèsia: cal derivar-la si persisteix', 'Es una parestesia: hay que derivarla si persiste'), ok: true, fb: b('Correcte: relaciona-la amb les vies sensitives i deriva si persisteix.', 'Correcto: relaciónala con las vías sensitivas y deriva si persiste.') },
          { t: b('És prurit: una crema hidratant ho resoldrà', 'Es prurito: una crema hidratante lo resolverá'), fb: b('El prurit és picor, no formigueig. Una parestèsia persistent s\'ha de valorar.', 'El prurito es picor, no hormigueo. Una parestesia persistente se debe valorar.') },
          { t: b('No cal fer res, és normal', 'No hace falta hacer nada, es normal'), fb: b('Un formigueig persistent pot indicar una alteració nerviosa: cal derivar.', 'Un hormigueo persistente puede indicar una alteración nerviosa: hay que derivar.') },
        ] },
    ],
  },
  {
    id: 'c2', slide: 47, who: b('Home de 30 anys', 'Hombre de 30 años'),
    say: b('«Ahir vaig passar tot el dia a la platja i tinc el nas i les galtes molt vermells.»', '«Ayer pasé todo el día en la playa y tengo la nariz y las mejillas muy rojas.»'),
    img: 'pell-cremada',
    steps: [
      { q: b('Quina pregunta és més útil per començar?', '¿Qué pregunta es más útil para empezar?'), ind: 'I8', c: 'cremada',
        opts: [
          { t: b('Té butllofes, febre o pren algun medicament fotosensibilitzant?', '¿Tiene ampollas, fiebre o toma algún medicamento fotosensibilizante?'), ok: true, fb: b('Bona anamnesi: busques signes de gravetat i fàrmacs implicats [dip. 47].', 'Buena anamnesis: buscas signos de gravedad y fármacos implicados [dip. 47].') },
          { t: b('Quin protector solar fa servir normalment?', '¿Qué protector solar usa normalmente?'), fb: b('És útil per a la prevenció, però primer cal valorar la gravetat.', 'Es útil para la prevención, pero primero hay que valorar la gravedad.') },
          { t: b('Té la pell grassa?', '¿Tiene la piel grasa?'), fb: b('No ajuda a valorar una cremada.', 'No ayuda a valorar una quemadura.') },
        ] },
      { q: b('No té butllofes ni febre i la pell és intacta. Què li recomanes?', 'No tiene ampollas ni fiebre y la piel está intacta. ¿Qué le recomiendas?'), ind: 'I7', c: 'cremada',
        opts: [
          { t: b('Refrescar, hidratar i protegir-se de nova exposició', 'Refrescar, hidratar y protegerse de nueva exposición'), ok: true, fb: b('Correcte per a una cremada lleu amb pell intacta [dip. 48].', 'Correcto para una quemadura leve con piel intacta [dip. 48].') },
          { t: b('Derivar urgentment a urgències', 'Derivar urgentemente a urgencias'), fb: b('Sense signes de gravetat no cal; deriva si apareixen febre o butllofes extenses.', 'Sin signos de gravedad no hace falta; deriva si aparecen fiebre o ampollas extensas.') },
          { t: b('Aplicar un producte irritant per «assecar» la pell', 'Aplicar un producto irritante para «secar» la piel'), fb: b('S\'han d\'evitar productes irritants [dip. 48].', 'Hay que evitar productos irritantes [dip. 48].') },
        ] },
    ],
  },
  {
    id: 'c3', slide: 25, who: b('Noia de 17 anys', 'Chica de 17 años'),
    say: b('«Tinc l\'orella tapada des que vaig anar a la piscina. No em fa mal ni tinc febre.»', '«Tengo el oído tapado desde que fui a la piscina. No me duele ni tengo fiebre.»'),
    img: 'timpa-tap',
    steps: [
      { q: b('Sense dolor ni febre, què és més probable?', 'Sin dolor ni fiebre, ¿qué es más probable?'), ind: 'I8', c: 'tap',
        opts: [
          { t: b('Tap de cerumen', 'Tapón de cerumen'), ok: true, fb: b('Orella tapada sense otàlgia ni febre orienta a tap de cerumen.', 'Oído tapado sin otalgia ni fiebre orienta a tapón de cerumen.') },
          { t: b('Otitis mitjana', 'Otitis media'), fb: b('L\'otitis mitjana sol causar otàlgia i febre.', 'La otitis media suele causar otalgia y fiebre.') },
          { t: b('Vertigen vestibular', 'Vértigo vestibular'), fb: b('El vertigen és sensació de gir, no d\'orella tapada.', 'El vértigo es sensación de giro, no de oído tapado.') },
        ] },
      { q: b('Quin tipus d\'hipoacúsia provoca?', '¿Qué tipo de hipoacusia provoca?'), ind: 'I2', c: 'transmissio',
        opts: [
          { t: b('De transmissió', 'De transmisión'), ok: true, fb: b('L\'obstrucció de l\'orella externa dificulta conduir el so.', 'La obstrucción del oído externo dificulta conducir el sonido.') },
          { t: b('Neurosensorial'), fb: b('La neurosensorial és per dany coclear o del nervi.', 'La neurosensorial es por daño coclear o del nervio.') },
        ] },
      { q: b('Què li ofereixes?', '¿Qué le ofreces?'), ind: 'I3', c: 'tap',
        opts: [
          { t: b('Cerumenolític o extracció professional segons el cas', 'Cerumenolítico o extracción profesional según el caso'), ok: true, fb: b('És el tractament de la taula de l\'oïda.', 'Es el tratamiento de la tabla del oído.') },
          { t: b('Antibiòtic', 'Antibiótico'), fb: b('No hi ha infecció: l\'antibiòtic no està indicat.', 'No hay infección: el antibiótico no está indicado.') },
          { t: b('Un audiòfon', 'Un audífono'), fb: b('El problema és un tap: primer cal treure\'l.', 'El problema es un tapón: primero hay que quitarlo.') },
        ] },
    ],
  },
  {
    id: 'c4', slide: 25, who: b('Home de 60 anys', 'Hombre de 60 años'),
    say: b('«Aquest matí m\'he llevat i no hi sento gens de l\'orella dreta.»', '«Esta mañana me he levantado y no oigo nada del oído derecho.»'),
    steps: [
      { q: b('Què fas?', '¿Qué haces?'), ind: 'I7', c: 'neurosensorial',
        opts: [
          { t: b('Derivar-lo a valoració mèdica urgent', 'Derivarlo a valoración médica urgente'), ok: true, fb: b('Una hipoacúsia sobtada requereix valoració urgent [taula oïda].', 'Una hipoacusia súbita requiere valoración urgente [tabla oído].') },
          { t: b('Recomanar un cerumenolític i esperar una setmana', 'Recomendar un cerumenolítico y esperar una semana'), fb: b('Si fos neurosensorial sobtada, esperar pot empitjorar el pronòstic.', 'Si fuera neurosensorial súbita, esperar puede empeorar el pronóstico.') },
          { t: b('Oferir-li un audiòfon', 'Ofrecerle un audífono'), fb: b('Primer cal un diagnòstic mèdic urgent.', 'Primero hace falta un diagnóstico médico urgente.') },
        ] },
      { q: b('Si es confirma un dany coclear, quin tipus d\'hipoacúsia és?', 'Si se confirma un daño coclear, ¿qué tipo de hipoacusia es?'), ind: 'I2', c: 'neurosensorial',
        opts: [
          { t: b('Neurosensorial'), ok: true, fb: b('Dany coclear o del nervi auditiu.', 'Daño coclear o del nervio auditivo.') },
          { t: b('De transmissió', 'De transmisión'), fb: b('La de transmissió és per l\'orella externa o mitjana.', 'La de transmisión es por el oído externo o medio.') },
        ] },
    ],
  },
  {
    id: 'c5', slide: 55, who: b('Dona de 68 anys', 'Mujer de 68 años'),
    say: b('«Em van receptar un col·liri per al glaucoma, però si no noto res, el puc deixar?»', '«Me recetaron un colirio para el glaucoma, pero si no noto nada, ¿lo puedo dejar?»'),
    img: 'fons-glaucoma',
    steps: [
      { q: b('Què li expliques sobre el glaucoma?', '¿Qué le explicas sobre el glaucoma?'), ind: 'I2', c: 'glaucoma',
        opts: [
          { t: b('Al principi sol ser asimptomàtic i lesiona el nervi òptic de mica en mica', 'Al principio suele ser asintomático y lesiona el nervio óptico poco a poco'), ok: true, fb: b('Per això no notar res no vol dir que estigui curat [taula vista].', 'Por eso no notar nada no quiere decir que esté curado [tabla vista].') },
          { t: b('Si no fa mal, és que està curat', 'Si no duele, es que está curado'), fb: b('Fals: el glaucoma avança sense símptomes i fa perdre camp visual.', 'Falso: el glaucoma avanza sin síntomas y hace perder campo visual.') },
          { t: b('És un problema del cristal·lí', 'Es un problema del cristalino'), fb: b('Això és la cataracta; el glaucoma afecta el nervi òptic.', 'Eso es la catarata; el glaucoma afecta al nervio óptico.') },
        ] },
      { q: b('Quin consell li dones?', '¿Qué consejo le das?'), ind: 'I8', c: 'glaucoma',
        opts: [
          { t: b('Seguir la pauta i la tècnica d\'aplicació tal com s\'ha prescrit', 'Seguir la pauta y la técnica de aplicación tal como se ha prescrito'), ok: true, fb: b('La pauta i la tècnica d\'ús importen [dip. 55].', 'La pauta y la técnica de uso importan [dip. 55].') },
          { t: b('Fer-lo servir només quan noti la vista cansada', 'Usarlo solo cuando note la vista cansada'), fb: b('El col·liri redueix la pressió de manera continuada; no és a demanda.', 'El colirio reduce la presión de forma continuada; no es a demanda.') },
          { t: b('Canviar-lo per unes ulleres de prop', 'Cambiarlo por unas gafas de cerca'), fb: b('Les ulleres no tracten el glaucoma.', 'Las gafas no tratan el glaucoma.') },
        ] },
    ],
  },
  {
    id: 'c6', slide: 45, who: b('Home de 45 anys', 'Hombre de 45 años'),
    say: b('«Tinc una piga a l\'esquena que la meva parella diu que ha canviat de color i de mida.»', '«Tengo un lunar en la espalda que mi pareja dice que ha cambiado de color y de tamaño.»'),
    img: 'lesio-4',
    steps: [
      { q: b('Quina lletra de la regla ABCDE descriu que ha canviat?', '¿Qué letra de la regla ABCDE describe que ha cambiado?'), ind: 'I4', c: 'melanoma',
        opts: [
          { t: b('E · Evolució', 'E · Evolución'), ok: true, fb: b('Evolució: canvis de mida, forma, color o símptomes.', 'Evolución: cambios de tamaño, forma, color o síntomas.') },
          { t: b('A · Asimetria', 'A · Asimetría'), fb: b('L\'asimetria és la forma, no el canvi en el temps.', 'La asimetría es la forma, no el cambio en el tiempo.') },
          { t: b('D · Diàmetre', 'D · Diámetro'), fb: b('El diàmetre és la mida, no el canvi en el temps.', 'El diámetro es el tamaño, no el cambio en el tiempo.') },
        ] },
      { q: b('Què fas?', '¿Qué haces?'), ind: 'I7', c: 'melanoma',
        opts: [
          { t: b('Derivar-lo a valoració dermatològica urgent', 'Derivarlo a valoración dermatológica urgente'), ok: true, fb: b('Una lesió pigmentada que canvia requereix valoració urgent [taula pell].', 'Una lesión pigmentada que cambia requiere valoración urgente [tabla piel].') },
          { t: b('Recomanar fotoprotector i tornar d\'aquí a 6 mesos', 'Recomendar fotoprotector y volver dentro de 6 meses'), fb: b('La fotoprotecció és prevenció, però aquesta lesió s\'ha de valorar ja.', 'La fotoprotección es prevención, pero esta lesión se debe valorar ya.') },
          { t: b('Aplicar una crema per aclarir la taca', 'Aplicar una crema para aclarar la mancha'), fb: b('Mai s\'ha de tractar una lesió sospitosa sense diagnòstic.', 'Nunca se debe tratar una lesión sospechosa sin diagnóstico.') },
        ] },
    ],
  },
];
