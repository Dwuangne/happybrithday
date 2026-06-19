"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  getBalloonLettersFromConfig,
  getExtraBalloonCount,
} from "@/lib/birthday-config";
import { ASSETS } from "@/lib/assets";
import { launchWishFireworks } from "@/lib/celebration";
import { useViewport } from "@/hooks/useViewport";
import { BalloonLetter } from "./BalloonLetter";

interface BalloonFieldProps {
  floating: boolean;
  popping: boolean;
  borderRisen: boolean;
  onPopComplete?: () => void;
}

export function BalloonField({
  floating,
  popping,
  borderRisen,
  onPopComplete,
}: BalloonFieldProps) {
  const balloonLetters = getBalloonLettersFromConfig();
  const viewport = useViewport();
  const nameCount = balloonLetters.length;
  const extraCount =
    (floating && !popping) || popping ? getExtraBalloonCount() : 0;
  const firedRef = useRef(false);

  useEffect(() => {
    if (!popping || firedRef.current) return;
    firedRef.current = true;
    void launchWishFireworks();
    const timer = setTimeout(() => {
      onPopComplete?.();
    }, 1400);
    return () => clearTimeout(timer);
  }, [popping, onPopComplete]);

  useEffect(() => {
    if (!popping) {
      firedRef.current = false;
    }
  }, [popping]);

  if (!floating && !popping && !borderRisen) return null;

  return (
    <>
      {(floating || borderRisen) && !popping && (
        <motion.div
          className="pointer-events-none fixed bottom-0 left-0 right-0 z-[9999] max-h-[40vh] sm:max-h-none"
          initial={false}
          animate={{
            y: borderRisen ? "-100vh" : 0,
            opacity: borderRisen ? 0.8 : floating ? 0.65 : 0.5,
          }}
          transition={{
            y: { duration: 8, ease: "easeInOut" },
            opacity: { duration: 0.8 },
          }}
        >
          <Image
            src={ASSETS.balloonBorder}
            alt=""
            width={1920}
            height={300}
            className="h-auto w-full object-cover object-bottom"
            sizes="100vw"
          />
        </motion.div>
      )}

      {balloonLetters.map((letter, i) => (
        <BalloonLetter
          key={`name-${letter}-${i}`}
          index={i}
          floating={floating && !popping}
          popping={popping}
          scale={0.55}
          viewport={viewport}
        />
      ))}

      {Array.from({ length: extraCount }).map((_, i) => {
        const index = nameCount + i;

        return (
          <BalloonLetter
            key={`extra-${i}`}
            index={index}
            floating={floating && !popping}
            popping={popping}
            scale={0.34 + (i % 4) * 0.06}
            viewport={viewport}
            decorative
          />
        );
      })}
    </>
  );
}
