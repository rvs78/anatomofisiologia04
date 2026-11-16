#!/bin/sh
# Renderitza el tutorial (ca i es) i genera els subtítols WebVTT i el pòster. Cal Chrome (BROWSER=/ruta/a/chrome si no és l'habitual).
set -e
cd "$(dirname "$0")"
OUT=../../assets/video
for L in ca es; do
  npx remotion render src/index.ts "Tutorial-$L" "$OUT/tutorial-$L.mp4" --codec h264 --crf 23 --x264-preset veryfast ${BROWSER:+--browser-executable "$BROWSER"}
  ffmpeg -y -loglevel error -i "$OUT/tutorial-$L.mp4" -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 -cpu-used 5 -an "$OUT/tutorial-$L.webm"
  ffmpeg -y -loglevel error -ss 1.8 -i "$OUT/tutorial-$L.mp4" -frames:v 1 -q:v 70 "$OUT/tutorial-$L.webp"
done
node vtt.mjs
