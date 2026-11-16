# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

HTML, CSS i JavaScript estàtics amb mòduls ES, sense *bundler* ni backend; three.js i Motion vendoritzats a `vendor/`; publicació a GitHub Pages. És la mateixa pila de la família *Quest* (`rvs78/anatomia02`, `anatomofisiologia02`, `anatomofisiologia03`), decidida pel professor.

## Users

- **Alumnat de FAR 1L** (CFGM Farmàcia i Parafarmàcia, Institut d'FP Sanitària Vall d'Hebron). Juga a l'aula amb ordinador, a la pantalla digital tàctil i a casa, sovint des del mòbil. Nivell lector heterogeni; part del grup treballa millor en castellà.
- **Professor** (especialitat 518, Processos Sanitaris). Rep l'informe en PDF a la tasca de Google Classroom i en consulta l'estadística per detectar errors freqüents del grup.

## Product Purpose

Que l'alumnat relacioni cada patologia dels òrgans dels sentits (vista, oïda, olfacte, gust i tacte/pell) amb l'estructura afectada, la causa, els signes i símptomes i el tractament, i que ho apliqui al taulell de la farmàcia: quines preguntes fer, quin consell donar i quan derivar. Avalua els CA 4.2, 4.3, 4.4 i 4.13 de la RA4 de MP0061 (vegeu `specs/001-patologies-sentits/spec.md §5`).

Èxit: l'alumne supera les cinc estacions i el cas clínic final, i l'informe mostra al professor quines patologies cal reforçar.

## Positioning

És la peça «clínica» de la família *Quest*: les apps anteriors ensenyen on és cada estructura; aquesta ensenya què passa quan falla i què ha de fer el tècnic de farmàcia. La progressió acaba sempre en un cas real de taulell.

## Operating Context

- Sessions d'aula de 55 min; el progrés es desa per continuar un altre dia.
- Pantalla digital tàctil d'aula (≥ 1920 px), ordinadors de l'aula i mòbils personals.
- Lliurament: PDF de l'informe a una tasca de Google Classroom (no Moodle).
- Font de contingut: presentació de classe *Unitat 4 · Coordinació i sentits · Pell i mucoses · Revisió ampliada* (Canva) i el llibre Altamar (Ortega, Anatomofisiologia i patologia bàsiques).

## Capabilities and Constraints

- Entrada amb nom, grup, idioma i la contrasenya de classe de FAR (`alumnesfar`, la de `anatomofisiologia02`; `anatomofisiologia03` no té entrada).
- Bilingüe català / castellà, canviable a mitja partida sense perdre progrés.
- Puntuació idèntica a les apps anteriors: +10, −3, −5 per pista, +15 cada 3 encerts seguits, mínim 0; nota de 1 a 10.
- Cinc estacions de quatre nivells (Observa, Localitza, Comprèn, Relaciona); el cas clínic final es desbloqueja **només amb les cinc estacions completades**.
- Càpsules HyperFrames **només amb subtítols** (sense veu en off).
- Imatges Seedream (OpenRouter) generades en temps de construcció; cap clau d'API al client.
- Sense backend, sense comptes reals, sense enviament automàtic a Classroom.

## Brand Commitments

- Nom de família *Quest* i sistema visual «Àlbum de cromos» (vegeu `DESIGN.md`), compartit amb Vascular Quest i Sentits Quest.
- Peu de les pantalles i de l'informe: «Anatomofisiologia i patologia bàsiques · CFGM Farmàcia i Parafarmàcia».
- Autoria: Rubén Vallejo.

## Evidence on Hand

- Taules de patologies de la RA4: presentació de Canva (diapositives 14–16, 25, 30, 43–55, 86–87) i `RA4_Taules_Patologies_Sentits.pdf` al Drive del professor.
- Models 3D d'ull i orella: `rvs78/anatomofisiologia02/models.js`.
- Làmines SVG i il·lustracions de llengua, nas i pell: `rvs78/anatomofisiologia03`.
- No hi ha fotografies reals de pacients ni testimonis: no se n'han d'inventar.

## Product Principles

1. **La pedagogia mana**: cada pantalla té un objectiu explícit i una sola acció principal.
2. **Primer veure, després fer, al final decidir**: modelatge → pràctica guiada → pràctica autònoma → cas clínic.
3. **L'estructura explica la patologia**: tota patologia s'ancora a l'estructura que falla.
4. **Premiar saber, no endevinar**: cap ordre ni número delata la resposta; cada error té retroacció específica.
5. **Prudència sanitària**: el consell de farmàcia no substitueix la valoració mèdica; els criteris de derivació són explícits.

## Accessibility & Inclusion

WCAG 2.1 AA. Tot arrossegament té alternativa tocar-tocar i de teclat; cada imatge, model 3D i vídeo té descripció textual (ca/es); subtítols obligatoris; `prefers-reduced-motion` respectat; els simuladors visuals avisen abans i es poden desactivar.
