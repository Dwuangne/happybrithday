import type { ViewportSize } from "./viewport";
import { getViewportFlags } from "./viewport";

export interface SceneZones {
  bulbHeight: number;
  bannerHeight: number;
  balloonRowY: number;
  balloonRowY2: number;
  cakeMaxWidth: number;
  messageMarginTop: string;
}

export function getSceneZones({ width, height }: ViewportSize): SceneZones {
  const { isSmall, isMobile } = getViewportFlags(width);

  const bulbHeight = isSmall ? 56 : isMobile ? 68 : 76;
  const bannerHeight = isSmall ? 88 : isMobile ? 108 : 128;
  const topOffset = isSmall ? 44 : 52;

  const balloonRowY = topOffset + bulbHeight + (isMobile ? 4 : 8);
  const balloonRowY2 = balloonRowY + (isSmall ? 76 : 90);

  const cakeMaxWidth = isSmall ? 200 : isMobile ? 220 : 260;

  return {
    bulbHeight,
    bannerHeight,
    balloonRowY: Math.min(balloonRowY, height * 0.22),
    balloonRowY2: Math.min(balloonRowY2, height * 0.34),
    cakeMaxWidth,
    messageMarginTop: isSmall ? "clamp(1rem, 4vh, 2rem)" : "clamp(1.5rem, 8vh, 3rem)",
  };
}
