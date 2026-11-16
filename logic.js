// Lògica pura (sense DOM): puntuació, nota, sorteig i correcció tolerant. La fan servir app.js i tests/check.mjs.
// Puntuació idèntica a Vascular Quest i Sentits Quest (rvs78/anatomofisiologia02/logic.js).
import { WEIGHTS, PASS } from './config.js';

export const SCORE = { hit: 10, miss: -3, hint: -5, streakEvery: 3, streakBonus: 15 };

export function normalize(text) {
  return String(text).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/l·l|l\.l/g, 'll').replace(/[^a-z0-9]+/g, ' ').trim();
}
const squash = x => normalize(x).replace(/ /g, '');
function distance(a, b) {
  const m = a.length, n = b.length;
  if (Math.abs(m - n) > 2) return 3;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}
/** 'exact' (sense tenir en compte accents ni majúscules), 'typo' (una lletra de diferència en paraules de 7+ lletres) o null. */
export function matchAnswer(input, forms) {
  const given = squash(input);
  if (!given) return null;
  const all = forms.map(squash);
  if (all.includes(given)) return 'exact';
  if (all.some(f => f.length >= 7 && distance(given, f) <= 1)) return 'typo';
  return null;
}

export function shuffle(list, rnd = Math.random) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
/** Generador pseudoaleatori amb llavor (proves deterministes). */
export function seeded(seed) { let x = seed >>> 0 || 1; return () => ((x = (x * 1664525 + 1013904223) >>> 0) / 4294967296); }

/** Aplica una acció de puntuació. s = {points, streak, correct, errors, hints}. Retorna {gained, bonus}. */
export function applyScore(s, kind) {
  let gained = SCORE[kind];
  if (kind === 'hit') {
    s.correct++; s.streak++;
    if (s.streak % SCORE.streakEvery === 0) gained += SCORE.streakBonus;
  } else {
    s.streak = 0;
    if (kind === 'hint') s.hints++; else s.errors++;
  }
  s.points = Math.max(0, s.points + gained);
  return { gained, bonus: kind === 'hit' && gained > SCORE.hit };
}

/** Encert d'un comptador {ok, err, hints}: ok / (ok + err + ½ pistes). null si no hi ha dades. */
export function accuracy({ ok = 0, err = 0, hints = 0 } = {}) {
  const d = ok + err + 0.5 * hints;
  return d ? ok / d : null;
}
export const passed = acc => acc != null && acc >= PASS;
export const starsFor = acc => acc == null ? 0 : acc >= 0.9 ? 3 : acc >= 0.75 ? 2 : acc >= PASS ? 1 : 0;
export const addTally = (a, b) => ({ ok: (a.ok || 0) + (b.ok || 0), err: (a.err || 0) + (b.err || 0), hints: (a.hints || 0) + (b.hints || 0) });

const round1 = x => Math.round(x * 10) / 10;
export const toGrade = acc => round1(1 + 9 * Math.min(1, Math.max(0, acc ?? 0)));

/** Nota 1–10: 1 + 9 × (0,7 × mitjana de les estacions + 0,3 × cas clínic). stations: array d'encerts (0–1 o null). */
export function grade(stations, caseAcc, w = WEIGHTS) {
  const vals = stations.map(x => x ?? 0);
  const st = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  const final = toGrade(w.stations * st + w.case * (caseAcc ?? 0));
  return {
    final, stations: toGrade(st), case: toGrade(caseAcc ?? 0), weights: w,
    level: final < 5 ? 'insuf' : final < 6 ? 'suf' : final < 7 ? 'be' : final < 9 ? 'notable' : 'excel',
  };
}
export const mastery = acc => acc == null ? 'none' : acc >= 0.75 ? 'done' : acc >= 0.5 ? 'mid' : 'no';

export function formatTime(ms) {
  const s = Math.max(0, Math.round(ms / 1000));
  return `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, '0')} s`;
}
