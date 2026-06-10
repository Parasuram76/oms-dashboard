import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('oms_dashboard_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('oms_dashboard_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return <Dashboard theme={theme} toggleTheme={toggleTheme} />;
}

export default App;
