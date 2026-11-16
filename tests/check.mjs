// Comprovacions de contingut i lògica de Sentits Clínic (spec RNF-5). Ús: node tests/check.mjs
import { readFileSync, existsSync } from 'node:fs';
import { STATIONS } from '../data/stations.js';
import { PATH } from '../data/pathologies.js';
import { CASES } from '../data/cases.js';
import { GLOSSARY } from '../data/glossary.js';
import { PLATES } from '../data/plates.js';
import { INDICATORS, UI } from '../i18n.js';
import { grade, applyScore, accuracy, matchAnswer, shuffle, seeded, starsFor } from '../logic.js';
import { PASSWORD, UNLOCK_CASE } from '../config.js';

let n = 0, fails = 0;
const ok = (cond, msg) => { n++; if (!cond) { fails++; console.error('✗', msg); } };
const bil = (o, where) => ok(o && typeof o.ca === 'string' && typeof o.es === 'string' && o.ca.trim() && o.es.trim(), `text bilingüe incomplet a ${where}`);
const IND = Object.keys(INDICATORS);
const root = new URL('..', import.meta.url).pathname;

// --- Configuració (decisions del professor)
ok(PASSWORD === 'alumnesfar', 'contrasenya de classe');
ok(UNLOCK_CASE === 5, 'el cas clínic es desbloqueja amb 5 estacions');

// --- Interfície: mateixes claus en ca i es
ok(Object.keys(UI.ca).sort().join() === Object.keys(UI.es).sort().join(), 'UI ca/es amb les mateixes claus');

// --- Patologies
for (const [id, P] of Object.entries(PATH)) {
  bil(P.name, `PATH.${id}.name`);
  if (P.def) bil(P.def, `PATH.${id}.def`); else ['cause', 'signs', 'treat'].forEach(k => bil(P[k], `PATH.${id}.${k}`));
  ok(Number.isInteger(P.slide), `diapositiva de repàs a ${id}`);
}

// --- Estacions
ok(STATIONS.length === 5, 'cinc estacions');
for (const st of STATIONS) {
  const parts = Object.keys(PLATES[st.organ].parts);
  bil(st.title, st.id); bil(st.tagline, st.id);
  ['n1', 'n2', 'n3', 'n4'].forEach(k => bil(st.goals[k], `${st.id}.goals.${k}`));
  ok(existsSync(root + `assets/laminas/${st.organ}.webp`), `làmina ${st.organ}`);
  st.capsule.forEach((f, i) => { ok(parts.includes(f.part), `${st.id} càpsula ${i}: part ${f.part}`); bil(f.t, `${st.id} càpsula ${i}`); });
  const mcqs = [...st.predict, ...st.n3.filter(c => c.type === 'mcq').flatMap(c => c.items)];
  for (const q of mcqs) {
    bil(q.q, `${st.id} mcq`); bil(q.why, `${st.id} mcq why`); q.opts.forEach(o => bil(o, `${st.id} mcq opt`));
    ok(q.opts.length >= 3, `${st.id}: almenys 3 opcions`);
    ok(new Set(q.opts.map(o => o.ca)).size === q.opts.length, `${st.id}: opcions repetides a «${q.q.ca}»`);
    ok(IND.includes(q.ind), `${st.id}: indicador vàlid a «${q.q.ca}»`);
    if (q.c) ok(PATH[q.c], `${st.id}: patologia ${q.c}`);
    if (q.img) ok(existsSync(root + `assets/img/${q.img}.webp`), `imatge ${q.img}`);
  }
  ok(st.n2.length >= 5, `${st.id}: N2 amb ≥5 cromos`);
  for (const x of st.n2) { ok(parts.includes(x.part), `${st.id} N2 part ${x.part}`); ok(x.label || PATH[x.c], `${st.id} N2 nom`); bil(x.why, `${st.id} N2 why`); }
  ok(st.n4.rows.every(r => PATH[r]), `${st.id}: files de la graella`);
  ok(st.n4.rows.every(r => st.n4.cols.every(c => PATH[r][c])), `${st.id}: totes les caselles de la graella tenen text`);
  ok(st.n4.write.length >= 1, `${st.id}: interacció de text (REQ-08)`);
  for (const w of st.n4.write) { bil(w.q, `${st.id} write`); bil(w.answer, `${st.id} write answer`); ok(IND.includes(w.ind), `${st.id} write ind`); ok(matchAnswer(w.answer.ca, [w.answer.ca]) === 'exact', 'resposta pròpia acceptada'); }
  const cls = [...st.n3.filter(c => c.type === 'classify'), ...(st.n4.classify ? [st.n4.classify] : [])];
  for (const c of cls) { const bins = c.bins.map(b => b[0]); c.items.forEach(([l, b]) => { bil(l, `${st.id} classify`); ok(bins.includes(b), `${st.id} classify bin ${b}`); }); }
  for (const c of st.n3) {
    if (c.type === 'abcde') c.items.forEach(a => ok(existsSync(root + `assets/img/${a.img}.webp`), `lesió ${a.img}`));
    if (c.type === 'soundpath') c.scenarios.forEach(s => { bil(s.t, 'soundpath'); ok(s.stop >= 0 && s.stop <= 5, 'aturada del so'); ok(PATH[s.kind], 'tipus d\'hipoacúsia'); });
    if (c.type === 'wordlab') c.items.forEach(w => ok(PATH[w.c], `wordlab ${w.c}`));
    if (c.type === 'order') c.steps.forEach(s => bil(s, 'order'));
  }
}
// cada patologia de la RA4 apareix almenys en un nivell avaluable
const used = new Set();
for (const st of STATIONS) { st.n2.forEach(x => x.c && used.add(x.c)); st.n4.rows.forEach(r => used.add(r)); }
for (const id of Object.keys(PATH)) ok(used.has(id), `patologia ${id} sense ítems a N2/N4`);

// --- Casos clínics
ok(CASES.length >= 3, 'almenys 3 casos');
for (const cs of CASES) {
  bil(cs.who, cs.id); bil(cs.say, cs.id);
  for (const s of cs.steps) {
    bil(s.q, cs.id); ok(IND.includes(s.ind), `${cs.id}: indicador`);
    ok(s.opts.filter(o => o.ok).length === 1, `${cs.id}: una sola opció correcta a «${s.q.ca}»`);
    s.opts.forEach(o => { bil(o.t, cs.id); bil(o.fb, cs.id); });
  }
}
for (const g of GLOSSARY) { bil(g.term, 'glossari'); bil(g.def, 'glossari'); }

// --- Imatges: manifest amb alt ca/es
const man = JSON.parse(readFileSync(root + 'assets/img/manifest.json', 'utf8'));
for (const [id, m] of Object.entries(man)) { bil(m.alt, `alt ${id}`); ok(existsSync(root + 'assets/img/' + m.file), `fitxer ${id}`); ok(m.reviewed !== false, `imatge ${id} marcada com a no vàlida`); }

// --- Lògica
ok(grade([1, 1, 1, 1, 1], 1).final === 10, 'nota màxima 10,0');
ok(grade([0, 0, 0, 0, 0], 0).final === 1, 'nota mínima 1,0');
ok(grade([0.5, 0.5, 0.5, 0.5, 0.5], 0.5).final === 5.5, 'nota intermèdia');
const S = { points: 0, streak: 0, correct: 0, errors: 0, hints: 0 };
applyScore(S, 'miss'); ok(S.points === 0, 'mínim 0');
applyScore(S, 'hit'); applyScore(S, 'hit'); const r = applyScore(S, 'hit'); ok(r.bonus && S.points === 45, 'ratxa de 3: +15');
applyScore(S, 'hint'); ok(S.points === 40, 'pista −5');
ok(accuracy({ ok: 6, err: 2, hints: 4 }) === 0.6, 'encert amb pistes a ½');
ok(starsFor(0.95) === 3 && starsFor(0.8) === 2 && starsFor(0.6) === 1 && starsFor(0.5) === 0, 'estrelles');
ok(matchAnswer('Diplopía', ['diplopia']) === 'exact', 'accents ignorats');
ok(matchAnswer('paresteisa', ['parestèsia']) === null && matchAnswer('parestesa', ['parestèsia']) === 'typo', 'correcció tolerant d\'1 lletra');
const rnd = seeded(7); for (let i = 0; i < 500; i++) { const a = shuffle([1, 2, 3, 4, 5, 6], rnd); ok(a.length === 6 && new Set(a).size === 6, 'barreja'); }

console.log(fails ? `\n${fails} errors de ${n} comprovacions` : `OK · ${n} comprovacions`);
process.exit(fails ? 1 : 0);
