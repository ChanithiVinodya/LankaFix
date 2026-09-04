// server/data/store.js
// JSON-file-backed store — same interface everyone's routes already expect
// (getAll, getById, add, updateStatus, nextId), so no one else's route code
// needs to change even though the storage mechanism underneath is different.
//
// Reads/writes server/data/issues.json on every call. Fine for a 4-hour
// hackathon with a handful of users — not meant for production concurrency.

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'issues.json');

function readData() {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

function writeData(issues) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(issues, null, 2), 'utf-8');
}

module.exports = {
  getAll: () => readData(),

  getById: (id) => {
    const issues = readData();
    return issues.find(i => i.id === id);
  },

  add: (issue) => {
    const issues = readData();
    issues.push(issue);
    writeData(issues);
    return issue;
  },

  updateStatus: (id, status) => {
    const issues = readData();
    const issue = issues.find(i => i.id === id);
    if (issue) {
      issue.status = status;
      issue.updatedAt = new Date().toISOString();
      writeData(issues);
    }
    return issue;
  },

  nextId: () => {
    const issues = readData();
    const nums = issues
      .map(i => parseInt(i.id.replace('LF-', ''), 10))
      .filter(n => !isNaN(n));
    const max = nums.length ? Math.max(...nums) : 1000;
    return `LF-${max + 1}`;
  }
};
