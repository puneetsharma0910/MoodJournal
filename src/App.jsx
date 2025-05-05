import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MoodSelector from './components/MoodSelector';
import WeatherDisplay from './components/WeatherDisplay';
import NoteInput from './components/NoteInput';
import CalendarView from './components/CalendarView';
import MoodStats from './components/MoodStats';
import { formatDateKey } from './utils/dateUtils';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [currentDate] = useState(new Date());
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeView, setActiveView] = useState('today');
  const [entries, setEntries] = useLocalStorage('moodEntries', []);
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [moodFilter, setMoodFilter] = useState('all');
  
  const todayKey = formatDateKey(currentDate);
  
  // Check for today's entry on initial render
  useEffect(() => {
    const todayEntry = entries.find(entry => entry.date === todayKey);
    
    if (todayEntry) {
      setSelectedMood(todayEntry.mood);
      setNote(todayEntry.note);
    }
  }, [entries, todayKey]);
  
  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  // Save the current mood entry
  const saveMoodEntry = (weather) => {
    if (!selectedMood) {
      alert("Please select a mood before saving.");
      return;
    }
    
    const newEntry = {
      date: todayKey,
      mood: selectedMood,
      note: note,
      weather: weather ? {
        temp: weather.main.temp,
        description: weather.weather[0].main,
        icon: weather.weather[0].icon
      } : null
    };
    
    // Check if we're updating an existing entry
    const existingEntryIndex = entries.findIndex(entry => entry.date === todayKey);
    
    if (existingEntryIndex >= 0) {
      // Update existing entry
      const updatedEntries = [...entries];
      updatedEntries[existingEntryIndex] = newEntry;
      setEntries(updatedEntries);
    } else {
      // Add new entry
      setEntries([...entries, newEntry]);
    }
    
    // Show confirmation
    alert("Your mood has been saved!");
  };
  
  // Get background color based on selected mood
  const getBgColor = () => {
    if (!selectedMood || activeView !== 'today') return 'bg-white dark:bg-gray-800';
    return `${selectedMood.color} dark:bg-gray-800`;
  };
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${getBgColor()}`}>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 right-4 md:hidden z-50">
        <button 
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg"
        >
          {showMobileMenu ? 'X' : '☰'}
        </button>
      </div>
      
      {/* Sidebar */}
      <Sidebar 
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
        activeView={activeView}
        setActiveView={setActiveView}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        entries={entries}
      />
      
      {/* Main Content */}
      <div className="md:pl-64">
        <div className="max-w-4xl mx-auto p-6">
          <Header currentDate={currentDate} activeView={activeView} />
          
          {/* Today's Entry Section */}
          {activeView === 'today' && (
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 animate-fadeIn">
              {/* Weather Display */}
              <WeatherDisplay saveMoodEntry={saveMoodEntry} />
              
              {/* Mood Selection */}
              <MoodSelector 
                selectedMood={selectedMood} 
                setSelectedMood={setSelectedMood} 
              />
              
              {/* Note Input */}
              <NoteInput note={note} setNote={setNote} />
            </div>
          )}
          
          {/* Calendar View */}
          {activeView === 'calendar' && (
            <CalendarView 
              entries={entries} 
              moodFilter={moodFilter}
              setMoodFilter={setMoodFilter}
            />
          )}
          
          {/* Stats View */}
          {activeView === 'stats' && (
            <MoodStats entries={entries} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;