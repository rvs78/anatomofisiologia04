# Pla tècnic 001 — Sentits Clínic

## 1. Decisions d'arquitectura

| Decisió | Elecció | Motiu |
| --- | --- | --- |
| Tipus d'app | Web estàtica, mòduls ES sense *bundler* | igual que les apps anteriors; GitHub Pages; manteniment senzill |
| 3D | three.js vendoritzat a `vendor/` | ja usat a `anatomofisiologia02`; es reutilitzen ull i orella |
| Microinteraccions | Motion (motion.dev) ESM vendoritzat | molles i transicions sense framework |
| Arrossegar i deixar | Pointer Events propis (de Pissarra Quest) | multitàctil, tolerància 26 px, alternativa tocar-tocar |
| Vídeo tutorial | Remotion (`video/remotion/`) | mateix format que les apps anteriors |
| Càpsules | HyperFrames (`video/hyperframes/`, composicions HTML) | motion graphics des d'HTML/GSAP; render a MP4 |
| Imatges | Seedream 5.5 via OpenRouter `/api/v1/images`, en build | cap clau al client |
| Disseny | `DESIGN.md` + **Impeccable 4.9.1** instal·lat a `.claude/` (skill + *hook* + subagents) | obligatori; coherència amb l'àlbum de cromos i detecció automàtica de defectes de disseny |
| Proves | `tests/check.mjs` (Node) + Playwright | comprovacions de contingut i partides reals |
| CI/CD | GitHub Actions: `checks.yml` i `pages.yml` | proves a cada *push*, desplegament a Pages |

## 2. Estructura del repositori

```
anatomofisiologia04/
├─ index.html              # shell, sprite d'icones, plantilles
├─ styles.css              # tokens de DESIGN.md, impressió A4
├─ config.js               # PASSWORD='alumnesfar', UNLOCK_CASE=5, pesos de la nota
├─ app.js                  # router de pantalles i estat
├─ logic.js                # puntuació, nota, sorteig, correcció tolerant (pura, testejable)
├─ i18n.js                 # b(ca, es), canvi d'idioma en calent
├─ data/
│  ├─ vista.js · oida.js · olfacte.js · gust.js · pell.js
│  ├─ cases.js             # casos clínics ramificats
│  └─ glossary.js          # termes, definicions, etimologia
├─ engines/                # un motor per tipus d'activitat
│  ├─ hotspots.js          # N1 làmina amb punts calents
│  ├─ dragmap.js           # N2 arrossegar a estructura (3D o 2D)
│  ├─ optics.js            # N3 banc òptic (SVG)
│  ├─ visionsim.js         # N3 filtres de visió (canvas / WebGL)
│  ├─ soundpath.js         # N3 via del so amb bloquejos
│  ├─ wordlab.js           # N3 prefixos i arrels
│  ├─ flavor.js            # N3 simulador del sabor
│  ├─ abcde.js             # N3 detectiu ABCDE i triatge
│  ├─ grid.js              # N4 graella amb esvaïment
│  ├─ cloze.js             # text amb buits (de Sentits Quest)
│  └─ branching.js         # cas clínic
├─ models/                 # three.js: eye.js, ear.js (reutilitzats), nose.js, tongue.js, skin.js
├─ scaffold.js             # pistes 3 graus, exemple resolt, repàs adaptatiu, glossari
├─ report.js               # estadística, mapa de domini, informe imprimible
├─ fx.js                   # sons i confeti (sense canvis)
├─ vendor/                 # three.module.js, motion.js
├─ assets/
│  ├─ img/                 # WebP generats + manifest.json
│  └─ video/               # MP4 + pòsters + subtítols .vtt ca/es
├─ video/
│  ├─ remotion/            # tutorial d'instruccions
│  └─ hyperframes/         # 5 càpsules (una carpeta per estació)
├─ scripts/
│  ├─ gen-images.mjs       # genera imatges amb Seedream
│  └─ optimize-images.mjs  # PNG → WebP, mides
├─ tests/  check.mjs · e2e/*.spec.ts
└─ .github/workflows/  checks.yml · pages.yml
```

## 3. Model de dades

```js
// data/vista.js (extracte)
export const STATION = {
  id: 'vista', color: '#0b7a83',
  title: b('Vista', 'Vista'),
  objective: b('Relacionaràs cada patologia de la vista amb l\'estructura que falla', 'Relacionarás…'),
  pathologies: [
    { id: 'miopia', name: b('Miopia', 'Miopía'), structure: 'ull-retina-focus',
      cause: b('Ull llarg o excés de potència òptica', 'Ojo largo…'),
      signs: b('Visió borrosa de lluny', 'Visión borrosa de lejos'),
      treatment: b('Lents divergents', 'Lentes divergentes'),
      ind: ['I1', 'I2', 'I3'],          // indicadors de spec.md §5.3
      misconceptions: [ { distractor: 'hipermetropia', why: b('…', '…') } ],
      slide: 14 },
    // …
  ],
  levels: {
    n1: { video: 'vista.mp4', plate: 'vista-ull-sa', hotspots: [...], predict: [...] },
    n2: { engine: 'dragmap', model: 'eye', pick: 6, workedExample: 'cataracta' },
    n3: [ { engine: 'optics', challenges: ['miopia','hipermetropia','astigmatisme','presbicia'] },
          { engine: 'visionsim', filters: ['cataracta','glaucoma','dmae','daltonisme','estrabisme'] } ],
    n4: { engine: 'grid', columns: ['cause','signs','treatment'], fading: [3, 1, 0], cloze: [...] },
  },
};
```

Estat desat (`localStorage`, clau `far-ra4-sentits-clinic-v1`):

```js
{ user: { name, group, lang }, startedAt, elapsedMs,
  score, streak,
  levels: { 'vista.n2': { done, stars, ok, err, hints, ms, items:[idx…] }, … },
  concepts: { miopia: { ok, err, hints }, … },   // per al mapa de domini
  cases: [ { id, decisions:[{ step, choice, correct }] } ] }
```

## 4. Lògica de puntuació (`logic.js`, pura)

```js
export const SCORE = { ok: 10, err: -3, hint: -5, streakEvery: 3, streakBonus: 15, floor: 0 };
export const accuracy = ({ ok, err, hints }) => ok / Math.max(1, ok + err + 0.5 * hints);
export const grade = (stationsAcc, caseAcc, w = { stations: 0.7, case: 0.3 }) =>
  Math.round((1 + 9 * clamp01(w.stations * mean(stationsAcc) + w.case * caseAcc)) * 10) / 10;
```

S'ha de verificar contra el `logic.js` de `anatomofisiologia02` perquè la puntuació sigui exactament la mateixa.

## 5. Pipeline d'imatges (Seedream via OpenRouter)

```
scripts/gen-images.mjs
  1. llegeix specs/001-…/content-map.md → taula «Banc d'imatges» (o assets/img/prompts.json)
  2. per a cada ID sense fitxer: POST https://openrouter.ai/api/v1/images
       model: "bytedance-seed/seedream-5-5"
       prompt: PREFIX + prompt específic
       (opcional) imatge de referència: render del model 3D o SVG perquè les coordenades encaixin
  3. desa PNG → scripts/optimize-images.mjs → assets/img/<id>.webp
  4. escriu assets/img/manifest.json { id, model, prompt, date, alt:{ca,es}, reviewed:false }
```

- Clau: `OPENROUTER_API_KEY` en `.env` local (a `.gitignore`) o com a *secret* de GitHub per a un workflow manual (`workflow_dispatch`). **Mai** al codi del client ni en un commit.
- Si l'entorn de Claude Code no arriba a `openrouter.ai`, generar amb el connector OpenRouter de Claude o executar l'script al propi ordinador.
- Coherència amb els models 3D: per a les làmines amb punts d'ancoratge, usar el render del model com a imatge de referència (*image-to-image*) perquè les coordenades continuïn sent vàlides (mètode ja usat a Pissarra Quest).
- Pressupost orientatiu: ~30 imatges + iteracions ≈ 60 crides; consultar el preu vigent a OpenRouter abans.

## 6. Vídeo i motion graphics

| Peça | Eina | Durada | Sortida |
| --- | --- | --- | --- |
| Tutorial d'instruccions | Remotion | 60–90 s | `assets/video/tutorial-{ca,es}.mp4` + `.vtt` |
| Càpsula Vista | HyperFrames (text + subtítols) | 60 s | `assets/video/vista-{ca,es}.mp4` |
| Càpsula Oïda | HyperFrames (reaprofita animació de 6 fases) | 60 s | `oida-*.mp4` |
| Càpsula Olfacte | HyperFrames | 45 s | `olfacte-*.mp4` |
| Càpsula Gust | HyperFrames | 45 s | `gust-*.mp4` |
| Càpsula Pell | HyperFrames | 75 s | `pell-*.mp4` |

Codificació H.264, 1280×720, CRF 23, `-preset veryfast`; pòster WebP; subtítols WebVTT activats per defecte. **Sense veu en off** (decisió del professor): tot el missatge és text animat en pantalla i subtítols. Text en pantalla mínim i gran; tota la informació també és als subtítols i a la transcripció de la descripció.

## 7. Models 3D

| Model | Origen | Ancoratges |
| --- | --- | --- |
| Ull | reutilitzat de `anatomofisiologia02` | 14 estructures existents + «focus» (punt virtual) |
| Orella | reutilitzat | 12 estructures + canals semicirculars |
| Fossa nasal | nou, paramètric (tall sagital) | mucosa, cornets, epiteli olfactori, làmina cribosa, bulb |
| Llengua | nou (llengua + papil·la ampliada) | papil·les, botó, porus, cèl·lules, nervis VII/IX/X |
| Bloc de pell | nou, capes separables | epidermis (estrat basal/corni), dermis, hipodermis, fol·licle, glàndules, 5 receptors |

Principi heretat: els punts d'ancoratge es calculen a partir de la mateixa geometria que es renderitza; `tests/check.mjs` en verifica les relacions anatòmiques (p. ex. bulb per sobre de la làmina cribosa; melanòcits a l'estrat basal).

## 8. Proves

- `tests/check.mjs`: completesa ca/es; cada patologia té ítems a N2–N4; cada distractor té explicació; fórmula de nota (10,0 / 1,0); 500 sortejos amb llavor sense repeticions ni ítems orfes; manifest d'imatges complet i revisat.
- Playwright: partida completa en ca i es; tàctil i ratolí; 3 resolucions; canvi d'idioma a mitja partida; reprendre partida; impressió de l'informe (PDF) sense talls.
- Auditoria: `design:accessibility-review` / Lighthouse; Impeccable `/audit` abans de cada versió.

## 9. Riscos

| Risc | Mitigació |
| --- | --- |
| Imatges IA anatòmicament incorrectes | revisió del professor obligatòria (`reviewed`), referència image-to-image, etiquetes sempre en HTML |
| Simuladors visuals molestos o fotosensibles | sense parpelleig > 3 Hz, avís previ, opció de desactivar |
| Rendiment 3D en equips modestos | render sota demanda, `pixelRatio ≤ 1,5`, alternativa 2D |
| Excés de durada | progrés desat; estacions independents; mode curt configurable (pick menor) |
| Clau d'API filtrada | generació només en build; `.env` a `.gitignore`; rotació de clau si s'exposa |
