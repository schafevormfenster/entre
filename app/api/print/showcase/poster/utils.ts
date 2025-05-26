/**
 * Formats an ISO date string (YYYY-MM-DD) to a readable German format (DD.MM.YYYY)
 * @param dateStr - ISO format date string
 * @returns Formatted date string
 */
export function formatEventDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (e) {
    console.error("Invalid date format:", dateStr);
    return dateStr;
  }
}

/**
 * Gets the weekday from an ISO date string (YYYY-MM-DD)
 * @param dateStr - ISO format date string
 * @returns Abbreviated weekday name in German (Mo, Di, Mi, etc.)
 */
export function getWeekday(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('de-DE', { weekday: 'short' });
  } catch (e) {
    console.error("Invalid date format:", dateStr);
    return '';
  }
}

/**
 * Gets the day number from an ISO date string (YYYY-MM-DD)
 * @param dateStr - ISO format date string
 * @returns Day of month as a number string
 */
export function getDayNumber(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('de-DE', { day: 'numeric' });
  } catch (e) {
    console.error("Invalid date format:", dateStr);
    return '';
  }
}

/**
 * Gets the month name from an ISO date string (YYYY-MM-DD)
 * @param dateStr - ISO format date string
 * @returns Month name in German
 */
export function getMonthName(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('de-DE', { month: 'long' });
  } catch (e) {
    console.error("Invalid date format:", dateStr);
    return '';
  }
}
