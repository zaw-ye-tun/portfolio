'use client';

import { FileText, Heart, Briefcase, Clock, User, FolderKanban } from 'lucide-react';

interface MobileNavProps {
  onAppOpen: (appName: string) => void;
  activeApp: string | null;
}

const navItems = [
  { id: 'resume', name: 'Resume', icon: FileText },
  { id: 'projects', name: 'Projects', icon: FolderKanban },
  { id: 'professional', name: 'Work', icon: Briefcase },
  { id: 'timeline', name: 'Timeline', icon: Clock },
  { id: 'hobbies', name: 'Hobbies', icon: Heart },
  { id: 'personal', name: 'About', icon: User },
];

export default function MobileNav({ onAppOpen, activeApp }: MobileNavProps) {
  // Hidden - using Dock for all screen sizes now
  return null;
  /*
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden glass-effect border-t border-gray-200/50 dark:border-gray-700/50 z-50 bg-white/90 dark:bg-gray-900/90">
      <div className="flex items-center justify-around py-2 safe-area-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeApp === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onAppOpen(item.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                isActive
                  ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              aria-label={item.name}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
  */
}
