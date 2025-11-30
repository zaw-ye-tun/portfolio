'use client';

import { useState, useMemo } from 'react';
import { formatDateRange } from '@/lib/dateUtils';

interface TimelineItem {
  id: string;
  start_date: string;
  end_date?: string;
  title: string;
  description: string;
  category: 'education' | 'work';
}

interface TimelineProps {
  items: TimelineItem[];
}

const categoryColors = {
  education: 'bg-blue-500',
  work: 'bg-green-500',
};

export default function Timeline({ items }: TimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Sort items by start_date (newest first)
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const dateA = new Date(a.start_date + '-01');
      const dateB = new Date(b.start_date + '-01');
      return dateB.getTime() - dateA.getTime();
    });
  }, [items]);

  if (!items || items.length === 0) {
    return <div className="p-6 text-center text-gray-500">No timeline items to display</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="relative">
        {/* Center Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 transform -translate-x-1/2" />
        
        {/* Timeline Items */}
        <div className="space-y-12">
          {sortedItems.map((item) => {
            const isExpanded = expandedId === item.id;
            const isWork = item.category === 'work';
            
            return (
              <div
                key={item.id}
                className={`relative flex items-center ${
                  isWork ? 'flex-row-reverse' : 'flex-row'
                } group`}
              >
                {/* Content Card (Left for work, Right for education) */}
                <div
                  className={`w-5/12 ${
                    isWork ? 'text-right pr-8' : 'text-left pl-12'
                  }`}
                  onMouseEnter={() => setExpandedId(item.id)}
                  onMouseLeave={() => setExpandedId(null)}
                >
                  <div
                    className={`glass-effect rounded-xl p-5 transition-all duration-300 ${
                      isExpanded ? 'scale-105 shadow-2xl' : 'scale-100'
                    } hover:border-${item.category === 'work' ? 'green' : 'blue'}-400`}
                  >
                    {/* Category Badge */}
                    <div className={`inline-flex items-center gap-2 mb-3`}>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${
                          categoryColors[item.category]
                        }`}
                      >
                        {item.category === 'work' ? '💼 Work' : '🎓 Education'}
                      </span>
                    </div>

                    {/* Date Range */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-mono font-medium mb-2">
                      {formatDateRange(item.start_date, item.end_date)}
                    </p>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-gray-700 dark:text-gray-300 leading-relaxed transition-all duration-300 ${
                        isExpanded ? 'opacity-100' : 'opacity-80 line-clamp-3'
                      }`}
                    >
                      {item.description}
                    </p>

                    {/* Expand hint */}
                    {!isExpanded && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Hover to expand
                      </p>
                    )}
                  </div>
                </div>

                {/* Center Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div
                    className={`w-6 h-6 rounded-full ${
                      categoryColors[item.category]
                    } ring-4 ring-white dark:ring-gray-900 transition-all duration-300 ${
                      isExpanded ? 'scale-150 ring-8' : 'scale-100'
                    }`}
                  />
                </div>

                {/* Empty space on opposite side */}
                <div className="w-5/12" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
