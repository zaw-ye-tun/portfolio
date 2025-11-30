'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import {
  parseDate,
  normalizeEndDate,
  monthsBetween,
  formatDateRange,
  getYearRange,
} from '@/lib/ganttUtils';

const PIXELS_PER_MONTH = 12; // Scale: 12 pixels = 1 month
const CARD_WIDTH_PERCENT = 45; // Percentage of column width
const CARD_HORIZONTAL_GAP_PERCENT = 2; // Gap as percentage

interface TimelineItem {
  id: string;
  start_date: string;
  end_date?: string;
  title: string;
  description: string;
  company_or_school?: string;
  category: 'education' | 'work';
  color?: string;
}

export default function GanttTimeline({ items }: { items: TimelineItem[] }) {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const timelineRef = useRef<HTMLDivElement>(null);

  // Calculate timeline bounds
  const timelineBounds = useMemo(() => {
    if (!items || items.length === 0) return null;

    const dates = items.flatMap(item => [
      parseDate(item.start_date),
      normalizeEndDate(item.end_date || 'Present'),
    ]).filter(Boolean) as Date[];

    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));

    return { minDate, maxDate };
  }, [items]);

  // Sort items by end_date descending (for proper stacking - items ending later rendered first)
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const endA = normalizeEndDate(a.end_date || 'Present');
      const endB = normalizeEndDate(b.end_date || 'Present');
      return endB.getTime() - endA.getTime();
    });
  }, [items]);

  // Separate work and education
  const workItems = useMemo(
    () => sortedItems.filter(item => item.category === 'work'),
    [sortedItems]
  );

  const educationItems = useMemo(
    () => sortedItems.filter(item => item.category === 'education'),
    [sortedItems]
  );

  // Get years for center line (newest first at top)
  const years = useMemo(() => getYearRange(items).reverse(), [items]);

  // Calculate position from top (newest at top = 0)
  const getPositionFromTop = (date: Date): number => {
    if (!timelineBounds) return 0;
    const monthsFromMax = monthsBetween(date, timelineBounds.maxDate);
    return monthsFromMax * PIXELS_PER_MONTH;
  };

  // Calculate bar metrics with overlap detection
  const calculateItemMetrics = (categoryItems: TimelineItem[]) => {
    const metrics: Map<string, { top: number; height: number; column: number }> = new Map();
    const occupiedColumns: { startY: number; endY: number; column: number }[] = [];

    categoryItems.forEach(item => {
      const startDate = parseDate(item.start_date)!;
      const endDate = normalizeEndDate(item.end_date || 'Present');
      const duration = monthsBetween(startDate, endDate);

      // Position based on end_date (top of card at end_date position)
      const top = getPositionFromTop(endDate);
      const height = Math.max(duration * PIXELS_PER_MONTH, 80); // Min height 80px

      // Find available column (check for overlaps)
      let column = 0;
      const itemStartY = top;
      const itemEndY = top + height;

      // Check each column for overlap
      let foundColumn = false;
      while (!foundColumn) {
        const hasOverlap = occupiedColumns.some(occupied => 
          occupied.column === column &&
          !(itemEndY <= occupied.startY || itemStartY >= occupied.endY)
        );

        if (!hasOverlap) {
          foundColumn = true;
        } else {
          column++;
        }
      }

      // Mark this space as occupied
      occupiedColumns.push({ startY: itemStartY, endY: itemEndY, column });

      metrics.set(item.id, { top, height, column });
    });

    // Calculate max columns used
    const maxColumn = occupiedColumns.length > 0 
      ? Math.max(...occupiedColumns.map(o => o.column)) + 1 
      : 1;

    return { metrics, maxColumns: maxColumn };
  };

  const workData = useMemo(() => calculateItemMetrics(workItems), [workItems, timelineBounds]);
  const educationData = useMemo(() => calculateItemMetrics(educationItems), [educationItems, timelineBounds]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) setVisibleItems((prev) => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = timelineRef.current?.querySelectorAll('[data-id]');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [items]);

  // Get color for item
  const getColor = (item: TimelineItem) => {
    if (item.color) return item.color;
    return item.category === 'work' ? '#10B981' : '#3B82F6';
  };

  // Render a positioned card
  const renderCard = (item: TimelineItem, metrics: Map<string, { top: number; height: number; column: number }>, isWork: boolean, maxColumns: number) => {
    const itemMetrics = metrics.get(item.id);
    if (!itemMetrics) return null;

    const { top, height, column } = itemMetrics;
    const color = getColor(item);
    const isVisible = visibleItems.has(item.id);

    // Calculate width based on number of columns needed
    const cardWidth = maxColumns > 1 
      ? `${(100 - (maxColumns - 1) * CARD_HORIZONTAL_GAP_PERCENT) / maxColumns}%`
      : '95%';
    const horizontalOffset = maxColumns > 1
      ? `${column * (100 / maxColumns)}%`
      : '0';

    return (
      <div
        key={item.id}
        data-id={item.id}
        onClick={() => setSelectedItem(item)}
        className={`absolute cursor-pointer transition-all duration-500 ease-out ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}
        style={{
          top: `${top}px`,
          height: `${height}px`,
          [isWork ? 'right' : 'left']: horizontalOffset,
          width: cardWidth,
        }}
      >
        <div
          className="h-full rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${color}20, ${color}08)`,
            borderLeft: isWork ? 'none' : `4px solid ${color}`,
            borderRight: isWork ? `4px solid ${color}` : 'none',
          }}
        >
          <div className="p-3 h-full flex flex-col justify-between relative">
            {/* Title & Company */}
            <div>
              <h3 className="font-bold text-sm mb-1 text-gray-900 dark:text-white line-clamp-2">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {item.company_or_school}
              </p>
            </div>

            {/* Duration */}
            <div className="text-xs font-mono text-gray-500 dark:text-gray-500 mt-2">
              {formatDateRange(item.start_date, item.end_date || 'Present')}
            </div>

            {/* Category badge */}
            <div className={`absolute top-2 ${isWork ? 'left-2' : 'right-2'}`}>
              <span
                className="px-2 py-1 text-xs font-semibold rounded-full text-white"
                style={{ backgroundColor: color }}
              >
                {item.category === 'work' ? '💼' : '🎓'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Calculate total timeline height
  const timelineHeight = useMemo(() => {
    if (!timelineBounds) return 600;
    const totalMonths = monthsBetween(timelineBounds.minDate, timelineBounds.maxDate);
    return totalMonths * PIXELS_PER_MONTH + 150;
  }, [timelineBounds]);

  if (!items || items.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No timeline entries to display
      </div>
    );
  }

  return (
    <>
      <div ref={timelineRef} className="relative w-full max-w-7xl mx-auto p-8 overflow-x-auto">
        {/* Headers */}
        <div className="flex mb-4 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-20 py-4">
          <div className="w-[45%] text-right pr-12">
            <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
              💼 Work Experience
            </h2>
          </div>
          <div className="w-[10%]" />
          <div className="w-[45%] text-left pl-12">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              🎓 Education
            </h2>
          </div>
        </div>

        {/* Main Timeline Container */}
        <div className="relative flex" style={{ height: `${timelineHeight}px` }}>
          {/* Left Column - Work */}
          <div className="w-[45%] relative overflow-hidden pr-4">
            <div className="absolute top-0 bottom-0 right-4 left-0">
              {workItems.map((item) => renderCard(item, workData.metrics, true, workData.maxColumns))}
            </div>
          </div>

          {/* Center Vertical Line with Year Labels */}
          <div className="w-[10%] relative flex justify-center">
            <div className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-purple-500 to-blue-500" />
            
            {years.map((year) => {
              const yearDate = new Date(year, 11, 31); // End of year
              const offset = getPositionFromTop(yearDate);

              return (
                <div
                  key={year}
                  className="absolute z-10"
                  style={{ top: `${offset}px` }}
                >
                  {/* Year dot */}
                  <div className="w-5 h-5 bg-white dark:bg-gray-900 border-3 border-purple-500 rounded-full absolute left-1/2 transform -translate-x-1/2" />
                  
                  {/* Year label */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-8 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-lg border-2 border-purple-400 whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      {year}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column - Education */}
          <div className="w-[45%] relative overflow-hidden pl-4">
            <div className="absolute top-0 bottom-0 right-0 left-4">
              {educationItems.map((item) => renderCard(item, educationData.metrics, false, educationData.maxColumns))}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
            >
              ✕
            </button>

            {/* Category badge */}
            <div className="mb-4">
              <span
                className="px-4 py-2 text-sm font-semibold rounded-full text-white"
                style={{ backgroundColor: getColor(selectedItem) }}
              >
                {selectedItem.category === 'work' ? '💼 Work' : '🎓 Education'}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              {selectedItem.title}
            </h2>

            {/* Company/School */}
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              {selectedItem.company_or_school}
            </p>

            {/* Duration */}
            <p className="text-sm font-mono text-gray-500 dark:text-gray-500 mb-6">
              {formatDateRange(selectedItem.start_date, selectedItem.end_date || 'Present')}
              {' • '}
              {monthsBetween(
                parseDate(selectedItem.start_date)!,
                normalizeEndDate(selectedItem.end_date || 'Present')
              )}{' '}
              months
            </p>

            {/* Description */}
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {selectedItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
