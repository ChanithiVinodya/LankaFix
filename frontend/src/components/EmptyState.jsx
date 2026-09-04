import React from 'react';

const EmptyState = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
      <svg 
        className="w-16 h-16 text-gray-400 mb-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">No issues found</h3>
      <p className="text-gray-500 mb-6 max-w-md">
        We couldn't find any community issues matching your search and filter criteria. Try adjusting your filters or search terms.
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;
