/**
 * Get the current date string in YYYY-MM-DD format
 * @returns {string} Date string in YYYY-MM-DD format
 */
export const getCurrentDateString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  
  /**
   * Format a date string into a more readable format
   * @param {string} dateString - Date string in YYYY-MM-DD format
   * @returns {string} Formatted date string
   */
  export const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  /**
   * Get the day name from a date string
   * @param {string} dateString - Date string in YYYY-MM-DD format
   * @returns {string} Day name (e.g., "Monday")
   */
  export const getDayName = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };
  
  /**
   * Compare two date strings to check if they are the same day
   * @param {string} date1 - First date string in YYYY-MM-DD format
   * @param {string} date2 - Second date string in YYYY-MM-DD format
   * @returns {boolean} True if dates are the same day
   */
  export const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1 === date2;
  };