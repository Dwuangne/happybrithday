"use client";

import { INTERACTIVE_STEPS, type Step } from "@/lib/steps";

interface ProgressIndicatorProps {
  currentStep: Step;
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const currentIdx = INTERACTIVE_STEPS.indexOf(currentStep);

  return (
    <div className="flex items-center justify-center gap-1.5 px-3 pt-4 sm:gap-2 sm:px-4 sm:pt-6">
      {INTERACTIVE_STEPS.map((step, i) => {
        const isActive = i <= currentIdx;
        const isCurrent = step === currentStep;

        return (
          <div
            key={step}
            className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
              isCurrent ? "w-5 bg-white sm:w-6" : isActive ? "w-1.5 bg-white/70 sm:w-2" : "w-1.5 bg-white/25 sm:w-2"
            }`}
          />
        );
      })}
    </div>
  );
}
