// Owner: Member 1 — Feature 1: Report an Issue
// Report form, client-side validation, and success screen with generated Report ID.

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createIssue } from '../api/client.js';

const ALLOWED_CATEGORIES = [
  'Pothole',
  'Streetlight',
  'Garbage',
  'Water Leak',
  'Infrastructure',
  'Other'
];

export default function Report() {
  const initialFormData = {
    category: '',
    title: '',
    description: '',
    location: '',
    reporterName: '',
    reporterContact: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdIssue, setCreatedIssue] = useState(null);
  const [copied, setCopied] = useState(false);

  // Client-side validation mirroring exact server rules
  const validate = () => {
    const newErrors = {};

    if (!formData.category || !ALLOWED_CATEGORIES.includes(formData.category)) {
      newErrors.category = 'Please select a valid category.';
    }

    if (!formData.title || formData.title.trim().length < 5) {
      newErrors.title = 'Please enter a title of at least 5 characters.';
    }

    if (!formData.description || formData.description.trim().length < 10) {
      newErrors.description = 'Please enter a description of at least 10 characters.';
    }

    if (!formData.location || formData.location.trim().length < 3) {
      newErrors.location = 'Please enter a location of at least 3 characters.';
    }

    if (!formData.reporterName || formData.reporterName.trim().length < 2) {
      newErrors.reporterName = 'Please enter a reporter name of at least 2 characters.';
    }

    const phoneRegex = /^0?\d{9,10}$/;
    if (!formData.reporterContact || !phoneRegex.test(formData.reporterContact.trim())) {
      newErrors.reporterContact = 'Please enter a valid phone number (10 digits, optionally starting with 0).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerErrors([]);

    // Run client-side validation first
    const isValid = validate();
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        category: formData.category,
        title: formData.title.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        reporterName: formData.reporterName.trim(),
        reporterContact: formData.reporterContact.trim()
      };

      const response = await createIssue(payload);
      setCreatedIssue(response);
      setFormData(initialFormData);
      setErrors({});
    } catch (err) {
      if (err.errors && Array.isArray(err.errors)) {
        setServerErrors(err.errors);
        // Map backend field errors to inline form errors
        const mappedErrors = {};
        err.errors.forEach(errItem => {
          if (errItem.field && errItem.field !== 'general') {
            mappedErrors[errItem.field] = errItem.message;
          }
        });
        setErrors(prev => ({ ...prev, ...mappedErrors }));
      } else {
        setServerErrors([{ field: 'general', message: err.message || 'An unexpected error occurred.' }]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyId = () => {
    if (createdIssue?.id) {
      navigator.clipboard.writeText(createdIssue.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReset = () => {
    setCreatedIssue(null);
    setFormData(initialFormData);
    setErrors({});
    setServerErrors([]);
  };

  // Render Success Screen after issue creation
  if (createdIssue) {
    return (
      <div className="report-container">
        <div className="success-card">
          <div className="success-icon-wrap">✓</div>
          <h1 className="success-title">Issue Reported Successfully!</h1>
          <p className="success-subtitle">
            Thank you for helping improve your community. Your report has been logged and assigned a tracking ID.
          </p>

          <div className="id-badge-container">
            <div>
              <div className="id-label">Your Report ID</div>
              <div className="id-value">{createdIssue.id}</div>
            </div>
            <button className="copy-btn" onClick={handleCopyId}>
              {copied ? '✓ Copied!' : '📋 Copy ID'}
            </button>
          </div>

          <div className="issue-summary-box">
            <div className="summary-row">
              <span className="summary-label">Status</span>
              <span className={`status-tag status-${createdIssue.status?.replace(/\s+/g, '-')}`}>
                {createdIssue.status}
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Category</span>
              <span className="summary-val">{createdIssue.category}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Title</span>
              <span className="summary-val">{createdIssue.title}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Location</span>
              <span className="summary-val">{createdIssue.location}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Reporter</span>
              <span className="summary-val">{createdIssue.reporterName}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Date Reported</span>
              <span className="summary-val">
                {createdIssue.dateReported ? new Date(createdIssue.dateReported).toLocaleString() : 'Just now'}
              </span>
            </div>
          </div>

          <div className="success-actions">
            <button className="btn btn-primary" onClick={handleReset}>
              📢 Report Another Issue
            </button>
            <Link to={`/track?id=${createdIssue.id}`} className="btn btn-secondary">
              🔍 Track This Issue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render Report Form
  return (
    <div className="report-container">
      <div className="report-header">
        <h1 className="report-title">Report a Community Issue</h1>
        <p className="report-subtitle">
          Submit details about road damage, streetlights, waste, or infrastructure in your area.
        </p>
      </div>

      <div className="form-card">
        {serverErrors.length > 0 && (
          <div className="alert-banner alert-danger">
            <span>⚠️</span>
            <div>
              <strong>Please correct the following errors:</strong>
              <ul>
                {serverErrors.map((err, idx) => (
                  <li key={idx}>{err.message}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Category */}
          <div className="form-group">
            <label className="form-label" htmlFor="category">
              Category <span className="required">*</span>
            </label>
            <select
              id="category"
              name="category"
              className={`form-select ${errors.category ? 'has-error' : ''}`}
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">-- Select a Category --</option>
              {ALLOWED_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <p className="form-error">{errors.category}</p>}
          </div>

          {/* Title */}
          <div className="form-group">
            <label className="form-label" htmlFor="title">
              Issue Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className={`form-input ${errors.title ? 'has-error' : ''}`}
              placeholder="e.g. Large pothole near bus stop"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title ? (
              <p className="form-error">{errors.title}</p>
            ) : (
              <p className="form-hint">Brief summary of the issue (min 5 characters)</p>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Detailed Description <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className={`form-textarea ${errors.description ? 'has-error' : ''}`}
              placeholder="Describe the severity, exact landmark, and how long this issue has persisted..."
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description ? (
              <p className="form-error">{errors.description}</p>
            ) : (
              <p className="form-hint">Provide helpful details (min 10 characters)</p>
            )}
          </div>

          {/* Location */}
          <div className="form-group">
            <label className="form-label" htmlFor="location">
              Location / Area <span className="required">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className={`form-input ${errors.location ? 'has-error' : ''}`}
              placeholder="e.g. Kottawa junction, Colombo"
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location ? (
              <p className="form-error">{errors.location}</p>
            ) : (
              <p className="form-hint">Town, street, or landmark (min 3 characters)</p>
            )}
          </div>

          {/* Reporter Name & Contact */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="reporterName">
                Your Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="reporterName"
                name="reporterName"
                className={`form-input ${errors.reporterName ? 'has-error' : ''}`}
                placeholder="e.g. Nimal Perera"
                value={formData.reporterName}
                onChange={handleChange}
              />
              {errors.reporterName ? (
                <p className="form-error">{errors.reporterName}</p>
              ) : (
                <p className="form-hint">Min 2 characters</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reporterContact">
                Contact Phone <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="reporterContact"
                name="reporterContact"
                className={`form-input ${errors.reporterContact ? 'has-error' : ''}`}
                placeholder="e.g. 0771234567"
                value={formData.reporterContact}
                onChange={handleChange}
              />
              {errors.reporterContact ? (
                <p className="form-error">{errors.reporterContact}</p>
              ) : (
                <p className="form-hint">10 digits (e.g. 0771234567)</p>
              )}
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <Link to="/" className="btn btn-secondary">
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{ minWidth: '160px' }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
