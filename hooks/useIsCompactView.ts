'use client';

import { useState, useEffect } from 'react';

const COMPACT_BREAKPOINT = 1024;

/**
 * Custom hook to detect compact/mobile view based on viewport width.
 * Returns true when window width is below 1024px (compact view).
 * Returns false when window width is >= 1024px (macOS desktop layout).
 * 
 * Uses viewport width only - no user-agent or device detection.
 */
export function useIsCompactView(): boolean {
  const [isCompactView, setIsCompactView] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkViewport = () => {
      setIsCompactView(window.innerWidth < COMPACT_BREAKPOINT);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);

    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Return false during SSR to avoid hydration mismatch
  if (!mounted) return false;

  return isCompactView;
}
