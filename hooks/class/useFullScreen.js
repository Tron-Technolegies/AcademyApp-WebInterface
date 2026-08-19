import React, { useCallback, useEffect, useState } from "react";

export default function useFullScreen(targetRef) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      targetRef.current?.requestFullscreen?.().catch((err) => {
        console.error("Fullscreen request failed:", err);
      });
    } else {
      document.exitFullscreen?.();
    }
  }, [targetRef]);

  useEffect(() => {
    const handleChange = () => setIsFullscreen(!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  return { isFullscreen, toggleFullScreen };
}
