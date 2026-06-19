import { getSceneZones } from "./scene-layout";
import type { ViewportSize } from "./viewport";
import { getViewportFlags } from "./viewport";

const FRAME_COUNT = 6;

function spreadUnit(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export function getFloatKeyframes(index: number, viewport: ViewportSize) {
  const { width, height } = viewport;
  const { isSmall, isMobile } = getViewportFlags(width);
  const zones = getSceneZones(viewport);
  const w = Math.max(width, 320);

  const marginX = isSmall ? 2 : isMobile ? 3 : 5;

  const left = Array.from({ length: FRAME_COUNT }, (_, frame) => {
    const t = spreadUnit(index * 17 + frame * 11 + 3);
    const percent = marginX + t * (100 - marginX * 2);
    return Math.round((percent / 100) * w);
  });

  const topMin = zones.bulbHeight + (isSmall ? 12 : isMobile ? 16 : 20);
  const topMax =
    zones.bulbHeight +
    zones.bannerHeight +
    (isSmall ? 32 : isMobile ? 48 : 56);
  const span = Math.max(topMax - topMin, height * 0.12);

  const tops = Array.from({ length: FRAME_COUNT }, (_, frame) => {
    const t = spreadUnit(index * 23 + frame * 7 + 9);
    return Math.round(topMin + t * span);
  });

  return {
    initialLeft: left[0],
    left,
    top: [height + 80, ...tops],
  };
}
