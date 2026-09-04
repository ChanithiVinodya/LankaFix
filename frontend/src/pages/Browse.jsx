import React, { useState, useEffect, useCallback } from 'react';
import EmptyState from '../components/EmptyState.jsx';
// Assuming IssueCard is provided by Member 4
import IssueCard from '../components/IssueCard.jsx';

import { listIssues } from '../api/client.js';

const CATEGORIES = ['All', 'Pothole/Road', 'Streetlight', 'Garbage', 'Water Leak', 'Infrastructure', 'Other'];
const STATUSES = ['All', 'Reported', 'In Progress', 'Resolved'];

export default function Browse() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const fetchIssues = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (debouncedSearch) params.search = debouncedSearch;
      if (category && category !== 'All') params.category = category;
      if (status && status !== 'All') params.status = status;

      const data = await listIssues(params);
      setIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
      // In a real app we might want to set an error state here,
      // but we'll default to empty array on error for simplicity
      setIssues([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, category, status]);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  const handleReset = () => {
    setSearchTerm('');
    setCategory('All');
    setStatus('All');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Issues</h1>
          <p className="mt-2 text-sm text-gray-600">
            Browse and track reported infrastructure problems in your area.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              id="search"
              placeholder="Search by title, description or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="w-full md:w-48">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-48">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {STATUSES.map(stat => (
                <option key={stat} value={stat}>{stat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : issues.length === 0 ? (
          <EmptyState onReset={handleReset} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues.map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
