# CLAUDE.md — Sentits Clínic

Instruccions per a Claude Code en aquest repositori.

## Flux de treball (spec-driven)
1. Llegeix `PRODUCT.md`, `DESIGN.md` i tota la carpeta `specs/001-patologies-sentits/` abans d'escriure codi.
2. Treballa tasca a tasca segons `tasks.md`; marca `[x]` en acabar i cita l'ID (`T0xx`) al missatge de commit.
3. Si un requisit és ambigu o contradiu la presentació, **pregunta** abans d'implementar; no inventis contingut sanitari.
4. Si tens Superpowers o Spec Kit instal·lats, usa'ls (`brainstorming` → `writing-plans` → `executing-plans`, o `/specify` → `/plan` → `/tasks`) mantenint aquests fitxers com a font de veritat.
5. **Impeccable és obligatori** per a tota la interfície. Ja està instal·lat a `.claude/` (skill, *hooks* a `.claude/settings.json` i subagents). Abans de construir una pantalla: `/impeccable shape <pantalla>`; en acabar-la: `/impeccable critique` → `/impeccable polish`; abans de cada versió: `/impeccable audit` i `npx impeccable detect http://localhost:3000`. No desactivis el *hook*: si avisa, corregeix-ho.
6. Actualitzar Impeccable: `npx impeccable update` (o tornar a copiar `.claude/skills/impeccable` des de `pbakaus/impeccable`).

## Regles
- Cap dependència en temps d'execució fora de `vendor/` (three.js). Les animacions de la UI usen la Web Animations API (`fx.js`).
- Tot text visible passa per `b(ca, es)`; mateix ordre d'ítems en les dues llengües.
- Cap clau d'API al codi del client ni en commits. Les imatges es generen amb `scripts/gen-images.mjs` (Seedream 5.5 via OpenRouter) i es versionen.
- Cap imatge sense `alt` ca/es al manifest. `reviewed`: `"claude"` = revisió visual feta per Claude; `true` = revisada pel professor; `false` = no es pot publicar.
- La clau d'OpenRouter només viu a `.env` (ignorat per git).
- Puntuació: no la modifiquis; ha de coincidir amb `anatomofisiologia02/logic.js`.
- Abans de cada commit: `node tests/check.mjs`. Abans d'una versió: `npx playwright test`.
- Codificació de vídeo: H.264, CRF 23, `-preset veryfast`.
- Vídeos (HyperFrames i Remotion): **sense veu en off**, només text animat i subtítols WebVTT ca/es.
- El cas clínic està obert des del 20-11-2026 (`config.js → UNLOCK_CASE = 0`); per tornar a exigir les cinc estacions, posa-hi 5.
- A N2 cada cromo té el seu propi punt a la làmina: dos cromos al mateix punt fan creure a l'alumnat que el punt ja és «ocupat».
- Contrasenya de classe: `alumnesfar` (a `config.js`).
- Cada ítem de contingut porta `ind` (indicador I1–I8 de `spec.md §5.3`).

## Referències
- `rvs78/anatomia02` (Vascular Quest): entrada, sobre, puntuació, informe.
- `rvs78/anatomofisiologia02` (Sentits Quest): models 3D d'ull i orella, test, text amb buits, nota 1–10, ca/es.
- `rvs78/anatomofisiologia03` (Pissarra Quest): arrossegar multitàctil, làmines SVG del gust, olfacte i pell.
