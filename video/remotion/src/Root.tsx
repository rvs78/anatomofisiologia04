import React from 'react';
import { Composition } from 'remotion';
import { Tutorial } from './Tutorial';
import { FPS, TOTAL } from './text';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Tutorial-ca" component={Tutorial} width={1280} height={720} fps={FPS} durationInFrames={TOTAL} defaultProps={{ lang: 'ca' as const }} />
    <Composition id="Tutorial-es" component={Tutorial} width={1280} height={720} fps={FPS} durationInFrames={TOTAL} defaultProps={{ lang: 'es' as const }} />
  </>
);
