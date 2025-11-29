'use client';

import { useState } from 'react';

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'education' | 'work' | 'achievement' | 'personal';
}

interface TimelineProps {
  items: TimelineItem[];
}

const categoryColors = {
  education: 'bg-blue-500',
  work: 'bg-green-500',
  achievement: 'bg-purple-500',
  personal: 'bg-orange-500',
};

export default function Timeline({ items }: TimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!items || items.length === 0) {
    return <div className="p-6 text-center text-gray-500">No timeline items to display</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700" />
        
        {/* Timeline Items */}
        <div className="space-y-8">
          {items.map((item) => {
            const isExpanded = expandedId === item.id;
            
            return (
              <div
                key={item.id}
                className="relative pl-20 group"
                onMouseEnter={() => setExpandedId(item.id)}
                onMouseLeave={() => setExpandedId(null)}
              >
                {/* Dot */}
                <div
                  className={`absolute left-6 top-2 w-5 h-5 rounded-full ${
                    categoryColors[item.category]
                  } ring-4 ring-white dark:ring-gray-900 transition-transform ${
                    isExpanded ? 'scale-125' : 'scale-100'
                  }`}
                />
                
                {/* Content Card */}
                <div
                  className={`glass-effect rounded-lg p-4 transition-all duration-300 ${
                    isExpanded ? 'scale-105 shadow-xl' : 'scale-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {item.date}
                      </p>
                      <h3 className="text-lg font-bold mt-1">{item.title}</h3>
                      <p
                        className={`text-gray-700 dark:text-gray-300 mt-2 transition-all duration-300 ${
                          isExpanded ? 'opacity-100 max-h-96' : 'opacity-70 max-h-20 line-clamp-2'
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                    
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full text-white ${
                        categoryColors[item.category]
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
