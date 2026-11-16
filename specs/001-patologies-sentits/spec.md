# Especificació 001 — Patologies dels òrgans dels sentits

- **Estat**: esborrany revisat (v0.2, 16-11-2026) · decisions del professor incorporades
- **Mòdul**: MP0061 Anatomofisiologia i Patologia Bàsiques · RA4 Els sentits
- **Grup**: FAR 1L · CFGM Farmàcia i Parafarmàcia
- **Repositori proposat**: `rvs78/anatomofisiologia04` (GitHub Pages)

Notació: `REQ-xx` requisit; criteris d'acceptació en format **Donat / Quan / Aleshores**. Prioritat: **M** (imprescindible a la v1), **S** (convenient), **C** (si hi ha temps).

---

## 1. Històries d'usuari

| ID | Com a… | vull… | per… |
| --- | --- | --- | --- |
| HU-1 | alumne | entrar amb el meu nom i grup i triar idioma | que l'informe surti al meu nom i entendre-ho tot |
| HU-2 | alumne | veure abans com funciona el sentit i què falla | no haver d'endevinar |
| HU-3 | alumne | demanar ajuda graduada quan m'encallo | avançar sense que em donin la resposta |
| HU-4 | alumne | manipular models i simuladors | entendre per què apareix cada símptoma |
| HU-5 | alumne | resoldre un cas real de farmàcia | aplicar el que he après |
| HU-6 | alumne | rebre un informe amb nota i punts febles | saber què he de repassar |
| HU-7 | professor | rebre un PDF uniforme a Classroom | avaluar i detectar errors del grup |
| HU-8 | alumne | continuar un altre dia | no perdre el progrés |

## 2. Requisits funcionals

### 2.1 Entrada, instruccions i sessió (idèntic a les apps anteriors)

**REQ-01 (M) Pantalla d'entrada.** Camps: nom i cognoms, grup (per defecte `FAR 1L`), contrasenya compartida de classe **`alumnesfar`** (la mateixa de les apps de FAR; es defineix a `config.js`), selector d'idioma amb banderes (Català / Castellà).
- Donat que la contrasenya és incorrecta, quan premo *Entrar*, aleshores veig un missatge d'error i no s'accedeix.
- Donat un nom buit, el botó *Entrar* resta desactivat.
- La contrasenya és una barrera d'aula, no de seguretat (es documenta així al README).

**REQ-02 (M) Sobre d'instruccions.** En entrar s'obre el sobre amb el vídeo tutorial (Remotion, subtitulat) i un resum en 5 punts: com es juga, puntuació, pistes, estacions i informe. Es pot reobrir des de la capçalera.

**REQ-03 (M) Persistència.** El progrés (estat de cada nivell, punts, temps, pistes, errors per concepte, idioma) es desa a `localStorage` amb clau `far-ra4-sentits-clinic-v1`. En tornar a entrar amb el mateix nom s'ofereix *Continuar* o *Començar de nou*.

**REQ-04 (M) Canvi d'idioma a mitja partida.** Tot el contingut (UI, consignes, retroacció, descripcions, subtítols, informe) canvia sense perdre l'estat. Les dues llengües tenen el mateix ordre d'ítems; l'estat desa índexs, no textos.

### 2.2 Estructura i progressió

**REQ-05 (M) Mapa d'estacions.** Cinc estacions (Vista, Oïda, Olfacte, Gust, Tacte i pell) i una sisena, *Cas clínic integrat*, que **només es desbloqueja quan s'han completat les cinc estacions** (N4 superat a totes).
- Donat que falta una estació per completar, quan toco el cas clínic, aleshores veig quina estació falta i un enllaç per anar-hi.

**REQ-06 (M) Quatre nivells per estació, de dificultat creixent** (modelatge → pràctica guiada → pràctica autònoma):

| Nivell | Nom | Nivell cognitiu | Activitat tipus | Puntua? |
| --- | --- | --- | --- | --- |
| N1 | **Observa** | recordar | càpsula de motion graphics (HyperFrames) + làmina amb punts calents i descripció + 2 preguntes de predicció | només suma (sense penalització) |
| N2 | **Localitza** | comprendre | arrossegar la patologia a l'estructura afectada sobre el model 3D o la làmina | sí |
| N3 | **Comprèn** | aplicar | simulador interactiu propi de l'estació (vegeu `content-map.md`) | sí |
| N4 | **Relaciona** | analitzar | graella *Patologia × Causa × Signes × Tractament* amb arrossegar i deixar + justificació escrita breu | sí |
| Final | **Cas clínic** | avaluar / crear | casos ramificats al taulell de la farmàcia | sí, pes doble |

- Donat un nivell no superat, el següent es mostra bloquejat però visible (l'alumne veu el camí).
- Un nivell se supera amb ≥ 60 % d'encerts; si no, es pot repetir amb ítems resortejats.

**REQ-07 (M) Bastida (scaffolding) explícita.**
1. **Objectiu visible** a dalt de cada pantalla (una frase: «Relacionaràs cada defecte de refracció amb on es forma la imatge»).
2. **Exemple resolt** al primer ítem de N2, N3 i N4 (es mostra fet i explicat, no puntua).
3. **Esvaïment (fading)**: a N4 la primera fila de la graella ve completa, la segona amb 2 caselles, la tercera buida.
4. **Pistes en tres graus**: (1) recordatori conceptual, (2) pista focalitzada sobre l'ítem, (3) eliminació de distractors. Cada pista resta 5 punts.
5. **Glossari emergent**: els termes tècnics (diplopia, otàlgia, anòsmia…) són enllaços que obren una definició breu i, si escau, l'etimologia (prefix + arrel + sufix).
6. **Retroacció específica d'error**: cada distractor té associada la concepció errònia que delata i una explicació (p. ex. «La miopia no és de prop: la imatge es forma *davant* de la retina, per això es veu malament *de lluny*»).
7. **Repàs adaptatiu**: si un mateix concepte falla 2 vegades, s'insereix una targeta de repàs de 20 s abans de continuar.
8. **Descripcions**: botó *Descripció* a cada escena (requisit d'accessibilitat i també de suport lector).

**REQ-08 (M) Interacció textual.** A més de l'arrossegament, cada estació inclou almenys una interacció de text:
- text amb buits i desplegables de 3 opcions (format de Sentits Quest), o
- resposta curta escrita amb correcció tolerant (minúscules, accents i errors d'1 caràcter), o
- justificació «Per què?» triant entre 3 explicacions (raonament, no memòria).

**REQ-09 (M) Interacció visual.** Cada estació inclou almenys: un model 3D o làmina manipulable, un diagrama o gràfic interactiu i una activitat d'arrossegar i deixar.

### 2.3 Puntuació (idèntica a Vascular Quest / Sentits Quest)

**REQ-10 (M)**
- Encert: **+10** · Error: **−3** · Pista: **−5** · Ratxa: **+15** cada 3 encerts seguits · Mínim **0** (mai negatiu).
- Estrelles per nivell: 3 (≥ 90 %), 2 (≥ 75 %), 1 (≥ 60 %).
- **Nota de 1 a 10** amb un decimal:
  `nota = 1 + 9 × (0,70 × mitjana_estacions + 0,30 × cas_clinic)`,
  on cada estació val la mitjana d'encert de N2–N4 i `encert = encerts / (encerts + errors + 0,5 × pistes)`.
- Donat un joc perfecte sense pistes, la nota és 10,0; donat un joc sense cap encert, la nota és 1,0 (comprovat a `tests/check.mjs`).

### 2.4 Cas clínic final

**REQ-11 (M) Casos ramificats a la farmàcia.** 3 casos encadenats (6–8 decisions en total), sortejats d'un banc de 6. Cada decisió té 3–4 opcions; les opcions condueixen a branques amb retroacció. Inclou:
- triar **preguntes d'anamnesi** pertinents (quan, quant temps, dolor, febre, medicació…),
- **relacionar** cada manifestació amb l'estructura o via afectada,
- decidir **consell farmacèutic o derivació** i justificar-ho.
- Donat que l'alumne tria *no derivar* davant d'un criteri d'alarma (hipoacúsia sobtada, lesió pigmentada canviant, cremada amb febre o butllofes extenses), aleshores el cas mostra la conseqüència i resta punts, però permet continuar.

### 2.5 Estadística i informe final

**REQ-12 (M) Panell d'estadística** (consultable en qualsevol moment): punts, nota provisional, temps per estació, encerts/errors/pistes per nivell i **mapa de domini** per patologia (verd / groc / vermell).

**REQ-13 (M) Informe final imprimible / PDF** (mateix format que les apps anteriors, `window.print()` amb full d'estil d'impressió A4):
- capçalera: nom, grup, data, idioma, durada total;
- nota 1–10, punts i estrelles;
- taula per estació i nivell;
- **les 5 patologies amb més errors** i la recomanació de repàs (diapositiva de la presentació corresponent);
- registre de decisions del cas clínic;
- peu: «Lliura aquest PDF a la tasca de Google Classroom».

### 2.6 Multimèdia

**REQ-14 (M) Imatges generades amb Seedream** (OpenRouter, model `bytedance-seed/seedream-5-5`) **en temps de construcció**, mai des del navegador. Cada imatge té manifest (prompt, model, data, llavor si n'hi ha, text alternatiu ca/es, revisió del professor sí/no).

**REQ-15 (M) Models 3D**: ull i orella (reutilitzats), fossa nasal amb epiteli olfactori i bulb, llengua amb papil·les i botó gustatiu, bloc de pell en tres capes amb annexos i receptors. Renderitzat sota demanda; si no hi ha WebGL, es mostra la làmina 2D equivalent i el nivell continua sent jugable.

**REQ-16 (M) Càpsules HyperFrames**: una per estació (45–75 s), **sense veu en off: només text animat i subtítols** (WebVTT ca/es, activats per defecte), amb pausa i repetició; es pot saltar després de 10 s. El vídeo tutorial de Remotion segueix el mateix criteri.

**REQ-17 (S) Àudio**: efectes de `fx.js`; a l'estació d'oïda, sons de demostració (so normal vs atenuat per simular hipoacúsia) amb control de volum i avís.

## 3. Requisits no funcionals

| ID | Requisit |
| --- | --- |
| RNF-1 | Primera càrrega < 3 MB sense vídeos; vídeos en càrrega diferida (MP4 H.264 + pòster WebP). |
| RNF-2 | Lighthouse ≥ 90 en Accessibilitat i Bones pràctiques. |
| RNF-3 | Funciona a Chrome, Edge, Firefox i Safari (darreres 2 versions) i a la pantalla tàctil d'aula. |
| RNF-4 | Cap dada personal surt del navegador; cap clau d'API al repositori ni al client. |
| RNF-5 | `tests/check.mjs` verifica: parells ca/es complets, cada patologia del `content-map` té ítems a N2–N4, cada distractor té explicació, cada imatge té alt ca/es, fórmula de nota. |
| RNF-6 | Proves Playwright d'extrem a extrem: partida completa en ca i es, amb ratolí i amb tàctil, a 1920×1080, 1366×768 i 390×844. |

## 4. Fora d'abast (v1)

- Backend, comptes reals o enviament automàtic a Classroom.
- Patologies del sistema nerviós (4.3–4.5) excepte parestèsia i hipoestèsia.
- Mode equips a la pissarra (és Pissarra Quest).

## 5. Traçabilitat amb la RA4

### 5.1 RA4 de MP0061 (Informació inicial del mòdul, curs 2026-27)

> **RA4 · Sistema nerviós i aparell locomotor.** Reconeix els sistemes relacionats amb el moviment, la percepció i la relació, descrivint l'estructura, el funcionament i les malalties del sistema nerviós, els sentits i l'aparell locomotor. *(22 h · pes 0,22 en la QMP)*

### 5.2 Criteris d'avaluació oficials

Al Drive del mòdul només hi ha el títol de la RA4. Els CA s'han pres del títol estatal (RD 1689/2007, mòdul 0061, RA4, criteris a–m), que el currículum català (`xtec … mp_SA20_farmacia_parafarmacia.docx`) recull en el mateix ordre. **Pendent: confirmar la redacció literal catalana amb aquest document.**

| CA | Criteri (traducció del RD 1689/2007) | Aquesta app |
| --- | --- | --- |
| 4.1 | S'han detallat les bases anatomofisiològiques del sistema nerviós. | — (Sentits Quest, Unitat 4.3) |
| **4.2** | **S'ha relacionat l'activitat nerviosa, muscular i sensorial.** | parcial: via de cada sentit fins al SNC, parestèsia i hipoestèsia |
| **4.3** | **S'han descrit les bases anatomofisiològiques dels òrgans dels sentits.** | sí: N1 i N2 de les cinc estacions |
| **4.4** | **S'han definit les manifestacions i malalties neurològiques més freqüents.** | parcial: alteracions sensorials i de la sensibilitat |
| 4.5–4.12 | Ossos, articulacions, músculs i les seves lesions. | — (aparell locomotor) |
| **4.13** | **S'han descrit l'estructura i les malalties de la pell.** | sí: estació Tacte i pell |

### 5.3 Indicadors d'assoliment de l'app (disseny propi)

Concreten els CA en conductes observables. Cada ítem de `data/*.js` porta el camp `ind` amb un d'aquests codis; l'informe en calcula el percentatge d'encert.

| Indicador | L'alumne… | CA | On s'avalua |
| --- | --- | --- | --- |
| I1 | identifica l'estructura anatòmica que falla en cada patologia | 4.3, 4.13 | N2 de totes les estacions |
| I2 | explica el mecanisme que produeix el signe o símptoma principal (p. ex. focus davant la retina → visió borrosa de lluny) | 4.3, 4.4 | N3 (simuladors) i «Per què?» |
| I3 | relaciona cada patologia amb la causa, els signes i el tractament | 4.3, 4.4, 4.13 | N4 (graella) |
| I4 | usa la terminologia mèdica amb precisió (prefixos *a-, hipo-, dis-, par-* i arrels *-òpia, -acúsia, -òsmia, -gèusia, -estèsia*) | 4.4 | glossari, laboratori de paraules, resposta curta |
| I5 | distingeix gust de sabor i relaciona l'olfacte amb la percepció del sabor | 4.2, 4.3 | estacions Olfacte i Gust |
| I6 | relaciona les alteracions de la sensibilitat cutània amb receptors i vies nervioses | 4.2, 4.4, 4.13 | estació Tacte i pell |
| I7 | reconeix criteris d'alarma i decideix quan cal derivar (hipoacúsia sobtada, lesió pigmentada canviant, cremada greu, formigueig persistent) | 4.4, 4.13 | N3 pell, cas clínic |
| I8 | aplica el coneixement a una consulta de farmàcia: anamnesi, consell i derivació | 4.2–4.4, 4.13 | cas clínic |

Nivells de domini per indicador a l'informe: **assolit** (≥ 75 %), **en procés** (50–74 %), **no assolit** (< 50 %).

## 6. Decisions del professor (16-11-2026)

| Pregunta | Decisió |
| --- | --- |
| Desbloqueig del cas clínic | Amb les **cinc** estacions completades |
| Contrasenya | La de les apps de FAR: `alumnesfar` (`anatomofisiologia03` no té pantalla d'entrada; s'ha pres la de `anatomofisiologia02`) |
| Veu en off a HyperFrames | **No**: només text animat i subtítols |
| Disseny | **Impeccable obligatori** (instal·lat a `.claude/`) |
| CA de la RA4 | Presos del RD 1689/2007 + indicadors propis (§5.2–5.3); pendent confirmar la redacció catalana |

Queda oberta: ¿es vol un mode «examen» sense pistes amb el mateix banc d'ítems? (fora d'abast de la v1 si no es demana).
