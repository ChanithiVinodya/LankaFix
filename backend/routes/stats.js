import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '../data/issues.json');

const readIssues = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const writeIssues = (issues) => {
  fs.writeFileSync(dataPath, JSON.stringify(issues, null, 2));
};

router.get('/stats', (req, res) => {
  const issues = readIssues();
  const total = issues.length;
  const unseen = issues.filter(i => i.status === 'Unseen').length;
  const open = issues.filter(i => i.status === 'Open').length;
  const inProgress = issues.filter(i => i.status === 'In Progress').length;
  const resolved = issues.filter(i => i.status === 'Resolved').length;

  res.json({ total, unseen, open, inProgress, resolved, issues });
});

router.patch('/status', (req, res) => {
  const { id, status } = req.body;
  
  if (!id || !status) {
    return res.status(400).json({ error: 'Issue ID and status are required' });
  }

  const issues = readIssues();
  const issueIndex = issues.findIndex(i => i.id === id);
  
  if (issueIndex === -1) {
    return res.status(404).json({ error: 'Issue not found' });
  }

  issues[issueIndex].status = status;
  writeIssues(issues);

  res.json(issues[issueIndex]);
});

export default router;
