import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { moodOptions } from '../constants/moodOptions';

const MoodStats = ({ entries }) => {
  const [timeRange, setTimeRange] = useState('month'); // 'week', 'month', 'year'
  
  // Filter entries based on time range
  const filteredEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    const currentDate = new Date();
    
    if (timeRange === 'week') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(currentDate.getDate() - 7);
      return entryDate >= oneWeekAgo;
    } else if (timeRange === 'month') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(currentDate.getMonth() - 1);
      return entryDate >= oneMonthAgo;
    } else if (timeRange === 'year') {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
      return entryDate >= oneYearAgo;
    }
    
    return true;
  });

  // Prepare data for the line chart
  const lineChartData = filteredEntries
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(entry => {
      // Find the mood index for the y-axis (higher index = better mood)
      const moodIndex = entry.mood ? moodOptions.findIndex(m => m.id === entry.mood.id) : -1;
      
      return {
        date: entry.date,
        moodIndex: moodIndex >= 0 ? moodIndex : null,
        moodLabel: entry.mood?.label || 'Unknown'
      };
    });

  // Calculate mood distribution for pie chart
  const moodCounts = filteredEntries.reduce((acc, entry) => {
    if (entry.mood) {
      acc[entry.mood.label] = (acc[entry.mood.label] || 0) + 1;
    }
    return acc;
  }, {});

  const pieChartData = Object.keys(moodCounts).map(mood => ({
    name: mood,
    value: moodCounts[mood]
  }));

  // Find the most common mood
  let mostCommonMood = { mood: 'None', count: 0 };
  for (const [mood, count] of Object.entries(moodCounts)) {
    if (count > mostCommonMood.count) {
      mostCommonMood = { mood, count };
    }
  }

  // Find the mood option for the most common mood to get color and emoji
  const mostCommonMoodInfo = moodOptions.find(m => m.label === mostCommonMood.mood);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">Mood Statistics</h2>
        
        <div className="flex items-center space-x-2">
          <button
            className={`px-4 py-2 rounded-lg ${timeRange === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${timeRange === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${timeRange === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            onClick={() => setTimeRange('year')}
          >
            Year
          </button>
        </div>
      </div>
      
      {filteredEntries.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">No mood data available for the selected time period.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold mb-3">Mood Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieChartData.map((entry, index) => {
                        const matchingMood = moodOptions.find(m => m.label === entry.name);
                        return <Cell key={`cell-${index}`} fill={matchingMood?.bgColor || `#${Math.floor(Math.random()*16777215).toString(16)}`} />;
                      })}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold mb-4">Mood Summary</h3>
              
              <div className="mb-4">
                <p className="text-gray-600 dark:text-gray-400 mb-1">Entries in time period:</p>
                <p className="text-xl font-bold">{filteredEntries.length}</p>
              </div>
              
              {mostCommonMoodInfo && (
                <div className="mb-4">
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Most common mood:</p>
                  <div className="flex items-center">
                    <div 
                      className="p-2 rounded-full mr-2" 
                      style={{ backgroundColor: mostCommonMoodInfo.bgColor }}
                    >
                      <span className="text-2xl">{mostCommonMoodInfo.emoji}</span>
                    </div>
                    <div>
                      <p className="font-bold">{mostCommonMood.mood}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {mostCommonMood.count} entries ({Math.round((mostCommonMood.count / filteredEntries.length) * 100)}%)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-3">Mood Over Time</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={lineChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis 
                    domain={[0, moodOptions.length - 1]} 
                    ticks={moodOptions.map((_, index) => index)} 
                    tickFormatter={(value) => {
                      return moodOptions[value]?.label || '';
                    }}
                  />
                  <Tooltip 
                    labelFormatter={(value) => `Date: ${value}`}
                    formatter={(value, name) => {
                      return [moodOptions[value]?.label || 'Unknown', 'Mood'];
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="moodIndex" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                    name="Mood"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MoodStats;