export type Step =
  | "loading"
  | "lights"
  | "music"
  | "decorate"
  | "balloons"
  | "cake"
  | "candle"
  | "wish"
  | "story"
  | "done";

export const STEP_ORDER: Step[] = [
  "loading",
  "lights",
  "music",
  "decorate",
  "balloons",
  "cake",
  "candle",
  "wish",
  "story",
  "done",
];

/** Delays (ms) after user clicks before next button appears — matches original effect.js */
export const STEP_DELAYS: Partial<Record<Step, number>> = {
  lights: 5000,
  music: 6000,
  decorate: 6000,
  balloons: 5000,
  cake: 3000,
  wish: 3000,
};

export const INTERACTIVE_STEPS: Step[] = [
  "lights",
  "music",
  "decorate",
  "balloons",
  "cake",
  "candle",
  "wish",
  "story",
];

export function getStepIndex(step: Step): number {
  return STEP_ORDER.indexOf(step);
}

export function getNextStep(step: Step): Step | null {
  const idx = getStepIndex(step);
  if (idx < 0 || idx >= STEP_ORDER.length - 1) return null;
  return STEP_ORDER[idx + 1];
}
