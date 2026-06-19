"use client";

import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useBirthdayFlow } from "@/hooks/useBirthdayFlow";
import { useAudio } from "@/hooks/useAudio";
import { useMounted } from "@/hooks/useMounted";
import { playButtonTap } from "@/lib/sfx";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Stage } from "@/components/Stage";
import { ActionButton } from "@/components/ActionButton";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import type { Step } from "@/lib/steps";

const INTERACTIVE_STEPS: Step[] = [
  "lights",
  "music",
  "decorate",
  "balloons",
  "cake",
  "candle",
  "wish",
  "story",
];

export default function Home() {
  const mounted = useMounted();
  const { state, advance, onMessageComplete, onBalloonPopComplete } = useBirthdayFlow();
  const { play } = useAudio();

  useEffect(() => {
    if (!mounted) return;

    const body = document.body;
    body.classList.remove("peach", "peach-animated");

    if (state.peachBackground) {
      body.classList.add("peach");
    }
    if (state.peachAnimated) {
      body.classList.add("peach-animated");
    }

    return () => {
      body.classList.remove("peach", "peach-animated");
    };
  }, [mounted, state.peachBackground, state.peachAnimated]);

  const handleAdvance = () => {
    playButtonTap();

    if (state.step === "music") {
      play();
    }
    advance();
  };

  const showButton =
    INTERACTIVE_STEPS.includes(state.step) &&
    !state.showMessage &&
    state.step !== "done";
  const isLoading = state.step === "loading";

  if (!mounted) {
    return (
      <main className="relative min-h-[100dvh] bg-black">
        <LoadingScreen />
      </main>
    );
  }

  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden">
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      {!isLoading && (
        <>
          <ProgressIndicator currentStep={state.step} />
          <Stage
            state={state}
            onMessageComplete={onMessageComplete}
            onBalloonPopComplete={onBalloonPopComplete}
          />

          <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center bg-gradient-to-t from-black/50 via-black/30 to-transparent px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-4 sm:pb-8 sm:pt-4">
            <AnimatePresence mode="wait">
              {showButton && (
                <ActionButton
                  key={state.step}
                  step={state.step}
                  disabled={state.isTransitioning}
                  onClick={handleAdvance}
                />
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </main>
  );
}
