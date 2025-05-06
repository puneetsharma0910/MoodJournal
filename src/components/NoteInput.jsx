import React from 'react';

const NoteInput = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <label htmlFor="note" className="block text-lg font-semibold text-gray-700 dark:text-gray-200">
        Notes for today
      </label>
      <div className="relative">
        <textarea
          id="note"
          className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none dark:bg-gray-700 dark:text-white transition-all duration-200 min-h-[150px] placeholder-gray-400 dark:placeholder-gray-500"
          placeholder="Write your thoughts, feelings, or anything notable about today..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="absolute bottom-3 right-3 text-sm text-gray-400 dark:text-gray-500">
          {value.length} characters
        </div>
      </div>
    </div>
  );
};

export default NoteInput;