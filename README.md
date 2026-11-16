# Sentits Clínic · Patologies dels òrgans dels sentits

Aplicació web educativa per a **MP0061 Anatomofisiologia i Patologia Bàsiques** (CFGM Farmàcia i Parafarmàcia, grup FAR 1L), centrada en la **RA4 · Els sentits**: patologies de la **vista, l'oïda, l'olfacte, el gust i el tacte (pell)**.

Quarta aplicació de la família *Quest* (Vascular Quest → Sentits Quest → Pissarra Quest → **Sentits Clínic**). Comparteix amb les anteriors l'entrada amb contrasenya, el sobre d'instruccions amb vídeo, la puntuació, l'estadística i l'informe final en PDF per lliurar a Google Classroom.

> Estat: **proposta (v0.2 · especificació revisada)**. Encara no hi ha codi d'aplicació: aquest repositori conté l'especificació per construir-la amb desenvolupament guiat per especificacions (*spec-driven development*).

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
npx serve .            # o qualsevol servidor estàtic
node tests/check.mjs   # comprovacions de contingut i lògica
npx playwright test    # proves d'extrem a extrem
```

Publicació: GitHub Pages des de la branca `main` (vegeu `.github/workflows/pages.yml`).

## Llicència i fonts

Contingut basat en la presentació de classe *Unitat 4 · Coordinació i sentits · Pell i mucoses · Revisió ampliada* (Rubén Vallejo) i en les fonts que s'hi citen (Altamar UT4, NEI, NIDCD, NIA, NINDS, OpenStax, DermNet, MedlinePlus). Les il·lustracions s'han generat amb IA i s'identifiquen com a tals.
