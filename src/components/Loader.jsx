import React from 'react';

const Loader = ({ message = 'Loading order data...' }) => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{message}</p>
    </div>
  );
};

export default Loader;
