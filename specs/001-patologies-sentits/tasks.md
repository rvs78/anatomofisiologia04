# Tasques 001 — Sentits Clínic

Cada tasca referencia els requisits de `spec.md`. `[P]` = es pot fer en paral·lel. Una fase no comença fins que l'anterior passa `node tests/check.mjs`.

## Fase 0 · Validació de l'especificació
- [x] T001 Decisions del professor incorporades (`spec.md §6`) i CA de la RA4 + indicadors I1–I8 (`spec.md §5`).
- [ ] T001b Confirmar la redacció literal catalana dels CA amb el currículum de la XTEC.
- [x] T002 `content-map.md` revisat contra la presentació; el contingut de `data/` en surt literalment.
- [x] T003 Instal·lar Impeccable 4.9.1 a `.claude/` (skill, *hooks*, subagents).

## Fase 1 · Base heretada (REQ-01–04, REQ-10)
- [x] T010 Repositori `rvs78/anatomofisiologia04` i GitHub Pages.
- [x] T011 De `anatomofisiologia02`: `fx.js`, tokens, entrada amb correu @isvh.cat, sobre, impressió A4, models 3D.
- [x] T012 `i18n.js` amb `b(ca, es)` i canvi d'idioma en calent.
- [x] T013 Persistència `localStorage` (`far-ra4-sentits-clinic-v1`).
- [x] T014 `logic.js`: puntuació idèntica, `accuracy`, `grade`, estrelles, correcció tolerant + proves.

## Fase 2 · Motors d'activitat (REQ-06–09)
- [x] T020 Càpsula + exploració de la làmina (N1) amb llista d'estructures alternativa.
- [x] T021 Arrossegar a la làmina (N2): punter, multitàctil, tocar-tocar, teclat; punts solapats → centre més proper.
- [x] T022 Graella amb esvaïment (N4).
- [x] T023 Preguntes, classificar, ordenar i resposta escrita tolerant.
- [x] T024 Bastida: objectiu, exemple resolt, pistes graduades, glossari, repàs adaptatiu, descripció.
- [x] T025 Mapa d'estacions; cas clínic bloquejat fins a completar les 5.

## Fase 3 · Contingut i estacions
- [x] T030 Vista: banc òptic + simulador de visió + fons d'ull.
- [x] T031 Oïda: via del so + otoscòpies + transmissió/neurosensorial.
- [x] T032 Olfacte: ordenar la via + laboratori de paraules + rinitis.
- [x] T033 Gust: simulador del sabor + mite del mapa de la llengua + classificar.
- [x] T034 Pell: imatges, detectiu ABCDE, triatge de la cremada.
- [x] T035 Glossari amb etimologia.

## Fase 4 · 3D (REQ-15)
- [x] T040 Ull i orella 3D (de `anatomofisiologia02`) a l'exploració de N1.
- [ ] T041–T043 Models 3D nous de fossa nasal, llengua i bloc de pell. **v1 usa les làmines realistes de `anatomofisiologia03`** (anclatges verificats); queda per a la v1.1.
- [x] T044 Sense WebGL: la làmina 2D és el camí principal i el 3D és opcional.

## Fase 5 · Imatges Seedream (REQ-14)
- [x] T050 `scripts/gen-images.mjs` + `optimize-images.py` + `.env.example`.
- [x] T051 21 imatges generades amb `bytedance-seed/seedream-5-5` (≈ 0,42 $).
- [ ] T052 Revisió anatòmica del professor (`reviewed: "claude"` = revisió visual feta; canviar a `true`).

## Fase 6 · Vídeo i motion (REQ-02, REQ-16)
- [x] T060 Tutorial Remotion ca/es sense veu, amb subtítols WebVTT (`video/remotion`).
- [x] T061 5 càpsules HyperFrames ca/es sense veu (`video/hyperframes/build.mjs`), text en pantalla + WebVTT.
- [x] T062 Microinteraccions (Web Animations API, mateix `fx.js`); `prefers-reduced-motion`. *No ha calgut vendoritzar Motion.*

## Fase 7 · Cas clínic i informe (REQ-11–13)
- [x] T070 Cas clínic ramificat: 6 casos, se'n sortegen 3, pista que elimina una opció.
- [x] T071 Estadística: encert per estació, estrelles i intents per nivell.
- [x] T072 Informe A4: nota 1–10, indicadors I1–I8 (assolit / en procés / no assolit), 5 patologies a repassar amb diapositiva, decisions del cas.

## Fase 8 · Qualitat i publicació (RNF-1–6)
- [x] T080 `tests/check.mjs` (≈1.400 comprovacions) i `tests/e2e.mjs` (partida completa a 1440×900, 1366×768 i 390×844 tàctil en castellà).
- [x] T081 `impeccable detect` net a la pàgina i al codi font.
- [ ] T082 Prova pilot amb 3–4 alumnes; ajustar durada i dificultat.
- [ ] T083 Etiqueta `v1.0` i enllaç a Classroom.
