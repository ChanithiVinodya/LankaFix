// Shared — fetch wrapper, single API base URL constant.

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
// Normalize base URL to support both "http://localhost:5000" and "http://localhost:5000/api"
const baseUrl = rawBaseUrl.replace(/\/+$/, '').replace(/\/api$/, '');

/**
 * Creates a new issue report on the backend.
 *
 * @param {Object} payload - { category, title, description, location, reporterName, reporterContact }
 * @returns {Promise<Object>} The created issue object returned by the server on success (201)
 * @throws {Error & { errors?: Array<{ field: string, message: string }> }}
 */
export async function createIssue(payload) {
  const response = await fetch(`${baseUrl}/api/issues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Validation failed');
    error.errors = data.errors || [{ field: 'general', message: 'An error occurred while submitting the issue.' }];
    error.status = response.status;
    throw error;
  }

  return data;
}

// -------------------------------------------------------------
// Placeholder functions for other team members:
//
// TODO (Member 2 - Feature 2: Track an Issue):
//   export async function getIssueById(id) {
//     const res = await fetch(`${baseUrl}/api/issues/${id}`);
//     ...
//   }
//
// TODO (Member 3 - Feature 3: Browse, Search & Filter):
//   export async function listIssues(filters = {}) {
//     const params = new URLSearchParams(filters);
//     const res = await fetch(`${baseUrl}/api/issues?${params}`);
//     ...
//   }
//
// TODO (Member 4 - Feature 4: Stats Dashboard & Status Updates):
//   export async function getStats() {
//     const res = await fetch(`${baseUrl}/api/stats`);
//     ...
//   }
//   export async function updateIssueStatus(id, status) {
//     const res = await fetch(`${baseUrl}/api/issues/${id}/status`, { method: 'PATCH', ... });
//     ...
//   }
// -------------------------------------------------------------

export default {
  createIssue
};
