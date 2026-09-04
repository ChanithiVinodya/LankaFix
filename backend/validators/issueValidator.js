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
 * Validates an issue payload against defined validation rules.
 * Pure function: takes payload, returns validation result object.
 *
 * Rules:
 * - category: required, must be one of allowed values
 * - title: required, min 5 characters
 * - description: required, min 10 characters
 * - location: required, min 3 characters
 * - reporterName: required, min 2 characters
 * - reporterContact: required, 10 digits optionally starting with 0
 *
 * @param {Object} payload - Issue input data
 * @returns {{ valid: boolean, errors?: Array<{ field: string, message: string }> }}
 */
export default function validateIssue(payload = {}) {
  const errors = [];

  // Category validation
  if (
    !payload ||
    !payload.category ||
    typeof payload.category !== 'string' ||
    !ALLOWED_CATEGORIES.includes(payload.category)
  ) {
    errors.push({
      field: 'category',
      message: `Category is required and must be one of: ${ALLOWED_CATEGORIES.join(', ')}`
    });
  }

  // Title validation
  if (!payload || !payload.title || typeof payload.title !== 'string' || payload.title.trim().length < 5) {
    errors.push({
      field: 'title',
      message: 'Please enter a title of at least 5 characters.'
    });
  }

  // Description validation
  if (
    !payload ||
    !payload.description ||
    typeof payload.description !== 'string' ||
    payload.description.trim().length < 10
  ) {
    errors.push({
      field: 'description',
      message: 'Please enter a description of at least 10 characters.'
    });
  }

  // Location validation
  if (!payload || !payload.location || typeof payload.location !== 'string' || payload.location.trim().length < 3) {
    errors.push({
      field: 'location',
      message: 'Please enter a location of at least 3 characters.'
    });
  }

  // Reporter Name validation
  if (
    !payload ||
    !payload.reporterName ||
    typeof payload.reporterName !== 'string' ||
    payload.reporterName.trim().length < 2
  ) {
    errors.push({
      field: 'reporterName',
      message: 'Please enter a reporter name of at least 2 characters.'
    });
  }

  // Reporter Contact validation: 10 digits, optionally starting with 0
  const contact =
    payload && payload.reporterContact !== undefined && payload.reporterContact !== null
      ? String(payload.reporterContact).trim()
      : '';

  const phoneRegex = /^0?\d{9,10}$/;
  if (!contact || !phoneRegex.test(contact)) {
    errors.push({
      field: 'reporterContact',
      message: 'Please enter a valid phone number (10 digits, optionally starting with 0).'
    });
  }

  if (errors.length === 0) {
    return { valid: true };
  }

  return {
    valid: false,
    errors
  };
}

export { validateIssue };
