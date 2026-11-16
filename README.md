# Sentits Clínic · Patologies dels òrgans dels sentits

Aplicació web educativa per a **MP0061 Anatomofisiologia i Patologia Bàsiques** (CFGM Farmàcia i Parafarmàcia, grup FAR 1L), centrada en la **RA4 · Els sentits**: patologies de la **vista, l'oïda, l'olfacte, el gust i el tacte (pell)**.

Quarta aplicació de la família *Quest* (Vascular Quest → Sentits Quest → Pissarra Quest → **Sentits Clínic**). Comparteix amb les anteriors l'entrada amb contrasenya, el sobre d'instruccions amb vídeo, la puntuació, l'estadística i l'informe final en PDF per lliurar a Google Classroom.

> Estat: **v1.0-rc** — jugable de principi a fi. Pendent: revisió de les imatges pel professor, prova pilot i models 3D de nas, llengua i pell (v1.1).
>
> **Jugar:** https://rvs78.github.io/anatomofisiologia04/ · contrasenya de classe de FAR.

## Què hi ha al repositori

| Fitxer | Contingut |
| --- | --- |
| [`PRODUCT.md`](PRODUCT.md) | Context de producte en format Impeccable (usuaris, propòsit, restriccions, principis) |
| [`DESIGN.md`](DESIGN.md) | Sistema visual «Àlbum de cromos · edició clínica», motion i accessibilitat (compatible amb Impeccable) |
| [`specs/001-patologies-sentits/spec.md`](specs/001-patologies-sentits/spec.md) | Requisits funcionals amb criteris d'acceptació |
| [`specs/001-patologies-sentits/plan.md`](specs/001-patologies-sentits/plan.md) | Arquitectura tècnica, pipeline d'imatges (Seedream), vídeo (Remotion, HyperFrames) i 3D |
| [`specs/001-patologies-sentits/content-map.md`](specs/001-patologies-sentits/content-map.md) | Contingut patologia per patologia, activitats i *prompts* d'imatge |
| [`specs/001-patologies-sentits/tasks.md`](specs/001-patologies-sentits/tasks.md) | Tasques ordenades per fases, amb dependències |
| [`CLAUDE.md`](CLAUDE.md) | Instruccions per a Claude Code en construir l'aplicació |
| `.claude/` | **Impeccable 4.9.1** (skill, *hooks* de disseny i subagents) per a Claude Code |

## Recorregut de l'alumne (resum)

```
Entrada (nom · grup · idioma · contrasenya)
   └─ Sobre d'instruccions (vídeo Remotion)
        └─ Mapa de 5 estacions ─┬─ Vista     ─┐
                                ├─ Oïda      ─┤  cada estació: 4 nivells
                                ├─ Olfacte   ─┤  Observa → Localitza → Comprèn → Relaciona
                                ├─ Gust      ─┤
                                └─ Tacte/Pell┘
                                       └─ Cas clínic integrat a la farmàcia (desbloquejable)
                                             └─ Informe final (nota 1–10 · estadística · PDF)
```

## Execució local

```bash
python3 -m http.server 3000      # o qualsevol servidor estàtic
node tests/check.mjs             # comprovacions de contingut i lògica
node tests/e2e.mjs               # partida completa amb Playwright (npm i abans)
```

## Regenerar els mitjans

| Què | Ordre | Notes |
| --- | --- | --- |
| Imatges (Seedream 5.5 via OpenRouter) | `npm run images` | clau a `.env` (`OPENROUTER_API_KEY`), mai al repositori; prompts a `assets/img/prompts.json` |
| Càpsules N1 (HyperFrames) | `npm run capsules` | una per estació i idioma, sense veu; genera MP4, pòster i WebVTT a `assets/video/` |
| Tutorial del sobre (Remotion) | `cd video/remotion && npm i && sh render.sh` | ca i es, sense veu, amb subtítols |

## Estructura del codi

| Fitxer | Paper |
| --- | --- |
| `app.js` | entrada, sobre, mapa, nivells, cas clínic i informe |
| `engines.js` | un motor per activitat: càpsula, exploració, arrossegar a la làmina, preguntes, classificar, ordenar, graella, escriure, banc òptic, simulador de visió, via del so, sabor, laboratori de paraules, ABCDE |
| `ui.js` | arrossegar-deixar (ratolí, tàctil, tocar-tocar, teclat), diàlegs, làmines amb punts |
| `logic.js` · `config.js` | puntuació, nota, encert, correcció tolerant · contrasenya, desbloqueig, pesos |
| `data/` | patologies, estacions, casos, glossari, noms de les làmines |
| `drawings.js` · `models.js` · `fx.js` | làmines i ancoratges (app 03) · models 3D (app 02) · efectes (app 02) |

Publicació: GitHub Pages des de la branca `main` (vegeu `.github/workflows/pages.yml`).

## Llicència i fonts

Contingut basat en la presentació de classe *Unitat 4 · Coordinació i sentits · Pell i mucoses · Revisió ampliada* (Rubén Vallejo) i en les fonts que s'hi citen (Altamar UT4, NEI, NIDCD, NIA, NINDS, OpenStax, DermNet, MedlinePlus). Les il·lustracions s'han generat amb IA i s'identifiquen com a tals.
