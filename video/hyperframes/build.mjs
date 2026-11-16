// Genera les càpsules de motion graphics (N1 · Observa) com a projectes HyperFrames, una per estació i idioma,
// a partir de les mateixes dades de l'app (data/stations.js · capsule) i de les làmines amb punts (drawings.js).
// Sense veu en off: només text animat i subtítols (també es generen en WebVTT per al reproductor de l'app).
// Ús:  node video/hyperframes/build.mjs            → crea video/hyperframes/<estació>-<idioma>/
//      node video/hyperframes/build.mjs --render   → i renderitza a assets/video/<estació>-<idioma>.mp4 (cal Chrome i ffmpeg)
import { mkdirSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { STATIONS } from '../../data/stations.js';
import { ORGANS } from '../../drawings.js';
import { PLATES } from '../../data/plates.js';

const ROOT = new URL('../../', import.meta.url).pathname;
const HERE = new URL('./', import.meta.url).pathname;
const W = 1280, H = 720, INTRO = 3.2, STEP = 4.6, OUTRO = 3.0;
const PL = { x: 60, y: 96, w: 760, h: 570 };          // làmina dins el vídeo (relació 1000 × 750)
const at = ([x, y]) => [PL.x + x / 1000 * PL.w, PL.y + (y + 25) / 750 * PL.h];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const T = { ca: { cap: 'Càpsula · Observa', end: 'Ara, explora la làmina', end2: 'Toca cada punt i descobreix què hi pot fallar.' },
  es: { cap: 'Cápsula · Observa', end: 'Ahora, explora la lámina', end2: 'Toca cada punto y descubre qué puede fallar.' } };
const vtt = s => { const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = (s % 60).toFixed(3).padStart(6, '0'); return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${x}`; };

function project(st, lang) {
  const dir = `${HERE}${st.id}-${lang}/`;
  mkdirSync(dir + 'assets/fonts', { recursive: true });
  copyFileSync(ROOT + `assets/laminas/${st.organ}.webp`, dir + 'assets/plate.webp');
  copyFileSync(HERE + 'gsap.min.js', dir + 'assets/gsap.min.js');
  for (const f of ['big-shoulders-display-latin-900-normal.woff2', 'atkinson-hyperlegible-latin-700-normal.woff2']) copyFileSync(ROOT + 'assets/fonts/' + f, dir + 'assets/fonts/' + f);
  const frames = st.capsule.map((f, i) => ({ ...f, xy: at(ORGANS[st.organ].parts.find(p => p[0] === f.part)[1]), start: INTRO + i * STEP }));
  const total = INTRO + frames.length * STEP + OUTRO;
  const title = st.title[lang], cue = [];
  frames.forEach(f => cue.push(`${vtt(f.start)} --> ${vtt(f.start + STEP - 0.2)}\n${f.t[lang]}`));
  writeFileSync(dir + 'captions.vtt', `WEBVTT\n\n${cue.join('\n\n')}\n`);
  const html = `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=${W}, height=${H}">
<script src="assets/gsap.min.js"></script>
<style>
@font-face { font-family: 'Big Shoulders Display'; font-weight: 900; src: url('assets/fonts/big-shoulders-display-latin-900-normal.woff2') format('woff2'); }
@font-face { font-family: 'Atkinson Hyperlegible'; font-weight: 700; src: url('assets/fonts/atkinson-hyperlegible-latin-700-normal.woff2') format('woff2'); }
:root { --st: ${st.color}; --cover: #22194d; --page: #f2b42c; --dot: #e2a015; --paper: #fffdf8; --foil: #ffd86b; --ink: #1b1533; }
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: ${W}px; height: ${H}px; overflow: hidden; background: var(--page); }
#root { position: relative; width: 100%; height: 100%; font-family: 'Atkinson Hyperlegible', sans-serif; color: var(--ink);
  background: var(--page) radial-gradient(var(--dot) 1.6px, transparent 1.8px) 0 0 / 20px 20px; }
.card { position: absolute; left: ${PL.x - 14}px; top: ${PL.y - 14}px; width: ${PL.w + 28}px; height: ${PL.h + 28}px; border-radius: 26px; background: #fff;
  box-shadow: 0 2px 0 rgb(0 0 0 / .06), 0 24px 40px -22px rgb(27 21 51 / .55); }
#plate { position: absolute; left: ${PL.x}px; top: ${PL.y}px; width: ${PL.w}px; height: ${PL.h}px; border-radius: 14px; }
#ring { position: absolute; left: 0; top: 0; width: 64px; height: 64px; margin: -32px 0 0 -32px; border-radius: 50%; border: 6px solid var(--foil);
  box-shadow: 0 0 0 5px var(--ink), 0 0 0 22px rgb(255 216 107 / .35); }
.head { position: absolute; left: ${PL.x}px; top: 30px; display: flex; align-items: baseline; gap: 18px; }
.head h1 { font-family: 'Big Shoulders Display'; font-weight: 900; font-size: 50px; line-height: 1; color: var(--ink); }
.head span { font-weight: 700; font-size: 20px; color: #4a3500; }
.panel { position: absolute; left: 836px; top: 82px; width: 412px; height: 590px; border-radius: 26px; background: var(--paper); box-shadow: 0 24px 40px -22px rgb(27 21 51 / .55); }
.part { position: absolute; left: 860px; top: 150px; width: 360px; }
.part b { display: block; font-family: 'Big Shoulders Display'; font-weight: 900; font-size: 46px; line-height: 1; color: var(--st); }
.part i { display: block; width: 60px; height: 8px; border-radius: 4px; background: var(--st); margin-top: 16px; }
.num { position: absolute; left: 860px; top: 96px; font-family: 'Big Shoulders Display'; font-weight: 900; font-size: 24px; color: var(--cover); }
.sub { position: absolute; left: 860px; top: 260px; width: 370px; padding: 22px 24px; border-radius: 20px; background: var(--cover); color: #fff;
  font-size: 27px; line-height: 1.32; font-weight: 700; }
.title, .outro { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; gap: 14px; background: var(--cover); color: #fff; }
.title h2, .outro h2 { font-family: 'Big Shoulders Display'; font-weight: 900; font-size: 120px; line-height: 1; color: var(--page); }
.title p, .outro p { font-size: 30px; font-weight: 700; color: #c4bbef; }
.title i { justify-self: center; width: 120px; height: 12px; border-radius: 6px; background: var(--st); }
</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${total.toFixed(2)}" data-width="${W}" data-height="${H}">
  <div class="card"></div>
  <div class="panel"></div>
  <img id="plate" src="assets/plate.webp" alt="${esc(PLATES[st.organ].title[lang])}">
  <div id="head" class="head clip" data-start="${INTRO}" data-duration="${(frames.length * STEP).toFixed(2)}" data-track-index="0"><h1>${esc(title)}</h1><span>${esc(T[lang].cap)}</span></div>
  <div id="ring" class="clip" data-start="${INTRO}" data-duration="${(frames.length * STEP).toFixed(2)}" data-track-index="1"></div>
${frames.map((f, i) => `  <div id="n${i}" class="num clip" data-start="${f.start}" data-duration="${STEP}" data-track-index="2">${i + 1} / ${frames.length}</div>
  <div id="p${i}" class="part clip" data-start="${f.start}" data-duration="${STEP}" data-track-index="3"><b>${esc(PLATES[st.organ].parts[f.part][lang])}</b><i></i></div>
  <div id="s${i}" class="sub clip" data-start="${f.start}" data-duration="${STEP}" data-track-index="4" data-track-kind="captions">${esc(f.t[lang])}</div>`).join('\n')}
  <div id="title" class="title clip" data-start="0" data-duration="${INTRO}" data-track-index="5"><i></i><h2>${esc(title)}</h2><p>${esc(st.tagline[lang])}</p></div>
  <div id="outro" class="outro clip" data-start="${(total - OUTRO).toFixed(2)}" data-duration="${OUTRO}" data-track-index="5"><h2>${esc(T[lang].end)}</h2><p>${esc(T[lang].end2)}</p></div>
</div>
<script>
const tl = gsap.timeline({ paused: true });
const E = 'expo.out';
tl.fromTo('#title h2', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .7, ease: E }, .1)
  .fromTo('#title p', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .6, ease: E }, .35)
  .fromTo('#title i', { scaleX: 0 }, { scaleX: 1, duration: .6, ease: E }, .2)
  .to('#title h2, #title p, #title i', { opacity: 0, duration: .35, ease: 'power2.in' }, ${(INTRO - 0.4).toFixed(2)});
tl.set('#ring', { x: ${frames[0].xy[0].toFixed(1)}, y: ${frames[0].xy[1].toFixed(1)} }, 0);
tl.fromTo('#ring', { scale: 2.4, opacity: 0 }, { scale: 1, opacity: 1, duration: .6, ease: E }, ${INTRO});
${frames.map((f, i) => `${i ? `tl.to('#ring', { x: ${f.xy[0].toFixed(1)}, y: ${f.xy[1].toFixed(1)}, duration: .9, ease: 'power3.inOut' }, ${(f.start - 0.45).toFixed(2)});\n` : ''}tl.fromTo('#ring', { scale: 1 }, { scale: 1.18, duration: .5, ease: 'sine.inOut', yoyo: true, repeat: 3 }, ${(f.start + 0.6).toFixed(2)});
tl.fromTo('#p${i} b', { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: .5, ease: E }, ${(f.start + 0.05).toFixed(2)});
tl.fromTo('#p${i} i', { scaleX: 0 }, { scaleX: 1, duration: .5, ease: E, transformOrigin: 'left center' }, ${(f.start + 0.15).toFixed(2)});
tl.fromTo('#s${i}', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .45, ease: E }, ${(f.start + 0.2).toFixed(2)});
tl.to('#s${i}, #p${i} b', { opacity: 0, duration: .25, ease: 'power2.in' }, ${(f.start + STEP - 0.3).toFixed(2)});`).join('\n')}
tl.fromTo('#outro h2', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .6, ease: E }, ${(total - OUTRO + 0.1).toFixed(2)});
tl.fromTo('#outro p', { opacity: 0 }, { opacity: 1, duration: .5, ease: E }, ${(total - OUTRO + 0.35).toFixed(2)});
window.__timelines = window.__timelines || {};
window.__timelines["main"] = tl;
tl.seek(0);
</script>
</body>
</html>
`;
  writeFileSync(dir + 'index.html', html);
  writeFileSync(dir + 'hyperframes.json', JSON.stringify({ name: `${st.id}-${lang}` }, null, 1));
  return { dir, total };
}

const render = process.argv.includes('--render');
const only = process.argv.filter(a => !a.startsWith('--')).slice(2);
mkdirSync(ROOT + 'assets/video', { recursive: true });
for (const st of STATIONS) for (const lang of ['ca', 'es']) {
  if (only.length && !only.includes(`${st.id}-${lang}`)) continue;
  const { dir, total } = project(st, lang);
  copyFileSync(dir + 'captions.vtt', ROOT + `assets/video/${st.id}-${lang}.vtt`);
  console.log(`${st.id}-${lang}: ${total.toFixed(1)} s`);
  if (render) {
    const out = ROOT + `assets/video/${st.id}-${lang}.mp4`;
    execFileSync('npx', ['--yes', 'hyperframes@0.9.56', 'render', dir, '-o', out, '--crf', '23', '--fps', '30', '--quiet'], { stdio: 'inherit' });
    // pòster: fotograma del primer pas
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(3.2 + 2), '-i', out, '-frames:v', '1', '-q:v', '70', ROOT + `assets/video/${st.id}-${lang}.webp`]);
    if (!existsSync(out)) throw new Error('render fallit: ' + out);
  }
}
