"""PNG de scripts/.cache → WebP a assets/img (màx. 1600 px) i manifest.json amb alt ca/es."""
import json, pathlib, datetime
from PIL import Image
root = pathlib.Path(__file__).resolve().parent.parent
P = json.loads((root / 'assets/img/prompts.json').read_text())
man_path = root / 'assets/img/manifest.json'
man = json.loads(man_path.read_text()) if man_path.exists() else {}
for im in P['images']:
    src = root / 'scripts/.cache' / f"{im['id']}.png"
    out = root / 'assets/img' / f"{im['id']}.webp"
    if src.exists():
        img = Image.open(src).convert('RGB'); img.thumbnail((1600, 1600))
        img.save(out, 'WEBP', quality=80, method=6)
        prev = man.get(im['id'], {})
        man[im['id']] = {'file': out.name, 'w': img.width, 'h': img.height, 'model': P['model'], 'prompt': im['prompt'],
                         'date': datetime.date.today().isoformat(), 'alt': im['alt'],
                         'reviewed': prev.get('reviewed', 'pendent')}
        print(im['id'], img.size, out.stat().st_size // 1024, 'kB')
man_path.write_text(json.dumps(man, ensure_ascii=False, indent=1))
