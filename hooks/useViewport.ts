"use client";

import { useEffect, useState } from "react";
import type { ViewportSize } from "@/lib/viewport";

const DEFAULT_VIEWPORT: ViewportSize = { width: 390, height: 844 };

export function useViewport() {
  const [viewport, setViewport] = useState<ViewportSize>(DEFAULT_VIEWPORT);

  useEffect(() => {
    const update = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  return viewport;
}
