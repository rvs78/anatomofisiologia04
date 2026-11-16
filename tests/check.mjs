// Comprovacions de Sentits Clínic. Fase 0: només verifica que l'especificació hi és.
import { existsSync } from 'node:fs';
const req = ['PRODUCT.md','DESIGN.md','specs/001-patologies-sentits/spec.md',
  'specs/001-patologies-sentits/plan.md','specs/001-patologies-sentits/tasks.md',
  'specs/001-patologies-sentits/content-map.md'];
const missing = req.filter(f => !existsSync(f));
if (missing.length) { console.error('Falten:', missing); process.exit(1); }
console.log(`OK · ${req.length} fitxers d'especificació`);
