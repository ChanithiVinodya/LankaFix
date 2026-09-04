import React from 'react';

const StatusBadge = ({ status }) => {
  const getBadgeStyles = () => {
    switch (status) {
      case 'Unseen':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Open':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Resolved':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getBadgeStyles()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
