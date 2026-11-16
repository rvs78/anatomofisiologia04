// Subtítols WebVTT del tutorial a partir dels mateixos textos (Node ≥ 22.18 llegeix .ts directament).
import { writeFileSync } from 'node:fs';
import { SCENES, T } from './src/text.ts';
const ts = s => `00:${String(Math.floor(s / 60)).padStart(2, '0')}:${(s % 60).toFixed(3).padStart(6, '0')}`;
for (const lang of ['ca', 'es']) {
  let at = 0; const cues = [];
  for (const s of SCENES) { cues.push(`${ts(at + 0.2)} --> ${ts(at + s.sec - 0.3)}\n${T[lang].sub[s.id]}`); at += s.sec; }
  writeFileSync(`../../assets/video/tutorial-${lang}.vtt`, `WEBVTT\n\n${cues.join('\n\n')}\n`);
}
console.log('vtt ok');
