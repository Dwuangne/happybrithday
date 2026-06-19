"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/lib/birthday-config";
import { ASSETS } from "@/lib/assets";

interface BannerTitleProps {
  visible: boolean;
}

export function BannerTitle({ visible }: BannerTitleProps) {
  const [swaying, setSwaying] = useState(false);

  useEffect(() => {
    if (!visible) {
      setSwaying(false);
      return;
    }
    const timer = setTimeout(() => setSwaying(true), 1200);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="birthday-banner"
          className="mx-auto w-full max-w-3xl px-2 text-center sm:px-4"
          initial={{ y: "25vh", opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <motion.div
            className="origin-center"
            initial={{ y: 48, opacity: 0 }}
            animate={
              swaying
                ? { y: 0, opacity: 1, rotate: [0, 2, -2, 1.5, -1, 0] }
                : { y: 0, opacity: 1, rotate: 0 }
            }
            transition={
              swaying
                ? {
                    y: { duration: 0.85, ease: "easeOut" },
                    opacity: { duration: 0.85, ease: "easeOut" },
                    rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  }
                : { delay: 0.15, duration: 0.85, ease: "easeOut" }
            }
          >
            <Image
              src={ASSETS.banner}
              alt="Chúc mừng sinh nhật"
              width={800}
              height={200}
              className="mx-auto block h-auto w-full max-w-[min(100%,36rem)] object-contain object-center drop-shadow-lg"
              priority
              sizes="(max-width: 640px) 95vw, 800px"
            />
          </motion.div>
          <motion.p
            className="font-name mx-auto mt-2 text-center text-3xl font-semibold italic leading-tight tracking-wide text-rose-900 drop-shadow-sm sm:mt-4 sm:text-5xl"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.65, ease: "easeOut" }}
          >
            {birthdayConfig.recipientName}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
