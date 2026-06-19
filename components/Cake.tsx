"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ASSETS } from "@/lib/assets";

interface CakeProps {
  visible: boolean;
  candleLit: boolean;
  maxWidth?: number;
}

export function Cake({ visible, candleLit, maxWidth = 260 }: CakeProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="relative flex w-full justify-center px-2 py-3 sm:py-4"
          initial={{ opacity: 0, scale: 0.6, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative" style={{ maxWidth, width: "100%" }}>
            <Image
              src={ASSETS.cake}
              alt="Bánh sinh nhật"
              width={480}
              height={480}
              className={`h-auto w-full rounded-lg object-contain transition-all duration-1000 ${
                candleLit
                  ? "brightness-110 drop-shadow-[0_0_30px_rgba(255,180,80,0.6)]"
                  : "brightness-[0.55] saturate-50"
              }`}
              priority
              sizes="(max-width: 640px) 65vw, 260px"
            />
            {candleLit && (
              <div
                className="pointer-events-none absolute inset-0 animate-pulse rounded-lg"
                style={{
                  background:
                    "radial-gradient(ellipse at center 30%, rgba(255,200,100,0.35) 0%, transparent 60%)",
                }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
