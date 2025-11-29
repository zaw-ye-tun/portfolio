'use client';

import { ReactNode, useState, useEffect } from 'react';
import MenuBar from './MenuBar';
import Dock from './Dock';
import MobileNav from './MobileNav';

interface DesktopProps {
  children: (props: { openApp: string | null; onClose: () => void }) => ReactNode;
}

export default function Desktop({ children }: DesktopProps) {
  const [openApp, setOpenApp] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      
      {/* Main Desktop Area */}
      <div className="absolute inset-0 top-7 bottom-20 md:bottom-0">
        {children({ openApp, onClose: handleClose })}
      </div>
      
      {/* Dock (Desktop) */}
      <Dock onAppOpen={handleAppOpen} />
      
      {/* Mobile Navigation */}
      <MobileNav onAppOpen={handleAppOpen} activeApp={openApp} />
    </div>
  );
}
