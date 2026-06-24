"use client";

import { useEffect, useState } from "react";
import { fireConfetti } from "@/lib/confetti-client";
import { playEndingChime } from "@/lib/sfx";
import { birthdayConfig, formatMessageLine } from "@/lib/birthday-config";

interface MessageStoryProps {
  active: boolean;
  onComplete: () => void;
  marginTop?: string;
}

export function MessageStory({ active, onComplete, marginTop }: MessageStoryProps) {
  const lines = birthdayConfig.messageLines.map((line) =>
    formatMessageLine(line, birthdayConfig.recipientName)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;

    setCurrentIndex(0);
    setVisible(true);

    let i = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const showNext = () => {
      if (i >= lines.length - 1) {
        playEndingChime();
        void fireConfetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
        timeoutId = setTimeout(() => {
          onComplete();
        }, 2000);
        return;
      }

      setVisible(false);
      timeoutId = setTimeout(() => {
        i += 1;
        setCurrentIndex(i);
        setVisible(true);
        timeoutId = setTimeout(showNext, 1800);
      }, 800);
    };

    timeoutId = setTimeout(showNext, 1000);

    return () => clearTimeout(timeoutId);
  }, [active, lines.length, onComplete]);

  if (!active) return null;

  const isLast = currentIndex === lines.length - 1;

  return (
    <div
      className="flex w-full shrink-0 items-center justify-center px-4 py-4 sm:px-6 sm:py-6"
      style={{ marginTop: marginTop ?? "clamp(1.5rem, 8vh, 3rem)" }}
    >
      <p
        className={`font-message max-w-2xl text-center leading-relaxed tracking-wide text-rose-700 transition-all duration-500 [text-shadow:0_1px_8px_rgba(255,255,255,0.9),0_0_24px_rgba(255,255,255,0.6)] ${
          isLast
            ? "text-xl font-bold sm:text-3xl"
            : "text-base font-medium sm:text-xl"
        } ${visible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
      >
        {lines[currentIndex]}
      </p>
    </div>
  );
}
