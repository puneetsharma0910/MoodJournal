import React from 'react';
import { moodOptions } from '../constants/moodOptions';

const MoodSelector = ({ selectedMood, onMoodSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {moodOptions.map((mood) => (
        <button
          key={mood.id}
          onClick={() => onMoodSelect(mood)}
          className={`group relative flex flex-col items-center p-4 rounded-xl transition-all duration-200 ${
            selectedMood && selectedMood.id === mood.id
              ? 'ring-2 ring-offset-2 ring-blue-500 transform scale-105'
              : 'hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
          style={{ backgroundColor: selectedMood && selectedMood.id === mood.id ? mood.bgColor : 'transparent' }}
        >
          <div className="relative">
            <span className="text-4xl mb-2 transform transition-transform duration-200 group-hover:scale-110">
              {mood.emoji}
            </span>
            {selectedMood && selectedMood.id === mood.id && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
          <span className={`font-medium text-sm transition-colors duration-200 ${
            selectedMood && selectedMood.id === mood.id
              ? 'text-white'
              : 'text-gray-700 dark:text-gray-200'
          }`}>
            {mood.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;