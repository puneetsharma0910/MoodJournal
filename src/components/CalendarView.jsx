import React, { useState, useEffect } from 'react';
import EntryCard from './EntryCard';

const CalendarView = ({ entries }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [moodFilter, setMoodFilter] = useState('all');

  // Get all unique mood types from entries
  const moodTypes = ['all', ...new Set(entries.map(entry => entry.mood?.label).filter(Boolean))];

  useEffect(() => {
    generateCalendarDays();
    
    // Filter entries based on selected mood
    if (moodFilter === 'all') {
      setFilteredEntries(entries);
    } else {
      setFilteredEntries(entries.filter(entry => entry.mood?.label === moodFilter));
    }
  }, [currentDate, entries, moodFilter]);

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();
    
    // Get the last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const totalDays = lastDayOfMonth.getDate();
    
    // Generate array of days
    const days = [];
    
    // Add empty days for the start of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ day: null, date: null });
    }
    
    // Add actual days
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i);
      const dateString = date.toISOString().split('T')[0];
      const entry = entries.find(e => e.date === dateString);
      
      days.push({
        day: i,
        date: dateString,
        entry
      });
    }
    
    setDaysInMonth(days);
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleDayClick = (day) => {
    if (day.entry) {
      setSelectedEntry(day.entry);
    }
  };

  const getMonthName = () => {
    return currentDate.toLocaleString('default', { month: 'long' });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">Journal Calendar</h2>
        
        <div className="flex items-center space-x-4">
          <label htmlFor="mood-filter" className="font-medium">Filter by mood:</label>
          <select
            id="mood-filter"
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 dark:bg-gray-700"
            value={moodFilter}
            onChange={(e) => setMoodFilter(e.target.value)}
          >
            {moodTypes.map((mood) => (
              <option key={mood} value={mood}>{mood}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <h3 className="text-lg font-semibold">
            {getMonthName()} {currentDate.getFullYear()}
          </h3>
          
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-7 text-center border-b border-gray-200 dark:border-gray-700">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="py-2 font-medium text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 text-center">
          {daysInMonth.map((day, index) => (
            <div
              key={index}
              className={`calendar-day p-2 h-24 border border-gray-100 dark:border-gray-700 ${
                day.day ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700' : ''
              }`}
              onClick={() => day.day && handleDayClick(day)}
            >
              {day.day ? (
                <>
                  <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                    {day.day}
                  </div>
                  {day.entry && (
                    <div
                      className="mt-1 p-1 rounded-full w-8 h-8 mx-auto flex items-center justify-center"
                      style={{ backgroundColor: day.entry.mood?.bgColor }}
                    >
                      <span>{day.entry.mood?.emoji}</span>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      
      {selectedEntry && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Entry Details</h3>
          <EntryCard entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
        </div>
      )}
      
      {filteredEntries.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">
            {moodFilter === 'all' ? 'All Entries' : `Entries when feeling "${moodFilter}"`}
          </h3>
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <EntryCard key={entry.date} entry={entry} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;