"use client";

import Image from "next/image";
import { BULB_ASSETS, BULB_OFF } from "@/lib/assets";
import styles from "./BulbRow.module.css";

const FLASH_CLASS: Record<string, string> = {
  yellow: styles.flashYellow,
  red: styles.flashRed,
  blue: styles.flashBlue,
  green: styles.flashGreen,
  pink: styles.flashPink,
  orange: styles.flashOrange,
};

interface BulbRowProps {
  lightsOn: boolean;
  pulsing: boolean;
}

export function BulbRow({ lightsOn, pulsing }: BulbRowProps) {
  return (
    <div className="mx-auto grid w-full max-w-sm grid-cols-3 place-items-center gap-x-2 gap-y-1 px-2 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-4">
      {BULB_ASSETS.map((bulb, i) => {
        const stateClass = !lightsOn
          ? ""
          : pulsing
            ? FLASH_CLASS[bulb.id]
            : styles.lit;

        return (
          <div
            key={bulb.id}
            className={`flex h-14 w-14 items-center justify-center transition-all duration-500 sm:h-[70px] sm:w-[70px] ${
              lightsOn ? "scale-100 opacity-100" : "scale-90 opacity-45"
            }`}
            style={{ transitionDelay: lightsOn ? `${i * 200}ms` : "0ms" }}
          >
            <div className={`${styles.bulb} h-10 w-10 sm:h-[50px] sm:w-[50px] ${stateClass ?? ""}`}>
              <Image
                src={BULB_OFF}
                alt=""
                width={50}
                height={50}
                className={styles.offLayer}
                priority={i === 0}
                sizes="(max-width: 640px) 40px, 50px"
              />
              <Image
                src={bulb.on}
                alt=""
                width={50}
                height={50}
                className={`${styles.onLayer} drop-shadow-[0_0_12px_rgba(255,200,100,0.5)]`}
                sizes="(max-width: 640px) 40px, 50px"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
