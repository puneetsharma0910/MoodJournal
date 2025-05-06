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
  
 
  useEffect(() => {
    const savedEntries = localStorage.getItem('moodEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(entries));
  }, [entries]);

  //  dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  //  current entry mood
  const handleMoodSelect = (mood) => {
    setCurrentEntry({
      ...currentEntry,
      mood
    });
  };

  //  current entry note
  const handleNoteChange = (note) => {
    setCurrentEntry({
      ...currentEntry,
      note
    });
  };

  //
  const handleWeatherUpdate = (weatherData) => {
    setCurrentEntry({
      ...currentEntry,
      weather: weatherData
    });
  };

  const saveEntry = () => {

    const todayEntryIndex = entries.findIndex(entry => entry.date === currentEntry.date);
    
    if (todayEntryIndex >= 0) {
      
      const updatedEntries = [...entries];
      updatedEntries[todayEntryIndex] = currentEntry;
      setEntries(updatedEntries);
    } else {
    
      setEntries([...entries, currentEntry]);
    }
    
    
    alert('Entry saved successfully!');
  };


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
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
        <Sidebar 
          activeView={activeView} 
          setActiveView={setActiveView} 
          darkMode={darkMode} 
          exportEntries={exportEntries}
        />
        
        <main className="flex-1 p-6 md:p-8">
          {activeView === 'journal' && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Today's Entry</h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{currentEntry.date}</p>
                  </div>
                  <WeatherDisplay onWeatherUpdate={handleWeatherUpdate} />
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">How are you feeling today?</h3>
                    <MoodSelector selectedMood={currentEntry.mood} onMoodSelect={handleMoodSelect} />
                  </div>
                  
                  <div>
                    <NoteInput value={currentEntry.note} onChange={handleNoteChange} />
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      onClick={saveEntry}
                      disabled={!currentEntry.mood}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                        currentEntry.mood 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5' 
                          : 'bg-gray-300 cursor-not-allowed text-gray-500'
                      }`}
                    >
                      Save Entry
                    </button>
                  </div>
                </div>
              </div>
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