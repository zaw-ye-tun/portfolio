/**
 * Gantt Timeline Date Utilities
 * Handles date parsing, duration calculations, and formatting for vertical timeline
 */

/**
 * Parse YYYY-MM date string to Date object
 * @param {string} dateStr - Date in YYYY-MM format
 * @returns {Date} Date object set to first day of month
 */
export function parseDate(dateStr) {
  if (!dateStr || dateStr.trim() === '') return null;
  
  // Handle "Present" case
  if (/present|current|now/i.test(dateStr)) {
    return new Date();
  }
  
  const [year, month] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, 1);
}

/**
 * Normalize end date - convert "Present" to current date
 * @param {string} endDateStr - End date string (YYYY-MM or "Present")
 * @returns {Date} Date object
 */
export function normalizeEndDate(endDateStr) {
  if (!endDateStr || /present|current|now/i.test(endDateStr)) {
    return new Date();
  }
  return parseDate(endDateStr);
}

/**
 * Calculate months between two dates
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {number} Number of months
 */
export function monthsBetween(startDate, endDate) {
  if (!startDate || !endDate) return 0;
  
  const yearsDiff = endDate.getFullYear() - startDate.getFullYear();
  const monthsDiff = endDate.getMonth() - startDate.getMonth();
  
  return Math.max(1, yearsDiff * 12 + monthsDiff);
}

/**
 * Format date to readable string
 * @param {string} dateStr - Date in YYYY-MM format
 * @returns {string} Formatted date like "Apr 2022"
 */
export function formatDate(dateStr) {
  if (!dateStr || dateStr.trim() === '') return 'Present';
  
  if (/present|current|now/i.test(dateStr)) {
    return 'Present';
  }
  
  const date = parseDate(dateStr);
  if (!date) return dateStr;
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format date range for display
 * @param {string} startDate - Start date YYYY-MM
 * @param {string} endDate - End date YYYY-MM or "Present"
 * @returns {string} Formatted range like "Apr 2022 - Dec 2024"
 */
export function formatDateRange(startDate, endDate) {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return `${start} - ${end}`;
}

/**
 * Sort timeline entries by start date descending (newest first)
 * @param {Array} entries - Timeline entries with start_date field
 * @returns {Array} Sorted entries
 */
export function sortByStartDateDesc(entries) {
  return [...entries].sort((a, b) => {
    const dateA = parseDate(a.start_date);
    const dateB = parseDate(b.start_date);
    return dateB - dateA;
  });
}

/**
 * Get all years between min and max dates for year labels
 * @param {Array} entries - Timeline entries
 * @returns {Array} Array of years
 */
export function getYearRange(entries) {
  if (!entries || entries.length === 0) return [];
  
  const dates = entries.flatMap(entry => [
    parseDate(entry.start_date),
    normalizeEndDate(entry.end_date),
  ]).filter(Boolean);
  
  const minYear = Math.min(...dates.map(d => d.getFullYear()));
  const maxYear = Math.max(...dates.map(d => d.getFullYear()));
  
  const years = [];
  for (let year = minYear; year <= maxYear; year++) {
    years.push(year);
  }
  
  return years;
}

/**
 * Calculate pixel offset from timeline start
 * @param {Date} date - Date to calculate offset for
 * @param {Date} minDate - Earliest date in timeline
 * @param {number} pixelsPerMonth - Scale factor
 * @returns {number} Pixel offset
 */
export function getPixelOffset(date, minDate, pixelsPerMonth) {
  const months = monthsBetween(minDate, date);
  return months * pixelsPerMonth;
}

/**
 * Detect if two timeline items overlap
 * @param {Object} item1 - First timeline item
 * @param {Object} item2 - Second timeline item
 * @returns {boolean} True if items overlap
 */
export function hasOverlap(item1, item2) {
  const start1 = parseDate(item1.start_date);
  const end1 = normalizeEndDate(item1.end_date);
  const start2 = parseDate(item2.start_date);
  const end2 = normalizeEndDate(item2.end_date);
  
  return start1 <= end2 && end1 >= start2;
}

/**
 * Calculate horizontal offset for overlapping items
 * @param {Array} items - All items in same category
 * @param {number} currentIndex - Index of current item
 * @returns {number} Horizontal offset in pixels
 */
export function calculateHorizontalOffset(items, currentIndex) {
  const currentItem = items[currentIndex];
  let offset = 0;
  
  // Check all previous items in same category
  for (let i = 0; i < currentIndex; i++) {
    if (hasOverlap(items[i], currentItem)) {
      offset += 20; // Stack overlapping items
    }
  }
  
  return Math.min(offset, 60); // Max 3 levels of stacking
}
