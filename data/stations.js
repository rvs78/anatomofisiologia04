// Cinc estacions × quatre nivells (N1 Observa · N2 Localitza · N3 Comprèn · N4 Relaciona).
// Font: presentació de la Unitat 4 (diapositives entre claudàtors). Cada ítem porta `ind` (indicador I1–I8, spec §5.3)
// i, quan escau, `c` (patologia de data/pathologies.js) per al repàs adaptatiu i l'informe.
// mcq: opts[0] és sempre la correcta (es barregen en pantalla).
import { b } from '../i18n.js';

export const STATIONS = [
  /* =================================================================== VISTA */
  {
    id: 'vista', organ: 'ull', color: '#0b7a83', soft: '#dcf2f3', has3d: 'ull',
    title: b('Vista'),
    tagline: b('Defectes de refracció, cataracta, glaucoma i altres alteracions', 'Defectos de refracción, catarata, glaucoma y otras alteraciones'),
    goals: {
      n1: b('Reconeixeràs les estructures de l\'ull que poden fallar.', 'Reconocerás las estructuras del ojo que pueden fallar.'),
      n2: b('Situaràs cada patologia a l\'estructura de l\'ull que afecta.', 'Situarás cada patología en la estructura del ojo que afecta.'),
      n3: b('Entendràs per què cada alteració produeix el seu símptoma.', 'Entenderás por qué cada alteración produce su síntoma.'),
      n4: b('Relacionaràs causa, signes i tractament de cada patologia.', 'Relacionarás causa, signos y tratamiento de cada patología.'),
    },
    capsule: [
      { part: 'cornia', t: b('La llum entra per la còrnia, la primera lent de l\'ull.', 'La luz entra por la córnea, la primera lente del ojo.') },
      { part: 'cristal', t: b('El cristal·lí canvia de curvatura per enfocar: és l\'acomodació.', 'El cristalino cambia de curvatura para enfocar: es la acomodación.') },
      { part: 'retina', t: b('La imatge ha de caure just a la retina, on hi ha cons i bastons.', 'La imagen debe caer justo en la retina, donde hay conos y bastones.') },
      { part: 'retina', t: b('Si cau davant, és miopia; si cau darrere, hipermetropia.', 'Si cae delante, es miopía; si cae detrás, hipermetropía.') },
      { part: 'cristal', t: b('Si el cristal·lí s\'enterboleix, és una cataracta.', 'Si el cristalino se enturbia, es una catarata.') },
      { part: 'nervi', t: b('Si es lesiona el nervi òptic, és un glaucoma: es perd camp visual.', 'Si se lesiona el nervio óptico, es un glaucoma: se pierde campo visual.') },
      { part: 'fovea', t: b('Si s\'altera la màcula, es perd la visió central.', 'Si se altera la mácula, se pierde la visión central.') },
    ],
    predict: [
      { q: b('Si l\'ull és més llarg del normal, on es forma la imatge?', 'Si el ojo es más largo de lo normal, ¿dónde se forma la imagen?'),
        opts: [b('Davant de la retina', 'Delante de la retina'), b('Darrere de la retina', 'Detrás de la retina'), b('Just a la retina', 'Justo en la retina')],
        why: b('L\'ull llarg fa que el focus quedi davant de la retina: és la miopia.', 'El ojo largo hace que el foco quede delante de la retina: es la miopía.'), ind: 'I2', c: 'miopia' },
      { q: b('Quina estructura perd transparència en una cataracta?', '¿Qué estructura pierde transparencia en una catarata?'),
        opts: [b('El cristal·lí', 'El cristalino'), b('La retina'), b('La còrnia', 'La córnea')],
        why: b('La cataracta és l\'opacificació del cristal·lí [dip. 15].', 'La catarata es la opacificación del cristalino [dip. 15].'), ind: 'I1', c: 'cataracta' },
    ],
    n2: [
      { c: 'cataracta', part: 'cristal', why: b('El cristal·lí s\'opacifica.', 'El cristalino se opacifica.') },
      { c: 'glaucoma', part: 'nervi', why: b('Es lesiona el nervi òptic.', 'Se lesiona el nervio óptico.') },
      { c: 'dmae', part: 'fovea', why: b('S\'altera la màcula, centre de la visió fina.', 'Se altera la mácula, centro de la visión fina.') },
      { c: 'daltonisme', part: 'retina', why: b('Fallen els fotopigments dels cons, a la retina.', 'Fallan los fotopigmentos de los conos, en la retina.') },
      { c: 'astigmatisme', part: 'cornia', why: b('La còrnia té una curvatura irregular.', 'La córnea tiene una curvatura irregular.') },
      { c: 'presbicia', part: 'ciliar', why: b('El cos ciliar no aconsegueix que el cristal·lí, menys elàstic, s\'acomodi de prop.', 'El cuerpo ciliar no consigue que el cristalino, menos elástico, se acomode de cerca.') },
      { c: 'estrabisme', part: 'muscul', why: b('Els músculs extraoculars no mantenen alineats els dos ulls.', 'Los músculos extraoculares no mantienen alineados los dos ojos.') },
    ],
    n3: [
      { type: 'optics' },
      { type: 'visionsim', items: [
        { filter: 'cataracta', c: 'cataracta' }, { filter: 'glaucoma', c: 'glaucoma' }, { filter: 'dmae', c: 'dmae' },
        { filter: 'daltonisme', c: 'daltonisme' }, { filter: 'estrabisme', c: 'estrabisme' },
      ] },
      { type: 'mcq', items: [
        { img: 'fons-glaucoma', q: b('Fons d\'ull: el disc òptic és pàl·lid i amb una excavació molt gran. Què suggereix?', 'Fondo de ojo: el disco óptico es pálido y con una excavación muy grande. ¿Qué sugiere?'),
          opts: [b('Glaucoma'), b('Degeneració macular', 'Degeneración macular'), b('Ull sa', 'Ojo sano')],
          why: b('El glaucoma lesiona el nervi òptic, que surt pel disc òptic.', 'El glaucoma lesiona el nervio óptico, que sale por el disco óptico.'), ind: 'I2', c: 'glaucoma' },
        { img: 'fons-dmae', q: b('Fons d\'ull: dipòsits groguencs i taques de pigment al centre. Quina visió es perdrà?', 'Fondo de ojo: depósitos amarillentos y manchas de pigmento en el centro. ¿Qué visión se perderá?'),
          opts: [b('La visió central', 'La visión central'), b('La visió perifèrica', 'La visión periférica'), b('La visió dels colors només', 'Solo la visión de los colores')],
          why: b('La màcula és al centre de la retina: la degeneració macular afecta la visió central.', 'La mácula está en el centro de la retina: la degeneración macular afecta a la visión central.'), ind: 'I2', c: 'dmae' },
        { img: 'ull-cataracta', q: b('La pupil·la d\'aquest ull es veu blanquinosa. Quin és el tractament quan està indicat?', 'La pupila de este ojo se ve blanquecina. ¿Cuál es el tratamiento cuando está indicado?'),
          opts: [b('Cirurgia amb substitució del cristal·lí', 'Cirugía con sustitución del cristalino'), b('Col·liris hipotensors', 'Colirios hipotensores'), b('Lents divergents', 'Lentes divergentes')],
          why: b('És una cataracta: el cristal·lí opac se substitueix per una lent.', 'Es una catarata: el cristalino opaco se sustituye por una lente.'), ind: 'I3', c: 'cataracta' },
      ] },
    ],
    n4: {
      cols: ['cause', 'signs', 'treat'],
      rows: ['miopia', 'hipermetropia', 'presbicia', 'cataracta', 'glaucoma', 'dmae'],
      write: [
        { q: b('Com s\'anomena la visió doble que pot aparèixer en l\'estrabisme?', '¿Cómo se llama la visión doble que puede aparecer en el estrabismo?'),
          answer: b('diplopia', 'diplopía'), syn: { ca: ['diplopía'], es: ['diplopia'] }, ind: 'I4', c: 'estrabisme',
          why: b('Diplopia: visió doble (*diplo-*, doble; *-òpia*, visió).', 'Diplopía: visión doble (*diplo-*, doble; *-opía*, visión).') },
        { q: b('Quin defecte apareix amb l\'edat perquè el cristal·lí perd elasticitat?', '¿Qué defecto aparece con la edad porque el cristalino pierde elasticidad?'),
          answer: b('presbícia', 'presbicia'), syn: { ca: ['presbicia', 'vista cansada'], es: ['presbícia', 'vista cansada'] }, ind: 'I4', c: 'presbicia',
          why: b('La presbícia disminueix la capacitat d\'acomodació.', 'La presbicia disminuye la capacidad de acomodación.') },
      ],
    },
  },

  /* =================================================================== OÏDA */
  {
    id: 'oida', organ: 'orella', color: '#b1500f', soft: '#fbe8da', has3d: 'oid',
    title: b('Oïda', 'Oído'),
    tagline: b('Hipoacúsies, otitis, tap de cerumen i vertigen', 'Hipoacusias, otitis, tapón de cerumen y vértigo'),
    goals: {
      n1: b('Seguiràs el camí del so i veuràs on es pot bloquejar.', 'Seguirás el camino del sonido y verás dónde se puede bloquear.'),
      n2: b('Situaràs cada alteració a la part de l\'orella on passa.', 'Situarás cada alteración en la parte del oído donde ocurre.'),
      n3: b('Distingiràs la hipoacúsia de transmissió de la neurosensorial.', 'Distinguirás la hipoacusia de transmisión de la neurosensorial.'),
      n4: b('Relacionaràs causa, signes i tractament de cada trastorn.', 'Relacionarás causa, signos y tratamiento de cada trastorno.'),
    },
    capsule: [
      { part: 'pavello', t: b('El pavelló recull el so i el conducte el porta fins al timpà.', 'El pabellón recoge el sonido y el conducto lo lleva hasta el tímpano.') },
      { part: 'conducte', t: b('Un tap de cerumen aquí bloqueja el so: orella tapada.', 'Un tapón de cerumen aquí bloquea el sonido: oído tapado.') },
      { part: 'caixa', t: b('A l\'orella mitjana, els ossets transmeten la vibració. L\'otitis la inflama.', 'En el oído medio, los huesecillos transmiten la vibración. La otitis lo inflama.') },
      { part: 'coclea', t: b('A la còclea, les cèl·lules ciliades converteixen la vibració en impulsos.', 'En la cóclea, las células ciliadas convierten la vibración en impulsos.') },
      { part: 'nervi8', t: b('Si falla la còclea o el nervi auditiu, la hipoacúsia és neurosensorial.', 'Si falla la cóclea o el nervio auditivo, la hipoacusia es neurosensorial.') },
      { part: 'canals', t: b('Els canals semicirculars detecten el gir del cap: si fallen, hi ha vertigen.', 'Los conductos semicirculares detectan el giro de la cabeza: si fallan, hay vértigo.') },
    ],
    predict: [
      { q: b('Un tap de cerumen impedeix que el so arribi al timpà. Quin tipus d\'hipoacúsia és?', 'Un tapón de cerumen impide que el sonido llegue al tímpano. ¿Qué tipo de hipoacusia es?'),
        opts: [b('De transmissió', 'De transmisión'), b('Neurosensorial'), b('Vestibular')],
        why: b('El problema és conduir el so per l\'orella externa o mitjana.', 'El problema es conducir el sonido por el oído externo o medio.'), ind: 'I2', c: 'transmissio' },
      { q: b('Quina estructura de l\'orella interna detecta el gir del cap?', '¿Qué estructura del oído interno detecta el giro de la cabeza?'),
        opts: [b('Els canals semicirculars', 'Los conductos semicirculares'), b('La còclea', 'La cóclea'), b('El timpà', 'El tímpano')],
        why: b('Canals semicirculars: acceleració angular [dip. 24].', 'Conductos semicirculares: aceleración angular [dip. 24].'), ind: 'I1', c: 'vertigen' },
    ],
    n2: [
      { c: 'tap', part: 'conducte', why: b('El cerumen s\'acumula al conducte auditiu extern.', 'El cerumen se acumula en el conducto auditivo externo.') },
      { c: 'otitis', part: 'caixa', why: b('S\'inflama l\'orella mitjana, on hi ha els ossets.', 'Se inflama el oído medio, donde están los huesecillos.') },
      { c: 'neurosensorial', label: b('Dany coclear', 'Daño coclear'), part: 'coclea', why: b('Lesió de les cèl·lules ciliades: hipoacúsia neurosensorial.', 'Lesión de las células ciliadas: hipoacusia neurosensorial.') },
      { c: 'neurosensorial', label: b('Dany del nervi auditiu', 'Daño del nervio auditivo'), part: 'nervi8', why: b('També és hipoacúsia neurosensorial.', 'También es hipoacusia neurosensorial.') },
      { c: 'vertigen', part: 'canals', why: b('Alteració del sistema vestibular.', 'Alteración del sistema vestibular.') },
    ],
    n3: [
      { type: 'soundpath', scenarios: [
        { c: 'tap', stop: 1, kind: 'transmissio',
          t: b('Na Laia nota l\'orella tapada després de la dutxa. Té un tap de cerumen.', 'Laia nota el oído tapado después de la ducha. Tiene un tapón de cerumen.') },
        { c: 'otitis', stop: 3, kind: 'transmissio',
          t: b('En Pau té febre i dolor d\'orella: otitis mitjana amb líquid darrere el timpà.', 'Pau tiene fiebre y dolor de oído: otitis media con líquido detrás del tímpano.') },
        { c: 'neurosensorial', stop: 4, kind: 'neurosensorial',
          t: b('La Sra. Rosa sent els sons però li costa entendre les paraules: les cèl·lules ciliades estan danyades.', 'La Sra. Rosa oye los sonidos pero le cuesta entender las palabras: las células ciliadas están dañadas.') },
        { c: 'neurosensorial', stop: 5, kind: 'neurosensorial',
          t: b('En Joan té una lesió del nervi auditiu.', 'Joan tiene una lesión del nervio auditivo.') },
      ] },
      { type: 'mcq', items: [
        { img: 'timpa-otitis', q: b('Otoscòpia: timpà vermell i abombat, amb líquid groguenc darrere. Què és?', 'Otoscopia: tímpano rojo y abombado, con líquido amarillento detrás. ¿Qué es?'),
          opts: [b('Otitis mitjana', 'Otitis media'), b('Tap de cerumen', 'Tapón de cerumen'), b('Timpà sa', 'Tímpano sano')],
          why: b('Inflamació i líquid a l\'orella mitjana: otitis mitjana.', 'Inflamación y líquido en el oído medio: otitis media.'), ind: 'I2', c: 'otitis' },
        { img: 'timpa-tap', q: b('Otoscòpia: el conducte està gairebé tapat per cera marró. Què recomanaries?', 'Otoscopia: el conducto está casi tapado por cera marrón. ¿Qué recomendarías?'),
          opts: [b('Cerumenolítics o extracció professional', 'Cerumenolíticos o extracción profesional'), b('Antibiòtic oral', 'Antibiótico oral'), b('Un audiòfon', 'Un audífono')],
          why: b('El tap de cerumen es tracta amb cerumenolítics o extracció [taula oïda].', 'El tapón de cerumen se trata con cerumenolíticos o extracción [tabla oído].'), ind: 'I3', c: 'tap' },
        { img: 'timpa-sa', q: b('Otoscòpia: membrana grisa perlada i translúcida, amb el mànec del martell visible. Com és?', 'Otoscopia: membrana gris perlada y translúcida, con el mango del martillo visible. ¿Cómo es?'),
          opts: [b('Un timpà sa', 'Un tímpano sano'), b('Una otitis mitjana', 'Una otitis media'), b('Un tap de cerumen', 'Un tapón de cerumen')],
          why: b('Un timpà sa és translúcid i deixa veure el martell.', 'Un tímpano sano es translúcido y deja ver el martillo.'), ind: 'I1' },
      ] },
      { type: 'classify', title: b('Transmissió o neurosensorial?', '¿Transmisión o neurosensorial?'), ind: 'I2',
        bins: [['transmissio', b('Transmissió', 'Transmisión')], ['neurosensorial', b('Neurosensorial')]],
        items: [
          [b('Tap de cerumen', 'Tapón de cerumen'), 'transmissio', 'tap'],
          [b('Otitis mitjana', 'Otitis media'), 'transmissio', 'otitis'],
          [b('Obstrucció de l\'orella externa', 'Obstrucción del oído externo'), 'transmissio', 'transmissio'],
          [b('Lesió de les cèl·lules ciliades', 'Lesión de las células ciliadas'), 'neurosensorial', 'neurosensorial'],
          [b('Dany del nervi auditiu', 'Daño del nervio auditivo'), 'neurosensorial', 'neurosensorial'],
          [b('Pèrdua sobtada d\'audició en una orella', 'Pérdida súbita de audición en un oído'), 'neurosensorial', 'neurosensorial'],
        ] },
    ],
    n4: {
      cols: ['cause', 'signs', 'treat'],
      rows: ['transmissio', 'neurosensorial', 'otitis', 'tap', 'vertigen'],
      write: [
        { q: b('Com s\'anomena el dolor d\'orella?', '¿Cómo se llama el dolor de oído?'),
          answer: b('otàlgia', 'otalgia'), syn: { ca: ['otalgia'], es: ['otàlgia'] }, ind: 'I4', c: 'otitis',
          why: b('*Ot-* orella + *-àlgia* dolor.', '*Ot-* oído + *-algia* dolor.') },
        { q: b('Quin signe auditiu obliga a fer una valoració urgent?', '¿Qué signo auditivo obliga a hacer una valoración urgente?'),
          answer: b('hipoacúsia sobtada', 'hipoacusia súbita'), syn: { ca: ['hipoacusia sobtada', 'sordesa sobtada', 'perdua sobtada'], es: ['sordera súbita', 'pérdida súbita', 'hipoacusia subita'] }, ind: 'I7', c: 'neurosensorial',
          why: b('La hipoacúsia neurosensorial sobtada requereix valoració urgent [taula oïda].', 'La hipoacusia neurosensorial súbita requiere valoración urgente [tabla oído].') },
      ],
    },
  },

  /* =================================================================== OLFACTE */
  {
    id: 'olfacte', organ: 'nas', color: '#5b6f1e', soft: '#ecf1d8',
    title: b('Olfacte', 'Olfato'),
    tagline: b('Hipòsmia, anòsmia i paròsmia', 'Hiposmia, anosmia y parosmia'),
    goals: {
      n1: b('Seguiràs el camí de les molècules oloroses fins al bulb.', 'Seguirás el camino de las moléculas olorosas hasta el bulbo.'),
      n2: b('Situaràs on actua cada causa d\'alteració de l\'olfacte.', 'Situarás dónde actúa cada causa de alteración del olfato.'),
      n3: b('Faràs servir els prefixos i les arrels per anomenar les alteracions.', 'Usarás los prefijos y las raíces para nombrar las alteraciones.'),
      n4: b('Relacionaràs causa, signes i tractament.', 'Relacionarás causa, signos y tratamiento.'),
    },
    capsule: [
      { part: 'narina', t: b('Les molècules oloroses entren amb l\'aire inspirat.', 'Las moléculas olorosas entran con el aire inspirado.') },
      { part: 'epiteli', t: b('Es dissolen en el moc de la mucosa olfactòria, al sostre de les fosses nasals.', 'Se disuelven en el moco de la mucosa olfativa, en el techo de las fosas nasales.') },
      { part: 'cribosa', t: b('Els axons del nervi olfactori travessen la làmina cribosa.', 'Los axones del nervio olfatorio atraviesan la lámina cribosa.') },
      { part: 'bulb', t: b('Arriben al bulb olfactori i, pel tracte, a l\'escorça.', 'Llegan al bulbo olfatorio y, por el tracto, a la corteza.') },
      { part: 'cinf', t: b('Si la mucosa s\'inflama (rinitis), l\'aire no arriba al sostre: hipòsmia.', 'Si la mucosa se inflama (rinitis), el aire no llega al techo: hiposmia.') },
    ],
    predict: [
      { q: b('Amb el nas congestionat, per què costa olorar?', 'Con la nariz congestionada, ¿por qué cuesta oler?'),
        opts: [b('Les molècules no arriben a l\'epiteli olfactori', 'Las moléculas no llegan al epitelio olfatorio'), b('Desapareix el bulb olfactori', 'Desaparece el bulbo olfatorio'), b('La llengua deixa de funcionar', 'La lengua deja de funcionar')],
        why: b('La congestió dificulta que les molècules arribin als receptors [dip. 54].', 'La congestión dificulta que las moléculas lleguen a los receptores [dip. 54].'), ind: 'I2', c: 'hiposmia' },
    ],
    n2: [
      { c: 'hiposmia', label: b('Hipòsmia per rinitis', 'Hiposmia por rinitis'), part: 'cinf', why: b('La mucosa i els cornets s\'inflamen i tapen el pas de l\'aire.', 'La mucosa y los cornetes se inflaman y tapan el paso del aire.') },
      { c: 'anosmia', label: b('Anòsmia postvírica', 'Anosmia posvírica'), part: 'epiteli', why: b('El virus danya l\'epiteli olfactori.', 'El virus daña el epitelio olfatorio.') },
      { c: 'anosmia', label: b('Anòsmia per traumatisme', 'Anosmia por traumatismo'), part: 'cribosa', why: b('El cop pot tallar els axons que travessen la làmina cribosa.', 'El golpe puede cortar los axones que atraviesan la lámina cribosa.') },
      { c: 'parosmia', part: 'bulb', why: b('S\'alteren les vies olfactives.', 'Se alteran las vías olfativas.') },
      { c: 'anosmia', label: b('Anòsmia d\'origen neurològic', 'Anosmia de origen neurológico'), part: 'tracte', why: b('Falla la via nerviosa cap a l\'escorça.', 'Falla la vía nerviosa hacia la corteza.') },
    ],
    n3: [
      { type: 'order', ind: 'I5', title: b('Ordena el procés olfactiu', 'Ordena el proceso olfativo'), steps: [
        b('Les molècules entren amb l\'aire', 'Las moléculas entran con el aire'),
        b('Es dissolen en el moc', 'Se disuelven en el moco'),
        b('S\'uneixen als cilis dels receptors', 'Se unen a los cilios de los receptores'),
        b('L\'impuls travessa la làmina cribosa', 'El impulso atraviesa la lámina cribosa'),
        b('Arriba al bulb i a l\'escorça', 'Llega al bulbo y a la corteza'),
      ] },
      { type: 'wordlab', ind: 'I4', items: [
        { pre: 'hipo', root: 'osmia', c: 'hiposmia' }, { pre: 'a', root: 'osmia', c: 'anosmia' }, { pre: 'par', root: 'osmia', c: 'parosmia' },
        { pre: 'hipo', root: 'geusia', c: 'hipogeusia' }, { pre: 'a', root: 'geusia', c: 'ageusia' }, { pre: 'dis', root: 'geusia', c: 'disgeusia' },
      ] },
      { type: 'mcq', items: [
        { img: 'nas-rinitis', q: b('A la dreta, la rinitis. Quina alteració de l\'olfacte provoca sovint?', 'A la derecha, la rinitis. ¿Qué alteración del olfato provoca a menudo?'),
          opts: [b('Hipòsmia', 'Hiposmia'), b('Paròsmia', 'Parosmia'), b('Agèusia', 'Ageusia')],
          why: b('La rinitis redueix la capacitat d\'olorar: hipòsmia.', 'La rinitis reduce la capacidad de oler: hiposmia.'), ind: 'I3', c: 'hiposmia' },
      ] },
    ],
    n4: {
      cols: ['cause', 'signs', 'treat'],
      rows: ['hiposmia', 'anosmia', 'parosmia'],
      write: [
        { q: b('Com s\'anomena la pèrdua total de l\'olfacte?', '¿Cómo se llama la pérdida total del olfato?'),
          answer: b('anòsmia', 'anosmia'), syn: { ca: ['anosmia'], es: ['anòsmia'] }, ind: 'I4', c: 'anosmia',
          why: b('*A-* sense + *-òsmia* olfacte.', '*A-* sin + *-osmia* olfato.') },
        { q: b('Com s\'anomena percebre distorsionades les olors conegudes?', '¿Cómo se llama percibir distorsionados los olores conocidos?'),
          answer: b('paròsmia', 'parosmia'), syn: { ca: ['parosmia'], es: ['paròsmia'] }, ind: 'I4', c: 'parosmia',
          why: b('*Par-* alterat + *-òsmia* olfacte.', '*Par-* alterado + *-osmia* olfato.') },
      ],
    },
  },

  /* =================================================================== GUST */
  {
    id: 'gust', organ: 'llengua', color: '#a3245e', soft: '#f8e1ec',
    title: b('Gust', 'Gusto'),
    tagline: b('Hipogèusia, agèusia, disgèusia i el sabor', 'Hipogeusia, ageusia, disgeusia y el sabor'),
    goals: {
      n1: b('Veuràs com un aliment es converteix en gust.', 'Verás cómo un alimento se convierte en gusto.'),
      n2: b('Situaràs on passa cada pas del gust.', 'Situarás dónde ocurre cada paso del gusto.'),
      n3: b('Diferenciaràs el gust del sabor.', 'Diferenciarás el gusto del sabor.'),
      n4: b('Classificaràs les alteracions del gust.', 'Clasificarás las alteraciones del gusto.'),
    },
    capsule: [
      { part: 'caliciformes', t: b('En mastegar, l\'aliment es dissol en la saliva i arriba a les papil·les.', 'Al masticar, el alimento se disuelve en la saliva y llega a las papilas.') },
      { part: 'porus', t: b('La substància entra pel porus gustatiu del botó.', 'La sustancia entra por el poro gustativo del botón.') },
      { part: 'gustativa', t: b('Les cèl·lules gustatives detecten els 5 gustos: dolç, salat, àcid, amarg i umami.', 'Las células gustativas detectan los 5 gustos: dulce, salado, ácido, amargo y umami.') },
      { part: 'fibra', t: b('Els nervis VII, IX i X porten l\'impuls al tronc encefàlic.', 'Los nervios VII, IX y X llevan el impulso al tronco encefálico.') },
      { part: 'apex', t: b('Els gustos no ocupen zones exclusives de la llengua.', 'Los gustos no ocupan zonas exclusivas de la lengua.') },
    ],
    predict: [
      { q: b('Amb un refredat, el menjar sembla insípid. Per què?', 'Con un resfriado, la comida parece insípida. ¿Por qué?'),
        opts: [b('Falla l\'aportació de l\'olfacte al sabor', 'Falla el aporte del olfato al sabor'), b('Desapareixen els botons gustatius', 'Desaparecen los botones gustativos'), b('La saliva deixa de dissoldre', 'La saliva deja de disolver')],
        why: b('El sabor integra gust i olfacte; els gustos bàsics es mantenen [dip. 54].', 'El sabor integra gusto y olfato; los gustos básicos se mantienen [dip. 54].'), ind: 'I5', c: 'sabor' },
    ],
    n2: [
      { label: b('Entrada de la substància dissolta', 'Entrada de la sustancia disuelta'), part: 'porus', why: b('Porus gustatiu.', 'Poro gustativo.') },
      { label: b('Detecta els 5 gustos', 'Detecta los 5 gustos'), part: 'gustativa', why: b('Les microvellositats de la cèl·lula gustativa.', 'Las microvellosidades de la célula gustativa.') },
      { label: b('Porta l\'impuls (nervis VII, IX, X)', 'Lleva el impulso (nervios VII, IX, X)'), part: 'fibra', why: b('Fibra nerviosa.', 'Fibra nerviosa.') },
      { label: b('Conté les cèl·lules receptores', 'Contiene las células receptoras'), part: 'boto', why: b('El botó gustatiu.', 'El botón gustativo.') },
      { label: b('Papil·les grans en forma de V', 'Papilas grandes en forma de V'), part: 'caliciformes', why: b('Papil·les caliciformes, davant del solc terminal.', 'Papilas caliciformes, delante del surco terminal.') },
    ],
    n3: [
      { type: 'flavor' },
      { type: 'mcq', items: [
        { q: b('Un llibre antic diu que el dolç només es detecta a la punta de la llengua. És cert?', 'Un libro antiguo dice que el dulce solo se detecta en la punta de la lengua. ¿Es cierto?'),
          opts: [b('No: els gustos no ocupen zones exclusives', 'No: los gustos no ocupan zonas exclusivas'), b('Sí, cada gust té la seva zona', 'Sí, cada gusto tiene su zona'), b('Només és cert per a l\'amarg', 'Solo es cierto para el amargo')],
          why: b('El «mapa de la llengua» és un mite [dip. 29].', 'El «mapa de la lengua» es un mito [dip. 29].'), ind: 'I5' },
        { q: b('Quins nervis porten la informació gustativa?', '¿Qué nervios llevan la información gustativa?'),
          opts: [b('Facial (VII), glossofaringi (IX) i vague (X)', 'Facial (VII), glosofaríngeo (IX) y vago (X)'), b('Òptic (II) i olfactori (I)', 'Óptico (II) y olfatorio (I)'), b('Vestibulococlear (VIII)', 'Vestibulococlear (VIII)')],
          why: b('VII, IX i X porten el gust al tronc encefàlic [dip. 29].', 'VII, IX y X llevan el gusto al tronco encefálico [dip. 29].'), ind: 'I1' },
      ] },
    ],
    n4: {
      cols: ['def'],
      rows: ['hipogeusia', 'ageusia', 'disgeusia', 'sabor'],
      classify: { title: b('Quina alteració és?', '¿Qué alteración es?'), ind: 'I5',
        bins: [['hipogeusia', b('Hipogèusia', 'Hipogeusia')], ['ageusia', b('Agèusia', 'Ageusia')], ['disgeusia', b('Disgèusia', 'Disgeusia')], ['sabor', b('Menys sabor (olfacte)', 'Menos sabor (olfato)')]],
        items: [
          [b('«Noto els gustos, però molt fluixos»', '«Noto los gustos, pero muy flojos»'), 'hipogeusia', 'hipogeusia'],
          [b('«No noto cap gust, ni el salat»', '«No noto ningún gusto, ni el salado»'), 'ageusia', 'ageusia'],
          [b('«Tot em sap a metall»', '«Todo me sabe a metal»'), 'disgeusia', 'disgeusia'],
          [b('«Amb el refredat, la sopa no em sap a res, però noto la sal»', '«Con el resfriado, la sopa no me sabe a nada, pero noto la sal»'), 'sabor', 'sabor'],
        ] },
      write: [
        { q: b('Com s\'anomena la pèrdua total del gust?', '¿Cómo se llama la pérdida total del gusto?'),
          answer: b('agèusia', 'ageusia'), syn: { ca: ['ageusia'], es: ['agèusia'] }, ind: 'I4', c: 'ageusia',
          why: b('*A-* sense + *-gèusia* gust.', '*A-* sin + *-geusia* gusto.') },
      ],
    },
  },

  /* =================================================================== TACTE I PELL */
  {
    id: 'pell', organ: 'pell', color: '#7a4a2a', soft: '#f4e6da',
    title: b('Tacte i pell', 'Tacto y piel'),
    tagline: b('Acne, furunculosi, psoriasi, melanoma, cremada i sensibilitat', 'Acné, forunculosis, psoriasis, melanoma, quemadura y sensibilidad'),
    goals: {
      n1: b('Relacionaràs cada capa de la pell amb la seva funció i alteració.', 'Relacionarás cada capa de la piel con su función y alteración.'),
      n2: b('Situaràs cada patologia a l\'estructura de la pell que afecta.', 'Situarás cada patología en la estructura de la piel que afecta.'),
      n3: b('Aplicaràs la regla ABCDE i decidiràs quan derivar.', 'Aplicarás la regla ABCDE y decidirás cuándo derivar.'),
      n4: b('Relacionaràs causa, signes i tractament.', 'Relacionarás causa, signos y tratamiento.'),
    },
    capsule: [
      { part: 'epidermis', t: b('Epidermis: barrera i renovació. Si es renova massa ràpid, psoriasi.', 'Epidermis: barrera y renovación. Si se renueva demasiado rápido, psoriasis.') },
      { part: 'sebacia', t: b('Fol·licle i glàndula sebàcia: el sèu obstrueix el fol·licle a l\'acne.', 'Folículo y glándula sebácea: el sebo obstruye el folículo en el acné.') },
      { part: 'pel', t: b('Si el fol·licle s\'infecta en profunditat, és un furóncol.', 'Si el folículo se infecta en profundidad, es un forúnculo.') },
      { part: 'melanocits', t: b('Els melanòcits fan la melanina: vigila les lesions que canvien (ABCDE).', 'Los melanocitos hacen la melanina: vigila las lesiones que cambian (ABCDE).') },
      { part: 'lliures', t: b('Les terminacions lliures capten dolor, temperatura i picor (prurit).', 'Las terminaciones libres captan dolor, temperatura y picor (prurito).') },
      { part: 'meissner', t: b('Si fallen receptors o vies: hipoestèsia (menys sensibilitat) o parestèsia (formigueig).', 'Si fallan receptores o vías: hipoestesia (menos sensibilidad) o parestesia (hormigueo).') },
    ],
    predict: [
      { q: b('En quina capa hi ha els melanòcits?', '¿En qué capa están los melanocitos?'),
        opts: [b('Epidermis'), b('Hipodermis'), b('Dermis')],
        why: b('Els melanòcits són a l\'epidermis i fan la melanina [dip. 34].', 'Los melanocitos están en la epidermis y hacen la melanina [dip. 34].'), ind: 'I1', c: 'melanoma' },
    ],
    n2: [
      { c: 'acne', part: 'sebacia', why: b('Unitat pilosebàcia: sèu i obstrucció.', 'Unidad pilosebácea: sebo y obstrucción.') },
      { c: 'furunculosi', part: 'pel', why: b('Infecció profunda del fol·licle pilós.', 'Infección profunda del folículo piloso.') },
      { c: 'psoriasi', part: 'epidermis', why: b('Renovació epidèrmica accelerada.', 'Renovación epidérmica acelerada.') },
      { c: 'melanoma', part: 'melanocits', why: b('Es transformen els melanòcits, les cèl·lules de l\'epidermis que fan la melanina.', 'Se transforman los melanocitos, las células de la epidermis que hacen la melanina.') },
      { c: 'prurit', part: 'lliures', why: b('Les terminacions nervioses lliures capten la picor.', 'Las terminaciones nerviosas libres captan el picor.') },
    ],
    n3: [
      { type: 'mcq', items: [
        { img: 'pell-acne', q: b('Fol·licle tapat per sèu (comedó) i un altre amb pus. Què és?', 'Folículo tapado por sebo (comedón) y otro con pus. ¿Qué es?'),
          opts: [b('Acne', 'Acné'), b('Psoriasi', 'Psoriasis'), b('Melanoma')], why: b('Comedons, pàpules i pústules: acne.', 'Comedones, pápulas y pústulas: acné.'), ind: 'I2', c: 'acne' },
        { img: 'pell-furuncle', q: b('Infecció profunda del fol·licle amb una bossa de pus. Què és?', 'Infección profunda del folículo con una bolsa de pus. ¿Qué es?'),
          opts: [b('Furunculosi', 'Forunculosis'), b('Acne', 'Acné'), b('Cremada solar', 'Quemadura solar')], why: b('Nòdul dolorós amb pus: furóncol.', 'Nódulo doloroso con pus: forúnculo.'), ind: 'I2', c: 'furunculosi' },
        { img: 'pell-psoriasi', q: b('Epidermis molt gruixuda i escates blanques. Què és?', 'Epidermis muy gruesa y escamas blancas. ¿Qué es?'),
          opts: [b('Psoriasi', 'Psoriasis'), b('Furunculosi', 'Forunculosis'), b('Prurit', 'Prurito')], why: b('Renovació accelerada amb plaques i escates: psoriasi.', 'Renovación acelerada con placas y escamas: psoriasis.'), ind: 'I2', c: 'psoriasi' },
      ] },
      { type: 'abcde', items: [
        { img: 'lesio-1', alarm: [], refer: false },
        { img: 'lesio-4', alarm: ['A', 'B', 'C', 'D'], refer: true },
        { img: 'lesio-2', alarm: [], refer: false },
        { img: 'lesio-5', alarm: ['A', 'B'], refer: true },
        { img: 'lesio-6', alarm: ['C'], refer: true },
        { img: 'lesio-3', alarm: [], refer: false },
      ] },
      { type: 'classify', title: b('Cremada solar: consell o derivar?', 'Quemadura solar: ¿consejo o derivar?'), ind: 'I7', img: 'pell-cremada',
        bins: [['consell', b('Consell a la farmàcia', 'Consejo en la farmacia')], ['derivar', b('Derivar', 'Derivar')]],
        items: [
          [b('Envermelliment lleu i pell intacta', 'Enrojecimiento leve y piel intacta'), 'consell', 'cremada'],
          [b('Calor i dolor lleu', 'Calor y dolor leve'), 'consell', 'cremada'],
          [b('Febre i malestar', 'Fiebre y malestar'), 'derivar', 'cremada'],
          [b('Butllofes extenses', 'Ampollas extensas'), 'derivar', 'cremada'],
          [b('Dolor intens i deshidratació', 'Dolor intenso y deshidratación'), 'derivar', 'cremada'],
        ] },
    ],
    n4: {
      cols: ['cause', 'signs', 'treat'],
      rows: ['acne', 'furunculosi', 'psoriasi', 'melanoma', 'cremada', 'parestesia', 'hipoestesia', 'prurit'],
      write: [
        { q: b('Com s\'anomena el formigueig o la sensació anòmala a la pell?', '¿Cómo se llama el hormigueo o la sensación anómala en la piel?'),
          answer: b('parestèsia', 'parestesia'), syn: { ca: ['parestesia'], es: ['parestèsia'] }, ind: 'I6', c: 'parestesia',
          why: b('*Par-* alterat + *-estèsia* sensibilitat.', '*Par-* alterado + *-estesia* sensibilidad.') },
        { q: b('Quina regla s\'aplica per vigilar una piga que canvia?', '¿Qué regla se aplica para vigilar un lunar que cambia?'),
          answer: b('ABCDE'), syn: { ca: ['regla abcde', 'abcde'], es: ['regla abcde', 'abcde'] }, ind: 'I7', c: 'melanoma',
          why: b('Asimetria, vores, color, diàmetre i evolució.', 'Asimetría, bordes, color, diámetro y evolución.') },
      ],
    },
  },
];

export const STATION = Object.fromEntries(STATIONS.map(s => [s.id, s]));
