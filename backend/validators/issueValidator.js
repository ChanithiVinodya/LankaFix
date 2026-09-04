// Shared server-side validation rules for the Issue model.

export const ALLOWED_CATEGORIES = [
  'Pothole',
  'Streetlight',
  'Garbage',
  'Water Leak',
  'Infrastructure',
  'Other'
];

export const ALLOWED_STATUSES = ['Reported', 'In Progress', 'Resolved'];

/**
 * Validates an issue object against schema rules.
 *
 * Rules:
 * - category: required, must be one of allowed values
 * - title: required, min 5 characters
 * - description: required, min 10 characters
 * - location: required, min 3 characters
 * - reporterName: required, min 2 characters
 * - reporterContact: required, 10 digits optionally starting with 0
 *
 * @param {Object} data - Issue input data
 * @returns {{ isValid: boolean, errors: Array<{ field: string, message: string }> }}
 */
export function validateIssue(data = {}) {
  const errors = [];

  // Category validation
  if (!data || !data.category || typeof data.category !== 'string' || !ALLOWED_CATEGORIES.includes(data.category)) {
    errors.push({
      field: 'category',
      message: `Category is required and must be one of: ${ALLOWED_CATEGORIES.join(', ')}`
    });
  }

  // Title validation
  if (!data || !data.title || typeof data.title !== 'string' || data.title.trim().length < 5) {
    errors.push({
      field: 'title',
      message: 'Please enter a title of at least 5 characters.'
    });
  }

  // Description validation
  if (!data || !data.description || typeof data.description !== 'string' || data.description.trim().length < 10) {
    errors.push({
      field: 'description',
      message: 'Please enter a description of at least 10 characters.'
    });
  }

  // Location validation
  if (!data || !data.location || typeof data.location !== 'string' || data.location.trim().length < 3) {
    errors.push({
      field: 'location',
      message: 'Please enter a location of at least 3 characters.'
    });
  }

  // Reporter Name validation
  if (!data || !data.reporterName || typeof data.reporterName !== 'string' || data.reporterName.trim().length < 2) {
    errors.push({
      field: 'reporterName',
      message: 'Please enter a reporter name of at least 2 characters.'
    });
  }

  // Reporter Contact validation: 10 digits, optionally starting with 0
  const contact = data && data.reporterContact !== undefined && data.reporterContact !== null
    ? String(data.reporterContact).trim()
    : '';

  const phoneRegex = /^0?\d{9,10}$/;
  if (!contact || !phoneRegex.test(contact)) {
    errors.push({
      field: 'reporterContact',
      message: 'Please enter a valid phone number (10 digits, optionally starting with 0).'
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export default validateIssue;
