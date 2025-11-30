'use client';

import { useIsCompactView } from '@/hooks/useIsCompactView';

export default function MobileBanner() {
  const isCompactView = useIsCompactView();

  // Only show banner in compact view (width < 1024px)
  if (!isCompactView) return null;

  return (
    <div
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999]
        bg-black/70 backdrop-blur-md text-white text-sm
        px-4 py-2 rounded-full shadow-lg
        animate-fade-in-up"
    >
      Want more fun? View this in desktop mode! 🙌
    </div>
  );
}
