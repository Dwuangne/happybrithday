"use client";

import type { BirthdayFlowState } from "@/hooks/useBirthdayFlow";
import { useViewport } from "@/hooks/useViewport";
import { getSceneZones } from "@/lib/scene-layout";
import { BulbRow } from "./BulbRow";
import { BannerTitle } from "./BannerTitle";
import { BalloonField } from "./BalloonField";
import { Cake } from "./Cake";
import { MessageStory } from "./MessageStory";
import { PhotoBackground } from "./PhotoBackground";
import { WishBurst } from "./WishBurst";

interface StageProps {
  state: BirthdayFlowState;
  onMessageComplete: () => void;
  onBalloonPopComplete: () => void;
}

export function Stage({ state, onMessageComplete, onBalloonPopComplete }: StageProps) {
  const viewport = useViewport();
  const zones = getSceneZones(viewport);

  const showBulbs = state.lightsOn;
  const showBanner = state.bannerVisible;
  const showCake =
    (state.cakeVisible && !state.cakeHiddenForMessage) || state.showCakeAfterMessage;
  const showBalloons =
    !state.balloonsGone &&
    (state.balloonsFloating || state.balloonsPopping || state.borderRisen);
  const showMessage = state.showMessage && !state.showCakeAfterMessage;

  return (
    <>
      <PhotoBackground active={state.photoBgActive} dimForStory={showMessage} />

      <WishBurst active={state.balloonsPopping} />

      {showBalloons && (
        <BalloonField
          floating={state.balloonsFloating}
          popping={state.balloonsPopping}
          borderRisen={state.borderRisen}
          onPopComplete={onBalloonPopComplete}
        />
      )}

      <div className="relative z-10 flex min-h-[calc(100dvh-8rem)] flex-col items-center px-2 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-1 sm:min-h-[60vh] sm:px-4 sm:pb-32 sm:pt-2">
        {showBulbs && (
          <div
            className="flex w-full shrink-0 justify-center"
            style={{ minHeight: zones.bulbHeight }}
          >
            <BulbRow lightsOn={state.lightsOn} pulsing={state.bulbsPulsing} />
          </div>
        )}

        {showBanner && (
          <div
            className="flex w-full shrink-0 justify-center"
            style={{ minHeight: zones.bannerHeight }}
          >
            <BannerTitle visible={state.bannerVisible} />
          </div>
        )}

        {showMessage && (
          <div className="w-full shrink-0" style={{ minHeight: 40 }} aria-hidden />
        )}

        {showCake && (
          <div className="flex w-full shrink-0 justify-center">
            <Cake
              visible={showCake}
              candleLit={state.candleLit || state.showCakeAfterMessage}
              maxWidth={zones.cakeMaxWidth}
            />
          </div>
        )}

        <MessageStory
          active={showMessage}
          onComplete={onMessageComplete}
          marginTop={zones.messageMarginTop}
        />
      </div>
    </>
  );
}
