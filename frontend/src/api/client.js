// Shared — fetch wrapper, single API base URL constant.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Creates a new issue report.
 *
 * @param {Object} issueData - { category, title, description, location, reporterName, reporterContact }
 * @returns {Promise<Object>} Created issue object with generated ID and status
 * @throws {Object} Error object with response errors array or message
 */
export async function createIssue(issueData) {
  try {
    const response = await fetch(`${API_BASE_URL}/issues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(issueData)
    });

    const data = await response.json();

    if (!response.ok) {
      // Throw structured error object containing validation errors
      const error = new Error(data.message || 'Failed to submit issue');
      error.errors = data.errors || [{ field: 'general', message: error.message }];
      error.status = response.status;
      throw error;
    }

    return data;
  } catch (err) {
    if (err.errors) {
      throw err;
    }
    const networkError = new Error(err.message || 'Network error connecting to LankaFix server');
    networkError.errors = [{ field: 'general', message: 'Unable to connect to the server. Please ensure the backend is running.' }];
    throw networkError;
  }
}

// Placeholder helper functions for other project features:
// export async function getIssueById(id) { ... } // Member 2
// export async function listIssues(filters) { ... } // Member 3
// export async function getStats() { ... } // Member 4
// export async function updateIssueStatus(id, status) { ... } // Member 4

export default {
  createIssue
};
