// Noms de les estructures de les làmines (de rvs78/anatomofisiologia03). Les coordenades són a drawings.js.
import { b } from '../i18n.js';

export const PLATES = {
  ull: {
    title: b("L'ull · secció horitzontal", 'El ojo · sección horizontal'),
    parts: {
      cornia: b('Còrnia', 'Córnea'), aquos: b('Humor aquós', 'Humor acuoso'), iris: b('Iris'), pupil: b('Pupil·la', 'Pupila'),
      cristal: b('Cristal·lí', 'Cristalino'), ciliar: b('Cos ciliar', 'Cuerpo ciliar'), zonula: b('Lligaments suspensoris', 'Ligamentos suspensorios'),
      sclera: b('Escleròtica', 'Esclerótica'), coroide: b('Coroide', 'Coroides'), retina: b('Retina'), fovea: b('Fòvea (màcula)', 'Fóvea (mácula)'),
      disc: b('Punt cec (disc òptic)', 'Punto ciego (disco óptico)'), nervi: b('Nervi òptic', 'Nervio óptico'), vitri: b('Humor vitri', 'Humor vítreo'),
      muscul: b('Múscul extraocular', 'Músculo extraocular'),
    },
  },
  orella: {
    title: b("L'orella · tall frontal", 'El oído · corte frontal'),
    parts: {
      pavello: b('Pavelló auricular', 'Pabellón auricular'), conducte: b('Conducte auditiu extern', 'Conducto auditivo externo'),
      timpa: b('Timpà', 'Tímpano'), martell: b('Martell', 'Martillo'), enclusa: b('Enclusa', 'Yunque'), estrep: b('Estrep', 'Estribo'),
      caixa: b('Caixa del timpà', 'Caja del tímpano'), trompa: b("Trompa d'Eustaqui", 'Trompa de Eustaquio'),
      oval: b('Finestra oval', 'Ventana oval'), rodona: b('Finestra rodona', 'Ventana redonda'), vestibul: b('Vestíbul', 'Vestíbulo'),
      canals: b('Canals semicirculars', 'Conductos semicirculares'), coclea: b('Còclea (cargol)', 'Cóclea (caracol)'),
      nervi8: b('Nervi vestibulococlear', 'Nervio vestibulococlear'),
    },
  },
  llengua: {
    title: b('La llengua i el botó gustatiu', 'La lengua y el botón gustativo'),
    parts: {
      epiglotis: b('Epiglotis'), amigdala: b('Amígdala palatina', 'Amígdala palatina'), caliciformes: b('Papil·les caliciformes', 'Papilas caliciformes'),
      fungiformes: b('Papil·les fungiformes', 'Papilas fungiformes'), filiformes: b('Papil·les filiformes', 'Papilas filiformes'),
      foliades: b('Papil·les foliades', 'Papilas foliadas'), solc: b('Solc terminal (V lingual)', 'Surco terminal (V lingual)'),
      apex: b('Àpex de la llengua', 'Punta de la lengua'), boto: b('Botó gustatiu', 'Botón gustativo'), porus: b('Porus gustatiu', 'Poro gustativo'),
      gustativa: b('Cèl·lula gustativa', 'Célula gustativa'), suport: b('Cèl·lula de suport', 'Célula de sostén'), fibra: b('Fibra nerviosa', 'Fibra nerviosa'),
    },
  },
  nas: {
    title: b('Les fosses nasals · tall sagital', 'Las fosas nasales · corte sagital'),
    parts: {
      bulb: b('Bulb olfactori', 'Bulbo olfatorio'), tracte: b('Tracte olfactori', 'Tracto olfatorio'), cribosa: b("Làmina cribosa de l'etmoide", 'Lámina cribosa del etmoides'),
      epiteli: b('Epiteli olfactori', 'Epitelio olfatorio'), csup: b('Cornet superior', 'Cornete superior'), cmig: b('Cornet mitjà', 'Cornete medio'),
      cinf: b('Cornet inferior', 'Cornete inferior'), narina: b('Narina', 'Narina'), sfrontal: b('Sinus frontal', 'Seno frontal'),
      sesfenoidal: b('Sinus esfenoidal', 'Seno esfenoidal'), paladar: b('Paladar dur', 'Paladar duro'), nasofaringe: b('Nasofaringe'),
    },
  },
  pell: {
    title: b('La pell i els receptors del tacte', 'La piel y los receptores del tacto'),
    parts: {
      epidermis: b('Epidermis'), dermis: b('Dermis'), hipodermis: b('Hipodermis'),
      meissner: b('Corpuscle de Meissner', 'Corpúsculo de Meissner'), pacini: b('Corpuscle de Pacini', 'Corpúsculo de Pacini'),
      merkel: b('Discs de Merkel', 'Discos de Merkel'), lliures: b('Terminacions nervioses lliures', 'Terminaciones nerviosas libres'),
      ruffini: b('Corpuscle de Ruffini', 'Corpúsculo de Ruffini'), pel: b('Pèl (fol·licle pilós)', 'Pelo (folículo piloso)'),
      sebacia: b('Glàndula sebàcia', 'Glándula sebácea'), melanocits: b('Melanòcits (epidermis)', 'Melanocitos (epidermis)'), sudoripara: b('Glàndula sudorípara', 'Glándula sudorípara'), vas: b('Vasos sanguinis', 'Vasos sanguíneos'),
    },
  },
};
