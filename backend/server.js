// Shared entry point — mounts all route files.
import express from 'express';
import cors from 'cors';
import createIssueRouter from './routes/createIssue.js';
import listIssuesRouter from './routes/listIssues.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// POST /api/issues -> Feature 1: Report an Issue (Member 1)
app.use('/api/issues', createIssueRouter);

// -------------------------------------------------------------
// Placeholder routes for team members (do not implement here):
// TODO (Member 2 - Feature 2: Track an Issue):
//   Mount router for GET /api/issues/:id
//   e.g. app.use('/api/issues', getIssueByIdRouter);
//
// TODO (Member 3 - Feature 3: Browse, Search & Filter):
app.use('/api/issues', listIssuesRouter);
//
// TODO (Member 4 - Feature 4: Stats & Status Updates):
//   Mount routers for GET /api/stats and PATCH /api/issues/:id/status
//   e.g. app.use('/api/stats', statsRouter);
//        app.use('/api/issues', updateStatusRouter);
// -------------------------------------------------------------

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'LankaFix API is operational' });
});

// Start server
app.listen(PORT, () => {
  console.log(`LankaFix backend server is running on port ${PORT}`);
});

export default app;
