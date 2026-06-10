import React from 'react';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'detail', label: 'Detail' },
    { id: 'offers', label: 'Offers & Coupon' },
    { id: 'module', label: 'Module' },
    { id: 'stock', label: 'Stock Reservation' },
    { id: 'documents', label: 'Documents' },
    { id: 'info', label: 'Info' },
    { id: 'comment', label: 'Comment' },
    { id: 'timeline', label: 'Timeline' }
  ];

  return (
    <nav className="tabs-bar" aria-label="Order Management Tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          role="tab"
          aria-selected={activeTab === tab.id}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default TabNavigation;
