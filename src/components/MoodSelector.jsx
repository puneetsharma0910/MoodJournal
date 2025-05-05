import React from 'react';
import { moodOptions } from '../constants/moodOptions';

const MoodSelector = ({ selectedMood, onMoodSelect }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {moodOptions.map((mood) => (
        <button
          key={mood.id}
          onClick={() => onMoodSelect(mood)}
          className={`mood-option flex flex-col items-center p-4 rounded-lg cursor-pointer ${
            selectedMood && selectedMood.id === mood.id
              ? 'selected ring-2 ring-offset-2 ring-blue-500'
              : ''
          }`}
          style={{ backgroundColor: mood.bgColor }}
        >
          <span className="text-3xl mb-2">{mood.emoji}</span>
          <span className="font-medium text-sm">{mood.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;