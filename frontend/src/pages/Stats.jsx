import React, { useState, useEffect } from 'react';
import IssueCard from '../components/IssueCard';

const Stats = () => {
  const [data, setData] = useState({ total: 0, open: 0, inProgress: 0, resolved: 0, issues: [] });
  const [loading, setLoading] = useState(true);

  const fetchStats = () => {
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
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update status');
        fetchStats(); // refresh the dashboard stats instantly
      })
      .catch(err => console.error("Failed to update status:", err));
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading statistics...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">System Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Issues</h2>
          <p className="text-4xl font-bold text-gray-800 mt-2">{data.total}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Unseen</h2>
          <p className="text-4xl font-bold text-purple-600 mt-2">{data.unseen || 0}</p>
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

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6 text-purple-800 border-b pb-2">Unseen Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.issues?.filter(i => i.status === 'Unseen').map(issue => (
              <IssueCard key={issue.id} issue={issue} onUpdateStatus={handleUpdateStatus} />
            ))}
            {!data.issues?.some(i => i.status === 'Unseen') && <p className="text-gray-500">No unseen reports.</p>}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-red-800 border-b pb-2">Open Issues</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.issues?.filter(i => i.status === 'Open').map(issue => (
              <IssueCard key={issue.id} issue={issue} onUpdateStatus={handleUpdateStatus} />
            ))}
            {!data.issues?.some(i => i.status === 'Open') && <p className="text-gray-500">No open issues.</p>}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-yellow-800 border-b pb-2">In Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.issues?.filter(i => i.status === 'In Progress').map(issue => (
              <IssueCard key={issue.id} issue={issue} onUpdateStatus={handleUpdateStatus} />
            ))}
            {!data.issues?.some(i => i.status === 'In Progress') && <p className="text-gray-500">No issues in progress.</p>}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-green-800 border-b pb-2">Resolved</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.issues?.filter(i => i.status === 'Resolved').map(issue => (
              <IssueCard key={issue.id} issue={issue} onUpdateStatus={handleUpdateStatus} />
            ))}
            {!data.issues?.some(i => i.status === 'Resolved') && <p className="text-gray-500">No resolved issues.</p>}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Stats;
