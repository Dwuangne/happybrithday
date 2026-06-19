import { getSceneZones } from "./scene-layout";
import type { ViewportSize } from "./viewport";
import { getViewportFlags } from "./viewport";

export type { ViewportSize };

export interface BalloonLayout {
  alignPercent: number;
  alignY: number;
  scale: number;
}

export function getBalloonLayout(
  index: number,
  count: number,
  viewport: ViewportSize
): BalloonLayout {
  const { width, height } = viewport;
  const { isSmall, isMobile } = getViewportFlags(width);
  const zones = getSceneZones(viewport);

  if (isMobile && count >= 5) {
    const perRow = Math.ceil(count / 2);
    const row = index < perRow ? 0 : 1;
    const col = index < perRow ? index : index - perRow;
    const colsInRow = row === 0 ? perRow : count - perRow;
    const alignPercent =
      colsInRow <= 1 ? 50 : 10 + (col / (colsInRow - 1)) * 80;
    const alignY = row === 0 ? zones.balloonRowY : zones.balloonRowY2;

    return {
      alignPercent,
      alignY,
      scale: isSmall ? 0.46 : 0.54,
    };
  }

  const alignPercent = count <= 1 ? 50 : 8 + (index / (count - 1)) * 84;
  const alignY = zones.balloonRowY + (isMobile ? 10 : 20);

  return {
    alignPercent,
    alignY: Math.min(alignY, height * 0.28),
    scale: isSmall ? 0.5 : isMobile ? 0.62 : 0.78,
  };
}
