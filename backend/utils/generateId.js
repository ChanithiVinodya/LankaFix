// Shared — generates ids like "LF-0001"

/**
 * Generates the next issue ID based on existing issues.
 * Finds the highest numeric suffix among existing issues (LF-XXXX) and increments it.
 * Defaults to LF-0001 if existingIssues is empty or contains no valid IDs.
 *
 * @param {Array<{id?: string}>} existingIssues - Array of issue objects
 * @returns {string} The next formatted ID (e.g., "LF-0001")
 */
export default function generateNextId(existingIssues = []) {
  let maxNumber = 0;

  if (Array.isArray(existingIssues)) {
    for (const issue of existingIssues) {
      if (issue && typeof issue.id === 'string') {
        const match = issue.id.match(/^LF-(\d+)$/i);
        if (match) {
          const num = parseInt(match[1], 10);
          if (!isNaN(num) && num > maxNumber) {
            maxNumber = num;
          }
        }
      }
    }
  }

  const nextNumber = maxNumber + 1;
  return `LF-${String(nextNumber).padStart(4, '0')}`;
}
