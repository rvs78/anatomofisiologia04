// Utilitats d'interfície: selecció, escapament, icones, làmines amb punts, finestres i arrossegar-deixar
// (punter, tàctil multitàctil, tocar-tocar i teclat).
import { t, L } from './i18n.js';
import { ORGANS } from './drawings.js';
import { PLATES } from './data/plates.js';
import * as fx from './fx.js';

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
/** Text amb *cursiva* mínima (per a les etimologies), sempre escapat. */
export const rich = s => esc(s).replace(/\*([^*]+)\*/g, '<i>$1</i>');
export const ic = (name, cls = 'icon') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
export const starRow = (n, cls = 'stars') => `<span class="${cls}" role="img" aria-label="${t('stars', { n })}">${[0, 1, 2].map(i => `<svg viewBox="0 0 24 24" class="${i < n ? '' : 'no'}"><use href="#i-star"/></svg>`).join('')}</span>`;
export const imgSrc = id => `./assets/img/${id}.webp`;
export const partName = (organ, id) => L(PLATES[organ].parts[id]);

let MANIFEST = {};
export async function loadManifest() {
  try { MANIFEST = await (await fetch('./assets/img/manifest.json')).json(); } catch { MANIFEST = {}; }
}
export const altOf = id => L(MANIFEST[id]?.alt) || '';
/** Figura amb imatge generada, text alternatiu i marca d'IA. */
export const figure = (id, cls = '') => `<figure class="aimg ${cls}"><img src="${imgSrc(id)}" alt="${esc(altOf(id))}" loading="lazy" decoding="async"><figcaption>${t('aiImg')}</figcaption></figure>`;

/* ---------- Làmina amb punts (coordenades de drawings.js; la imatge cobreix 0 −25 1000 750) ---------- */
export const plateXY = ([x, y]) => ({ left: `${(x / 10).toFixed(2)}%`, top: `${((y + 25) / 7.5).toFixed(2)}%` });
export function plateHTML(organ, { dots = [], cls = '' } = {}) {
  const O = ORGANS[organ];
  return `<div class="plate ${cls}" data-organ="${organ}">
    <img src="${O.img}" alt="${esc(L(PLATES[organ].title))}" draggable="false">
    ${dots.map(d => { const p = plateXY(O.parts.find(x => x[0] === d.id)[1]); return `<button class="dot ${d.cls || ''}" style="left:${p.left};top:${p.top}" ${d.attrs || ''} aria-label="${esc(d.label || '')}"><span></span></button>`; }).join('')}
  </div>`;
}
export const partXY = (organ, id) => ORGANS[organ].parts.find(x => x[0] === id)?.[1];

/* ---------- Finestra (diàleg) ---------- */
export function dialog(title, html, { onClose, wide = false } = {}) {
  const d = document.createElement('dialog');
  d.className = 'sheetdlg' + (wide ? ' wide' : '');
  d.innerHTML = `<div class="dlghead"><h2>${title}</h2><button class="iconbtn" data-close aria-label="${t('close')}">${ic('x')}</button></div><div class="dlgbody">${html}</div>`;
  document.body.append(d);
  const close = () => { d.close(); };
  d.addEventListener('close', () => { d.remove(); onClose?.(); });
  d.addEventListener('click', e => { if (e.target === d || e.target.closest('[data-close]')) close(); });
  d.showModal();
  return { el: d, close };
}

/* ---------- Retroacció en línia ---------- */
export function say(el, ok, html) {
  el.className = `feedback ${ok === true ? 'ok' : ok === false ? 'err' : 'info'}`;
  el.innerHTML = `${ok === true ? ic('check') : ok === false ? ic('x') : ic('bulb')}<div>${html}</div>`;
}

/* ---------- Arrossegar i deixar ----------
   root conté [data-chip] (botons) i [data-target] (botons). onPlace(chip, target) decideix: retorna true si s'accepta.
   · Arrossegar amb ratolí o dit (diversos dits alhora), deixant a menys de 26 px de la destinació.
   · Tocar un cromo (queda seleccionat) i després la destinació.
   · Teclat: Tab fins al cromo, Enter; Tab fins a la destinació, Enter. */
const TOL = 26;
export function dnd(root, { onPlace }) {
  let selected = null;
  const select = c => {
    $$('[data-chip].sel', root).forEach(x => { x.classList.remove('sel'); x.setAttribute('aria-pressed', 'false'); });
    selected = c;
    if (c) { c.classList.add('sel'); c.setAttribute('aria-pressed', 'true'); root.classList.add('picking'); fx.sound.play('hint'); }
    else root.classList.remove('picking');
  };
  const nearest = (x, y) => {
    let best = null, bd = Infinity;
    for (const tg of $$('[data-target]:not([disabled])', root)) {
      const r = tg.getBoundingClientRect();
      const dx = Math.max(r.left - x, 0, x - r.right), dy = Math.max(r.top - y, 0, y - r.bottom);
      // dins de diverses destinacions (punts que se solapen): guanya el centre més proper
      const d = Math.hypot(dx, dy) + Math.hypot(r.left + r.width / 2 - x, r.top + r.height / 2 - y) / 1000;
      if (d < bd) { bd = d; best = tg; }
    }
    return bd <= TOL + 1 ? best : null;
  };
  const drops = new Map();
  const onDown = e => {
    const chip = e.target.closest('[data-chip]');
    if (!chip || chip.disabled || !root.contains(chip) || (e.button && e.button !== 0)) return;
    drops.set(e.pointerId, { chip, x0: e.clientX, y0: e.clientY, ghost: null });
  };
  const onMove = e => {
    const d = drops.get(e.pointerId); if (!d) return;
    if (!d.ghost) {
      if (Math.hypot(e.clientX - d.x0, e.clientY - d.y0) < 7) return;
      const r = d.chip.getBoundingClientRect();
      d.ghost = d.chip.cloneNode(true); d.ghost.classList.add('ghost'); d.ghost.removeAttribute('id');
      d.ghost.style.width = r.width + 'px'; d.dx = e.clientX - r.left; d.dy = e.clientY - r.top;
      document.body.append(d.ghost); d.chip.classList.add('lifting');
    }
    e.preventDefault();
    d.ghost.style.transform = `translate(${e.clientX - d.dx}px, ${e.clientY - d.dy}px) rotate(-3deg)`;
    $$('[data-target].hover', root).forEach(x => x.classList.remove('hover'));
    nearest(e.clientX, e.clientY)?.classList.add('hover');
  };
  const onUp = e => {
    const d = drops.get(e.pointerId); if (!d) return;
    drops.delete(e.pointerId);
    $$('[data-target].hover', root).forEach(x => x.classList.remove('hover'));
    if (!d.ghost) return; // ha estat un toc: ho gestiona onClick
    d.ghost.remove(); d.chip.classList.remove('lifting');
    d.chip.dataset.dragged = '1'; setTimeout(() => delete d.chip.dataset.dragged, 0);
    const tg = nearest(e.clientX, e.clientY);
    if (tg) { select(null); onPlace(d.chip, tg); }
  };
  const onClick = e => {
    const chip = e.target.closest('[data-chip]');
    if (chip && root.contains(chip)) { if (chip.dataset.dragged) return; select(selected === chip ? null : chip); return; }
    let tg = e.target.closest('[data-target]');
    if (tg && root.contains(tg) && selected) {
      if (e.detail && tg.classList.contains('dot')) tg = nearest(e.clientX, e.clientY) || tg; // toc amb punter: el punt més proper
      const c = selected; select(null); onPlace(c, tg);
    }
  };
  root.addEventListener('pointerdown', onDown);
  addEventListener('pointermove', onMove, { passive: false });
  addEventListener('pointerup', onUp); addEventListener('pointercancel', onUp);
  root.addEventListener('click', onClick);
  return {
    select, get selected() { return selected; },
    destroy() {
      root.removeEventListener('pointerdown', onDown); root.removeEventListener('click', onClick);
      removeEventListener('pointermove', onMove); removeEventListener('pointerup', onUp); removeEventListener('pointercancel', onUp);
    },
  };
}

/** Punt de la làmina més proper al toc (els punts de estructures veïnes es poden solapar). */
export function nearestDot(root, e, sel = '.dot') {
  const hit = e.target.closest(sel);
  if (!hit || !e.detail) return hit;
  let best = hit, bd = Infinity;
  for (const d of $$(sel, root)) {
    const r = d.getBoundingClientRect(), dist = Math.hypot(r.left + r.width / 2 - e.clientX, r.top + r.height / 2 - e.clientY);
    if (dist < bd) { bd = dist; best = d; }
  }
  return best;
}

/** Fa parpellejar un element (pista de nivell 3). */
export function blink(el) {
  if (!el) return;
  el.classList.remove('blink'); void el.offsetWidth; el.classList.add('blink');
  setTimeout(() => el.classList.remove('blink'), 2600);
}
