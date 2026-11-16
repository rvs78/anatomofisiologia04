# Mapa de contingut — patologies, activitats i imatges

Font: presentació *Unitat 4 · Coordinació i sentits · Pell i mucoses · Revisió ampliada* (Canva `DAHYwytIVFU`). Entre claudàtors, diapositiva o taula d'origen. Els textos definitius es redacten a `data.js` en català i castellà amb el mateix ordre.

---

## Estació 1 · Vista `#0b7a83`

### Patologies [dip. 14–16 i taules «VISTA»]

| Patologia | Estructura (N2) | Causa | Signes i símptomes | Tractament |
| --- | --- | --- | --- | --- |
| Miopia | longitud del globus / focus davant la retina | ull llarg o excés de potència òptica | visió borrosa de lluny; aclucar els ulls | lents divergents; cirurgia refractiva seleccionada |
| Hipermetropia | focus darrere la retina | ull curt o potència insuficient | dificultat de prop, fatiga ocular | lents convergents |
| Astigmatisme | còrnia (o cristal·lí) | curvatura irregular | visió distorsionada a diverses distàncies | lents cilíndriques / tòriques |
| Presbícia | cristal·lí + múscul ciliar | pèrdua d'elasticitat amb l'edat | cost per enfocar de prop; allunyar el text | ulleres de prop, progressives |
| Cataracta | cristal·lí | opacificació, sovint per l'edat | visió tèrbola, enlluernament, pitjor visió nocturna | cirurgia de substitució del cristal·lí |
| Glaucoma | nervi òptic (disc òptic) | dany del nervi, sovint pressió intraocular elevada | inicialment asimptomàtic; pèrdua progressiva de camp visual | col·liris hipotensors, làser o cirurgia |
| Estrabisme | músculs extraoculars / control binocular | desalineació ocular | desviació d'un ull; de vegades diplopia | correcció òptica, exercicis, cirurgia |
| Daltonisme | cons | alteració dels fotopigments, sovint hereditària | dificultat per diferenciar colors | adaptacions; sense curació habitual |
| Degeneració macular | màcula | alteració associada a l'edat | pèrdua o distorsió de visió central | seguiment; anti-VEGF en formes neovasculars |

### Activitats

- **N1 Observa** — Càpsula HyperFrames «Com enfoca l'ull i on falla» (raig de llum → còrnia → cristal·lí → retina; després focus davant / darrere / dispers). Làmina d'ull amb punts calents. Predicció: «Si l'ull és més llarg, on cau el focus?».
- **N2 Localitza** — Model 3D de l'ull (reutilitzat de `anatomofisiologia02/models.js`). Arrossegar 6 cromos de patologia (sortejats de 9) a l'estructura afectada; el model gira per mostrar la cara correcta.
- **N3 Comprèn** — dos simuladors:
  1. **Banc òptic**: diagrama SVG de raigs. Lliscador «longitud de l'ull» i «curvatura del cristal·lí»; l'alumne arrossega la lent correctora (convergent / divergent / cilíndrica) fins que el focus cau a la retina. 4 reptes: miopia, hipermetropia, astigmatisme, presbícia.
  2. **Ulleres del pacient**: la mateixa escena quotidiana (prospecte d'un medicament i un carrer) amb filtres canvas/WebGL — boira i enlluernament (cataracta), túnel (glaucoma), escotoma central (DMAE), paleta deuteranopia (daltonisme), doble imatge (estrabisme). L'alumne identifica la patologia i després tria quina estructura falla («Per què?»).
- **N4 Relaciona** — graella 4×4 amb esvaïment + text amb buits de Sentits Quest (miopia–presbícia, cataracta–glaucoma).

## Estació 2 · Oïda `#b1500f`

### Patologies [dip. 25 i taula «OÏDA»]

| Patologia | Estructura (N2) | Causa | Signes i símptomes | Tractament |
| --- | --- | --- | --- | --- |
| Hipoacúsia de transmissió | orella externa / mitjana | obstrucció o alteració | disminució d'audició; orella tapada | tractar la causa; audiòfons o cirurgia |
| Hipoacúsia neurosensorial | còclea / nervi auditiu | dany coclear o nerviós | pèrdua auditiva, dificultat per entendre paraules | audiòfons, implants; **urgent si sobtada** |
| Otitis mitjana | orella mitjana (caixa del timpà) | inflamació / infecció | otàlgia, febre, a vegades hipoacúsia | analgèsia; antibiòtic si indicat |
| Tap de cerumen | conducte auditiu extern | acumulació de cerumen | orella tapada, hipoacúsia, a vegades acúfens | cerumenolítics o extracció professional |
| Vertigen vestibular | canals semicirculars, utricle i sàcul | alteració vestibular (VPPB i altres) | sensació de gir, nàusees, desequilibri | segons causa; maniobres en VPPB |

### Activitats

- **N1** — Càpsula HyperFrames «El camí del so i on es bloqueja» (reaprofita l'animació de 6 fases ja feta per a la presentació, dip. 23–24).
- **N2** — Model 3D de l'orella: arrossegar patologies a l'estructura.
- **N3** — **Via del so interactiva**: l'alumne col·loca un «bloqueig» (tap, líquid d'otitis, cèl·lules ciliades lesionades) i l'animació mostra fins on arriba la vibració; després classifica transmissió / neurosensorial. **Demostració sonora** (opcional, amb avís): mateixa frase normal i atenuada. **Vertigen**: cap 3D que gira; relacionar canals semicirculars (acceleració angular) i utricle/sàcul (lineal).
- **N4** — graella + resposta curta («Quin signe obliga a derivar d'urgència?» → hipoacúsia sobtada).

## Estació 3 · Olfacte `#5b6f1e`

### Patologies [dip. 28, 30 i taula «OLFACTE»]

| Patologia | Estructura (N2) | Causa | Signes i símptomes | Tractament |
| --- | --- | --- | --- | --- |
| Hipòsmia | mucosa olfactòria | rinitis, inflamació, infecció vírica | capacitat d'olorar reduïda | tractar la causa; entrenament olfactiu |
| Anòsmia | fosses nasals (obstrucció) o epiteli / via olfactòria | obstrucció, seqüela postvírica, traumatisme, causa neurològica | pèrdua de l'olfacte; menys sabor | valorar la causa; tractament específic |
| Paròsmia | vies olfactives | alteració sovint postinfecciosa | olors conegudes distorsionades | seguiment i entrenament olfactiu |

### Activitats

- **N1** — Càpsula «Com olorem» (5 fases de la dip. 28: aire → moc → cilis → làmina cribosa → bulb → escorça i sistema límbic).
- **N2** — Model 3D de la fossa nasal en tall sagital: on actua cada causa (moc / obstrucció, epiteli, làmina cribosa per traumatisme, bulb).
- **N3** — **Laboratori de paraules**: construir termes amb prefixos (*a-*, *hipo-*, *par-*, *dis-*) i arrels (*-òsmia*, *-gèusia*, *-acúsia*, *-estèsia*) i encaixar-los amb casos breus. Ordenar la via olfactòria (arrossegar).
- **N4** — graella + «Per què?»: «Amb una rinitis el menjar té menys sabor» (dip. 53–54).

## Estació 4 · Gust `#a3245e`

### Alteracions [dip. 29–30, 53–54]

| Alteració | Definició | Estructura implicada |
| --- | --- | --- |
| Hipogèusia | disminució del gust | botons gustatius / vies (VII, IX, X) |
| Agèusia | pèrdua del gust | botons gustatius / vies |
| Disgèusia | percepció gustativa alterada | botons gustatius / vies |
| Sabor ≠ gust | el sabor integra gust, olfacte, textura i temperatura | congestió nasal → menys sabor amb gust conservat |

La presentació no inclou taula de causes i tractaments per al gust: N4 d'aquesta estació treballa definicions, via gustativa i la distinció gust/sabor. Qualsevol ampliació (p. ex. fàrmacs que alteren el gust) s'ha de validar abans.

### Activitats

- **N1** — Càpsula «Com tastem» (5 fases de la dip. 29).
- **N2** — Model 3D de la llengua amb papil·la ampliada i botó gustatiu: col·locar porus, cèl·lules gustatives i nervis.
- **N3** — **El mite del mapa de la llengua**: la llengua mostra zones «clàssiques»; l'alumne ha de detectar per què és fals (dip. 29). **Simulador del sabor**: lliscadors gust / olfacte / textura / temperatura; amb el nas «tapat» el sabor baixa però els 5 gustos bàsics es mantenen.
- **N4** — classificar 6 casos breus en hipogèusia / agèusia / disgèusia / «menys sabor per congestió (olfacte)».

## Estació 5 · Tacte i pell `#7a4a2a`

### Patologies [dip. 43–55 i taules «TACTE I PELL»]

| Patologia | Estructura (N2) | Causa | Signes i símptomes | Tractament / consell |
| --- | --- | --- | --- | --- |
| Acne | unitat pilosebàcia | obstrucció fol·licular, sèu, inflamació | comedons, pàpules, pústules | neteja suau; peròxid de benzoil, retinoides segons gravetat |
| Furunculosi | fol·licle pilós (profund) | infecció, sovint estafilococs | nòdul vermell, calent, dolorós, amb pus | compreses; drenatge o antibiòtic si indicat |
| Psoriasi | epidermis (renovació accelerada) | inflamació immunomediada crònica | plaques eritematoses i escates; pruïja | emol·lients, corticoides tòpics |
| Melanoma | melanòcits (estrat basal) | transformació maligna; risc UV | lesió pigmentada que canvia (ABCDE) | **valoració dermatològica urgent** |
| Cremada solar | epidermis / dermis | excés de radiació UV | eritema, dolor, calor; butllofes | refredar, hidratar pell intacta; derivar si greu |
| Parestèsia | nervis / vies sensitives | alteració o irritació nerviosa | formigueig, punxades | identificar la causa; derivar si persisteix |
| Hipoestèsia | receptors / vies sensitives | causes neurològiques diverses | menys sensibilitat a contacte, dolor, temperatura | estudi de la causa; protegir la zona |
| Prurit | terminacions lliures de la pell | dermatosi, al·lèrgia, sequedat | picor i ganes de rascar | hidratació; segons etiologia |

### Activitats

- **N1** — Càpsula «Estructura → funció → alteració» (dip. 49): epidermis, dermis, hipodermis, annexos i receptors (Meissner, Merkel, Pacini, Ruffini, terminacions lliures).
- **N2** — **Bloc de pell 3D en vista explosionada** (separar capes amb un lliscador). Arrossegar cada patologia a la capa / estructura.
- **N3** — **Detectiu ABCDE**: 8 il·lustracions de lesions pigmentades (Seedream, estil atles). Per a cada una, marcar A, B, C, D, E i decidir «vigilar» o «derivar». **Triatge de la cremada solar** (dip. 46): arrossegar signes a «consell a la farmàcia» o «derivar».
- **N4** — graella + text amb buits sobre receptors i alteracions de la sensibilitat.

## Estació 6 · Cas clínic integrat `#22194d` + `#1f8a4c`

Banc de 6 casos (se'n sortegen 3). Cada cas té fitxa del pacient, diàleg i 2–3 decisions.

| Cas | Origen | Decisions clau |
| --- | --- | --- |
| C1 · «Em costa llegir de prop, tinc el nas tapat i formigueig als peus» | dip. 86–87 | relacionar: acomodació / olfacte i sabor / parestèsia; no afirmar una causa única; derivar el formigueig si persisteix |
| C2 · «Eritema al nas després d'un dia de platja» | dip. 47–48 | preguntes (quan, butllofes, febre, fàrmacs fotosensibilitzants); consell vs derivació |
| C3 · «Orella tapada després de la piscina» | taula oïda | tap de cerumen vs otitis (febre, otàlgia); cerumenolític o derivar |
| C4 · «He perdut l'audició d'una orella de cop» | taula oïda | criteri d'alarma → derivació urgent |
| C5 · «Pacient amb col·liri per al glaucoma» | dip. 55 | tècnica i adherència; per què és asimptomàtic al principi |
| C6 · «Una piga que ha canviat de color» | dip. 45 | ABCDE → derivació dermatològica urgent; fotoprotecció |

---

## Banc d'imatges Seedream (estil comú)

**Prefix de prompt comú (anglès, millor rendiment del model):**
> *Medical atlas illustration, technical watercolor with fine ink linework, neutral warm off-white background (#fffdf8), soft even lighting, anatomically accurate, educational, no text, no labels, no letters, no watermark, no logos.*

| ID | Ús | Prompt específic (afegit al prefix) |
| --- | --- | --- |
| `vista-ull-sa` | N1 vista | horizontal cross-section of a healthy right human eye, cornea, lens, iris, retina, optic nerve clearly visible |
| `vista-cataracta` | parell abans/després | same eye cross-section with a cloudy opaque yellowish lens (cataract) |
| `vista-glaucoma-fons` | parell | fundus view of the retina with enlarged optic disc cupping (glaucoma) |
| `vista-dmae-fons` | parell | fundus view with drusen and pigment changes at the macula (age-related macular degeneration) |
| `oida-orella-sana` | N1 oïda | coronal section of the right human ear, outer, middle and inner ear |
| `oida-otitis` | parell | tympanic membrane seen through an otoscope, red and bulging (acute otitis media) |
| `oida-tap` | parell | ear canal partially blocked by a brown cerumen plug, otoscope view |
| `olf-fossa` | N1 olfacte | sagittal section of the nasal cavity showing olfactory epithelium, cribriform plate and olfactory bulb |
| `olf-rinitis` | parell | same nasal cavity with swollen mucosa and mucus blocking airflow |
| `gust-boto` | N1 gust | magnified taste bud inside a tongue papilla, taste pore, gustatory cells, nerve fibres |
| `pell-bloc` | N1 pell | 3D block of human skin with epidermis, dermis, hypodermis, hair follicle, sebaceous and sweat glands, sensory receptors |
| `pell-acne` | N2 / N3 | close-up illustration of a hair follicle clogged with sebum forming a comedone and an inflamed papule |
| `pell-furuncle` | N2 / N3 | cross-section of a deep infected hair follicle with pus (furuncle) |
| `pell-psoriasi` | N2 / N3 | cross-section of skin with thickened epidermis and silvery scales (psoriasis plaque) |
| `pell-abcde-01…08` | N3 ABCDE | stylised illustrated pigmented skin lesion, *variant*: symmetric round even brown / asymmetric / irregular borders / multiple colours / larger diameter … (4 benignes, 4 amb signes d'alarma) |
| `pell-cremada` | N3 triatge | illustrated sunburned nose and cheeks, redness, no blisters |
| `farmacia-taulell` | cas clínic | friendly pharmacy counter scene, pharmacist and adult customer, flat editorial illustration, Mediterranean light |

Regles: sense text dins la imatge; mida 1536×1024 (escenes) o 1024×1024 (detalls); exportar a WebP ≤ 250 kB; text alternatiu ca/es al manifest; **revisió anatòmica del professor obligatòria** abans de publicar (camp `reviewed: true`).
