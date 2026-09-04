// server/routes/track.js
// Member 2 — GET /api/issues/:id
//
// Mount this in server/index.js with:

//   const trackRoute = require('./routes/track');
//   app.use('/api/issues', trackRoute);
//
// Depends on server/data/store.js (see 00-SHARED-CONTRACT.md) — pull that
// from Member 1 before you start, or use the STANDALONE fallback below.

const express = require('express');
const router = express.Router();
const store = require('../data/store');

router.get('/:id', (req, res) => {
  const { id } = req.params;

  // Basic validation — friendly error, not a raw 500
  if (!id || !/^LF-\d+$/i.test(id.trim())) {
    return res.status(400).json({
      error: 'That doesn\'t look like a valid report ID. IDs look like "LF-1001".'
    });
  }

  const issue = store.getById(id.trim().toUpperCase());

  if (!issue) {
    return res.status(404).json({
      error: `No report found with ID "${id}". Double-check the ID and try again.`
    });
  }

  res.json(issue);
});

module.exports = router;

/* ============================================================
   STANDALONE FALLBACK
   If Member 1 hasn't pushed data/store.js yet, use this instead
   so you're never blocked. Swap the require() above for this
   in-file version, then switch back once store.js lands.
   ============================================================

const issues = [
  {
    id: "LF-1001",
    type: "Pothole",
    location: "Galle Road, near Bambalapitiya",
    description: "Deep pothole causing traffic to swerve",
    status: "In Progress",
    createdAt: "2026-09-01T08:00:00.000Z",
    updatedAt: "2026-09-03T09:00:00.000Z"
  }
];

router.get('/:id', (req, res) => {
  const issue = issues.find(i => i.id === req.params.id.toUpperCase());
  if (!issue) return res.status(404).json({ error: `No report found with ID "${req.params.id}".` });
  res.json(issue);
});
*/
