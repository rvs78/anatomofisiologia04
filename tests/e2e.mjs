// Prova d'extrem a extrem: juga una partida completa (5 estacions × 4 nivells + cas clínic) resolent cada motor
// amb les dades reals. Ús: npx serve -l 3000 . &  node tests/e2e.mjs   (variables: BASE, VW, VH, LANG2=es, TOUCH=1, CHROME, SHOTS=1, WITH3D=1)
import { chromium } from 'playwright';
const BASE = process.env.BASE || 'http://localhost:3000/';
const VW = +(process.env.VW || 1440), VH = +(process.env.VH || 900), LANG = process.env.LANG2 || 'ca';
const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
const p = await b.newPage({ viewport: { width: VW, height: VH }, hasTouch: !!process.env.TOUCH }); p.setDefaultTimeout(8000); p.setDefaultTimeout(5000);
const errs = []; p.on('pageerror', e => errs.push('PAGE ' + e.stack)); p.on('console', m => { if (m.type() === 'error') errs.push('CONSOLE ' + m.text()); });
await p.goto(BASE); await p.waitForTimeout(600);
if (LANG === 'es') { await p.click('.langopt[data-lang="es"]'); }
await p.fill('[name=email]', 'prova@isvh.cat'); await p.fill('[name=password]', 'alumnesfar'); await p.click('#login .btn');
await p.waitForTimeout(500); await p.click('dialog [data-close]'); await p.waitForTimeout(300);
const D = await p.evaluate(async lang => {
  const L = o => (o && typeof o === 'object' && 'ca' in o ? o[lang] : o);
  const { STATIONS } = await import('./data/stations.js'); const { PATH } = await import('./data/pathologies.js');
  const { GLOSSARY } = await import('./data/glossary.js');
  const out = { plate: {}, cls: {}, write: {}, sound: {}, word: [] , abcde: {} };
  for (const st of STATIONS) {
    for (const x of st.n2) out.plate[(x.label ? L(x.label) : L(PATH[x.c].name))] = x.part;
    const clsCfgs = [...st.n3.filter(c => c.type === 'classify'), ...(st.n4.classify ? [st.n4.classify] : [])];
    for (const c of clsCfgs) for (const [lab, bin] of c.items) out.cls[L(lab)] = bin;
    for (const w of st.n4.write) out.write[L(w.q)] = L(w.answer);
    for (const c of st.n3) {
      if (c.type === 'soundpath') for (const s of c.scenarios) out.sound[L(s.t)] = [s.stop, s.kind];
      if (c.type === 'wordlab') for (const w of c.items) { const name = L(PATH[w.c].name); out.word.push([L(GLOSSARY.find(g => L(g.term) === name)?.def) || L(PATH[w.c].def), w.pre, w.root]); }
      if (c.type === 'abcde') for (const a of c.items) out.abcde[a.img] = a;
    }
  }
  out.optics = { [L(PATH.miopia.name)]: 'div', [L(PATH.hipermetropia.name)]: 'conv', [L(PATH.astigmatisme.name)]: 'cyl', [L(PATH.presbicia.name)]: 'conv' };
  return out;
}, LANG);

const SHOT = new Set();
// Centra un punt de la làmina abans de tocar-lo (si no, en mòbil pot quedar sota la capçalera fixa).
async function tapTarget(sel) { await p.locator(sel).evaluate(el => el.scrollIntoView({ block: 'center' })); await p.locator(sel).click({ force: true }); }
async function shot(n){ if(!process.env.SHOTS || SHOT.has(n)) return; SHOT.add(n); await p.waitForTimeout(350); await p.screenshot({ path: `/tmp/x-${n}.png` }); }
async function solveTask() {
  const h = '#task';
  for (const n of ['capsule','explore','dragplate','gridtask','classify','ordertask','optics','visionsim','soundpath','wordlab','abcde','writeform','flavor','qcard']) if (await p.$(`${h} .${n}`)) { await shot(n); break; }
  if (await p.$(`${h} .lvsum`)) return 'end';
  if (await p.$(`${h} .capsule`)) { await p.click(`${h} [data-next]`); return; }
  if (await p.$(`${h} .explore`)) {
    await tapTarget(`${h} .ex2d .dot >> nth=0`); // els punts veïns es poden solapar: l'app tria el centre més proper
    if (process.env.WITH3D && await p.$(`${h} [data-view="3d"]`)) { await p.click(`${h} [data-view="3d"]`); await p.waitForTimeout(800); await p.click(`${h} [data-view="2d"]`); }
    await p.click(`${h} [data-next]`); return;
  }
  if (await p.$(`${h} .dragplate`)) {
    while (await p.$(`${h} [data-chip]`)) {
      const name = (await p.textContent(`${h} [data-chip] >> nth=0`)).trim();
      await p.click(`${h} [data-chip] >> nth=0`); await tapTarget(`${h} [data-target="${D.plate[name]}"]`);
    }
    await p.click(`${h} [data-next]`); return;
  }
  if (await p.$(`${h} .gridtask`)) {
    while (await p.$(`${h} [data-chip]`)) {
      const key = await p.getAttribute(`${h} [data-chip] >> nth=0`, 'data-chip');
      await p.click(`${h} [data-chip] >> nth=0`); await p.click(`${h} [data-target="${key}"]`);
    }
    await p.click(`${h} [data-next]`); return;
  }
  if (await p.$(`${h} .classify`)) {
    while (await p.$(`${h} [data-chip]`)) {
      const lab = (await p.textContent(`${h} [data-chip] >> nth=0`)).trim();
      await p.click(`${h} [data-chip] >> nth=0`); await p.click(`${h} [data-target="${D.cls[lab]}"]`);
    }
    await p.click(`${h} [data-next]`); return;
  }
  if (await p.$(`${h} .ordertask`)) { let n = 0; while (await p.$(`${h} .tray [data-k="${n}"]`)) { await p.click(`${h} .tray [data-k="${n}"]`); n++; } await p.click(`${h} [data-next]`); return; }
  if (await p.$(`${h} .optics`)) {
    const q = await p.textContent(`${h} .optpanel .q b`); await p.click(`${h} [data-lens="${D.optics[q.trim()]}"]`); await p.click(`${h} [data-check]`); await p.click(`${h} [data-next]`); return;
  }
  if (await p.$(`${h} .visionsim`)) {
    const cls = await p.getAttribute(`${h} .simframe`, 'class'); const c = cls.match(/fx-(\w+)/)[1];
    await p.click(`${h} [data-c="${c}"]`); await p.click(`${h} [data-s="${c}"]`); await p.click(`${h} [data-next]`); return;
  }
  if (await p.$(`${h} .soundpath`)) {
    const q = (await p.textContent(`${h} .soundpath > .q`)).trim(); const [stop, kind] = D.sound[q];
    await p.click(`${h} .snode[data-k="${stop}"]`); await p.click(`${h} [data-kind="${kind}"]`); await p.click(`${h} [data-next]`); return;
  }
  if (await p.$(`${h} .wordlab`)) {
    const q = await p.textContent(`${h} .wordlab > .q`); const w = D.word.find(([d]) => q.includes(d));
    await p.click(`${h} [data-g="pre"] [data-v="${w[1]}"]`); await p.click(`${h} [data-g="root"] [data-v="${w[2]}"]`); await p.click(`${h} [data-check]`); await p.click(`${h} [data-next]`); return;
  }
  if (await p.$(`${h} .abcde`)) {
    const src = await p.getAttribute(`${h} .lesion img`, 'src'); const it = D.abcde[src.match(/(lesio-\d)/)[1]];
    for (const l of it.alarm) await p.click(`${h} [data-l="${l}"]`);
    await p.click(`${h} [data-r="${it.refer ? 1 : 0}"]`); await p.click(`${h} [data-check]`); await p.click(`${h} [data-next]`); return;
  }
  if (await p.$(`${h} .writeform`)) {
    const q = (await p.textContent(`${h} label.q`)).trim(); await p.fill(`${h} #w-in`, D.write[q]); await p.click(`${h} .writeform .btn`); await p.click(`${h} [data-next]`); return;
  }
  if (await p.$(`${h} .choice`)) { await p.click(`${h} .choice[data-k="0"]`); await p.click(`${h} [data-next]`); return; }
  throw new Error('motor desconegut: ' + (await p.innerHTML(h)).slice(0, 200));
}

process.on('exit', c => { if (c) console.log('Errors de pàgina:', errs.join(' || ') || 'cap'); });
const stations = ['vista', 'oida', 'olfacte', 'gust', 'pell'];
for (const st of stations) {
  await p.click(`[data-st="${st}"]`);
  for (let lv = 1; lv <= 4; lv++) {
    for (let guard = 0; guard < 40; guard++) { if ((await solveTask()) === 'end') break; await p.waitForTimeout(60); }
    const ok = await p.$('.lvsum.ok'); if (!ok) throw new Error(`${st} N${lv} no superat`);
    if (lv < 4) await p.click('#nextlv'); else await p.click('#tomap2');
    await p.waitForTimeout(150);
  }
  console.log('estació', st, 'ok');
}

await p.click('#tocase');
for (let g = 0; g < 20 && !(await p.$('.report')); g++) {
  await p.waitForTimeout(100);
  const btns = await p.$$('.decision .choice');
  // la correcta: es busca a les dades
  const k = await p.evaluate(async () => {
    const { CASES } = await import('./data/cases.js'); const s = JSON.parse(localStorage.getItem('far-ra4-sentits-clinic-v1'));
    const cs = CASES.find(x => x.id === s.cases.order[s.cases.i]); return cs.steps[s.cases.step].opts.findIndex(o => o.ok);
  });
  await shot('case'); await p.click(`.decision .choice[data-k="${k}"]`); await shot('case-fb'); await p.click('#cnext');
}
await p.waitForTimeout(500);

console.log('nota', await p.textContent('.gradebig b'));
console.log(errs.join('\n') || 'sense errors de consola');
await b.close();
if (errs.length) process.exit(1);
