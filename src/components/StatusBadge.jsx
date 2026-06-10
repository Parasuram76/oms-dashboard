import React from 'react';

const StatusBadge = ({ status }) => {
  const getBadgeClass = () => {
    switch (status?.toLowerCase()) {
      case 'in process':
        return 'badge-in-process';
      case 'pending':
        return 'badge-pending';
      case 'completed':
      case 'approved':
        return 'badge-completed';
      case 'cancelled':
        return 'badge-cancelled';
      default:
        return 'badge-pending';
    }
  };

  return (
    <span className={`badge ${getBadgeClass()}`}>
      {status?.toLowerCase() === 'in process' && <span className="badge-dot" />}
      {status}
    </span>
  );
};

export default StatusBadge;
