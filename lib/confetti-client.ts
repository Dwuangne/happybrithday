"use client";

import type { Options } from "canvas-confetti";

type ConfettiFn = (options?: Options) => void;

let confettiPromise: Promise<ConfettiFn> | null = null;

async function loadConfetti(): Promise<ConfettiFn> {
  if (!confettiPromise) {
    confettiPromise = import("canvas-confetti").then((mod) => {
      const fn = mod.default ?? (mod as unknown as ConfettiFn);
      if (typeof fn !== "function") {
        throw new Error("canvas-confetti failed to load");
      }
      return fn;
    });
  }
  return confettiPromise;
}

export async function fireConfetti(options?: Options) {
  const confetti = await loadConfetti();
  confetti(options);
}
