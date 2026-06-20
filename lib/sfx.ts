"use client";

import { ASSETS } from "./assets";

const CLICK_POOL_SIZE = 4;
const PHAO_POOL_SIZE = 3;

let clickPool: HTMLAudioElement[] = [];
let phaoPool: HTMLAudioElement[] = [];
let warmedUp = false;

function createPool(src: string, size: number): HTMLAudioElement[] {
  return Array.from({ length: size }, () => {
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.load();
    return audio;
  });
}

function playFromPool(pool: HTMLAudioElement[], volume: number) {
  const audio = pool.find((item) => item.paused || item.ended) ?? pool[0];
  if (!audio) return;

  audio.volume = Math.min(1, Math.max(0, volume));
  audio.currentTime = 0;
  void audio.play().catch(() => {});
}

/** Gọi sớm để tránh delay lần bấm đầu */
export function warmupSfx() {
  if (typeof window === "undefined" || warmedUp) return;

  clickPool = createPool(ASSETS.soundClick, CLICK_POOL_SIZE);
  phaoPool = createPool(ASSETS.soundPhao, PHAO_POOL_SIZE);
  warmedUp = true;
}

function ensurePools() {
  if (!warmedUp) warmupSfx();
}

/** Tiếng bấm nút — phát ngay từ pool đã preload */
export function playButtonTap() {
  ensurePools();
  playFromPool(clickPool, 0.75);
}

/** Tiếng pháo nổ nhẹ */
export function playFireworkPop(intensity = 1) {
  ensurePools();
  playFromPool(phaoPool, 0.4 * intensity);
}

/** Chuỗi pháo khi chúc mừng */
export function playWishCelebration() {
  playFireworkPop(1);
  setTimeout(() => playFireworkPop(0.85), 200);
  setTimeout(() => playFireworkPop(0.7), 450);
  setTimeout(() => playFireworkPop(0.9), 900);
}

/** Âm kết khi hết lời nhắn */
export function playEndingChime() {
  ensurePools();
  playFromPool(phaoPool, 0.55);
}
