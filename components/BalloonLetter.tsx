"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getBalloonImage } from "@/lib/assets";
import { getFloatKeyframes } from "@/lib/balloon-float";

interface BalloonLetterProps {
  index: number;
  floating: boolean;
  popping: boolean;
  scale: number;
  viewport: { width: number; height: number };
  decorative?: boolean;
}

interface FrozenPosition {
  left: number;
  top: number;
  scale: number;
}

const BURST_COLORS = ["#F2B300", "#D14D39", "#8377E4", "#FF6B9D", "#20CFB4", "#8FAD00"];

function PopBurst({ index }: { index: number }) {
  return (
    <>
      {BURST_COLORS.map((color, i) => {
        const angle = (i / BURST_COLORS.length) * Math.PI * 2 + index * 0.4;
        const dist = 28 + (i % 3) * 10;

        return (
          <motion.span
            key={i}
            className="absolute left-1/2 top-[45%] h-2 w-2 rounded-full"
            style={{ backgroundColor: color }}
            initial={{ x: "-50%", y: "-50%", opacity: 1, scale: 1 }}
            animate={{
              x: `calc(-50% + ${Math.cos(angle) * dist}px)`,
              y: `calc(-50% + ${Math.sin(angle) * dist}px)`,
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        );
      })}
    </>
  );
}

export function BalloonLetter({
  index,
  floating,
  popping,
  scale,
  viewport,
  decorative = false,
}: BalloonLetterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"float" | "pop" | "gone">("float");
  const [frozen, setFrozen] = useState<FrozenPosition | null>(null);

  const swayClass = index % 2 === 0 ? "animate-balloon-sway-1" : "animate-balloon-sway-2";
  const floatKeyframes = getFloatKeyframes(index, viewport);
  const baseScale = decorative ? scale * 0.95 : scale;
  const twist = index % 2 === 0 ? 22 : -22;

  const visible = floating || popping;

  useLayoutEffect(() => {
    if (!popping || phase !== "float" || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    setFrozen({
      left: rect.left,
      top: rect.top,
      scale: baseScale,
    });
    setPhase("pop");
  }, [popping, phase, baseScale]);

  useEffect(() => {
    if (!popping) {
      setPhase("float");
      setFrozen(null);
    }
  }, [popping]);

  if (!visible || phase === "gone") return null;

  if (phase === "pop" && frozen) {
    return (
      <motion.div
        className="pointer-events-none fixed z-[99]"
        style={{
          left: frozen.left,
          top: frozen.top,
          transformOrigin: "50% 45%",
        }}
        initial={{ scale: frozen.scale, opacity: 1, rotate: 0 }}
        animate={{
          scale: [frozen.scale, frozen.scale * 1.55, 0],
          opacity: [1, 1, 0],
          rotate: [0, twist, twist * 1.4],
        }}
        transition={{
          duration: 0.32,
          delay: index * 0.02,
          ease: [0.2, 0.9, 0.3, 1],
          times: [0, 0.35, 1],
        }}
        onAnimationComplete={() => setPhase("gone")}
      >
        <PopBurst index={index} />
        <div className="relative h-[clamp(90px,24vw,183px)] w-[clamp(50px,13vw,100px)]">
          <Image
            src={getBalloonImage(index)}
            alt=""
            width={100}
            height={183}
            className="h-full w-full object-contain"
            sizes="(max-width: 640px) 13vw, 100px"
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`fixed z-[99] origin-center ${floating && !popping ? swayClass : ""}`}
      initial={false}
      animate={{
        left: [floatKeyframes.initialLeft, ...floatKeyframes.left.slice(1)],
        top: floatKeyframes.top,
        scale: baseScale,
        opacity: 0.65,
      }}
      transition={{ duration: 12 + index * 2.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative h-[clamp(90px,24vw,183px)] w-[clamp(50px,13vw,100px)]">
        <Image
          src={getBalloonImage(index)}
          alt=""
          width={100}
          height={183}
          className="h-full w-full object-contain"
          sizes="(max-width: 640px) 13vw, 100px"
        />
      </div>
    </motion.div>
  );
}
