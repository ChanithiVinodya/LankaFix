// POST /api/issues
// Owner: Member 1 — Feature 1: Report an Issue

import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import generateNextId from '../utils/generateId.js';
import { validateIssue } from '../validators/issueValidator.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/issues.json');

/**
 * Helper to safely read existing issues from JSON storage.
 */
async function getExistingIssues() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}

/**
 * Helper to safely write issues array to JSON storage.
 */
async function saveExistingIssues(issues) {
  await fs.writeFile(DATA_FILE, JSON.stringify(issues, null, 2), 'utf-8');
}

/**
 * POST /api/issues
 * Creates a new issue report after server-side validation.
 */
router.post('/', async (req, res) => {
  try {
    const { category, title, description, location, reporterName, reporterContact } = req.body || {};

    // Validate request body
    const validationResult = validateIssue({
      category,
      title,
      description,
      location,
      reporterName,
      reporterContact
    });

    if (!validationResult.isValid) {
      return res.status(400).json({ errors: validationResult.errors });
    }

    // Read existing issues
    const issues = await getExistingIssues();

    // Generate next sequential ID
    const newId = generateNextId(issues);

    // Construct new issue object adhering to schema
    const newIssue = {
      id: newId,
      category,
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      reporterName: reporterName.trim(),
      reporterContact: String(reporterContact).trim(),
      status: 'Reported',
      dateReported: new Date().toISOString()
    };

    issues.push(newIssue);
    await saveExistingIssues(issues);

    return res.status(201).json(newIssue);
  } catch (error) {
    console.error('Error in POST /api/issues:', error);
    return res.status(500).json({
      errors: [{ field: 'server', message: 'Internal server error occurred while creating issue.' }]
    });
  }
});

export default router;
