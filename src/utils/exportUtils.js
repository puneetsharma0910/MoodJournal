/**
 * Export mood journal entries as a CSV file
 * @param {Array} entries - Array of journal entries
 */
export const exportAsCSV = (entries) => {
    // Header row
    const csvRows = [
      ['Date', 'Mood', 'Weather', 'Temperature', 'Note'].join(',')
    ];
    
    // Data rows
    entries.forEach(entry => {
      const row = [
        entry.date,
        entry.mood?.label || '',
        entry.weather?.weather[0]?.main || '',
        entry.weather?.main?.temp ? `${Math.round(entry.weather.main.temp)}°C` : '',
        // Escape quotes in notes to avoid CSV parsing issues
        `"${entry.note?.replace(/"/g, '""') || ''}"`
      ];
      
      csvRows.push(row.join(','));
    });
    
    // Create CSV content
    const csvContent = csvRows.join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `mood-journal-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    // Add to DOM, trigger download, and clean up
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  /**
   * Export mood journal entries as a PDF file
   * @param {Array} entries - Array of journal entries
   */
  export const exportAsPDF = (entries) => {
    // This is a placeholder for PDF export functionality
    // In a real implementation, you would use a library like jsPDF
    
    alert('PDF export functionality not implemented yet.');
  };