import React from 'react';
import StatusBadge from './StatusBadge';

const IssueCard = ({ issue }) => {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-gray-800">{issue.title}</h3>
        <StatusBadge status={issue.status} />
      </div>
      <p className="text-gray-600 mb-4 line-clamp-2">{issue.description}</p>
      <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
        <span>ID: {issue.id}</span>
        <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default IssueCard;
