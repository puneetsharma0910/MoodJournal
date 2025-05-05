import React from 'react';
import WeatherIcon from './WeatherIcon';
import { formatDate } from '../utils/dateUtils';

const EntryCard = ({ entry, onClose }) => {
  const { date, mood, note, weather } = entry;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center mb-3">
          <span className="text-lg font-medium">{formatDate(date)}</span>
          {mood && (
            <div 
              className="ml-3 p-1 rounded-full flex items-center" 
              style={{ backgroundColor: mood.bgColor }}
            >
              <span className="text-xl mr-1">{mood.emoji}</span>
              <span className="text-sm font-medium mr-1">{mood.label}</span>
            </div>
          )}
        </div>
        
        {onClose && (
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
      
      {weather && (
        <div className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg mb-3">
          <WeatherIcon condition={weather.weather[0].main} />
          <div className="ml-3">
            <div className="flex items-center">
              <p className="font-medium">{Math.round(weather.main.temp)}°C</p>
              <p className="ml-2 text-gray-600 dark:text-gray-300">{weather.weather[0].main}</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {weather.name}
            </p>
          </div>
        </div>
      )}
      
      {note && (
        <div className="mt-3">
          <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{note}</p>
        </div>
      )}
    </div>
  );
};

export default EntryCard;