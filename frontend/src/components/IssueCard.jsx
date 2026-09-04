import React from 'react';
import StatusBadge from './StatusBadge';

const IssueCard = ({ issue, onUpdateStatus }) => {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-gray-800">{issue.title}</h3>
        <StatusBadge status={issue.status} />
      </div>
      <p className="text-gray-600 mb-4 line-clamp-2">{issue.description}</p>
      
      <div className="flex justify-between items-center text-xs text-gray-500 font-medium mb-4">
        <span>ID: {issue.id}</span>
        <span>{new Date(issue.createdAt || issue.dateReported).toLocaleDateString()}</span>
      </div>

      {onUpdateStatus && issue.status !== 'Resolved' && (
        <div className="flex gap-2 pt-3 border-t">
          {issue.status === 'Unseen' && (
            <button 
              onClick={() => onUpdateStatus(issue.id, 'Open')}
              className="text-xs bg-purple-50 text-purple-700 px-3 py-1.5 rounded hover:bg-purple-100 font-semibold transition-colors"
            >
              Mark as Open
            </button>
          )}
          {issue.status === 'Open' && (
            <button 
              onClick={() => onUpdateStatus(issue.id, 'In Progress')}
              className="text-xs bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded hover:bg-yellow-100 font-semibold transition-colors"
            >
              Mark In Progress
            </button>
          )}
          {issue.status === 'In Progress' && (
            <button 
              onClick={() => onUpdateStatus(issue.id, 'Resolved')}
              className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded hover:bg-green-100 font-semibold transition-colors"
            >
              Mark Resolved
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default IssueCard;
