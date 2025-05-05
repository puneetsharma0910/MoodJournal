import React from 'react';

const NoteInput = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="note" className="block text-lg font-medium mb-2">Notes for today</label>
      <textarea
        id="note"
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none dark:bg-gray-700 dark:text-white"
        rows="4"
        placeholder="Write your thoughts, feelings, or anything notable about today..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
    </div>
  );
};

export default NoteInput;