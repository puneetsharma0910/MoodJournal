import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar.jsx';
import MoodSelector from './components/MoodSelector';
import WeatherDisplay from './components/WeatherDisplay';
import NoteInput from './components/NoteInput';
import CalendarView from './components/CalendarView';
import MoodStats from './components/MoodStats';
import { getCurrentDateString } from './utils/dateUtils';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeView, setActiveView] = useState('journal'); // 'journal', 'calendar', 'stats'
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({
    date: getCurrentDateString(),
    mood: null,
    note: '',
    weather: null
  });
  
  // Load entries from localStorage on initial render
  useEffect(() => {
    const savedEntries = localStorage.getItem('moodEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(entries));
  }, [entries]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Update current entry mood
  const handleMoodSelect = (mood) => {
    setCurrentEntry({
      ...currentEntry,
      mood
    });
  };

  // Update current entry note
  const handleNoteChange = (note) => {
    setCurrentEntry({
      ...currentEntry,
      note
    });
  };

  // Update weather data
  const handleWeatherUpdate = (weatherData) => {
    setCurrentEntry({
      ...currentEntry,
      weather: weatherData
    });
  };

  // Save the current entry
  const saveEntry = () => {
    // Check if we already have an entry for today
    const todayEntryIndex = entries.findIndex(entry => entry.date === currentEntry.date);
    
    if (todayEntryIndex >= 0) {
      // Update existing entry
      const updatedEntries = [...entries];
      updatedEntries[todayEntryIndex] = currentEntry;
      setEntries(updatedEntries);
    } else {
      // Add new entry
      setEntries([...entries, currentEntry]);
    }
    
    // Show success notification (could be improved with a proper notification system)
    alert('Entry saved successfully!');
  };

  // Export entries as CSV
  const exportEntries = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Date,Mood,Weather,Temperature,Note\n" + 
      entries.map(entry => {
        return `${entry.date},${entry.mood?.label || ''},${entry.weather?.weather[0]?.main || ''},${entry.weather?.main?.temp || ''},${entry.note}`;
      }).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "mood-journal.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="flex flex-col md:flex-row">
        <Sidebar 
          activeView={activeView} 
          setActiveView={setActiveView} 
          darkMode={darkMode} 
          exportEntries={exportEntries}
        />
        
        <main className="flex-1 p-4">
          {activeView === 'journal' && (
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Today's Entry</h2>
              <p className="text-lg mb-4">{currentEntry.date}</p>
              
              <WeatherDisplay onWeatherUpdate={handleWeatherUpdate} />
              
              <div className="my-6">
                <h3 className="text-lg font-medium mb-2">How are you feeling today?</h3>
                <MoodSelector selectedMood={currentEntry.mood} onMoodSelect={handleMoodSelect} />
              </div>
              
              <div className="my-6">
                <NoteInput value={currentEntry.note} onChange={handleNoteChange} />
              </div>
              
              <button 
                onClick={saveEntry}
                disabled={!currentEntry.mood}
                className={`px-4 py-2 rounded-lg ${
                  currentEntry.mood 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : 'bg-gray-300 cursor-not-allowed text-gray-500'
                }`}
              >
                Save Entry
              </button>
            </div>
          )}
          
          {activeView === 'calendar' && (
            <CalendarView entries={entries} />
          )}
          
          {activeView === 'stats' && (
            <MoodStats entries={entries} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;