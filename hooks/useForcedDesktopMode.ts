'use client';

import { useState, useEffect } from 'react';

/**
 * Detects when a mobile device is forcing desktop layout
 * (e.g., "Request Desktop Site" mode in mobile browsers)
 * 
 * Returns true if:
 * - innerWidth > screen.width (viewport forced larger than physical screen)
 * - clientWidth > 1024 (wide viewport on a mobile user agent)
 * - Mobile user agent with low device pixel ratio
 */
export function useForcedDesktopMode(): boolean {
  const [isForcedDesktop, setIsForcedDesktop] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const checkForcedDesktopMode = () => {
      // Check if we're in a browser environment
      if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return false;
      }

      const userAgent = navigator.userAgent || '';
      const isMobileUserAgent = /Mobile|Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

      // Condition 1: innerWidth > screen.width (desktop mode requested)
      const isViewportLargerThanScreen = window.innerWidth > window.screen.width;

      // Condition 2: Wide viewport (> 1024px) on any device
      const isWideViewport = document.documentElement.clientWidth > 1024;

      // Condition 3: Mobile user agent with typical desktop viewport width
      const isMobileWithDesktopWidth = isMobileUserAgent && window.innerWidth >= 980;

      // Condition 4: Mobile user agent with low device pixel ratio (desktop mode often resets this)
      const isMobileWithLowDPR = isMobileUserAgent && window.devicePixelRatio <= 1.5;

      return isViewportLargerThanScreen || isWideViewport || isMobileWithDesktopWidth || isMobileWithLowDPR;
    };

    const updateState = () => {
      setIsForcedDesktop(checkForcedDesktopMode());
    };

    // Initial check
    updateState();

    // Listen for resize events
    window.addEventListener('resize', updateState);
    
    // Also check on orientation change
    window.addEventListener('orientationchange', updateState);

    return () => {
      window.removeEventListener('resize', updateState);
      window.removeEventListener('orientationchange', updateState);
    };
  }, []);

  // Return false during SSR to prevent hydration mismatch
  if (!isClient) return false;

  return isForcedDesktop;
}
