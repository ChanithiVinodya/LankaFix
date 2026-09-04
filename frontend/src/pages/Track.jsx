// src/pages/Track.jsx
// Member 2 — Track an Issue by ID
//
// Assumes Tailwind is set up (common for a 4hr React hackathon build).
// If your team isn't using Tailwind, swap className strings for plain CSS
// classes and add matching rules to a Track.css file.
//
// Uses fetch to GET /api/issues/:id. Set API_BASE below to match your
// backend's dev URL (e.g. Vite proxy, or full localhost:5000 URL).

import { useState } from "react";

const API_BASE = "http://localhost:5000/api"; // backend is running on 5000

const STAGES = ["Reported", "In Progress", "Resolved"];

function StatusBadge({ status }) {
  const colors = {
    Reported: "bg-yellow-100 text-yellow-800 border-yellow-300",
    "In Progress": "bg-blue-100 text-blue-800 border-blue-300",
    Resolved: "bg-green-100 text-green-800 border-green-300",
  };
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${
        colors[status] || "bg-gray-100 text-gray-800 border-gray-300"
      }`}
    >
      {status}
    </span>
  );
}

function StatusTimeline({ status }) {
  const currentIndex = STAGES.indexOf(status);
  return (
    <div className="flex items-center w-full my-6">
      {STAGES.map((stage, i) => (
        <div key={stage} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                i <= currentIndex
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-gray-300 text-gray-400"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`mt-2 text-xs text-center w-20 ${
                i <= currentIndex ? "text-gray-900 font-medium" : "text-gray-400"
              }`}
            >
              {stage}
            </span>
          </div>
          {i < STAGES.length - 1 && (
            <div
              className={`flex-1 h-1 mx-2 ${
                i < currentIndex ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Track() {
  const [inputId, setInputId] = useState("");
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  const validate = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Please enter a report ID.";
    if (!/^LF-\d+$/i.test(trimmed)) return 'Report IDs look like "LF-1001".';
    return "";
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setTouched(true);
    setIssue(null);

    const validationError = validate(inputId);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/issues/${inputId.trim().toUpperCase()}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setIssue(data);
    } catch (err) {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Track a Report</h1>
      <p className="text-gray-600 mb-6">
        Enter the report ID you received when you submitted an issue (e.g.{" "}
        <span className="font-mono">LF-1001</span>).
      </p>

      <form onSubmit={handleSearch} className="flex gap-2 mb-2">
        <input
          type="text"
          value={inputId}
          onChange={(e) => {
            setInputId(e.target.value);
            if (touched) setError(validate(e.target.value));
          }}
          placeholder="LF-1001"
          className={`flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
            error ? "border-red-400 focus:ring-red-300" : "border-gray-300 focus:ring-blue-400"
          }`}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium px-5 py-2 rounded-lg transition"
        >
          {loading ? "Searching…" : "Track"}
        </button>
      </form>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {issue && (
        <div className="mt-8 border rounded-xl p-6 shadow-sm bg-white">
          <div className="flex justify-between items-start mb-1">
            <h2 className="text-lg font-semibold text-gray-900">{issue.id}</h2>
            <StatusBadge status={issue.status} />
          </div>
          <p className="text-sm text-gray-500 mb-4">{issue.type}</p>

          <StatusTimeline status={issue.status} />

          <dl className="text-sm text-gray-700 space-y-2 mt-6">
            <div>
              <dt className="font-medium text-gray-900">Location</dt>
              <dd>{issue.location}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Description</dt>
              <dd>{issue.description}</dd>
            </div>
            <div className="flex gap-6 pt-2 text-xs text-gray-400">
              <span>Reported: {new Date(issue.createdAt).toLocaleString()}</span>
              <span>Updated: {new Date(issue.updatedAt).toLocaleString()}</span>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}
