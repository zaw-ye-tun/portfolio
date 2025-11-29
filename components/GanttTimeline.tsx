'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import {
  parseDate,
  normalizeEndDate,
  monthsBetween,
  formatDateRange,
  sortByStartDateDesc,
  getYearRange,
  getPixelOffset,
  calculateHorizontalOffset,
} from '@/lib/ganttUtils';

const PIXELS_PER_MONTH = 8; // Scale: 8 pixels = 1 month

export default function GanttTimeline({ items }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const timelineRef = useRef(null);

  // Sort items by start date
  const sortedItems = useMemo(() => sortByStartDateDesc(items), [items]);

  // Separate work and education
  const workItems = useMemo(
    () => sortedItems.filter(item => item.category === 'work'),
    [sortedItems]
  );

  const educationItems = useMemo(
    () => sortedItems.filter(item => item.category === 'education'),
    [sortedItems]
  );

  // Calculate timeline bounds
  const timelineBounds = useMemo(() => {
    if (!items || items.length === 0) return null;

    const dates = items.flatMap(item => [
      parseDate(item.start_date),
      normalizeEndDate(item.end_date),
    ]).filter(Boolean);

    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));

    return { minDate, maxDate };
  }, [items]);

  // Get years for labels
  const years = useMemo(() => getYearRange(items), [items]);

  // Calculate bar position and height
  const getBarMetrics = (item) => {
    if (!timelineBounds) return { top: 0, height: 0 };

    const startDate = parseDate(item.start_date);
    const endDate = normalizeEndDate(item.end_date);
    const duration = monthsBetween(startDate, endDate);

    const top = getPixelOffset(startDate, timelineBounds.minDate, PIXELS_PER_MONTH);
    const height = duration * PIXELS_PER_MONTH;

    return { top, height };
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            setVisibleItems((prev) => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = timelineRef.current?.querySelectorAll('[data-id]');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [items]);

  // Default colors
  const getColor = (item) => {
    if (item.color) return item.color;
    return item.category === 'work' ? '#10B981' : '#3B82F6';
  };

  // Render timeline bar
  const renderBar = (item, index, categoryItems, isWork) => {
    const { top, height } = getBarMetrics(item);
    const horizontalOffset = calculateHorizontalOffset(categoryItems, index);
    const color = getColor(item);
    const isVisible = visibleItems.has(item.id);

    return (
      <div
        key={item.id}
        data-id={item.id}
        onClick={() => setSelectedItem(item)}
        className={`absolute cursor-pointer transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{
          top: `${top}px`,
          height: `${Math.max(height, 40)}px`,
          [isWork ? 'right' : 'left']: `${horizontalOffset}px`,
          width: 'calc(100% - 40px)',
          maxWidth: '280px',
        }}
      >
        <div
          className="h-full rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden group"
          style={{
            background: `linear-gradient(135deg, ${color}15, ${color}05)`,
            borderLeft: `4px solid ${color}`,
          }}
        >
          <div className="p-4 h-full flex flex-col justify-between">
            {/* Title & Company */}
            <div>
              <h3 className="font-bold text-sm mb-1 text-gray-900 dark:text-white line-clamp-2">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                {item.company_or_school}
              </p>
            </div>

            {/* Duration */}
            <div className="text-xs font-mono text-gray-500 dark:text-gray-500">
              {formatDateRange(item.start_date, item.end_date)}
            </div>

            {/* Category badge */}
            <div className="absolute top-2 right-2">
              <span
                className="px-2 py-1 text-xs font-semibold rounded-full text-white"
                style={{ backgroundColor: color }}
              >
                {item.category === 'work' ? '💼' : '🎓'}
              </span>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        </div>
      </div>
    );
  };

  // Calculate total timeline height
  const timelineHeight = useMemo(() => {
    if (!timelineBounds) return 0;
    const totalMonths = monthsBetween(timelineBounds.minDate, timelineBounds.maxDate);
    return totalMonths * PIXELS_PER_MONTH + 200;
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
      <div ref={timelineRef} className="relative w-full max-w-7xl mx-auto p-8">
        {/* Main Timeline Container */}
        <div className="relative" style={{ height: `${timelineHeight}px` }}>
          {/* Center Vertical Line with Year Labels */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 transform -translate-x-1/2">
            {years.map((year) => {
              const yearDate = new Date(year, 0, 1);
              const offset = getPixelOffset(
                yearDate,
                timelineBounds.minDate,
                PIXELS_PER_MONTH
              );

              return (
                <div
                  key={year}
                  className="absolute left-1/2 transform -translate-x-1/2"
                  style={{ top: `${offset}px` }}
                >
                  {/* Year dot */}
                  <div className="absolute w-4 h-4 bg-white dark:bg-gray-900 border-2 border-purple-500 rounded-full left-1/2 transform -translate-x-1/2" />
                  
                  {/* Year label */}
                  <div className="absolute left-8 -translate-y-1/2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      {year}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left Column - Work */}
          <div className="absolute left-0 w-[calc(50%-40px)] top-0 bottom-0">
            <div className="sticky top-8 mb-4 text-right pr-4">
              <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
                💼 Work Experience
              </h2>
            </div>
            <div className="relative h-full">
              {workItems.map((item, index) =>
                renderBar(item, index, workItems, true)
              )}
            </div>
          </div>

          {/* Right Column - Education */}
          <div className="absolute right-0 w-[calc(50%-40px)] top-0 bottom-0">
            <div className="sticky top-8 mb-4 text-left pl-4">
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                🎓 Education
              </h2>
            </div>
            <div className="relative h-full">
              {educationItems.map((item, index) =>
                renderBar(item, index, educationItems, false)
              )}
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
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-scale-in"
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
              {formatDateRange(selectedItem.start_date, selectedItem.end_date)}
              {' • '}
              {monthsBetween(
                parseDate(selectedItem.start_date),
                normalizeEndDate(selectedItem.end_date)
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

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
