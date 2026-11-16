// Motors d'activitat. Cada motor rep (host, cfg, ctx) i crida:
//   ctx.hit(meta, el) / ctx.miss(meta, el)  · meta = { c, ind }   (puntuació, indicadors i repàs adaptatiu)
//   ctx.setHint(fn)  · fn() → text de la pista següent o null (l'app hi cobra −5)
//   ctx.done()       · tasca acabada
// ctx.free = true al nivell Observa: els errors no resten.
import { t, L, b, getLang } from './i18n.js';
import { $, $$, esc, rich, ic, figure, plateHTML, partName, dnd, say, blink, nearestDot } from './ui.js';
import { ORGANS } from './drawings.js';
import { PATH } from './data/pathologies.js';
import { PLATES } from './data/plates.js';
import { GLOSSARY } from './data/glossary.js';
import { shuffle, matchAnswer } from './logic.js';
import * as fx from './fx.js';

const nextBtn = (label = t('next')) => `<button class="btn" data-next>${label} ${ic('arrow')}</button>`;
const pname = c => L(PATH[c]?.name) || '';

/* ================================================================ N1 · Càpsula + exploració */
export function capsule(host, st, ctx) {
  const frames = st.capsule;
  let i = 0, playing = !fx.reduced(), timer = null;
  const lang = getLang(), base = `./assets/video/${st.id}-${lang}`;
  host.innerHTML = `
    <div class="capsule" style="--st:${st.color}">
      <div class="seg capmode" role="group"><button class="on" data-mode="video" aria-pressed="true">${ic('play')} ${t('capVideo')}</button><button data-mode="steps" aria-pressed="false">${ic('layers')} ${t('capSteps')}</button></div>
      <div class="capvideo"><video controls playsinline preload="metadata" poster="${base}.webp" aria-label="${t('capsule')} · ${esc(L(st.title))}">
        <source src="${base}.mp4" type="video/mp4"><track kind="captions" srclang="${lang}" label="${lang === 'ca' ? 'Català' : 'Castellano'}" src="${base}.vtt"></video>
        <p class="muted small">${t('capNote')}</p></div>
      <div class="capsteps" hidden>
      <div class="capstage">
        ${plateHTML(st.organ, { dots: frames.map((f, k) => ({ id: f.part, cls: 'cap', attrs: `data-k="${k}" tabindex="-1"`, label: partName(st.organ, f.part) })) })}
        <div class="subtitle" aria-live="polite"><span class="capno"></span><p></p></div>
      </div>
      <div class="capbar">
        <button class="iconbtn dark" data-prev aria-label="${t('prev')}">${ic('back')}</button>
        <button class="iconbtn dark" data-play aria-label="${t('pause')}">${ic('pause')}</button>
        <button class="iconbtn dark" data-fwd aria-label="${t('next')}">${ic('arrow')}</button>
        <div class="captrack">${frames.map((_, k) => `<i data-k="${k}"></i>`).join('')}</div>
        <span class="caplabel">${t('capsule')} · ${t('levelNames')[0]}</span>
      </div>
      </div>
      <div class="row end">${nextBtn(t('continue'))}</div>
    </div>`;
  const show = k => {
    i = (k + frames.length) % frames.length;
    const f = frames[i];
    $$('.dot.cap', host).forEach(d => d.classList.toggle('on', +d.dataset.k === i));
    // diversos fotogrames poden assenyalar la mateixa part: s'encén el primer punt amb aquesta part
    const sameDot = $$('.dot.cap', host).find(d => +d.dataset.k === i);
    sameDot?.classList.add('on');
    $('.subtitle p', host).textContent = L(f.t);
    $('.capno', host).textContent = partName(st.organ, f.part);
    $$('.captrack i', host).forEach((x, n) => { x.classList.toggle('past', n < i); x.classList.toggle('now', n === i); });
    if (!fx.reduced()) $('.subtitle', host).animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 260, easing: 'cubic-bezier(0.16,1,0.3,1)' });
  };
  const tick = () => { clearTimeout(timer); if (playing) timer = setTimeout(() => { if (i < frames.length - 1) { show(i + 1); tick(); } else { playing = false; syncPlay(); } }, 4800); };
  const syncPlay = () => { const p = $('[data-play]', host); p.innerHTML = ic(playing ? 'pause' : 'play'); p.setAttribute('aria-label', playing ? t('pause') : t('play')); };
  $('[data-prev]', host).onclick = () => { show(i - 1); tick(); };
  $('[data-fwd]', host).onclick = () => { show(i + 1); tick(); };
  $('[data-play]', host).onclick = () => { playing = !playing; if (playing && i === frames.length - 1) show(0); syncPlay(); tick(); };
  const vid = $('video', host);
  const mode = m => {
    $$('[data-mode]', host).forEach(x => { x.classList.toggle('on', x.dataset.mode === m); x.setAttribute('aria-pressed', x.dataset.mode === m); });
    $('.capvideo', host).hidden = m !== 'video'; $('.capsteps', host).hidden = m !== 'steps';
    if (m === 'video') { playing = false; clearTimeout(timer); syncPlay(); }
    else { vid.pause(); playing = !fx.reduced(); show(0); syncPlay(); tick(); }
  };
  $('.capmode', host).onclick = e => { const b = e.target.closest('[data-mode]'); if (b) mode(b.dataset.mode); };
  vid.querySelector('source').onerror = () => { $('[data-mode="video"]', host).disabled = true; mode('steps'); };
  $('[data-next]', host).onclick = () => { clearTimeout(timer); vid.pause(); ctx.done(); };
  ctx.setHint(null);
  playing = false; show(0); syncPlay();
  return () => { clearTimeout(timer); vid.pause(); };
}

export function explore(host, st, ctx) {
  const parts = ORGANS[st.organ].parts.map(p => p[0]);
  const seen = new Set();
  let viewer = null;
  host.innerHTML = `
    <div class="explore" style="--st:${st.color}">
      <div class="exstage">
        <div class="ex2d">${plateHTML(st.organ, { dots: parts.map((id, k) => ({ id, attrs: `data-part="${id}"`, label: partName(st.organ, id) })) })}</div>
        <div class="ex3d" hidden><div class="glhost"></div><p class="hint3d">${ic('rotate')} ${t('drag3d')}</p></div>
      </div>
      <aside class="expanel">
        <h3>${t('explore')}</h3>
        <p class="muted">${t('exploreHint')}</p>
        ${st.has3d ? `<div class="seg" role="group"><button class="on" data-view="2d" aria-pressed="true">${t('view2d')}</button><button data-view="3d" aria-pressed="false">${ic('rotate')} ${t('view3d')}</button></div>` : ''}
        <div class="exinfo" aria-live="polite"></div>
        <details class="partlist"><summary>${esc(L(PLATES[st.organ].title))}</summary><div>${parts.map(id => `<button data-p="${id}">${esc(partName(st.organ, id))}</button>`).join('')}</div></details>
        <p class="excount"></p>
        <div class="row end">${nextBtn(t('continue'))}</div>
      </aside>
    </div>`;
  const count = () => { $('.excount', host).textContent = t('explored', { n: seen.size, t: parts.length }); };
  const pick = d => {
    $$('.dot.on', host).forEach(x => x.classList.remove('on'));
    d.classList.add('on', 'seen'); seen.add(d.dataset.part); count();
    const id = d.dataset.part;
    const related = st.n2.filter(x => x.part === id);
    $('.exinfo', host).innerHTML = `<b>${esc(partName(st.organ, id))}</b>${related.length ? `<p>${related.map(r => esc(L(r.why))).join(' ')}</p>` : ''}`;
    fx.sound.play('hint');
  };
  $('.ex2d', host).onclick = e => { const d = nearestDot(host, e, '.ex2d [data-part]'); if (d) pick(d); };
  $('.partlist', host).onclick = e => { const b = e.target.closest('[data-p]'); if (b) pick($(`.ex2d [data-part="${b.dataset.p}"]`, host)); };
  $$('[data-view]', host).forEach(btn => btn.onclick = async () => {
    const v3 = btn.dataset.view === '3d';
    $$('[data-view]', host).forEach(x => { x.classList.toggle('on', x === btn); x.setAttribute('aria-pressed', x === btn); });
    $('.ex2d', host).hidden = v3; $('.ex3d', host).hidden = !v3;
    if (!v3 && viewer) { viewer.dispose?.(); viewer = null; $('.glhost', host).innerHTML = ''; } // allibera la GPU/CPU en tornar a la làmina
    if (v3 && !viewer) {
      try {
        const { mountViewer } = await import('./models.js');
        viewer = mountViewer($('.glhost', host), st.has3d, { reducedMotion: fx.reduced() });
      } catch { viewer = null; }
      if (!viewer) $('.ex3d', host).innerHTML = `<p class="nogl">${t('no3d')}</p>`;
    }
  });
  $('[data-next]', host).onclick = () => ctx.done();
  ctx.setHint(null);
  count();
  return () => viewer?.dispose?.();
}

/* ================================================================ MCQ (preguntes, amb imatge opcional) */
export function mcq(host, items, ctx, { title = '', note = '' } = {}) {
  let i = 0;
  const render = () => {
    const it = items[i];
    const order = shuffle(it.opts.map((o, k) => k));
    let elim = 0, answered = false;
    host.innerHTML = `
      <div class="qcard ${it.img ? 'withimg' : ''}">
        ${it.img ? figure(it.img, 'qimg') : ''}
        <div class="qbody">
          ${title ? `<h3 class="qtitle">${title}</h3>` : ''}
          ${note ? `<p class="muted">${note}</p>` : ''}
          <p class="qcount">${i + 1} / ${items.length}</p>
          <p class="q">${esc(L(it.q))}</p>
          <div class="choices">${order.map((k, n) => `<button class="choice" data-k="${k}"><span class="key">${n + 1}</span>${esc(L(it.opts[k]))}</button>`).join('')}</div>
          <div class="feedback" aria-live="polite"></div>
          <div class="row end" hidden>${nextBtn(i < items.length - 1 ? t('next') : t('continue'))}</div>
        </div>
      </div>`;
    const choose = btn => {
      if (answered || !btn || btn.disabled) return;
      answered = true;
      const ok = +btn.dataset.k === 0;
      $$('.choice', host).forEach(x => { x.disabled = true; if (+x.dataset.k === 0) x.classList.add('right'); });
      if (ok) { btn.classList.add('right'); ctx.hit(it, btn); } else { btn.classList.add('wrong'); ctx.miss(it, btn); }
      say($('.feedback', host), ok, `<b>${ok ? t('right') : t('wrong')}</b> ${ok ? '' : esc(t('theAnswer', { a: L(it.opts[0]) }))} ${esc(L(it.why))}`);
      $('.row.end', host).hidden = false; $('[data-next]', host).focus();
    };
    $('.choices', host).onclick = e => choose(e.target.closest('.choice'));
    host.onkeydown = e => { const n = +e.key; if (n >= 1 && n <= order.length) choose($$('.choice', host)[n - 1]); };
    $('[data-next]', host).onclick = () => { host.onkeydown = null; if (++i < items.length) render(); else ctx.done(); };
    ctx.setHint(() => {
      if (answered) return null;
      const wrongs = $$('.choice', host).filter(x => +x.dataset.k !== 0 && !x.disabled);
      if (elim === 0 && wrongs.length > 1) { elim++; wrongs[0].disabled = true; wrongs[0].classList.add('elim'); return t('hintElim'); }
      if (elim === 1) { elim++; blink($$('.choice', host).find(x => +x.dataset.k === 0)); return t('hintShow'); }
      return null;
    });
  };
  render();
}

/* ================================================================ N2 · Arrossegar a la làmina */
export function plate(host, st, ctx) {
  const items = st.n2.map((x, k) => ({ ...x, k, name: x.label ? L(x.label) : pname(x.c) }));
  const worked = items[0];
  const todo = shuffle(items.slice(1));
  const partsUsed = [...new Set(items.map(x => x.part))];
  const extra = shuffle(ORGANS[st.organ].parts.map(p => p[0]).filter(p => !partsUsed.includes(p))).slice(0, 3);
  const dots = shuffle([...partsUsed, ...extra]);
  const placed = [worked];
  host.innerHTML = `
    <div class="dragplate" style="--st:${st.color}">
      <div class="dpstage">${plateHTML(st.organ, { dots: dots.map((id, n) => ({ id, attrs: `data-target="${id}"`, label: t('target', { n: n + 1 }) })) })}</div>
      <aside class="dppanel">
        <h3>${t('dragTitle')}</h3>
        <p class="muted small">${t('dragHow')}</p>
        <div class="tray" aria-label="${t('chips')}">${todo.map(x => `<button class="chip" data-chip="${x.k}" aria-pressed="false">${esc(x.name)}</button>`).join('')}</div>
        <div class="feedback" aria-live="polite"></div>
        <ol class="placedlist"></ol>
        <p class="excount"></p>
        <div class="row end" hidden>${nextBtn(t('continue'))}</div>
      </aside>
    </div>`;
  const list = () => {
    $('.placedlist', host).innerHTML = placed.map((x, n) => `<li class="${x === worked ? 'worked' : ''}"><span class="badge">${n + 1}</span><b>${esc(x.name)}</b> → ${esc(partName(st.organ, x.part))}${x === worked ? ` <em>${t('worked')}</em>` : ''}</li>`).join('');
    $$('[data-target]', host).forEach(d => {
      const n = placed.map((x, i) => x.part === d.dataset.target ? i + 1 : 0).filter(Boolean);
      d.querySelector('span').textContent = n.join('·'); d.classList.toggle('filled', n.length > 0);
    });
    $('.excount', host).textContent = t('placed', { n: placed.length - 1, t: todo.length });
  };
  say($('.feedback', host), null, `<b>${t('worked')}:</b> ${esc(worked.name)} → ${esc(partName(st.organ, worked.part))}. ${esc(L(worked.why))} <span class="muted">${t('workedNote')}</span>`);
  list();
  const D = dnd(host, {
    onPlace(chip, tg) {
      const it = items[+chip.dataset.chip];
      if (tg.dataset.target === it.part) {
        placed.push(it); chip.remove(); ctx.hit(it, tg); fx.stamp(tg);
        say($('.feedback', host), true, `<b>${esc(it.name)}</b> → ${esc(partName(st.organ, it.part))}. ${esc(L(it.why))}`);
        list(); hintStage = 0;
        if (!$('[data-chip]', host)) { $('.row.end', host).hidden = false; $('[data-next]', host).focus(); }
      } else {
        ctx.miss(it, chip); fx.shake(chip);
        say($('.feedback', host), false, `<b>${t('wrong')}</b> ${esc(it.name)} ≠ ${esc(partName(st.organ, tg.dataset.target))}.`);
      }
    },
  });
  let hintStage = 0;
  ctx.setHint(() => {
    const chip = D.selected || $('[data-chip]', host); if (!chip) return null;
    const it = items[+chip.dataset.chip];
    if (hintStage === 0) { hintStage++; D.select(chip); return `${it.name}: ${L(it.why)}`; }
    if (hintStage === 1) { hintStage++; D.select(chip); blink($(`[data-target="${it.part}"]`, host)); return t('hintShow'); }
    return null;
  });
  $('[data-next]', host).onclick = () => { D.destroy(); ctx.done(); };
  return () => D.destroy();
}

/* ================================================================ Classificar (columnes) */
export function classify(host, cfg, ctx) {
  const items = shuffle(cfg.items.map(([label, bin, c], k) => ({ k, label: L(label), bin, c, ind: cfg.ind })));
  host.innerHTML = `
    <div class="classify ${cfg.img ? 'withimg' : ''}">
      ${cfg.img ? figure(cfg.img, 'clsimg') : ''}
      <div class="clsbody">
        <h3>${esc(L(cfg.title))}</h3>
        <p class="muted small">${t('classifyLead')} ${t('dragHow')}</p>
        <div class="tray">${items.map(x => `<button class="chip" data-chip="${x.k}" aria-pressed="false">${esc(x.label)}</button>`).join('')}</div>
        <div class="bins" style="--n:${cfg.bins.length}">${cfg.bins.map(([id, lab]) => `<button class="bin" data-target="${id}"><b>${esc(L(lab))}</b><span class="binlist"></span></button>`).join('')}</div>
        <div class="feedback" aria-live="polite"></div>
        <div class="row end" hidden>${nextBtn(t('continue'))}</div>
      </div>
    </div>`;
  const byK = Object.fromEntries(items.map(x => [x.k, x]));
  const D = dnd(host, {
    onPlace(chip, tg) {
      const it = byK[chip.dataset.chip];
      if (tg.dataset.target === it.bin) {
        chip.remove(); $('.binlist', tg).insertAdjacentHTML('beforeend', `<i>${esc(it.label)}</i>`);
        ctx.hit(it, tg); say($('.feedback', host), true, esc(t('right')));
        if (!$('[data-chip]', host)) { $('.row.end', host).hidden = false; $('[data-next]', host).focus(); }
      } else { ctx.miss(it, chip); fx.shake(chip); say($('.feedback', host), false, esc(t('wrong'))); }
    },
  });
  ctx.setHint(() => {
    const chip = D.selected || $('[data-chip]', host); if (!chip) return null;
    D.select(chip); blink($(`[data-target="${byK[chip.dataset.chip].bin}"]`, host)); return t('hintShow');
  });
  $('[data-next]', host).onclick = () => { D.destroy(); ctx.done(); };
  return () => D.destroy();
}

/* ================================================================ Ordenar */
export function order(host, cfg, ctx) {
  const steps = cfg.steps.map((s, k) => ({ k, label: L(s) }));
  const mix = shuffle(steps);
  let next = 0;
  host.innerHTML = `
    <div class="ordertask">
      <h3>${esc(L(cfg.title))}</h3>
      <p class="muted small">${t('orderLead')}</p>
      <ol class="orderdone"></ol>
      <div class="tray col">${mix.map(x => `<button class="chip" data-k="${x.k}">${esc(x.label)}</button>`).join('')}</div>
      <div class="feedback" aria-live="polite"></div>
      <div class="row end" hidden>${nextBtn(t('continue'))}</div>
    </div>`;
  $('.tray', host).onclick = e => {
    const c = e.target.closest('[data-k]'); if (!c) return;
    const meta = { ind: cfg.ind };
    if (+c.dataset.k === next) {
      next++; $('.orderdone', host).insertAdjacentHTML('beforeend', `<li>${esc(c.textContent)}</li>`); c.remove(); ctx.hit(meta, $('.orderdone li:last-child', host));
      if (next === steps.length) { say($('.feedback', host), true, esc(t('right'))); $('.row.end', host).hidden = false; $('[data-next]', host).focus(); }
    } else { ctx.miss(meta, c); fx.shake(c); }
  };
  ctx.setHint(() => { const c = $(`.tray [data-k="${next}"]`, host); if (!c) return null; blink(c); return t('hintShow'); });
  $('[data-next]', host).onclick = () => ctx.done();
}

/* ================================================================ Escriure (resposta curta tolerant) */
export function write(host, items, ctx) {
  let i = 0;
  const render = () => {
    const it = items[i], lang = getLang();
    let hs = 0, done = false;
    const ans = L(it.answer), forms = [ans, ...(it.syn?.[lang] || [])];
    host.innerHTML = `
      <div class="qcard">
        <div class="qbody">
          <h3 class="qtitle">${t('writeTitle')}</h3>
          <p class="qcount">${i + 1} / ${items.length}</p>
          <label class="q" for="w-in">${esc(L(it.q))}</label>
          <form class="writeform"><input id="w-in" autocomplete="off" spellcheck="false" placeholder="${t('writePh')}"><button class="btn">${t('check')}</button></form>
          <div class="feedback" aria-live="polite"></div>
          <div class="row end" hidden>${nextBtn(i < items.length - 1 ? t('next') : t('continue'))}</div>
        </div>
      </div>`;
    const inp = $('#w-in', host); inp.focus();
    $('.writeform', host).onsubmit = e => {
      e.preventDefault(); if (done || !inp.value.trim()) return;
      const m = matchAnswer(inp.value, forms);
      if (m) {
        done = true; inp.disabled = true; ctx.hit(it, inp);
        say($('.feedback', host), true, `<b>${t('right')}</b> ${m === 'typo' ? esc(t('writeTypo', { a: ans })) : ''} ${rich(L(it.why))}`);
        $('.row.end', host).hidden = false; $('[data-next]', host).focus();
      } else {
        ctx.miss(it, inp); fx.shake(inp);
        say($('.feedback', host), false, `<b>${t('wrong')}</b>`);
        if (++hs >= 3) { done = true; inp.disabled = true; say($('.feedback', host), false, `${esc(t('theAnswer', { a: ans }))} ${rich(L(it.why))}`); $('.row.end', host).hidden = false; $('[data-next]', host).focus(); }
      }
    };
    let hint = 0;
    ctx.setHint(() => {
      if (done) return null;
      if (hint === 0) { hint++; return `${ans[0].toUpperCase()}… (${ans.length})`; }
      if (hint === 1) { hint++; return `${ans.slice(0, Math.ceil(ans.length / 2))}…`; }
      return null;
    });
    $('[data-next]', host).onclick = () => { if (++i < items.length) render(); else ctx.done(); };
  };
  render();
}

/* ================================================================ N4 · Graella amb esvaïment */
export function grid(host, st, ctx) {
  const cols = st.n4.cols;
  const colName = { cause: t('colCause'), signs: t('colSigns'), treat: t('colTreat'), def: t('colDef') };
  const rows = [st.n4.rows[0], ...shuffle(st.n4.rows.slice(1)).slice(0, 3)];
  // esvaïment: fila 1 completa (exemple), fila 2 amb totes menys l'última columna, la resta buides
  const given = (r, c) => r === 0 || (r === 1 && c < cols.length - 1 && cols.length > 1);
  const cells = [];
  rows.forEach((id, r) => cols.forEach((col, c) => cells.push({ key: `${id}.${col}`, id, col, r, c, text: L(PATH[id][col]), given: given(r, c) })));
  const chips = shuffle(cells.filter(x => !x.given));
  host.innerHTML = `
    <div class="gridtask" style="--cols:${cols.length}">
      <h3>${t('gridTitle')}</h3>
      <p class="muted small">${t('gridLead')} ${t('dragHow')}</p>
      <div class="gridwrap"><table class="pgrid">
        <thead><tr><th>${t('colPath')}</th>${cols.map(c => `<th>${colName[c]}</th>`).join('')}</tr></thead>
        <tbody>${rows.map((id, r) => `<tr class="${r === 0 ? 'worked' : ''}"><th scope="row">${esc(pname(id))}${r === 0 ? `<em>${t('worked')}</em>` : ''}</th>${cols.map((col, c) => {
          const x = cells.find(z => z.key === `${id}.${col}`);
          return x.given ? `<td class="given">${esc(x.text)}</td>` : `<td><button class="cell" data-target="${x.key}" aria-label="${esc(pname(id))} · ${colName[col]}"></button></td>`;
        }).join('')}</tr>`).join('')}</tbody>
      </table></div>
      <div class="tray">${chips.map(x => `<button class="chip small" data-chip="${x.key}" aria-pressed="false">${esc(x.text)}</button>`).join('')}</div>
      <div class="feedback" aria-live="polite"></div>
      <div class="row end" hidden>${nextBtn(t('continue'))}</div>
    </div>`;
  const D = dnd(host, {
    onPlace(chip, tg) {
      const x = cells.find(z => z.key === chip.dataset.chip);
      const meta = { c: x.id, ind: 'I3' };
      const tcell = cells.find(z => z.key === tg.dataset.target);
      if (tg.dataset.target === x.key || (tcell && tcell.text === x.text && tcell.col === x.col)) {
        tg.textContent = x.text; tg.disabled = true; tg.classList.add('done'); chip.remove(); ctx.hit(meta, tg);
        if (!$('[data-chip]', host)) { say($('.feedback', host), true, esc(t('right'))); $('.row.end', host).hidden = false; $('[data-next]', host).focus(); }
      } else {
        ctx.miss(meta, chip); fx.shake(chip); say($('.feedback', host), false, esc(t('wrong')));
      }
    },
  });
  ctx.setHint(() => {
    const chip = D.selected || $('[data-chip]', host); if (!chip) return null;
    D.select(chip); blink($(`[data-target="${CSS.escape(chip.dataset.chip)}"]`, host)); return t('hintShow');
  });
  $('[data-next]', host).onclick = () => { D.destroy(); ctx.done(); };
  return () => D.destroy();
}

/* ================================================================ N3 Vista · Banc òptic */
const OPT = [
  { c: 'miopia', len: 1.2, near: false, ok: 'div', ind: 'I2' },
  { c: 'hipermetropia', len: 0.82, near: false, ok: 'conv', ind: 'I2' },
  { c: 'astigmatisme', len: 1, near: false, split: true, ok: 'cyl', ind: 'I2' },
  { c: 'presbicia', len: 1, near: true, ok: 'conv', ind: 'I2' },
];
export function optics(host, st, ctx) {
  let i = 0;
  const render = () => {
    const ch = OPT[i];
    let lens = 'none', answered = false;
    host.innerHTML = `
      <div class="optics">
        <div class="optstage"><svg viewBox="0 0 640 300" role="img" aria-label="${t('optTitle')}"></svg><p class="optstatus" aria-live="polite"></p></div>
        <aside class="optpanel">
          <h3>${t('optTitle')}</h3>
          <p class="qcount">${t('optChallenge', { n: i + 1, t: OPT.length })}</p>
          <p class="q"><b>${esc(pname(ch.c))}</b>. ${esc(L(PATH[ch.c].cause))}.</p>
          <p class="muted small">${t('optAsk')}</p>
          <div class="seg lenses" role="radiogroup">${['none', 'conv', 'div', 'cyl'].map(k => `<button role="radio" aria-checked="${k === 'none'}" data-lens="${k}" class="${k === 'none' ? 'on' : ''}">${t({ none: 'optNone', conv: 'optConv', div: 'optDiv', cyl: 'optCyl' }[k])}</button>`).join('')}</div>
          <button class="btn" data-check>${t('check')}</button>
          <div class="feedback" aria-live="polite"></div>
          <div class="row end" hidden>${nextBtn(i < OPT.length - 1 ? t('next') : t('continue'))}</div>
        </aside>
      </div>`;
    const draw = () => {
      const front = 150, retina = front + 300 * ch.len;
      let F = front + 300; // focus d'un ull normal amb objecte llunyà
      if (ch.near) F += 70;          // objecte proper: el cristal·lí ja no s'acomoda
      const shift = { none: 0, conv: -70, div: 70, cyl: 0 }[lens];
      const focus = [F + shift + (ch.near && lens === 'conv' ? 0 : 0)];
      if (ch.split && lens !== 'cyl') { focus.length = 0; focus.push(F - 40 + shift, F + 40 + shift); }
      const fx0 = focus[0], fx1 = focus[1] ?? focus[0];
      const status = focus.length > 1 ? 'optFocusSplit' : Math.abs(fx0 - retina) < 12 ? 'optFocusOn' : fx0 < retina ? 'optFocusFront' : 'optFocusBack';
      const ys = [-60, -30, 30, 60];
      const src = ch.near ? 20 : null;
      const ray = (y, fxp, cls) => {
        const y0 = 150 + y;
        const startX = 10, startY = src ? 150 + y * 0.25 : y0;
        const slope = (150 - y0) / (fxp - front);
        const endX = Math.max(retina, fxp) + 20, endY = y0 + slope * (endX - front);
        return `<path class="ray ${cls}" d="M${startX} ${startY} L${front} ${y0} L${endX} ${endY.toFixed(1)}"/>`;
      };
      const rays = focus.length > 1
        ? ys.slice(0, 2).map(y => ray(y, fx0, 'a')).join('') + ys.slice(2).map(y => ray(y, fx1, 'b')).join('')
        : ys.map(y => ray(y, fx0, '')).join('');
      $('svg', host).innerHTML = `
        <defs><clipPath id="eyeclip"><ellipse cx="${(front + retina) / 2}" cy="150" rx="${(retina - front) / 2 + 6}" ry="118"/></clipPath></defs>
        <ellipse class="eyeball" cx="${(front + retina) / 2}" cy="150" rx="${(retina - front) / 2 + 6}" ry="118"/>
        <path class="retina" d="M${retina - 30} 52 Q${retina + 8} 150 ${retina - 30} 248"/>
        ${lens !== 'none' ? `<g class="clens ${lens}" transform="translate(${front - 70} 150)">${lens === 'conv' ? '<path d="M0 -70 Q16 0 0 70 Q-16 0 0 -70Z"/>' : lens === 'div' ? '<path d="M-10 -70 H10 Q0 0 10 70 H-10 Q0 0 -10 -70Z"/>' : '<rect x="-6" y="-70" width="12" height="140" rx="4"/>'}</g>` : ''}
        <g class="lensin" transform="translate(${front} 150)"><ellipse rx="12" ry="${ch.near ? 46 : 52}"/></g>
        ${src ? '<circle class="srcdot" cx="20" cy="150" r="6"/>' : '<path class="sun" d="M12 150 h0"/>'}
        ${rays}
        ${focus.map(f => `<circle class="focus" cx="${f}" cy="150" r="6"/>`).join('')}
        <text x="${retina + 4}" y="40" class="svglab">${esc(L(b('Retina')))}</text>`;
      $('.optstatus', host).textContent = t(status);
    };
    $('.lenses', host).onclick = e => {
      const btn = e.target.closest('[data-lens]'); if (!btn || answered) return;
      lens = btn.dataset.lens;
      $$('[data-lens]', host).forEach(x => { x.classList.toggle('on', x === btn); x.setAttribute('aria-checked', x === btn); });
      draw();
    };
    $('[data-check]', host).onclick = () => {
      if (answered || lens === 'none') return;
      answered = true; $('[data-check]', host).disabled = true;
      const ok = lens === ch.ok, meta = { c: ch.c, ind: ch.ind };
      ok ? ctx.hit(meta, $('svg', host)) : ctx.miss(meta, $('svg', host));
      if (!ok) { lens = ch.ok; draw(); $$('[data-lens]', host).forEach(x => x.classList.toggle('on', x.dataset.lens === ch.ok)); }
      say($('.feedback', host), ok, `<b>${ok ? t('right') : t('wrong')}</b> ${esc(L(PATH[ch.c].treat))}.`);
      $('.row.end', host).hidden = false; $('[data-next]', host).focus();
    };
    let h = 0;
    ctx.setHint(() => {
      if (answered) return null;
      if (h === 0) { h++; return L(PATH[ch.c].signs); }
      if (h === 1) { h++; blink($(`[data-lens="${ch.ok}"]`, host)); return t('hintShow'); }
      return null;
    });
    $('[data-next]', host).onclick = () => { if (++i < OPT.length) render(); else ctx.done(); };
    draw();
  };
  render();
}

/* ================================================================ N3 Vista · Simulador de visió */
const SIM_STRUCT = {
  cataracta: b('El cristal·lí', 'El cristalino'), glaucoma: b('El nervi òptic', 'El nervio óptico'), dmae: b('La màcula', 'La mácula'),
  daltonisme: b('Els cons de la retina', 'Los conos de la retina'), estrabisme: b('Els músculs extraoculars', 'Los músculos extraoculares'),
};
export function visionsim(host, cfg, ctx) {
  const items = shuffle(cfg.items);
  let i = 0, effects = true;
  const all = cfg.items.map(x => x.c);
  const render = () => {
    const it = items[i];
    let phase = 1, h = 0;
    const opts1 = shuffle(all), opts2 = shuffle(Object.keys(SIM_STRUCT));
    host.innerHTML = `
      <div class="visionsim">
        <div class="simframe fx-${it.filter} ${effects ? '' : 'nofx'}">
          <img src="./assets/img/escena-carrer.webp" alt="" draggable="false"><img class="dbl" src="./assets/img/escena-carrer.webp" alt="" draggable="false"><i class="veil"></i>
        </div>
        <aside class="simpanel">
          <h3>${t('simTitle')}</h3>
          <p class="qcount">${i + 1} / ${items.length}</p>
          <p class="q">${t('simLead')}</p>
          <div class="choices p1">${opts1.map(c => `<button class="choice" data-c="${c}">${esc(pname(c))}</button>`).join('')}</div>
          <div class="p2" hidden><p class="q">${t('simStruct')}</p><div class="choices">${opts2.map(c => `<button class="choice" data-s="${c}">${esc(L(SIM_STRUCT[c]))}</button>`).join('')}</div></div>
          <div class="feedback" aria-live="polite"></div>
          <button class="linkbtn" data-fx>${effects ? t('simOff') : t('simOn')}</button>
          <div class="row end" hidden>${nextBtn(i < items.length - 1 ? t('next') : t('continue'))}</div>
        </aside>
      </div>`;
    if (i === 0) say($('.feedback', host), null, esc(t('simWarn')));
    const meta = { c: it.c, ind: 'I2' };
    $('.p1', host).onclick = e => {
      const btn = e.target.closest('[data-c]'); if (!btn || phase !== 1) return;
      phase = 2; const ok = btn.dataset.c === it.c;
      $$('.p1 .choice', host).forEach(x => { x.disabled = true; if (x.dataset.c === it.c) x.classList.add('right'); });
      if (ok) { btn.classList.add('right'); ctx.hit(meta, btn); } else { btn.classList.add('wrong'); ctx.miss(meta, btn); }
      say($('.feedback', host), ok, `<b>${ok ? t('right') : t('wrong')}</b> ${esc(pname(it.c))}: ${esc(L(PATH[it.c].signs))}.`);
      $('.p2', host).hidden = false; h = 0;
    };
    $('.p2', host).onclick = e => {
      const btn = e.target.closest('[data-s]'); if (!btn || phase !== 2) return;
      phase = 3; const ok = btn.dataset.s === it.c, m2 = { c: it.c, ind: 'I1' };
      $$('.p2 .choice', host).forEach(x => { x.disabled = true; if (x.dataset.s === it.c) x.classList.add('right'); });
      if (ok) { btn.classList.add('right'); ctx.hit(m2, btn); } else { btn.classList.add('wrong'); ctx.miss(m2, btn); }
      say($('.feedback', host), ok, `<b>${ok ? t('right') : t('wrong')}</b> ${esc(L(PATH[it.c].cause))}.`);
      $('.row.end', host).hidden = false; $('[data-next]', host).focus();
    };
    $('[data-fx]', host).onclick = () => { effects = !effects; $('.simframe', host).classList.toggle('nofx', !effects); $('[data-fx]', host).textContent = effects ? t('simOff') : t('simOn'); };
    ctx.setHint(() => {
      if (phase > 2 || h > 1) return null;
      const sel = phase === 1 ? `.p1 [data-c="${it.c}"]` : `.p2 [data-s="${it.c}"]`;
      if (h++ === 0) { const w = $$(phase === 1 ? '.p1 .choice' : '.p2 .choice', host).filter(x => !x.matches(sel) && !x.disabled); w.slice(0, 2).forEach(x => { x.disabled = true; x.classList.add('elim'); }); return t('hintElim'); }
      blink($(sel, host)); return t('hintShow');
    });
    $('[data-next]', host).onclick = () => { if (++i < items.length) render(); else ctx.done(); };
  };
  render();
}

/* ================================================================ N3 Oïda · On s'atura el so */
const SOUND_NODES = [
  b('Pavelló auricular', 'Pabellón auricular'), b('Conducte auditiu', 'Conducto auditivo'), b('Timpà', 'Tímpano'),
  b('Orella mitjana (ossets)', 'Oído medio (huesecillos)'), b('Còclea (cèl·lules ciliades)', 'Cóclea (células ciliadas)'), b('Nervi auditiu', 'Nervio auditivo'),
];
export function soundpath(host, cfg, ctx) {
  const sc = cfg.scenarios;
  let i = 0;
  const render = () => {
    const it = sc[i];
    let phase = 1, h = 0;
    host.innerHTML = `
      <div class="soundpath">
        <h3>${t('soundTitle')}</h3>
        <p class="qcount">${i + 1} / ${sc.length}</p>
        <p class="q">${esc(L(it.t))}</p>
        <p class="muted small">${t('soundLead')}</p>
        <div class="spath" style="--n:${SOUND_NODES.length}">
          <div class="wave" aria-hidden="true"></div>
          ${SOUND_NODES.map((n, k) => `<button class="snode" data-k="${k}"><span class="snum">${k + 1}</span><span>${esc(L(n))}</span></button>`).join('')}
          <span class="brain">${ic('brain')}</span>
        </div>
        <div class="p2" hidden><p class="q">${t('soundKind')}</p><div class="choices row2">
          <button class="choice" data-kind="transmissio">${esc(pname('transmissio'))}</button>
          <button class="choice" data-kind="neurosensorial">${esc(pname('neurosensorial'))}</button></div></div>
        <div class="feedback" aria-live="polite"></div>
        <div class="row end" hidden>${nextBtn(i < sc.length - 1 ? t('next') : t('continue'))}</div>
      </div>`;
    const play = upto => {
      const w = $('.wave', host), n = SOUND_NODES.length;
      w.style.setProperty('--to', `${((upto + 0.5) / n) * 100}%`);
      w.classList.remove('go'); void w.offsetWidth; w.classList.add('go');
    };
    $('.spath', host).onclick = e => {
      const btn = e.target.closest('.snode'); if (!btn || phase !== 1) return;
      const k = +btn.dataset.k, ok = k === it.stop, meta = { c: it.c, ind: 'I2' };
      if (ok) {
        phase = 2; btn.classList.add('stop'); ctx.hit(meta, btn); play(it.stop);
        $$('.snode', host).forEach((x, n) => { x.disabled = true; x.classList.toggle('lost', n > it.stop); });
        $('.p2', host).hidden = false; h = 0;
        say($('.feedback', host), true, `<b>${t('right')}</b>`);
      } else { ctx.miss(meta, btn); fx.shake(btn); say($('.feedback', host), false, esc(t('wrong'))); }
    };
    $('.p2', host).onclick = e => {
      const btn = e.target.closest('[data-kind]'); if (!btn || phase !== 2) return;
      phase = 3; const ok = btn.dataset.kind === it.kind, meta = { c: it.kind, ind: 'I2' };
      $$('[data-kind]', host).forEach(x => { x.disabled = true; if (x.dataset.kind === it.kind) x.classList.add('right'); });
      if (ok) { btn.classList.add('right'); ctx.hit(meta, btn); } else { btn.classList.add('wrong'); ctx.miss(meta, btn); }
      say($('.feedback', host), ok, `<b>${ok ? t('right') : t('wrong')}</b> ${esc(pname(it.kind))}: ${esc(L(PATH[it.kind].cause))}.`);
      $('.row.end', host).hidden = false; $('[data-next]', host).focus();
    };
    ctx.setHint(() => {
      if (phase === 1 && h === 0) { h++; return L(PATH[it.c].cause); }
      if (phase === 1 && h === 1) { h++; blink($(`.snode[data-k="${it.stop}"]`, host)); return t('hintShow'); }
      if (phase === 2 && h < 2) { h = 2; blink($(`[data-kind="${it.kind}"]`, host)); return t('hintShow'); }
      return null;
    });
    $('[data-next]', host).onclick = () => { if (++i < sc.length) render(); else ctx.done(); };
  };
  render();
}

/* ================================================================ N3 Gust · Simulador del sabor */
const FLAVOR_Q = [
  { q: 'flavorQ1', c: 'sabor', ind: 'I5',
    opts: [b('Baixa el sabor, però es continuen notant els 5 gustos bàsics', 'Baja el sabor, pero se siguen notando los 5 gustos básicos'),
      b('Es perden els 5 gustos bàsics', 'Se pierden los 5 gustos básicos'), b('No canvia res', 'No cambia nada')],
    why: b('El sabor integra gust i olfacte: sense olfacte, el sabor baixa però el gust es manté [dip. 54].', 'El sabor integra gusto y olfato: sin olfato, el sabor baja pero el gusto se mantiene [dip. 54].') },
  { q: 'flavorQ2', c: 'hipogeusia', ind: 'I5',
    opts: [b('Es noten menys o gens els gustos bàsics (hipogèusia o agèusia)', 'Se notan menos o nada los gustos básicos (hipogeusia o ageusia)'),
      b('Es perd l\'olfacte (anòsmia)', 'Se pierde el olfato (anosmia)'), b('El sabor queda igual', 'El sabor queda igual')],
    why: b('Els botons gustatius capten dolç, salat, àcid, amarg i umami.', 'Los botones gustativos captan dulce, salado, ácido, amargo y umami.') },
];
export function flavor(host, cfg, ctx) {
  const v = { taste: 80, smell: 80, texture: 60, temp: 60 };
  host.innerHTML = `
    <div class="flavor">
      <div class="flsim">
        <h3>${t('flavorTitle')}</h3>
        <p class="muted small">${t('flavorLead')}</p>
        ${[['taste', 'flavorTaste'], ['smell', 'flavorSmell'], ['texture', 'flavorTexture'], ['temp', 'flavorTemp']].map(([k, lab]) => `
          <label class="slider"><span>${t(lab)}</span><input type="range" min="0" max="100" value="${v[k]}" data-k="${k}"><output>${v[k]}</output></label>`).join('')}
        <div class="meters">
          <div class="meter"><span>${t('flavorMeter')}</span><div class="mbar"><i data-m="flavor"></i></div></div>
          <div class="meter"><span>${t('flavorBasic')}</span><div class="mbar basic"><i data-m="basic"></i></div></div>
        </div>
      </div>
      <div class="flq"></div>
    </div>`;
  const upd = () => {
    const f = 0.3 * v.taste + 0.45 * v.smell + 0.125 * v.texture + 0.125 * v.temp;
    $('[data-m="flavor"]', host).style.width = f + '%';
    $('[data-m="basic"]', host).style.width = v.taste + '%';
  };
  $$('input[type=range]', host).forEach(r => r.oninput = () => { v[r.dataset.k] = +r.value; r.nextElementSibling.value = r.value; upd(); });
  upd();
  mcq($('.flq', host), FLAVOR_Q.map(x => ({ ...x, q: b(t(x.q)) })), ctx);
}

/* ================================================================ N3 Olfacte · Laboratori de paraules */
const PRE = { hipo: b('hipo-'), a: b('a(n)-'), par: b('par-'), dis: b('dis-') };
const ROOT = { osmia: b('-òsmia', '-osmia'), geusia: b('-gèusia', '-geusia') };
const defOf = c => {
  const name = L(PATH[c].name);
  return L(GLOSSARY.find(g => L(g.term) === name)?.def) || L(PATH[c].def) || '';
};
export function wordlab(host, cfg, ctx) {
  const items = shuffle(cfg.items);
  let i = 0;
  const render = () => {
    const it = items[i];
    let pre = null, root = null, done = false, h = 0;
    host.innerHTML = `
      <div class="wordlab">
        <h3>${t('wordTitle')}</h3>
        <p class="muted small">${t('wordLead')}</p>
        <p class="qcount">${i + 1} / ${items.length}</p>
        <p class="q">${esc(t('wordAsk', { d: defOf(it.c) }))}</p>
        <div class="wlcols">
          <div><h4>${t('wordPre')}</h4><div class="seg col" data-g="pre">${Object.entries(PRE).map(([k, x]) => `<button data-v="${k}">${esc(L(x))}</button>`).join('')}</div></div>
          <div class="wlword" aria-live="polite"><span class="wp">?</span><span class="wr">?</span></div>
          <div><h4>${t('wordRoot')}</h4><div class="seg col" data-g="root">${Object.entries(ROOT).map(([k, x]) => `<button data-v="${k}">${esc(L(x))}</button>`).join('')}</div></div>
        </div>
        <button class="btn" data-check disabled>${t('check')}</button>
        <div class="feedback" aria-live="polite"></div>
        <div class="row end" hidden>${nextBtn(i < items.length - 1 ? t('next') : t('continue'))}</div>
      </div>`;
    $$('[data-g]', host).forEach(g => g.onclick = e => {
      const btn = e.target.closest('[data-v]'); if (!btn || done) return;
      $$('button', g).forEach(x => x.classList.toggle('on', x === btn));
      if (g.dataset.g === 'pre') { pre = btn.dataset.v; $('.wp', host).textContent = L(PRE[pre]).replace(/-$/, ''); }
      else { root = btn.dataset.v; $('.wr', host).textContent = L(ROOT[root]).replace(/^-/, ''); }
      $('[data-check]', host).disabled = !(pre && root);
    });
    $('[data-check]', host).onclick = () => {
      if (done) return;
      const ok = pre === it.pre && root === it.root, meta = { c: it.c, ind: cfg.ind };
      if (ok) {
        done = true; ctx.hit(meta, $('.wlword', host));
        say($('.feedback', host), true, `<b>${esc(pname(it.c))}</b>: ${esc(defOf(it.c))}`);
        $('.row.end', host).hidden = false; $('[data-next]', host).focus();
      } else { ctx.miss(meta, $('.wlword', host)); fx.shake($('.wlword', host)); say($('.feedback', host), false, esc(t('wrong'))); }
    };
    ctx.setHint(() => {
      if (done) return null;
      if (h === 0) { h++; blink($(`[data-g="root"] [data-v="${it.root}"]`, host)); return t('hintShow'); }
      if (h === 1) { h++; blink($(`[data-g="pre"] [data-v="${it.pre}"]`, host)); return t('hintShow'); }
      return null;
    });
    $('[data-next]', host).onclick = () => { if (++i < items.length) render(); else ctx.done(); };
  };
  render();
}

/* ================================================================ N3 Pell · Detectiu ABCDE */
export function abcde(host, cfg, ctx) {
  const items = cfg.items;
  let i = 0;
  const render = () => {
    const it = items[i];
    const sel = new Set();
    let refer = null, done = false, h = 0;
    host.innerHTML = `
      <div class="abcde">
        ${figure(it.img, 'lesion')}
        <aside class="abpanel">
          <h3>${t('abcdeTitle')}</h3>
          <p class="qcount">${i + 1} / ${items.length}</p>
          <p class="muted small">${t('abcdeLead')}</p>
          <div class="letters">${['A', 'B', 'C', 'D'].map(l => `<button class="letter" data-l="${l}" aria-pressed="false"><b>${l}</b><span>${t('abcde' + l)}</span></button>`).join('')}</div>
          <p class="muted small">${ic('bulb')} ${t('abcdeEnote')}</p>
          <div class="seg decide" role="radiogroup"><button data-r="0" role="radio" aria-checked="false">${t('abcdeWatch')}</button><button data-r="1" role="radio" aria-checked="false">${t('abcdeRefer')}</button></div>
          <button class="btn" data-check disabled>${t('check')}</button>
          <div class="feedback" aria-live="polite"></div>
          <div class="row end" hidden>${nextBtn(i < items.length - 1 ? t('next') : t('continue'))}</div>
        </aside>
      </div>`;
    $('.letters', host).onclick = e => {
      const btn = e.target.closest('[data-l]'); if (!btn || done) return;
      const l = btn.dataset.l; sel.has(l) ? sel.delete(l) : sel.add(l);
      btn.setAttribute('aria-pressed', sel.has(l)); btn.classList.toggle('on', sel.has(l));
    };
    $('.decide', host).onclick = e => {
      const btn = e.target.closest('[data-r]'); if (!btn || done) return;
      refer = btn.dataset.r === '1';
      $$('.decide button', host).forEach(x => { x.classList.toggle('on', x === btn); x.setAttribute('aria-checked', x === btn); });
      $('[data-check]', host).disabled = false;
    };
    $('[data-check]', host).onclick = () => {
      if (done || refer == null) return;
      done = true; $('[data-check]', host).disabled = true;
      const want = new Set(it.alarm);
      const okL = want.size === sel.size && [...want].every(x => sel.has(x));
      const okR = refer === it.refer;
      okL ? ctx.hit({ c: 'melanoma', ind: 'I4' }, $('.letters', host)) : ctx.miss({ c: 'melanoma', ind: 'I4' }, $('.letters', host));
      okR ? ctx.hit({ c: 'melanoma', ind: 'I7' }, $('.decide', host)) : ctx.miss({ c: 'melanoma', ind: 'I7' }, $('.decide', host));
      $$('.letter', host).forEach(x => x.classList.add(want.has(x.dataset.l) ? 'should' : 'shouldnt'));
      const letters = it.alarm.length ? it.alarm.map(l => `${l} · ${t('abcde' + l)}`).join(', ') : t('abcdeNone');
      say($('.feedback', host), okL && okR, `<b>${okL && okR ? t('right') : t('wrong')}</b> ${esc(letters)}. → <b>${it.refer ? t('abcdeRefer') : t('abcdeWatch')}</b>`);
      $('.row.end', host).hidden = false; $('[data-next]', host).focus();
    };
    ctx.setHint(() => {
      if (done || h > 0) return null;
      h++; it.alarm.forEach(l => blink($(`[data-l="${l}"]`, host)));
      return it.alarm.length ? t('hintShow') : t('abcdeNone');
    });
    $('[data-next]', host).onclick = () => { if (++i < items.length) render(); else ctx.done(); };
  };
  render();
}
