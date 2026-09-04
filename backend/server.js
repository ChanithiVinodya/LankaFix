// Shared entry point — mounts all route files.
import express from 'express';
import cors from 'cors';
import createIssueRouter from './routes/createIssue.js';
import listIssuesRouter from './routes/listIssues.js';
import getIssueByIdRouter from './routes/getIssueById.js';
import statsRouter from './routes/stats.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// POST /api/issues -> Feature 1: Report an Issue (Member 1)
app.use('/api/issues', createIssueRouter);

// GET /api/issues/:id -> Feature 2: Track an Issue (Member 2)
app.use('/api/issues', getIssueByIdRouter);

// GET /api/issues -> Feature 3: Browse, Search & Filter (Member 3)
app.use('/api/issues', listIssuesRouter);

// GET /api/stats, PATCH /api/status -> Feature 4: Stats & Status Updates (Member 4)
app.use('/api', statsRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'LankaFix API is operational' });
});

// Start server
app.listen(PORT, () => {
  console.log(`LankaFix backend server is running on port ${PORT}`);
});

export default app;
