/**
 * Format date to YYYY-MM-DD for storage keys
 * @param {Date} date - Date object to format
 * @returns {string} Formatted date string
 */
export const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };
  
  /**
   * Format date for display
   * @param {string} dateString - Date string in YYYY-MM-DD format
   * @returns {string} Formatted date for display
   */
  export const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric'
    });
  };
  
  /**
   * Get days in the current month
   * @param {number} month - Month (0-11)
   * @param {number} year - Year
   * @returns {number} Number of days in the month
   */
  export const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  /**
   * Get the first day of the month
   * @param {number} month - Month (0-11)
   * @param {number} year - Year
   * @returns {number} Day of week (0-6, where 0 is Sunday)
   */
  export const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };
  
  /**
   * Check if a date is today
   * @param {string} dateString - Date string in YYYY-MM-DD format
   * @returns {boolean} True if date is today
   */
  export const isToday = (dateString) => {
    const today = formatDateKey(new Date());
    return dateString === today;
  };
  
  /**
   * Get calendar grid for a month
   * @param {number} month - Month (0-11)
   * @param {number} year - Year
   * @returns {Array} Array of date objects for the calendar
   */
  export const getCalendarDates = (month, year) => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const calendarDates = [];
    
    // Previous month filler dates
    for (let i = 0; i < firstDay; i++) {
      calendarDates.push({ 
        date: null, 
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    // Current month dates
    const today = formatDateKey(new Date());
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateKey = formatDateKey(date);
      
      calendarDates.push({
        date: dateKey,
        day: i,
        isCurrentMonth: true,
        isToday: dateKey === today
      });
    }
    
    return calendarDates;
  };