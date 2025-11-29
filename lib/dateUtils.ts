/**
 * Date utility functions for timeline formatting
 */

/**
 * Format a date string (YYYY-MM) to a readable format
 * @param dateStr - Date string in YYYY-MM format
 * @returns Formatted date like "Mar 2021"
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return 'Present';
  
  try {
    // Parse YYYY-MM format
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  } catch (error) {
    return dateStr;
  }
}

/**
 * Format a date range for timeline display
 * @param startDate - Start date in YYYY-MM format
 * @param endDate - End date in YYYY-MM format (optional)
 * @returns Formatted range like "Mar 2021 - Dec 2024" or "Mar 2021 - Present"
 */
export function formatDateRange(startDate: string, endDate?: string): string {
  const start = formatDate(startDate);
  
  if (!endDate || endDate.trim() === '') {
    return `${start} - Present`;
  }
  
  const end = formatDate(endDate);
  return `${start} - ${end}`;
}

/**
 * Parse YYYY-MM date string to Date object
 * @param dateStr - Date string in YYYY-MM format
 * @returns Date object
 */
export function parseDate(dateStr: string): Date {
  const [year, month] = dateStr.split('-');
  return new Date(parseInt(year), parseInt(month) - 1, 1);
}

/**
 * Check if a date range is currently ongoing
 * @param endDate - End date in YYYY-MM format (optional)
 * @returns true if no end date or end date is in the future
 */
export function isOngoing(endDate?: string): boolean {
  if (!endDate || endDate.trim() === '') return true;
  
  try {
    const end = parseDate(endDate);
    return end > new Date();
  } catch {
    return false;
  }
}
