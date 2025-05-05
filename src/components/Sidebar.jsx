import React from 'react';

const Sidebar = ({ activeView, setActiveView, darkMode, exportEntries }) => {
  const navItems = [
    { id: 'journal', label: 'Today\'s Entry', icon: '📝' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'stats', label: 'Stats', icon: '📊' }
  ];

  return (
    <aside className={`w-full md:w-64 p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center p-3 rounded-lg ${
                  activeView === item.id
                    ? `${darkMode ? 'bg-blue-900' : 'bg-blue-100'} text-blue-600`
                    : `${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`
                }`}
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-8 pt-4 border-t border-gray-300 dark:border-gray-600">
        <button 
          onClick={exportEntries}
          className="w-full flex items-center p-3 rounded-lg text-green-600 hover:bg-green-100 dark:hover:bg-green-900"
        >
          <span className="mr-3 text-xl">📤</span>
          <span className="font-medium">Export Journal</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;