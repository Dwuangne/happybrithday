export interface ViewportSize {
  width: number;
  height: number;
}

export function getViewportFlags(width: number) {
  return {
    isSmall: width < 400,
    isMobile: width < 640,
    isTablet: width < 1024,
  };
}
