"use client";

import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/lib/birthday-config";

interface WishBurstProps {
  active: boolean;
}

export function WishBurst({ active }: WishBurstProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[150] flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.h1
            className="font-message bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 bg-clip-text px-4 text-center text-2xl font-bold text-transparent sm:text-4xl"
            initial={{ scale: 0, opacity: 0, y: 40 }}
            animate={{ scale: [0, 1.12, 1], opacity: [0, 1, 1], y: 0 }}
            exit={{ scale: 1.15, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
          </motion.h1>
          <motion.p
            className="font-name mt-4 text-center text-4xl font-semibold italic tracking-wide text-rose-900 drop-shadow-md sm:mt-6 sm:text-6xl"
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.35, duration: 0.65, ease: "easeOut" }}
          >
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
