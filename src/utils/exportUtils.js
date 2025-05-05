/**
 * Export entries as CSV file
 * @param {Array} entries - Array of mood entries
 */
export const exportAsCSV = (entries) => {
    if (entries.length === 0) {
      alert('No entries to export');
      return;
    }
    
    // Create CSV content
    let csvContent = "Date,Mood,Weather,Temperature,Note\n";
    
    entries.forEach(entry => {
      const weatherDesc = entry.weather ? entry.weather.description : "N/A";
      const temp = entry.weather ? `${entry.weather.temp}°C` : "N/A";
      // Handle quotes in notes (escape by doubling them)
      const safeNote = entry.note ? `"${entry.note.replace(/"/g, '""')}"` : "";
      
      csvContent += `${entry.date},${entry.mood.name},${weatherDesc},${temp},${safeNote}\n`;
    });
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mood-journal-export.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  /**
   * Group entries by mood
   * @param {Array} entries - Array of mood entries
   * @returns {Object} Grouped entries by mood
   */
  export const groupEntriesByMood = (entries) => {
    const grouped = {};
    
    entries.forEach(entry => {
      const mood = entry.mood.name;
      if (!grouped[mood]) {
        grouped[mood] = [];
      }
      grouped[mood].push(entry);
    });
    
    return grouped;
  };
  
  /**
   * Calculate mood frequency percentages
   * @param {Array} entries - Array of mood entries
   * @returns {Array} Array of mood frequencies with percentages
   */
  export const calculateMoodPercentages = (entries) => {
    if (entries.length === 0) return [];
    
    const grouped = groupEntriesByMood(entries);
    const results = [];
    
    Object.keys(grouped).forEach(mood => {
      const count = grouped[mood].length;
      const percentage = Math.round((count / entries.length) * 100);
      
      results.push({
        mood,
        count,
        percentage
      });
    });
    
    // Sort by count (descending)
    return results.sort((a, b) => b.count - a.count);
  };