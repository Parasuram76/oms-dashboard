import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus } from 'lucide-react';

const ActionDropdown = ({ onAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (action) => {
    setIsOpen(false);
    if (onAction) {
      onAction(action);
    }
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button 
        className="btn-primary" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>Action</span>
        <Plus size={14} />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <button className="dropdown-item" onClick={() => handleItemClick('refresh')}>
            Refresh Data
          </button>
          <button className="dropdown-item" onClick={() => handleItemClick('export')}>
            Export JSON
          </button>
          <button className="dropdown-item" onClick={() => handleItemClick('print')}>
            Print Page
          </button>
          <button className="dropdown-item" onClick={() => handleItemClick('download')}>
            Download Data
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionDropdown;
