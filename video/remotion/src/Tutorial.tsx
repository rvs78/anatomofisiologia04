// Vídeo tutorial del sobre d'instruccions (Remotion). Sense veu: text en pantalla + franja de subtítols.
import React from 'react';
import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS as C, FPS, ORGAN, SCENES, T, type Lang } from './text';

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const io = (f: number, a: number, b: number, from = 0, to = 1) =>
  interpolate(f, [a, b], [from, to], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });
const display: React.CSSProperties = { fontFamily: 'BSD', fontWeight: 900, lineHeight: 1 };
const textF: React.CSSProperties = { fontFamily: 'AH', fontWeight: 700 };

const Fonts = () => (
  <style>{`@font-face{font-family:BSD;font-weight:900;src:url(${staticFile('big-shoulders-display-latin-900-normal.woff2')}) format('woff2');}
@font-face{font-family:AH;font-weight:700;src:url(${staticFile('atkinson-hyperlegible-latin-700-normal.woff2')}) format('woff2');}`}</style>
);
const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: `${C.page} radial-gradient(${C.dot} 1.6px, transparent 1.8px) 0 0 / 20px 20px` }}>{children}</AbsoluteFill>
);
const Subtitle: React.FC<{ text: string; dur: number }> = ({ text, dur }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: 'absolute', left: 140, right: 140, bottom: 34, padding: '14px 24px', borderRadius: 16, background: 'rgba(27,21,51,.92)', color: '#fff', textAlign: 'center', fontSize: 26, ...textF,
      opacity: Math.min(io(f, 4, 14), io(f, dur - 8, dur, 1, 0)), translate: `0px ${io(f, 4, 14, 14, 0)}px` }}>{text}</div>
  );
};

const Intro: React.FC<{ lang: Lang }> = ({ lang }) => {
  const f = useCurrentFrame(), t = T[lang];
  return (
    <AbsoluteFill style={{ background: C.cover, justifyContent: 'center', alignItems: 'center', gap: 18 }}>
      <div style={{ ...textF, color: '#c4bbef', fontSize: 30, opacity: io(f, 0, 12) }}>{t.title}</div>
      <div style={{ ...display, fontSize: 140, color: C.page, scale: io(f, 4, 22, 0.8, 1), opacity: io(f, 4, 18) }}>Sentits <span style={{ color: '#fff' }}>Clínic</span></div>
      <div style={{ display: 'flex', gap: 10 }}>
        {t.stations.map((s, i) => (
          <div key={s} style={{ ...display, fontSize: 30, padding: '8px 18px', borderRadius: 999, background: C.paper, color: C.ink, boxShadow: `inset 8px 0 0 ${C.st[i]}`,
            opacity: io(f, 16 + i * 4, 28 + i * 4), translate: `0px ${io(f, 16 + i * 4, 28 + i * 4, 30, 0)}px` }}>{s}</div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const MapScene: React.FC<{ lang: Lang }> = ({ lang }) => {
  const f = useCurrentFrame(), t = T[lang];
  return (
    <Page>
      <div style={{ position: 'absolute', left: 70, top: 46, ...display, fontSize: 64, color: C.ink }}>{lang === 'ca' ? 'Tria una estació' : 'Elige una estación'}</div>
      <div style={{ position: 'absolute', left: 70, right: 70, top: 140, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18 }}>
        {t.stations.map((s, i) => (
          <div key={s} style={{ borderRadius: 22, overflow: 'hidden', background: C.paper, boxShadow: '0 20px 30px -18px rgba(27,21,51,.6)',
            opacity: io(f, 6 + i * 6, 20 + i * 6), translate: `0px ${io(f, 6 + i * 6, 20 + i * 6, 60, 0)}px`, scale: i === 0 ? io(f, 100, 120, 1, 1.06) : 1 }}>
            <Img src={staticFile(`${ORGAN[i]}.webp`)} style={{ width: '100%', height: 180, objectFit: 'cover', background: '#fff' }} />
            <div style={{ padding: '14px 16px 18px', ...display, fontSize: 38, color: C.st[i] }}>{s}</div>
          </div>
        ))}
      </div>
    </Page>
  );
};

const Levels: React.FC<{ lang: Lang }> = ({ lang }) => {
  const f = useCurrentFrame(), t = T[lang];
  return (
    <Page>
      <div style={{ position: 'absolute', left: 90, right: 90, top: 90, display: 'grid', gap: 18 }}>
        {t.levels.map(([n, d], i) => {
          const on = io(f, 10 + i * 30, 24 + i * 30);
          return (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '16px 24px', borderRadius: 22, background: C.paper, opacity: 0.35 + 0.65 * on, translate: `${(1 - on) * -40}px 0px` }}>
              <div style={{ width: 64, height: 64, borderRadius: 32, display: 'grid', placeItems: 'center', background: C.st[0], color: '#fff', ...display, fontSize: 38 }}>{i + 1}</div>
              <div style={{ ...display, fontSize: 52, color: C.st[0], width: 300 }}>{n}</div>
              <div style={{ ...textF, fontSize: 30, color: C.ink }}>{d}</div>
            </div>
          );
        })}
      </div>
    </Page>
  );
};

const Drag: React.FC<{ lang: Lang }> = ({ lang }) => {
  const f = useCurrentFrame(), t = T[lang];
  // plate 640×480 a (90, 90); cristal·lí a (404, 326) del dibuix 1000×750 (viewBox −25)
  const px = 90 + (404 / 1000) * 640, py = 90 + ((326 + 25) / 750) * 480;
  const start = { x: 940, y: 200 }, p = io(f, 40, 95);
  const x = start.x + (px - start.x) * p, y = start.y + (py - start.y) * p;
  const placed = f > 100;
  return (
    <Page>
      <div style={{ position: 'absolute', left: 74, top: 74, width: 672, height: 512, borderRadius: 24, background: '#fff', boxShadow: '0 20px 30px -18px rgba(27,21,51,.6)' }} />
      <Img src={staticFile('ull.webp')} style={{ position: 'absolute', left: 90, top: 90, width: 640, height: 480 }} />
      <div style={{ position: 'absolute', left: px - 16, top: py - 16, width: 32, height: 32, borderRadius: 16, background: placed ? C.st[0] : C.ink, boxShadow: '0 0 0 4px #fff', scale: placed ? io(f, 100, 112, 1.6, 1) : 1 }} />
      <div style={{ position: 'absolute', left: 830, top: 120, width: 360, ...display, fontSize: 40, color: C.ink }}>{lang === 'ca' ? 'Nivell 2 · Localitza' : 'Nivel 2 · Localiza'}</div>
      {!placed && (
        <div style={{ position: 'absolute', left: x - 20, top: y - 28, padding: '12px 20px 12px 26px', borderRadius: 12, background: p > 0 ? C.foil : '#fff', ...textF, fontSize: 28, color: C.ink,
          boxShadow: `inset 9px 0 0 ${C.st[0]}, 0 16px 24px -12px rgba(0,0,0,.5)`, rotate: `${p > 0 && p < 1 ? -3 : 0}deg` }}>{t.chip}</div>
      )}
      {placed && (
        <>
          <div style={{ position: 'absolute', left: 830, top: 200, width: 360, padding: 18, borderRadius: 16, background: '#d8f3e5', color: '#0b5a34', ...textF, fontSize: 28, opacity: io(f, 102, 114) }}>
            ✓ {t.chip} → {t.target}
          </div>
          <div style={{ position: 'absolute', left: px + 20, top: py - 70 - io(f, 100, 140, 0, 40), ...display, fontSize: 56, color: C.ok, opacity: io(f, 100, 140, 1, 0) }}>+10</div>
        </>
      )}
    </Page>
  );
};

const Help: React.FC<{ lang: Lang }> = ({ lang }) => {
  const f = useCurrentFrame(), t = T[lang];
  return (
    <Page>
      <div style={{ position: 'absolute', left: 90, top: 100, display: 'flex', gap: 16 }}>
        {t.help.map((h, i) => (
          <div key={h} style={{ padding: '14px 26px', borderRadius: 16, background: i === 0 ? C.foil : C.paper, ...display, fontSize: 44, color: C.ink, opacity: io(f, 6 + i * 8, 18 + i * 8), scale: io(f, 6 + i * 8, 18 + i * 8, 0.8, 1) }}>{h}</div>
        ))}
      </div>
      <div style={{ position: 'absolute', left: 90, right: 90, top: 250, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {t.score.map(([k, v], i) => (
          <div key={k} style={{ padding: '22px 20px', borderRadius: 22, background: C.cover, color: '#fff', opacity: io(f, 40 + i * 8, 54 + i * 8), translate: `0px ${io(f, 40 + i * 8, 54 + i * 8, 30, 0)}px` }}>
            <div style={{ ...textF, fontSize: 24, color: '#c4bbef' }}>{k}</div>
            <div style={{ ...display, fontSize: 88, color: v.startsWith('+') ? C.foil : '#ff9aac' }}>{v}</div>
          </div>
        ))}
      </div>
    </Page>
  );
};

const Case: React.FC<{ lang: Lang }> = ({ lang }) => {
  const f = useCurrentFrame(), t = T[lang];
  return (
    <Page>
      <Img src={staticFile('farmacia.webp')} style={{ position: 'absolute', left: 80, top: 80, width: 690, height: 460, objectFit: 'cover', borderRadius: 24, opacity: io(f, 0, 14), scale: io(f, 0, 160, 1.04, 1) }} />
      <div style={{ position: 'absolute', left: 820, top: 110, width: 380, ...display, fontSize: 64, color: C.farm, opacity: io(f, 10, 24) }}>{t.caseT}</div>
      <div style={{ position: 'absolute', left: 820, top: 220, width: 380, padding: 22, borderRadius: 20, background: C.cover, color: C.foil, ...display, fontSize: 44, opacity: io(f, 50, 66), translate: `0px ${io(f, 50, 66, 30, 0)}px` }}>{t.report}</div>
    </Page>
  );
};

const PARTS: Record<string, React.FC<{ lang: Lang }>> = { intro: Intro, map: MapScene, levels: Levels, drag: Drag, help: Help, case: Case };

export const Tutorial: React.FC<{ lang: Lang }> = ({ lang }) => {
  let from = 0;
  return (
    <AbsoluteFill style={{ background: C.cover }}>
      <Fonts />
      {SCENES.map(s => {
        const Part = PARTS[s.id], dur = s.sec * FPS, at = from;
        from += dur;
        return (
          <Sequence key={s.id} name={s.id} from={at} durationInFrames={dur}>
            <Part lang={lang} />
            <Subtitle text={T[lang].sub[s.id]} dur={dur} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
