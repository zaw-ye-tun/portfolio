'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'mobileFunHintShown';
const SHOW_DELAY_MS = 500;
const VISIBLE_DURATION_MS = 15000;
const FADE_DURATION_MS = 300;

export default function MobileFunHint() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Only run on mobile
    if (!isMobile) {
      setShouldRender(false);
      return;
    }

    // Check localStorage - don't show if already shown
    const alreadyShown = localStorage.getItem(STORAGE_KEY) === 'true';
    if (alreadyShown) {
      setShouldRender(false);
      return;
    }

    // Show banner after delay
    setShouldRender(true);
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, SHOW_DELAY_MS);

    // Start fade out after visible duration
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, SHOW_DELAY_MS + VISIBLE_DURATION_MS);

    // Remove from DOM after fade completes
    const removeTimer = setTimeout(() => {
      setShouldRender(false);
      // Mark as shown in localStorage
      localStorage.setItem(STORAGE_KEY, 'true');
    }, SHOW_DELAY_MS + VISIBLE_DURATION_MS + FADE_DURATION_MS);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [isMobile]);

  // Don't render if not needed
  if (!shouldRender) return null;

  return (
    <div
      className={`
        fixed left-1/2 -translate-x-1/2 z-40
        bg-black/70 backdrop-blur-md text-white text-sm
        px-4 py-2 rounded-full shadow-lg
        pointer-events-none select-none
        transition-opacity duration-300 ease-in-out
        ${isVisible && !isFadingOut ? 'opacity-100' : 'opacity-0'}
      `}
      style={{
        bottom: 'calc(60px + env(safe-area-inset-bottom, 0px) + 20px)',
      }}
      role="status"
      aria-live="polite"
    >
      More fun in desktop mode! 🙌
    </div>
  );
}
