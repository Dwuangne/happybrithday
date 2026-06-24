"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { birthdayConfig } from "@/lib/birthday-config";

interface PhotoBackgroundProps {
  active: boolean;
  dimForStory: boolean;
}

function preloadPhoto(src: string, cache: Set<string>): Promise<void> {
  if (cache.has(src)) return Promise.resolve();

  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => {
      cache.add(src);
      resolve();
    };
    img.onerror = () => resolve();
    img.src = src;
  });
}

function preloadAllPhotos(urls: readonly string[], cache: Set<string>) {
  return Promise.all(urls.map((src) => preloadPhoto(src, cache)));
}

export function PhotoBackground({ active, dimForStory }: PhotoBackgroundProps) {
  const photos = birthdayConfig.decoratePhotos;
  const settings = birthdayConfig.photoMontage;

  const loadedRef = useRef<Set<string>>(new Set());
  const indexRef = useRef(0);
  const topSlotRef = useRef<0 | 1>(0);
  const advancingRef = useRef(false);

  const [topSlot, setTopSlot] = useState<0 | 1>(0);
  const [slotSrc, setSlotSrc] = useState<[string, string]>([photos[0], photos[1]]);

  const reset = useCallback(() => {
    indexRef.current = 0;
    topSlotRef.current = 0;
    advancingRef.current = false;
    setTopSlot(0);
    setSlotSrc([photos[0], photos[1]]);
    loadedRef.current.clear();
  }, [photos]);

  useEffect(() => {
    if (!active) {
      reset();
      return;
    }

    reset();
    void preloadAllPhotos(photos, loadedRef.current);
  }, [active, photos, reset]);

  useEffect(() => {
    if (!active) return;

    const advance = async () => {
      if (advancingRef.current) return;
      advancingRef.current = true;

      try {
        const nextIndex = (indexRef.current + 1) % photos.length;
        const nextSrc = photos[nextIndex];
        const hiddenSlot: 0 | 1 = topSlotRef.current === 0 ? 1 : 0;

        await preloadPhoto(nextSrc, loadedRef.current);

        setSlotSrc((prev) => {
          const next = [...prev] as [string, string];
          next[hiddenSlot] = nextSrc;
          return next;
        });

        topSlotRef.current = hiddenSlot;
        indexRef.current = nextIndex;
        setTopSlot(hiddenSlot);
      } finally {
        advancingRef.current = false;
      }
    };

    const timer = setInterval(() => {
      void advance();
    }, settings.ambientSlideMs);

    return () => clearInterval(timer);
  }, [active, photos, settings.ambientSlideMs]);

  if (!active) return null;

  const opacity = dimForStory ? settings.ambientOpacityStory : settings.ambientOpacity;
  const crossfade = settings.crossfadeMs / 1000;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {([0, 1] as const).map((slot) => (
        <motion.div
          key={slot}
          className="absolute inset-0"
          animate={{ opacity: topSlot === slot ? opacity : 0 }}
          transition={{ duration: crossfade, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ scale: settings.ambientScale }}
            transition={{
              duration: settings.ambientSlideMs / 1000,
              ease: "linear",
            }}
          >
            <Image
              src={slotSrc[slot]}
              alt=""
              fill
              unoptimized
              className="object-cover object-center"
              style={{
                filter:
                  settings.ambientBlurPx > 0 ? `blur(${settings.ambientBlurPx}px)` : undefined,
              }}
              sizes="100vw"
              priority={slot === 0}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
