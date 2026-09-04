import React, { useState, useEffect } from 'react';
import IssueCard from '../components/IssueCard';

const Stats = () => {
  const [data, setData] = useState({ total: 0, open: 0, inProgress: 0, resolved: 0, issues: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/stats`)
      .then(res => res.json())
      .then(fetchedData => {
        setData(fetchedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch stats:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading statistics...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">System Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Issues</h2>
          <p className="text-4xl font-bold text-gray-800 mt-2">{data.total}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-500">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Open</h2>
          <p className="text-4xl font-bold text-red-600 mt-2">{data.open}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-500">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">In Progress</h2>
          <p className="text-4xl font-bold text-yellow-600 mt-2">{data.inProgress}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Resolved</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">{data.resolved}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-800">Recent Issues</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.issues && data.issues.map(issue => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
        {(!data.issues || data.issues.length === 0) && (
          <p className="text-gray-500 col-span-2">No issues found.</p>
        )}
      </div>
    </div>
  );
};

export default Stats;
