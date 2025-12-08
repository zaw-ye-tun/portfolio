'use client';

import { ReactNode, useState, useEffect } from 'react';
import MenuBar from './MenuBar';
import Dock from './Dock';

interface DesktopProps {
  children: (props: { openApp: string | null; onClose: () => void }) => ReactNode;
}

export default function Desktop({ children }: DesktopProps) {
  const [openApp, setOpenApp] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    
    return () => observer.disconnect();
  }, []);

  const handleAppOpen = (appName: string) => {
    setOpenApp(appName);
  };

  const handleClose = () => {
    setOpenApp(null);
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background Wallpaper */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ${
          isDark ? 'wallpaper-dark' : 'wallpaper-light'
        }`} 
      />
      
      {/* Menu Bar */}
      <MenuBar />
      
      {/* Main Desktop Area - Leave space for dock at bottom */}
      <div className="absolute inset-0 top-7" style={{ bottom: 'calc(72px + env(safe-area-inset-bottom, 0px))' }}>
        {children({ openApp, onClose: handleClose })}
      </div>
      
      {/* Dock - Always visible */}
      <Dock onAppOpen={handleAppOpen} />
    </div>
  );
}
