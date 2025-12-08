'use client';

import Image from 'next/image';
import { useState } from 'react';

interface DockProps {
  onAppOpen: (appName: string) => void;
}

const dockApps = [
  { id: 'resume', name: 'Resume', icon: '/icons/resume.png' },
  { id: 'projects', name: 'Projects', icon: '/icons/projects.png' },
  { id: 'professional', name: 'Professional', icon: '/icons/professional.png' },
  { id: 'timeline', name: 'Timeline', icon: '/icons/timeline.png' },
  { id: 'hobbies', name: 'Hobbies', icon: '/icons/hobbies.png' },
  { id: 'personal', name: 'About Me', icon: '/icons/personal.png' },
];

export default function Dock({ onAppOpen }: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.5;
    if (distance === 1) return 1.25;
    if (distance === 2) return 1.1;
    return 1;
  };

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 flex items-end gap-2 sm:gap-3 px-2 sm:px-3 py-2 dock-glass rounded-2xl z-40">
      {dockApps.map((app, index) => (
        <div
          key={app.id}
          className="flex flex-col items-center gap-1 group"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <button
            onClick={() => onAppOpen(app.id)}
            className="dock-icon relative"
            style={{
              transform: `scale(${getScale(index)}) translateY(-${(getScale(index) - 1) * 20}px)`,
            }}
            aria-label={`Open ${app.name}`}
          >
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={app.icon}
                alt={app.name}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
          </button>
          <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -top-8 bg-gray-800/90 text-white px-2 py-1 rounded whitespace-nowrap">
            {app.name}
          </span>
        </div>
      ))}
    </div>
  );
}
