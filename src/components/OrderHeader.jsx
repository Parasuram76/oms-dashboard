import React, { useState, useRef, useEffect } from 'react';
import { Printer, RotateCw, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import ActionDropdown from './ActionDropdown';

const OrderHeader = ({ orderId, status, onStatusChange, onRefresh, onAction }) => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statusRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setIsStatusOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStatusSelect = (newStatus) => {
    setIsStatusOpen(false);
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
  };

  const statusOptions = ['In Process', 'Pending', 'Approved', 'Completed', 'Cancelled'];

  return (
    <div className="order-header-wrapper">
      <div className="breadcrumbs">
        <a href="#dashboard">Dashboard</a>
        <span className="separator">/</span>
        <a href="#production">Production order</a>
        <span className="separator">/</span>
        <a href="#order-link">OD-#-1001</a>
        <span className="separator">&gt;&gt;</span>
        <span className="active-crumb">{orderId}</span>
      </div>

      <div className="order-header-container">
        <div className="order-header-left">
          <h1 className="order-title">{orderId}</h1>
          <StatusBadge status={status} />
        </div>

        <div className="order-header-right">
          <button 
            className="btn-icon" 
            onClick={() => window.print()} 
            title="Print Order Sheet"
            aria-label="Print"
          >
            <Printer size={16} />
          </button>
          
          <button 
            className="btn-icon" 
            onClick={onRefresh} 
            title="Refresh Dashboard Data"
            aria-label="Refresh"
          >
            <RotateCw size={16} />
          </button>

          {/* Status Dropdown */}
          <div className="dropdown-container" ref={statusRef}>
            <button 
              className="btn-dropdown" 
              onClick={() => setIsStatusOpen(!isStatusOpen)}
              aria-expanded={isStatusOpen}
            >
              <span>Status</span>
              <ChevronDown size={14} />
            </button>
            {isStatusOpen && (
              <div className="dropdown-menu">
                {statusOptions.map((opt) => (
                  <button 
                    key={opt} 
                    className="dropdown-item" 
                    onClick={() => handleStatusSelect(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Dropdown */}
          <ActionDropdown onAction={onAction} />

          {/* Navigation controls */}
          <button className="btn-icon" title="Previous Order" aria-label="Previous">
            <ChevronLeft size={16} />
          </button>
          <button className="btn-icon" title="Next Order" aria-label="Next">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;
