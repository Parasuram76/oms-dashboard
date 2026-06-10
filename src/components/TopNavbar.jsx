import React from 'react';
import { Search, Bell, Calendar, Settings, Grid, Sun, Moon } from 'lucide-react';

const TopNavbar = ({ onSearchClick, theme, toggleTheme }) => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="menu-trigger" aria-label="Open Menu">
          <Grid size={20} />
        </button>
        <div className="logo-container">Aludecor</div>
      </div>
      <div className="navbar-right">
        <button 
          className="nav-icon-btn" 
          onClick={onSearchClick}
          title="Search Order Records"
          aria-label="Search"
        >
          <Search size={18} />
        </button>
        
        <button 
          className="nav-icon-btn" 
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>
        
        <button 
          className="nav-icon-btn" 
          title="Calendar Events"
          aria-label="Calendar"
        >
          <Calendar size={18} />
        </button>

        <button 
          className="nav-icon-btn" 
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button 
          className="nav-icon-btn" 
          title="Settings"
          aria-label="Settings"
        >
          <Settings size={18} />
        </button>
        
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" 
          alt="User Avatar" 
          className="avatar" 
          title="Profile Settings"
        />
      </div>
    </header>
  );
};

export default TopNavbar;
