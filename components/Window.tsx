'use client';

import { ReactNode, useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, Maximize2 } from 'lucide-react';

interface WindowProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string;
  height?: string;
}

export default function Window({
  title,
  isOpen,
  onClose,
  children,
  width = '900px',
  height = '600px',
}: WindowProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [previousPosition, setPreviousPosition] = useState({ x: 100, y: 100 });
  const nodeRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-maximize when window opens
  useEffect(() => {
    if (isOpen && !isMobile) {
      setIsMaximized(true);
    } else if (!isOpen) {
      // Reset to maximized state when window closes so it opens maximized next time
      setIsMaximized(false);
    }
  }, [isOpen, isMobile]);

  if (!isOpen) return null;

  // Mobile: Full-screen modal
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 animate-slide-up">
        <div className="absolute inset-0 bg-white dark:bg-gray-900">
          {/* Mobile Header */}
          <div className="sticky top-0 z-10 glass-effect border-b border-gray-200/50 dark:border-gray-700/50 px-4 py-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Mobile Content */}
          <div className="h-[calc(100vh-60px)] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    );
  }

  const handleMaximize = () => {
    if (!isMaximized) {
      // Store current position before maximizing
      const element = nodeRef.current as HTMLElement | null;
      if (element) {
        const rect = element.getBoundingClientRect();
        setPreviousPosition({ x: rect.left, y: rect.top });
      }
    }
    setIsMaximized(!isMaximized);
  };

  // Desktop: Draggable window
  return (
    <Draggable 
      handle=".window-header" 
      bounds="parent" 
      position={isMaximized ? { x: 0, y: 0 } : undefined}
      defaultPosition={previousPosition}
      nodeRef={nodeRef}
      disabled={isMaximized}
    >
      <div
        ref={nodeRef}
        className="fixed z-50 transition-all duration-300"
        style={
          isMaximized
            ? {
                top: 0,
                left: 0,
                width: '100vw',
                height: 'calc(100vh - 5rem)', // Subtract dock height
              }
            : { width, maxWidth: '90vw' }
        }
      >
        <div className={`window-glass overflow-hidden shadow-2xl h-full flex flex-col ${
          isMaximized ? 'rounded-none' : 'rounded-xl'
        }`}>
          {/* macOS Traffic Lights Header */}
          <div className="window-header px-4 py-3 flex items-center justify-between cursor-move select-none border-b border-gray-200/30 dark:border-gray-700/30">
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="traffic-light bg-red-500 hover:bg-red-600"
                aria-label="Close"
              />
              <button
                onClick={onClose}
                className="traffic-light bg-yellow-500 hover:bg-yellow-600"
                aria-label="Minimize"
              />
              <button
                onClick={handleMaximize}
                className="traffic-light bg-green-500 hover:bg-green-600"
                aria-label="Maximize"
              />
            </div>
            
            <h2 className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold">
              {title}
            </h2>
            
            <div className="w-12" /> {/* Spacer for centering */}
          </div>
          
          {/* Window Content */}
          <div 
            className="overflow-y-auto no-scrollbar flex-1" 
            style={isMaximized ? {} : { height }}
          >
            {children}
          </div>
        </div>
      </div>
    </Draggable>
  );
}
