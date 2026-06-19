"use client";

import { useCallback, useRef } from "react";

export function useAudio(src: string = "/hbd.mp3") {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.loop = true;
    }
    try {
      await audioRef.current.play();
    } catch {
      // Autoplay blocked until user gesture — expected on some browsers
    }
  }, [src]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  return { play, pause };
}
