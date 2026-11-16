// Sentits Clínic · RA4 — entrada, sobre d'instruccions, mapa d'estacions, nivells N1–N4, cas clínic i informe.
// Mateix sistema d'entrada, puntuació i informe que Vascular Quest i Sentits Quest.
import { PASSWORD, EMAIL_RE, UNLOCK_CASE, CASES_PER_GAME, STORE, WEIGHTS } from './config.js';
import { t, L, getLang, setLang, LANGS, FLAGS, INDICATORS } from './i18n.js';
import { $, $$, esc, rich, ic, starRow, figure, dialog, say, loadManifest } from './ui.js';
import { applyScore, accuracy, passed, starsFor, addTally, grade, mastery, formatTime, shuffle } from './logic.js';
import { STATIONS, STATION } from './data/stations.js';
import { PATH } from './data/pathologies.js';
import { CASES } from './data/cases.js';
import { GLOSSARY } from './data/glossary.js';
import { PLATES } from './data/plates.js';
import * as E from './engines.js';
import * as fx from './fx.js';

const app = $('#app');
const LEVELS = [1, 2, 3, 4];

/* ---------- Estat ---------- */
const fresh = email => ({
  v: 1, email, start: Date.now(), end: null,
  points: 0, streak: 0, correct: 0, errors: 0, hints: 0,
  levels: {},            // 'vista.2' → { done, acc, stars, tally, ms, tries }
  ind: {},               // I1..I8 → tally
  concepts: {},          // patologia → tally
  cases: { order: null, i: 0, step: 0, log: [], tally: {}, done: false },
  seen: {}, view: { screen: 'map' },
});
let s = null;
try { s = JSON.parse(localStorage.getItem(STORE)); if (!s || s.v !== 1) s = null; } catch { s = null; }
const save = () => { try { localStorage.setItem(STORE, JSON.stringify(s)); } catch { /* mode privat */ } };
let cleanup = () => {};

const lvKey = (st, n) => `${st}.${n}`;
const levelRec = (st, n) => s.levels[lvKey(st, n)];
const levelDone = (st, n) => !!levelRec(st, n)?.done;
const levelOpen = (st, n) => n === 1 || levelDone(st, n - 1);
const stationDone = st => LEVELS.every(n => levelDone(st, n));
const doneCount = () => STATIONS.filter(x => stationDone(x.id)).length;
const caseOpen = () => doneCount() >= UNLOCK_CASE;

/* ---------- Capçalera ---------- */
function header() {
  $('.brand small').textContent = t('brandSub');
  const on = fx.sound.enabled(), other = getLang() === 'ca' ? 'es' : 'ca';
  const langBtn = `<button class="iconbtn flagbtn" id="lang" aria-label="${t('switchLang')}" title="${t('switchLang')}">${FLAGS[other]}</button>`;
  const soundBtn = `<button class="iconbtn" id="sound" aria-pressed="${on}" aria-label="${on ? t('soundOff') : t('soundOn')}" title="${t('sound')}">${ic(on ? 'sound' : 'mute')}</button>`;
  $('#score').innerHTML = s ? `
    <span class="who">${esc(s.email)}</span>
    <span class="pts">${t('points')} <b id="pts">${s.points}</b></span>
    <span class="streak" title="${t('streakTitle')}">${t('streak')} <b id="streak">${s.streak}</b></span>
    <button class="iconbtn" id="howto" aria-label="${t('howto')}" title="${t('howto')}">${ic('help')}</button>
    ${langBtn}${soundBtn}
    <button class="iconbtn" id="logout" aria-label="${t('logout')}" title="${t('logout')}">${ic('exit')}</button>` : soundBtn;
  $('#sound').onclick = () => { fx.sound.toggle(); header(); };
  const lb = $('#lang'); if (lb) lb.onclick = () => { setLang(other); render(); };
  const hb = $('#howto'); if (hb) hb.onclick = () => intro();
  const out = $('#logout');
  if (out) out.onclick = () => {
    const d = dialog(t('logout'), `<p>${t('logoutAsk')}</p><div class="row end"><button class="btn ghost dark" data-close>${t('cancel')}</button><button class="btn" id="bye">${t('logoutYes')}</button></div>`);
    $('#bye', d.el).onclick = () => { try { localStorage.removeItem(STORE); } catch { /* */ } s = null; d.close(); render(); };
  };
}

function render() {
  cleanup(); cleanup = () => {};
  document.body.dataset.screen = '';
  if (!s) return login();
  header();
  const v = s.view;
  if (v.screen === 'level' && STATION[v.st] && levelOpen(v.st, v.lv)) levelScreen(v.st, v.lv);
  else if (v.screen === 'case' && caseOpen()) caseScreen();
  else if (v.screen === 'report' && s.cases.done) report();
  else mapScreen();
  if (!s.seen.intro) intro();
}
const go = view => { s.view = view; save(); render(); scrollTo({ top: 0 }); };

/* ---------- Entrada ---------- */
function login() {
  header();
  document.body.dataset.screen = 'login';
  const keep = { email: $('#login [name=email]')?.value || '', pass: $('#login [name=password]')?.value || '' };
  app.innerHTML = `
  <section class="welcome">
    <div class="intro-col">
      <div class="langpick" role="radiogroup" aria-label="${t('chooseLang')} / Elige el idioma">
        ${LANGS.map(l => `<button type="button" class="langopt" role="radio" aria-checked="${l === getLang()}" data-lang="${l}">${FLAGS[l]}<span>${l === 'ca' ? 'Català' : 'Castellano'}</span></button>`).join('')}
      </div>
      <h1>Sentits <span>Clínic</span></h1>
      <p class="lead">${t('welcomeLead')}</p>
      <ol class="wsteps"><li>${t('wStep1')}</li><li>${t('wStep2')}</li><li>${t('wStep3')}</li></ol>
      <form id="login" novalidate>
        <label class="field">${t('email')}<input name="email" type="email" autocomplete="email" placeholder="nom@isvh.cat" required></label>
        <label class="field">${t('password')}<input name="password" type="password" autocomplete="current-password" required></label>
        <button class="btn">${ic('play')} ${t('open')}</button>
        <p class="feedback err" id="fb" role="alert" hidden></p>
      </form>
      <p class="note">${t('note')}</p>
    </div>
    <div class="art">
      ${figure('portada', 'cover')}
      <div class="sensechips" aria-hidden="true">${STATIONS.map(x => `<span style="--st:${x.color}">${esc(L(x.title))}</span>`).join('')}</div>
      <p class="credit">${t('credit')}</p>
    </div>
  </section>`;
  $('#login [name=email]').value = keep.email; $('#login [name=password]').value = keep.pass;
  $('.langpick').onclick = e => {
    const btn = e.target.closest('[data-lang]'); if (!btn || btn.dataset.lang === getLang()) return;
    setLang(btn.dataset.lang); fx.sound.play('hint'); login(); $(`.langopt[data-lang="${btn.dataset.lang}"]`)?.focus();
  };
  $('#login').onsubmit = e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const email = String(f.get('email')).trim().toLowerCase();
    const fail = m => { const fb = $('#fb'); fb.hidden = false; fb.innerHTML = ic('x') + `<span>${m}</span>`; fx.shake($('#login')); fx.sound.play('miss'); };
    if (!EMAIL_RE.test(email)) return fail(t('badEmail'));
    if (f.get('password') !== PASSWORD) return fail(t('badPass'));
    s = fresh(email); save(); render();
  };
}

/* ---------- Sobre d'instruccions ---------- */
function intro() {
  const cards = [['ia', 'layers'], ['ib', 'bulb'], ['ic', 'cross']];
  const d = dialog(t('introTitle'), `
    <div class="envelope-in">
      <p class="lead">${t('introLead')}</p>
      <video class="tutorial" controls autoplay muted playsinline preload="metadata" poster="./assets/video/tutorial-${getLang()}.webp" aria-label="${t('howto')}">
        <source src="./assets/video/tutorial-${getLang()}.mp4" type="video/mp4"><track kind="captions" srclang="${getLang()}" src="./assets/video/tutorial-${getLang()}.vtt"></video>
      <div class="howcards">${cards.map(([k, i], n) => { const [h, p] = t(k); return `<div class="howto" style="--st:${STATIONS[n * 2].color}">${ic(i)}<h3>${h}</h3><p>${p}</p></div>`; }).join('')}</div>
      <ol class="levelsrow">${t('levelNames').map((x, n) => `<li><span>${n + 1}</span>${x}</li>`).join('')}<li class="case"><span>${ic('cross')}</span>${t('caseTitle')}</li></ol>
      <div class="row spread"><p class="muted">${t('introScore')}</p><button class="btn" data-close>${ic('play')} ${t('start')}</button></div>
    </div>`, { wide: true, onClose: () => { s.seen.intro = true; save(); } });
  d.el.classList.add('intro');
  const v = $('video.tutorial', d.el); v.querySelector('source').onerror = () => v.remove();
  if (fx.reduced()) v.removeAttribute('autoplay'), v.pause();
  fx.sound.play('open');
  if (!fx.reduced()) $$('.howto', d.el).forEach((c, i) => c.animate([{ transform: `translateY(40px) rotate(${(i - 1) * 6}deg)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 480, delay: 120 + i * 90, easing: 'cubic-bezier(0.16,1,0.3,1)', fill: 'backwards' }));
}

/* ---------- Mapa d'estacions ---------- */
function mapScreen() {
  document.body.dataset.screen = 'map';
  const missing = STATIONS.filter(x => !stationDone(x.id)).map(x => L(x.title));
  app.innerHTML = `
  <section class="map">
    <header class="maphead"><h1>${t('mapTitle')}</h1><p>${t('mapLead')}</p></header>
    <div class="stations">
      ${STATIONS.map(st => {
        const n = LEVELS.filter(k => levelDone(st.id, k)).length, done = n === 4;
        return `<article class="stcard ${done ? 'done' : ''}" style="--st:${st.color};--st-soft:${st.soft}">
          <div class="stimg"><img src="./assets/laminas/${st.organ}.webp" alt="" loading="lazy"></div>
          <div class="stbody">
            <h2>${esc(L(st.title))}</h2>
            <p>${esc(L(st.tagline))}</p>
            <ol class="pips">${LEVELS.map(k => { const r = levelRec(st.id, k); return `<li class="${r?.done ? 'done' : levelOpen(st.id, k) ? 'open' : ''}" title="${t('levelNames')[k - 1]}"><span>${t('levelNames')[k - 1]}</span>${r?.done ? starRow(r.stars, 'mini') : ''}</li>`; }).join('')}</ol>
            <div class="row spread"><span class="muted small">${done ? `${ic('check')} ${t('stationDone')}` : t('stationTodo', { n })}</span>
            <button class="btn sys small" data-st="${st.id}">${done ? t('review') : n ? t('resume') : t('go')} ${ic('arrow')}</button></div>
          </div>
        </article>`;
      }).join('')}
      <article class="stcard casecard ${caseOpen() ? 'open' : 'locked'} ${s.cases.done ? 'done' : ''}">
        <div class="stimg">${figure('farmacia')}</div>
        <div class="stbody">
          <h2>${ic(caseOpen() ? 'cross' : 'lock')} ${t('caseTitle')}</h2>
          <p>${s.cases.done ? t('caseDone') : caseOpen() ? t('caseOpen') : esc(t('caseLocked', { n: missing.length, list: missing.join(', ') }))}</p>
          <div class="row spread">
            <button class="btn small" id="tocase" ${caseOpen() ? '' : 'disabled'}>${s.cases.done ? t('review') : t('go')} ${ic('arrow')}</button>
            <button class="btn ghost dark small" id="toreport" ${s.cases.done ? '' : 'disabled'} title="${s.cases.done ? '' : t('toReportLocked')}">${ic('pdf')} ${t('toReport')}</button>
          </div>
        </div>
      </article>
    </div>
  </section>`;
  $$('[data-st]').forEach(b => b.onclick = () => {
    const st = b.dataset.st, firstOpen = LEVELS.find(k => !levelDone(st, k)) || 1;
    go({ screen: 'level', st, lv: firstOpen });
  });
  $('#tocase').onclick = () => go({ screen: 'case' });
  $('#toreport').onclick = () => go({ screen: 'report' });
}

/* ---------- Nivell ---------- */
function tasksFor(st, lv) {
  if (lv === 1) return [
    { run: (h, c) => E.capsule(h, st, c) },
    { run: (h, c) => E.explore(h, st, c) },
    { run: (h, c) => E.mcq(h, st.predict, c, { title: t('predictTitle'), note: t('predictNote') }) },
  ];
  if (lv === 2) return [{ run: (h, c) => E.plate(h, st, c) }];
  if (lv === 3) return st.n3.map(cfg => ({
    run: (h, c) => cfg.type === 'mcq' ? E.mcq(h, cfg.items, c) : cfg.type === 'optics' ? E.optics(h, st, c) : E[cfg.type](h, cfg, c),
  }));
  return [
    { run: (h, c) => E.grid(h, st, c) },
    ...(st.n4.classify ? [{ run: (h, c) => E.classify(h, st.n4.classify, c) }] : []),
    { run: (h, c) => E.write(h, st.n4.write, c) },
  ];
}

function levelScreen(stId, lv) {
  const st = STATION[stId];
  document.body.dataset.screen = 'level';
  const tasks = tasksFor(st, lv);
  const run = { tally: { ok: 0, err: 0, hints: 0 }, misses: {}, reviewed: new Set(), start: Date.now() };
  let k = 0, hintFn = null, stop = () => {};
  const free = lv === 1;
  app.innerHTML = `
  <section class="level" style="--st:${st.color};--st-soft:${st.soft}">
    <div class="levelbar">
      <button class="btn ghost dark small" id="tomap">${ic('back')} <span class="lbl">${t('back')}</span></button>
      <div class="lvtitle"><h1>${esc(L(st.title))}</h1>
        <ol class="lvsteps">${LEVELS.map(n => `<li><button data-lv="${n}" ${n === lv ? 'aria-current="step"' : ''} ${levelOpen(stId, n) ? '' : 'disabled'} class="${levelDone(stId, n) ? 'done' : ''}"><span>${n}</span><em>${t('levelNames')[n - 1]}</em></button></li>`).join('')}</ol>
      </div>
      <div class="lvtools">
        <button class="btn small" id="hint" ${free ? 'hidden' : ''}>${ic('bulb')} ${t('hint')} <small>${t('hintCost')}</small></button>
        <button class="btn ghost dark small" id="gloss">${ic('book')} <span class="lbl">${t('glossary')}</span></button>
        <button class="btn ghost dark small" id="desc">${ic('eye')} <span class="lbl">${t('description')}</span></button>
      </div>
    </div>
    <p class="objective"><b>${t('objective')}:</b> ${esc(L(st.goals['n' + lv]))}</p>
    <div class="hintbox" id="hintbox" hidden aria-live="polite"></div>
    <div class="taskhost" id="task"></div>
    <ol class="taskdots" aria-hidden="true">${tasks.map((_, n) => `<li data-n="${n}"></li>`).join('')}</ol>
  </section>`;
  $('#tomap').onclick = () => go({ screen: 'map' });
  $$('[data-lv]').forEach(b => b.onclick = () => go({ screen: 'level', st: stId, lv: +b.dataset.lv }));
  $('#gloss').onclick = () => glossary(st);
  $('#desc').onclick = () => describe(st);
  $('#hint').onclick = () => {
    const box = $('#hintbox');
    const txt = hintFn ? hintFn() : null;
    box.hidden = false;
    if (!txt) { box.className = 'hintbox none'; box.innerHTML = `${ic('bulb')} ${esc(t('noMoreHints'))}`; return; }
    const r = applyScore(s, 'hint'); run.tally.hints++; save(); header(); fx.burst($('#hint'), '−5', 'loss'); fx.sound.play('hint');
    box.className = 'hintbox'; box.innerHTML = `${ic('bulb')} <div>${rich(txt)}</div>`;
    void r;
  };
  const tally = (meta, key) => {
    run.tally[key]++;
    if (meta?.ind) s.ind[meta.ind] = addTally(s.ind[meta.ind] || {}, { [key]: 1 });
    if (meta?.c) s.concepts[meta.c] = addTally(s.concepts[meta.c] || {}, { [key]: 1 });
  };
  const ctx = {
    free,
    hit(meta, el) {
      const r = applyScore(s, 'hit'); tally(meta, 'ok'); save(); header();
      fx.burst(el, r.bonus ? '+25' : '+10'); fx.sound.play('hit'); $('#pts')?.classList.add('bump');
      if (r.bonus) { fx.banner(t('streakBanner')); fx.sound.play('bonus'); }
    },
    miss(meta, el) {
      fx.sound.play('miss');
      if (free) { s.streak = 0; header(); return; }
      applyScore(s, 'miss'); tally(meta, 'err'); save(); header(); fx.burst(el, '−3', 'loss');
      const c = meta?.c;
      if (c && PATH[c] && (run.misses[c] = (run.misses[c] || 0) + 1) >= 2 && !run.reviewed.has(c)) { run.reviewed.add(c); reviewCard(c); }
    },
    setHint(fn) { hintFn = fn; $('#hintbox').hidden = true; },
    done() { stop(); k++; next(); },
  };
  const next = () => {
    $$('.taskdots li').forEach((d, n) => { d.classList.toggle('past', n < k); d.classList.toggle('now', n === k); });
    if (k >= tasks.length) return finish();
    const host = $('#task'); host.innerHTML = '';
    hintFn = null; $('#hintbox').hidden = true;
    const r = tasks[k].run(host, ctx);
    stop = typeof r === 'function' ? r : () => {};
    if (!fx.reduced()) host.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 240, easing: 'cubic-bezier(0.16,1,0.3,1)' });
  };
  const finish = () => {
    const acc = free ? 1 : accuracy(run.tally) ?? 1;
    const ok = free || passed(acc), stars = free ? 3 : starsFor(acc);
    const key = lvKey(stId, lv), prev = s.levels[key];
    const rec = { done: ok || !!prev?.done, acc, stars, tally: run.tally, ms: Date.now() - run.start, tries: (prev?.tries || 0) + 1 };
    if (!prev || !prev.done || acc >= (prev.acc ?? 0)) s.levels[key] = rec; else s.levels[key].tries = rec.tries;
    save();
    const nextLv = lv < 4 && ok ? lv + 1 : null;
    $('#task').innerHTML = `
      <div class="lvsum ${ok ? 'ok' : 'ko'}">
        <h2>${ok ? t('levelDone') : t('levelFail')}</h2>
        ${starRow(stars)}
        ${free ? '' : `<p class="accbig"><span>${t('accuracy')}</span><b>${Math.round(acc * 100)} %</b></p><p class="muted">${t('passNote')}</p>`}
        <div class="row center">
          ${ok ? '' : `<button class="btn" id="again">${ic('rotate')} ${t('retry')}</button>`}
          ${nextLv ? `<button class="btn" id="nextlv">${t('nextLevel')} ${ic('arrow')}</button>` : ''}
          <button class="btn ghost dark" id="tomap2">${t('toMap')}</button>
        </div>
      </div>`;
    hintFn = null;
    fx.sound.play(ok ? 'level' : 'miss');
    fx.stamp($('.lvsum .stars'), 100);
    $('#again')?.addEventListener('click', () => render());
    $('#nextlv')?.addEventListener('click', () => go({ screen: 'level', st: stId, lv: nextLv }));
    $('#tomap2').onclick = () => go({ screen: 'map' });
    ($('#nextlv') || $('#again') || $('#tomap2')).focus();
  };
  cleanup = () => stop();
  next();
}

function reviewCard(c) {
  const P = PATH[c];
  const rows = P.def ? [[t('colDef'), P.def]] : [[t('colCause'), P.cause], [t('colSigns'), P.signs], [t('colTreat'), P.treat]];
  const d = dialog(`${ic('bulb')} ${t('reviewCard')}`, `
    <p>${t('reviewOf')}</p>
    <dl class="pathcard"><dt class="pname">${esc(L(P.name))}</dt>${rows.map(([h, v]) => `<div><dt>${h}</dt><dd>${esc(L(v))}</dd></div>`).join('')}</dl>
    <div class="row end"><button class="btn" data-close>${t('reviewGot')}</button></div>`);
  d.el.classList.add('review');
}
function glossary(st) {
  const list = GLOSSARY.filter(g => g.st === st.id);
  dialog(t('glossaryTitle', { st: esc(L(st.title)) }), `<dl class="gloss">${list.map(g => `<div><dt>${esc(L(g.term))}</dt><dd>${esc(L(g.def))}${g.ety ? ` <span class="ety">${esc(L(g.ety))}</span>` : ''}</dd></div>`).join('')}</dl>`);
}
function describe(st) {
  const P = PLATES[st.organ];
  dialog(t('description'), `<h3>${esc(L(P.title))}</h3>
    <p>${st.capsule.map(f => esc(L(f.t))).join(' ')}</p>
    <p class="muted small">${Object.values(P.parts).map(x => esc(L(x))).join(' · ')}</p>`);
}

/* ---------- Cas clínic ---------- */
function caseScreen() {
  document.body.dataset.screen = 'case';
  const C = s.cases;
  if (!C.order) { C.order = shuffle(CASES.map(x => x.id)).slice(0, CASES_PER_GAME); C.i = 0; C.step = 0; save(); }
  if (C.done) return caseReview();
  const cs = CASES.find(x => x.id === C.order[C.i]);
  const step = cs.steps[C.step];
  const order = shuffle(step.opts.map((_, k) => k));
  app.innerHTML = `
  <section class="case">
    <div class="levelbar"><button class="btn ghost dark small" id="tomap">${ic('back')} ${t('back')}</button>
      <div class="lvtitle"><h1>${t('caseTitle')}</h1><ol class="lvsteps">${C.order.map((id, n) => `<li><button disabled class="${n < C.i ? 'done' : ''}" ${n === C.i ? 'aria-current="step"' : ''}><span>${n + 1}</span><em>${t('patient')} ${n + 1}</em></button></li>`).join('')}</ol></div>
      <div class="lvtools"><button class="btn small" id="hint">${ic('bulb')} ${t('hint')} <small>${t('hintCost')}</small></button></div></div>
    <p class="objective">${t('caseLead')}</p>
    <div class="hintbox" id="hintbox" hidden aria-live="polite"></div>
    <div class="counter">
      <div class="scene">${figure('farmacia', 'farm')}
        <div class="bubble"><b>${esc(L(cs.who))}</b><p>${esc(L(cs.say))}</p></div>
        ${cs.img ? figure(cs.img, 'caseimg') : ''}
      </div>
      <div class="decision">
        <p class="qcount">${t('step', { n: C.step + 1, t: cs.steps.length })}</p>
        <p class="q">${esc(L(step.q))}</p>
        <div class="choices">${order.map(k => `<button class="choice" data-k="${k}">${esc(L(step.opts[k].t))}</button>`).join('')}</div>
        <div class="feedback" aria-live="polite"></div>
        <div class="row end" hidden><button class="btn" id="cnext"></button></div>
      </div>
    </div>
  </section>`;
  $('#tomap').onclick = () => go({ screen: 'map' });
  let answered = false, hinted = false;
  $('#hint').onclick = () => {
    const box = $('#hintbox'); box.hidden = false;
    if (answered || hinted) { box.className = 'hintbox none'; box.innerHTML = `${ic('bulb')} ${esc(t('noMoreHints'))}`; return; }
    hinted = true; applyScore(s, 'hint'); C.tally = addTally(C.tally, { hints: 1 }); save(); header(); fx.burst($('#hint'), '−5', 'loss');
    const w = $$('.choice').filter(x => !step.opts[+x.dataset.k].ok); w[0].disabled = true; w[0].classList.add('elim');
    box.className = 'hintbox'; box.innerHTML = `${ic('bulb')} ${esc(t('hintElim'))}`;
  };
  $('.choices').onclick = e => {
    const btn = e.target.closest('.choice'); if (!btn || answered || btn.disabled) return;
    answered = true;
    const o = step.opts[+btn.dataset.k], ok = !!o.ok, meta = { c: step.c, ind: step.ind };
    $$('.choice').forEach(x => { x.disabled = true; if (step.opts[+x.dataset.k].ok) x.classList.add('right'); });
    btn.classList.add(ok ? 'right' : 'wrong');
    const r = applyScore(s, ok ? 'hit' : 'miss');
    C.tally = addTally(C.tally, { [ok ? 'ok' : 'err']: 1 });
    s.ind[step.ind] = addTally(s.ind[step.ind] || {}, { [ok ? 'ok' : 'err']: 1 });
    if (step.c) s.concepts[step.c] = addTally(s.concepts[step.c] || {}, { [ok ? 'ok' : 'err']: 1 });
    C.log.push({ id: cs.id, step: C.step, choice: L(o.t), ok });
    save(); header(); fx.sound.play(ok ? 'hit' : 'miss'); fx.burst(btn, ok ? (r.bonus ? '+25' : '+10') : '−3', ok ? 'gain' : 'loss');
    if (r.bonus) { fx.banner(t('streakBanner')); fx.sound.play('bonus'); }
    const right = step.opts.find(x => x.ok);
    say($('.feedback'), ok, `<b>${ok ? t('right') : t('wrong')}</b> ${esc(L(o.fb))}${ok ? '' : `<br><b>${esc(L(right.t))}</b>: ${esc(L(right.fb))}`}`);
    const last = C.step === cs.steps.length - 1, lastCase = C.i === C.order.length - 1;
    $('#cnext').innerHTML = `${last ? (lastCase ? t('caseFinish') : t('caseNext')) : t('next')} ${ic('arrow')}`;
    $('.decision .row.end').hidden = false; $('#cnext').focus();
    $('#cnext').onclick = () => {
      if (!last) C.step++;
      else if (!lastCase) { C.i++; C.step = 0; }
      else { C.done = true; s.end = Date.now(); save(); return go({ screen: 'report' }); }
      save(); caseScreen();
    };
  };
}
function caseReview() {
  app.innerHTML = `<section class="case"><div class="levelbar"><button class="btn ghost dark small" id="tomap">${ic('back')} ${t('back')}</button><div class="lvtitle"><h1>${t('caseDone')}</h1></div><div class="lvtools"><button class="btn small" id="rep">${ic('pdf')} ${t('toReport')}</button></div></div>
    <div class="sheet">${caseLogHTML()}</div></section>`;
  $('#tomap').onclick = () => go({ screen: 'map' });
  $('#rep').onclick = () => go({ screen: 'report' });
}
function caseLogHTML() {
  return `<h2>${t('caseLog')}</h2><ol class="caselog">${s.cases.order.map(id => {
    const cs = CASES.find(x => x.id === id);
    return `<li><b>${esc(L(cs.who))}</b> — ${esc(L(cs.say))}<ul>${s.cases.log.filter(x => x.id === id).map(x => `<li class="${x.ok ? 'ok' : 'ko'}">${ic(x.ok ? 'check' : 'x')} ${esc(L(cs.steps[x.step].q))} <i>${esc(x.choice)}</i></li>`).join('')}</ul></li>`;
  }).join('')}</ol>`;
}

/* ---------- Informe ---------- */
export function computeGrade(st) {
  const stAcc = STATIONS.map(x => accuracy([2, 3, 4].reduce((a, n) => addTally(a, st.levels[lvKey(x.id, n)]?.tally || {}), {})));
  return { stAcc, ...grade(stAcc, accuracy(st.cases.tally)) };
}
function report() {
  document.body.dataset.screen = 'report';
  const G = computeGrade(s);
  const fmt = x => x.toLocaleString(getLang(), { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const pct = x => x == null ? '—' : `${Math.round(x * 100)} %`;
  const totalMs = (s.end || Date.now()) - s.start;
  const weak = Object.entries(s.concepts).filter(([c, x]) => PATH[c] && (x.err || 0) + (x.hints || 0) * 0.5 > 0)
    .sort((a, b) => ((b[1].err || 0) + (b[1].hints || 0) / 2) - ((a[1].err || 0) + (a[1].hints || 0) / 2)).slice(0, 5);
  const mLabel = { done: t('indDone'), mid: t('indMid'), no: t('indNo'), none: t('indNone') };
  app.innerHTML = `
  <div class="reportwrap"><section class="report sheet" id="report">
    <header class="rhead">
      <p class="subject">${t('subject')}</p>
      <h1>${t('done')}</h1>
      <p><b>${esc(s.email)}</b> · ${new Date(s.end || Date.now()).toLocaleString(getLang() === 'es' ? 'es-ES' : 'ca-ES')} · ${t('totalTime')}: ${formatTime(totalMs)} · ${t('langUsed')}: ${t('langName')}</p>
    </header>
    <div class="gradebox">
      <div class="gradebig"><span>${t('grade')}</span><b>${fmt(G.final)}</b><small>${t('gradeOf')} · ${t('gradeLevels')[G.level]}</small></div>
      <div class="gradeparts">
        <div><span>${t('gradeStations')} · ${Math.round(WEIGHTS.stations * 100)} %</span><b>${fmt(G.stations)}</b></div>
        <div><span>${t('gradeCase')} · ${Math.round(WEIGHTS.case * 100)} %</span><b>${fmt(G.case)}</b></div>
        <div><span>${t('pointsTile')}</span><b>${s.points}</b><small>${t('errors')} ${s.errors} · ${t('hints')} ${s.hints}</small></div>
      </div>
      <p class="gradehow">${t('gradeHow', { w1: Math.round(WEIGHTS.stations * 100), w2: Math.round(WEIGHTS.case * 100) })}</p>
    </div>
    <h2>${t('stationsTitle')}</h2>
    <div class="tablewrap"><table><thead><tr><th></th>${LEVELS.map(n => `<th>${t('levelNames')[n - 1]}</th>`).join('')}<th class="num">${t('accCol')}</th></tr></thead>
      <tbody>${STATIONS.map((x, i) => `<tr><th scope="row"><i class="swatch" style="--st:${x.color}"></i>${esc(L(x.title))}</th>${LEVELS.map(n => { const r = levelRec(x.id, n); return `<td>${r?.done ? starRow(r.stars, 'mini') : '—'}${r?.tries > 1 ? ` <small class="muted">×${r.tries}</small>` : ''}</td>`; }).join('')}<td class="num">${pct(G.stAcc[i])}</td></tr>`).join('')}
      <tr><th scope="row"><i class="swatch" style="--st:#1f8a4c"></i>${t('gradeCase')}</th><td colspan="4"></td><td class="num">${pct(accuracy(s.cases.tally))}</td></tr></tbody></table></div>
    <h2>${t('indTitle')}</h2>
    <ul class="indlist">${Object.entries(INDICATORS).map(([k, lab]) => { const a = accuracy(s.ind[k]); const m = mastery(a); return `<li class="m-${m}"><b>${k}</b><span>${esc(L(lab))}</span><span class="mbar"><i style="width:${a == null ? 0 : Math.round(a * 100)}%"></i></span><em>${mLabel[m]}${a == null ? '' : ` · ${pct(a)}`}</em></li>`; }).join('')}</ul>
    <h2>${t('weakTitle')}</h2>
    ${weak.length ? `<ul class="weak">${weak.map(([c, x]) => `<li><b>${esc(L(PATH[c].name))}</b> <span class="muted">${t('errors').toLowerCase()} ${x.err || 0} · ${t('hints').toLowerCase()} ${x.hints || 0} · ${t('weakSlide', { n: PATH[c].slide })}</span></li>`).join('')}</ul>` : `<p>${t('noWeak')}</p>`}
    ${s.cases.order ? caseLogHTML() : ''}
    <div class="no-print deliver">
      <h2>${t('deliver')}</h2>
      <ol><li>${t('deliver1')}</li><li>${t('deliver2')}</li><li>${t('deliver3')}</li></ol>
      <div class="row"><button class="btn" id="pdf">${ic('pdf')} ${t('pdf')}</button><a class="btn ghost dark" href="https://classroom.google.com/" target="_blank" rel="noopener">${ic('upload')} ${t('classroom')}</a><button class="btn ghost dark" id="tomap">${t('toMap')}</button></div>
    </div>
    <p class="rfoot">${t('footer')}</p>
  </section></div>`;
  if (!s.seen.report) { s.seen.report = true; save(); fx.sound.play('level'); fx.stamp($('.gradebig'), 120); }
  $('#pdf').onclick = () => {
    const prev = document.title;
    document.title = `${t('pdfName')} - ${s.email.split('@')[0]} - ${fmt(G.final)}`;
    window.print();
    setTimeout(() => { document.title = prev; }, 1000);
  };
  $('#tomap').onclick = () => go({ screen: 'map' });
}

await loadManifest();
render();
