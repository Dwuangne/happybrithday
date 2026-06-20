"use client";

import { motion } from "framer-motion";
import {
  Cake,
  Lightbulb,
  MessageCircle,
  Music,
  PartyPopper,
  Sparkles,
  Flame,
  Heart,
  type LucideIcon,
} from "lucide-react";
import type { Step } from "@/lib/steps";
import { birthdayConfig } from "@/lib/birthday-config";

const STEP_ICONS: Partial<Record<Step, LucideIcon>> = {
  lights: Lightbulb,
  music: Music,
  decorate: Sparkles,
  balloons: PartyPopper,
  cake: Cake,
  candle: Flame,
  wish: Heart,
  story: MessageCircle,
};

interface ActionButtonProps {
  step: Step;
  onClick: () => void;
  onTapSound: () => void;
}

export function ActionButton({ step, onClick, onTapSound }: ActionButtonProps) {
  const buttons = birthdayConfig.buttons;
  const labelMap: Partial<Record<Step, string>> = {
    lights: buttons.lights,
    music: buttons.music,
    decorate: buttons.decorate,
    balloons: buttons.balloons,
    cake: buttons.cake,
    candle: buttons.candle,
    wish: buttons.wish,
    story: buttons.story,
  };

  const label = labelMap[step];
  if (!label) return null;

  const Icon = STEP_ICONS[step] ?? Sparkles;

  return (
    <motion.button
      type="button"
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        onTapSound();
      }}
      onClick={onClick}
      className="group relative flex w-full max-w-md touch-manipulation items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/30 bg-white/10 px-4 py-3.5 text-base font-semibold text-white shadow-xl backdrop-blur-md transition-all active:scale-[0.98] sm:gap-3 sm:rounded-2xl sm:px-8 sm:py-4 sm:text-lg sm:hover:bg-white/20"
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12, scale: 0.96 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-active:translate-x-full sm:group-hover:translate-x-full" />
      <Icon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
      <span className="text-center leading-tight">{label}</span>
    </motion.button>
  );
}
