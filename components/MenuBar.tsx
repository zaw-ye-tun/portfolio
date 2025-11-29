'use client';

import { Sun, Moon } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

type MenuType = 'file' | 'edit' | 'view' | null;

export default function MenuBar() {
  const [time, setTime] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuType>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize theme
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }

    // Update clock every second
    const updateClock = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
      setTime(formatted);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    if (openMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenu]);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const toggleMenu = (menu: MenuType) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const menuItems = {
    file: [
      "Save? Relax, this is just a portfolio, not a thesis. 📄😅",
      "Open… maybe a coffee, not a file. ☕️😌",
      "Exit? No no, in Finland we finish what we start. 🇫🇮💪"
    ],
    edit: [
      "Undo? In Oulu we don't regret, we just continue. ❄️🙂",
      "Copy… but please don't copy my personality, ok? 😉📋",
      "Paste? Sure, paste your rye bread here. 🍞😂"
    ],
    view: [
      "Zoom in — not too close, personal space is Finnish culture. 😳↔️",
      "Zoom out — good, take some air like a true Northerner. 🌬️❄️",
      "Reload… take a sip of coffee first, then maybe reload. ☕️🔄"
    ]
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-7 glass-effect z-50 flex items-center justify-between px-4 text-sm">
      <div ref={menuRef} className="flex items-center gap-4 relative">
        <span className="font-semibold"></span>
        
        {/* File Menu */}
        <div className="relative">
          <button
            onClick={() => toggleMenu('file')}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              openMenu === 'file' 
                ? 'bg-blue-500 text-white' 
                : 'opacity-70 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
            }`}
          >
            File
          </button>
          {openMenu === 'file' && (
            <div className="absolute top-full left-0 mt-1 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200/50 dark:border-gray-700/50 py-1 animate-fade-in">
              {menuItems.file.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-2 text-xs text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-default"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit Menu */}
        <div className="relative">
          <button
            onClick={() => toggleMenu('edit')}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              openMenu === 'edit' 
                ? 'bg-blue-500 text-white' 
                : 'opacity-70 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
            }`}
          >
            Edit
          </button>
          {openMenu === 'edit' && (
            <div className="absolute top-full left-0 mt-1 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200/50 dark:border-gray-700/50 py-1 animate-fade-in">
              {menuItems.edit.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-2 text-xs text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-default"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View Menu */}
        <div className="relative">
          <button
            onClick={() => toggleMenu('view')}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              openMenu === 'view' 
                ? 'bg-blue-500 text-white' 
                : 'opacity-70 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
            }`}
          >
            View
          </button>
          {openMenu === 'view' && (
            <div className="absolute top-full left-0 mt-1 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200/50 dark:border-gray-700/50 py-1 animate-fade-in">
              {menuItems.view.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-2 text-xs text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-default"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-1 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <span className="text-xs font-medium">{time}</span>
      </div>
    </div>
  );
}
