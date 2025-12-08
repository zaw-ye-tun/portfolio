'use client';

import { useIsCompactView } from '@/hooks/useIsCompactView';

export default function MobileBanner() {
  // Disabled - Dock now shows on all screen sizes
  return null;

  /*
  const isCompactView = useIsCompactView();

  // Only show banner in compact view (width < 1024px)
  if (!isCompactView) return null;

  return (
    <div
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40
        bg-black/70 backdrop-blur-md text-white text-sm
        px-4 py-2 rounded-full shadow-lg
        animate-fade-in-up pointer-events-none"
    >
      Want more fun? View this in desktop mode! 🙌
    </div>
  );
  */
}
