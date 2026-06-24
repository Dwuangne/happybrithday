"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/lib/birthday-config";

interface PhotoBackgroundProps {
  active: boolean;
  dimForStory: boolean;
}

function preloadPhotos(urls: string[], count: number) {
  urls.slice(0, count).forEach((src) => {
    const img = new window.Image();
    img.src = src;
  });
}

export function PhotoBackground({ active, dimForStory }: PhotoBackgroundProps) {
  const photos = birthdayConfig.decoratePhotos;
  const settings = birthdayConfig.photoMontage;

  const [index, setIndex] = useState(0);

  const currentSrc = photos[index % photos.length] ?? photos[0];

  const reset = useCallback(() => {
    setIndex(0);
  }, []);

  useEffect(() => {
    if (!active) {
      reset();
      return;
    }

    reset();
    preloadPhotos([...photos], 3);
  }, [active, photos, reset]);

  useEffect(() => {
    if (!active) return;

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, settings.ambientSlideMs);

    return () => clearInterval(timer);
  }, [active, photos.length, settings.ambientSlideMs]);

  if (!active) return null;

  const opacity = dimForStory ? settings.ambientOpacityStory : settings.ambientOpacity;
  const crossfade = settings.crossfadeMs / 1000;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${currentSrc}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity }}
          exit={{ opacity: 0 }}
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
              src={currentSrc}
              alt=""
              fill
              className="object-cover object-center"
              style={{
                filter: settings.ambientBlurPx > 0 ? `blur(${settings.ambientBlurPx}px)` : undefined,
              }}
              sizes="100vw"
              priority={index === 0}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
