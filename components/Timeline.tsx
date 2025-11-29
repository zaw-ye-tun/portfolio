'use client';

import { useState, useMemo } from 'react';

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'education' | 'work' | 'achievement' | 'personal';
  startYear?: number;
  endYear?: number;
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

// Parse date string to extract start and end years
const parseDateRange = (dateStr: string): { start: number; end: number | null } => {
  const match = dateStr.match(/(\d{4})\s*[-–—]\s*(\d{4}|Present|present|Current|current|Now|now)/i);
  if (match) {
    const start = parseInt(match[1]);
    const end = /present|current|now/i.test(match[2]) ? null : parseInt(match[2]);
    return { start, end };
  }
  
  // Single year
  const singleYear = dateStr.match(/(\d{4})/);
  if (singleYear) {
    const year = parseInt(singleYear[1]);
    return { start: year, end: year };
  }
  
  return { start: 0, end: 0 };
};

// Check if two date ranges overlap
const hasOverlap = (item1: TimelineItem, item2: TimelineItem): boolean => {
  const range1 = parseDateRange(item1.date);
  const range2 = parseDateRange(item2.date);
  
  const end1 = range1.end ?? new Date().getFullYear();
  const end2 = range2.end ?? new Date().getFullYear();
  
  return range1.start <= end2 && end1 >= range2.start;
};

export default function Timeline({ items }: TimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Sort items by start year (newest first)
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const rangeA = parseDateRange(a.date);
      const rangeB = parseDateRange(b.date);
      return rangeB.start - rangeA.start;
    });
  }, [items]);

  // Calculate overlap information for each item
  const itemsWithOverlaps = useMemo(() => {
    return sortedItems.map((item, index) => {
      const overlappingItems = sortedItems.filter((other, otherIndex) => 
        index !== otherIndex && hasOverlap(item, other)
      );
      return {
        ...item,
        overlapCount: overlappingItems.length,
        overlappingWith: overlappingItems.map(i => i.title),
      };
    });
  }, [sortedItems]);

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
          {itemsWithOverlaps.map((item, index) => {
            const isExpanded = expandedId === item.id;
            const indentLevel = Math.min(item.overlapCount, 3); // Max 3 levels of indent
            
            return (
              <div
                key={item.id}
                className="relative pl-20 group"
                style={{ marginLeft: `${indentLevel * 30}px` }}
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
                      
                      {/* Overlap Indicator */}
                      {item.overlapCount > 0 && (
                        <div className="mt-3 flex items-center gap-2 text-xs text-yellow-600 dark:text-yellow-400">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                          </svg>
                          <span>
                            Overlaps with {item.overlapCount} other {item.overlapCount === 1 ? 'event' : 'events'}
                          </span>
                        </div>
                      )}
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
