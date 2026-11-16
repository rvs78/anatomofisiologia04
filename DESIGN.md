# DESIGN — Sentits Clínic · «Àlbum de cromos · edició clínica»

Hereta el sistema de Vascular Quest / Sentits Quest (vegeu el `DESIGN.md` de `rvs78/anatomia02` i `rvs78/anatomofisiologia02`) i hi afegeix una capa «clínica» per a les patologies. **Impeccable** (v4.9.1) és obligatori i està instal·lat al repositori (`.claude/skills/impeccable`, amb el *hook* de comprovació de disseny i els subagents). Llegeix aquest fitxer i `PRODUCT.md` a l'arrencada (`impeccable context`). Ordres habituals: `/impeccable shape <pantalla>` abans de construir una pantalla nova, `/impeccable critique` i `/impeccable audit` per revisar, `/impeccable animate`, `/impeccable harden` i `/impeccable polish` per acabar.

## 1. Tokens heretats (sense canvis)

| Token | Valor | Ús |
| --- | --- | --- |
| `--cover` | `#22194d` | Coberta, capçalera, fons del mapa |
| `--page` | `#f2b42c` + trama | Pàgina de l'àlbum (fons de nivell) |
| `--card` | `#fffdf8` | Cara blanca dels cromos i làmines |
| `--gold` | `#ffd86b` | Estrelles, ratxa, focus |
| Tipografia display | Big Shoulders Display | Títols, puntuació |
| Tipografia text | Atkinson Hyperlegible | Tot el text de lectura (mín. 18 px; 22 px a la pantalla d'aula) |
| Cromos | vora retallada, forats discontinus | Elements arrossegables i destinacions |
| `fx.js` | sons i confeti | Retroacció d'encert, error i ratxa |

## 2. Color per estació (nou)

Cada sentit té un color de sistema que tinyeix la pestanya del mapa, la vora de la làmina i els indicadors de progrés. Contrast AA verificat sobre `--card`.

| Estació | Color | Motiu |
| --- | --- | --- |
| Vista | `#0b7a83` turquesa | heretat de Sentits Quest |
| Oïda | `#b1500f` coure | heretat de Sentits Quest |
| Olfacte | `#5b6f1e` oliva | mucosa / herba |
| Gust | `#a3245e` gerd | llengua |
| Tacte i pell | `#7a4a2a` terra | pell / dermis |
| Cas clínic | `#22194d` + creu verda farmàcia `#1f8a4c` | taulell de farmàcia |

Estats semàntics: encert `#1f8a4c`, error `#c0392b` (sempre amb icona i text, mai només color), pista `#ffd86b`.

## 3. Llenguatge visual de les patologies

- **Làmina sana / làmina alterada**: cada patologia es mostra com a parell «abans–després» amb un control lliscant (*before/after slider*). L'estructura afectada parpelleja suaument (1 cop) en entrar.
- **Il·lustració mèdica, no fotografia de pacients**: imatges Seedream en estil d'atles (aquarel·la tècnica, fons neutre, sense text incrustat). Les etiquetes són sempre HTML (bilingües i accessibles).
- **Marca «IA»**: petita etiqueta `Il·lustració generada amb IA` a la cantonada de cada imatge.
- **Taulell de farmàcia** (cas clínic): escena il·lustrada fixa, bafarades de diàleg del pacient, fitxa de pacient a la dreta.

## 4. Composició de pantalla (escriptori ≥ 1280 px)

```
┌─────────────────────────────────────────────────────────────┐
│ Capçalera: estació · nivell (1–4) · punts · ratxa · ⏱ · ca/es │
├──────────────────────────────┬──────────────────────────────┤
│ Escena (3D / làmina / sim.)  │ Panell de tasca               │
│  · zona d'interacció          │  · objectiu (1 frase)         │
│  · botó «Descripció»          │  · consigna                   │
│                              │  · safata de cromos           │
│                              │  · Pista (1/2/3) · Comprova   │
├──────────────────────────────┴──────────────────────────────┤
│ Barra de bastida: glossari · exemple resolt · progrés nivell │
└─────────────────────────────────────────────────────────────┘
```

Mòbil (< 768 px): escena a dalt (55 vh), panell a sota amb safata horitzontal desplaçable. Pantalla d'aula (≥ 1920 px tàctil): objectius ≥ 64 px, tolerància de deixada 26 px.

## 5. Motion

| Capa | Eina | Ús |
| --- | --- | --- |
| Microinteraccions | **Motion** (motion.dev, ESM vendoritzat) | arrossegar/deixar, encaix amb molla, sacseig d'error, comptador de punts, transicions entre nivells |
| Càpsules de motion graphics (45–75 s) | **HyperFrames** (composicions HTML → MP4) | «Observa» de cada estació: com funciona el sentit i què falla a cada patologia |
| Vídeo tutorial d'instruccions | **Remotion** | sobre d'instruccions (com es juga, puntuació, informe), mateix format que les apps anteriors |
| 3D | **three.js** | ull i orella (reutilitzats de `anatomofisiologia02`), fossa nasal, llengua amb botó gustatiu, bloc de pell en capes |

Regles: durades 150–300 ms a la UI; cap animació bloqueja la resposta; `prefers-reduced-motion` substitueix moviments per fosos i atura l'autoreproducció dels vídeos; els vídeos sempre tenen subtítols (ca/es) i transcripció.

## 6. Accessibilitat (WCAG 2.1 AA)

- Tota acció d'arrossegar té alternativa **tocar-seleccionar → tocar-destinació** i alternativa de teclat (Tab / Espai / fletxes / Enter).
- `aria-live="polite"` per a la retroacció; focus visible daurat de 3 px.
- Botó **Descripció** a cada escena: text llarg que descriu la imatge o el model 3D i què hi canvia la patologia.
- Simuladors visuals (cataracta, glaucoma, daltonisme…) amb avís previ i opció de desactivar efectes intermitents.
- Mida de text ajustable (A−/A+), contrast mínim 4,5:1.

## 7. Anti-patrons (no fer)

- Degradats morats genèrics, targetes amb ombra «SaaS», emojis com a icones.
- Text incrustat dins de les imatges generades.
- Fotografies reals de lesions de pacients.
- Comptadors o ordres que delatin la resposta.
