import React from 'react';

// Minimal mock IssueCard so Browse.jsx doesn't crash.
// Member 4 is supposed to build this.
const IssueCard = ({ issue }) => {
  return (
    <div className="bg-white p-4 rounded shadow border border-gray-200">
      <h3 className="font-bold text-lg">{issue.title}</h3>
      <p className="text-sm text-gray-500 mb-2">{issue.category} - {issue.location}</p>
      <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
        {issue.status}
      </span>
      <p className="mt-2 text-gray-700 text-sm">{issue.description}</p>
    </div>
  );
};

export default IssueCard;
