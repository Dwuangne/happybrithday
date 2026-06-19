"use client";

import { useCallback, useEffect, useState } from "react";
import { STEP_DELAYS, type Step } from "@/lib/steps";

export interface BirthdayFlowState {
  step: Step;
  isTransitioning: boolean;
  lightsOn: boolean;
  bulbsPulsing: boolean;
  peachBackground: boolean;
  peachAnimated: boolean;
  bannerVisible: boolean;
  balloonsFloating: boolean;
  balloonsPopping: boolean;
  balloonsGone: boolean;
  borderRisen: boolean;
  cakeVisible: boolean;
  candleLit: boolean;
  showMessage: boolean;
  messageStarted: boolean;
  cakeHiddenForMessage: boolean;
  showCakeAfterMessage: boolean;
}

const initialState: BirthdayFlowState = {
  step: "loading",
  isTransitioning: false,
  lightsOn: false,
  bulbsPulsing: false,
  peachBackground: false,
  peachAnimated: false,
  bannerVisible: false,
  balloonsFloating: false,
  balloonsPopping: false,
  balloonsGone: false,
  borderRisen: false,
  cakeVisible: false,
  candleLit: false,
  showMessage: false,
  messageStarted: false,
  cakeHiddenForMessage: false,
  showCakeAfterMessage: false,
};

export function useBirthdayFlow() {
  const [state, setState] = useState<BirthdayFlowState>(initialState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState((s) => ({ ...s, step: "lights" }));
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const onBalloonPopComplete = useCallback(() => {
    setState((s) => ({
      ...s,
      balloonsPopping: false,
      balloonsGone: true,
    }));
  }, []);

  const advance = useCallback(() => {
    setState((s) => {
      if (s.isTransitioning) return s;

      const current = s.step;
      const delay = STEP_DELAYS[current] ?? 0;

      const runStepEffects = (prev: BirthdayFlowState): BirthdayFlowState => {
        switch (current) {
          case "lights":
            return {
              ...prev,
              isTransitioning: true,
              lightsOn: true,
              peachBackground: true,
            };
          case "music":
            return {
              ...prev,
              isTransitioning: true,
              bulbsPulsing: true,
              peachAnimated: true,
            };
          case "decorate":
            return {
              ...prev,
              isTransitioning: true,
              bannerVisible: true,
            };
          case "balloons":
            return {
              ...prev,
              isTransitioning: true,
              balloonsFloating: true,
              borderRisen: true,
            };
          case "cake":
            return {
              ...prev,
              isTransitioning: true,
              cakeVisible: true,
            };
          case "candle":
            return {
              ...prev,
              isTransitioning: true,
              candleLit: true,
            };
          case "wish":
            return {
              ...prev,
              isTransitioning: true,
              balloonsFloating: false,
              balloonsPopping: true,
            };
          case "story":
            return {
              ...prev,
              isTransitioning: true,
              cakeHiddenForMessage: true,
              showMessage: true,
              messageStarted: true,
            };
          default:
            return prev;
        }
      };

      const nextStepMap: Partial<Record<Step, Step>> = {
        lights: "music",
        music: "decorate",
        decorate: "balloons",
        balloons: "cake",
        cake: "candle",
        candle: "wish",
        wish: "story",
        story: "done",
      };

      const nextStep = nextStepMap[current];
      if (!nextStep) return s;

      const updated = runStepEffects(s);

      if (current === "story") {
        return { ...updated, isTransitioning: false };
      }

      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          step: nextStep,
          isTransitioning: false,
        }));
      }, delay);

      return { ...updated, isTransitioning: true };
    });
  }, []);

  const onMessageComplete = useCallback(() => {
    setState((s) => ({
      ...s,
      showCakeAfterMessage: true,
      cakeHiddenForMessage: false,
      step: "done",
    }));
  }, []);

  return { state, advance, onMessageComplete, onBalloonPopComplete };
}
