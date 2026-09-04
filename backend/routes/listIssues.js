import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/issues.json');

router.get('/', async (req, res) => {
  try {
    const { search, category, status } = req.query;
    
    // Read issues from file
    let issues = [];
    try {
      const data = await fs.readFile(DATA_FILE, 'utf-8');
      issues = JSON.parse(data || '[]');
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    // Apply filters
    const filteredIssues = issues.filter(issue => {
      let match = true;

      // Filter by category
      if (category && category !== 'All') {
        if (issue.category !== category) {
          match = false;
        }
      }

      // Filter by status
      if (status && status !== 'All') {
        if (issue.status !== status) {
          match = false;
        }
      }

      // Filter by search term
      if (search) {
        const searchTerm = search.toLowerCase();
        const titleMatch = issue.title?.toLowerCase().includes(searchTerm);
        const descriptionMatch = issue.description?.toLowerCase().includes(searchTerm);
        const locationMatch = issue.location?.toLowerCase().includes(searchTerm);
        
        if (!titleMatch && !descriptionMatch && !locationMatch) {
          match = false;
        }
      }

      return match;
    });

    res.json(filteredIssues);

  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
