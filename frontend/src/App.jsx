// Shared — route setup (react-router-dom).
// Routes: / (Landing), /report, /track, /browse, /stats

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Report from './pages/Report.jsx';

// -------------------------------------------------------------
// Placeholder routes for team members:
// TODO (Member 2 - Feature 2: Track an Issue):
import Track from './pages/Track.jsx';
//
// TODO (Member 3 - Feature 3: Browse, Search & Filter):
import Browse from './pages/Browse.jsx';
//
// TODO (Member 4 - Feature 4: Stats Dashboard & Status Updates):
//   import Stats from './pages/Stats.jsx';
//   <Route path="/stats" element={<Stats />} />
// -------------------------------------------------------------

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/report" element={<Report />} />

      {/* TODO (Member 2): */}
      <Route path="/track" element={<Track />} />
      <Route path="/browse" element={<Browse />} />
      {/* TODO (Member 4): <Route path="/stats" element={<Stats />} /> */}
    </Routes>
  );
}
