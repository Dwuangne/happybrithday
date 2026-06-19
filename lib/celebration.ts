"use client";

import { fireConfetti } from "./confetti-client";
import { playWishCelebration } from "./sfx";

const COLORS = ["#F2B300", "#D14D39", "#8377E4", "#20CFB4", "#FF6B9D", "#8FAD00"];

export async function launchWishFireworks() {
  playWishCelebration();

  const duration = 2800;
  const end = Date.now() + duration;

  await fireConfetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.55, x: 0.5 },
    colors: COLORS,
  });

  const frame = () => {
    void fireConfetti({
      particleCount: 4,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.65 },
      colors: COLORS,
    });
    void fireConfetti({
      particleCount: 4,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.65 },
      colors: COLORS,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();

  setTimeout(() => {
    void fireConfetti({
      particleCount: 80,
      spread: 120,
      startVelocity: 35,
      origin: { y: 0.4, x: 0.3 },
      colors: COLORS,
    });
    void fireConfetti({
      particleCount: 80,
      spread: 120,
      startVelocity: 35,
      origin: { y: 0.4, x: 0.7 },
      colors: COLORS,
    });
  }, 400);

  setTimeout(() => {
    void fireConfetti({
      particleCount: 100,
      spread: 160,
      ticks: 80,
      origin: { y: 0.35, x: 0.5 },
      colors: COLORS,
    });
  }, 900);
}
