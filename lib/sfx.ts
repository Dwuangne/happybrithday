"use client";

import { ASSETS } from "./assets";

function playClip(src: string, volume: number) {
  if (typeof window === "undefined") return;

  const audio = new Audio(src);
  audio.volume = Math.min(1, Math.max(0, volume));
  void audio.play().catch(() => {
    // Trình duyệt chặn autoplay — bỏ qua nếu chưa có tương tác
  });
}

/** Tiếng bấm nút */
export function playButtonTap() {
  playClip(ASSETS.soundClick, 0.75);
}

/** Tiếng pháo nổ nhẹ */
export function playFireworkPop(intensity = 1) {
  playClip(ASSETS.soundPhao, 0.4 * intensity);
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
  playClip(ASSETS.soundPhao, 0.55);
}
