// Genera les imatges d'assets/img/prompts.json amb Seedream (OpenRouter /api/v1/images).
// Ús: OPENROUTER_API_KEY=... node scripts/gen-images.mjs [id ...]   (sense ids: només les que falten)
// La clau es llegeix de l'entorn o de .env; mai es desa al repositori.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
const root = new URL('..', import.meta.url).pathname;
if (!process.env.OPENROUTER_API_KEY && existsSync(root + '.env'))
  for (const l of readFileSync(root + '.env', 'utf8').split('\n')) { const m = l.match(/^(\w+)=(.*)$/); if (m) process.env[m[1]] ??= m[2]; }
const KEY = process.env.OPENROUTER_API_KEY;
if (!KEY) { console.error('Falta OPENROUTER_API_KEY'); process.exit(1); }
const P = JSON.parse(readFileSync(root + 'assets/img/prompts.json', 'utf8'));
const cache = root + 'scripts/.cache/'; mkdirSync(cache, { recursive: true });
const want = process.argv.slice(2);
const todo = P.images.filter(im => want.length ? want.includes(im.id) : !existsSync(root + `assets/img/${im.id}.webp`) && !existsSync(cache + im.id + '.png'));
async function gen(im) {
  const prompt = im.noprefix ? im.prompt : `${P.prefix} ${im.prompt}`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const r = await fetch('https://openrouter.ai/api/v1/images', {
        method: 'POST', headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: P.model, prompt, size: im.size || '1024x1024' }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(JSON.stringify(j).slice(0, 300));
      writeFileSync(cache + im.id + '.png', Buffer.from(j.data[0].b64_json, 'base64'));
      console.log('ok', im.id, j.usage?.cost ?? '');
      return;
    } catch (e) { console.error('error', im.id, attempt, e.message); }
  }
}
const N = 4;
for (let i = 0; i < todo.length; i += N) await Promise.all(todo.slice(i, i + N).map(gen));
console.log(`fet: ${todo.length} imatges → scripts/.cache (passa després scripts/optimize-images.py)`);
