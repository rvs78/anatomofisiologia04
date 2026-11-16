# Tasques 001 — Sentits Clínic

Cada tasca referencia els requisits de `spec.md`. `[P]` = es pot fer en paral·lel amb les altres `[P]` de la mateixa fase. Una fase no comença fins que l'anterior passa `node tests/check.mjs`.

## Fase 0 · Validació de l'especificació
- [x] T001 Decisions del professor incorporades (`spec.md §6`) i CA de la RA4 + indicadors I1–I8 (`spec.md §5`).
- [ ] T001b Confirmar la redacció literal catalana dels CA amb el currículum de la XTEC.
- [x] T003 Instal·lar Impeccable 4.9.1 a `.claude/` (skill, *hooks*, subagents).
- [ ] T002 Revisar `content-map.md` contra la presentació (patologies, tractaments, criteris de derivació).

## Fase 1 · Base heretada (REQ-01–04, REQ-10)
- [ ] T010 Crear el repositori `rvs78/anatomofisiologia04` i activar GitHub Pages.
- [ ] T011 Copiar de `anatomofisiologia02`: `fx.js`, tokens CSS, entrada, sobre d'instruccions, `logic.js` (puntuació), impressió A4.
- [ ] T012 `i18n.js` amb `b(ca, es)` i canvi d'idioma en calent; estat per índexs.
- [ ] T013 Persistència `localStorage` i pantalla *Continuar / Començar de nou*.
- [ ] T014 `logic.js`: `accuracy`, `grade`, ratxa, mínim 0 + proves a `check.mjs`.

## Fase 2 · Motors d'activitat genèrics (REQ-06–09)
- [ ] T020 [P] `engines/hotspots.js` (N1) amb descripció i preguntes de predicció.
- [ ] T021 [P] `engines/dragmap.js` (N2) sobre 2D i 3D, multitàctil, tocar-tocar, teclat.
- [ ] T022 [P] `engines/grid.js` (N4) amb esvaïment configurable.
- [ ] T023 [P] `engines/cloze.js` (reutilitzat) i resposta curta tolerant.
- [ ] T024 `scaffold.js`: objectiu, exemple resolt, pistes 3 graus, glossari, repàs adaptatiu.
- [ ] T025 Mapa d'estacions amb bloqueig i estrelles; cas clínic bloquejat fins a completar les 5 estacions. Fer `/impeccable shape mapa` abans.

## Fase 3 · Contingut i estacions
- [ ] T030 [P] `data/vista.js` + `engines/optics.js` + `engines/visionsim.js`.
- [ ] T031 [P] `data/oida.js` + `engines/soundpath.js` (+ àudio de demostració).
- [ ] T032 [P] `data/olfacte.js` + `engines/wordlab.js`.
- [ ] T033 [P] `data/gust.js` + `engines/flavor.js`.
- [ ] T034 [P] `data/pell.js` + `engines/abcde.js`.
- [ ] T035 `data/glossary.js` (tots els termes enllaçats).

## Fase 4 · 3D (REQ-15)
- [ ] T040 Integrar ull i orella reutilitzats i afegir ancoratges nous.
- [ ] T041 [P] `models/nose.js`.
- [ ] T042 [P] `models/tongue.js`.
- [ ] T043 [P] `models/skin.js` amb vista explosionada.
- [ ] T044 Alternativa 2D sense WebGL + proves d'ancoratge.

## Fase 5 · Imatges Seedream (REQ-14)
- [ ] T050 `scripts/gen-images.mjs` + `optimize-images.mjs` + `.env.example`.
- [ ] T051 Generar el banc d'imatges (`content-map.md`), amb referència image-to-image on hi hagi ancoratges.
- [ ] T052 Revisió anatòmica del professor; marcar `reviewed: true`.

## Fase 6 · Vídeo i motion (REQ-02, REQ-16)
- [ ] T060 Tutorial Remotion ca/es amb subtítols.
- [ ] T061 [P] 5 càpsules HyperFrames ca/es, sense veu en off (text animat + subtítols WebVTT).
- [ ] T062 Microinteraccions amb Motion; `prefers-reduced-motion`.

## Fase 7 · Cas clínic i informe (REQ-11–13)
- [ ] T070 `engines/branching.js` + `data/cases.js` (6 casos).
- [ ] T071 Panell d'estadística i mapa de domini.
- [ ] T072 Informe final imprimible amb les 5 patologies més fallades, diapositiva de repàs i domini per indicador I1–I8 (assolit / en procés / no assolit).

## Fase 8 · Qualitat i publicació (RNF-1–6)
- [ ] T080 `tests/check.mjs` complet; Playwright e2e (3 resolucions, ca/es, tàctil).
- [ ] T081 Auditoria d'accessibilitat i Impeccable `/impeccable audit` → `/impeccable polish`; `npx impeccable detect` sense errors.
- [ ] T082 Prova pilot amb 3–4 alumnes; ajustar durada i dificultat.
- [ ] T083 Etiqueta `v1.0` i enllaç a Classroom.
