// Owner: Member 1 — Feature 1: Report an Issue
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
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
  const navigate = useNavigate();
  const initialFormState = {
    category: '',
    title: '',
    description: '',
    location: '',
    reporterName: '',
    reporterContact: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdIssue, setCreatedIssue] = useState(null);

  // Client-side validation mirroring exact server rules
  const validateForm = () => {
    const errors = {};

    if (!formData.category || !ALLOWED_CATEGORIES.includes(formData.category)) {
      errors.category = 'Please select a valid category from the list.';
    }

    if (!formData.title || formData.title.trim().length < 5) {
      errors.title = 'Please enter a title of at least 5 characters.';
    }

    if (!formData.description || formData.description.trim().length < 10) {
      errors.description = 'Please enter a description of at least 10 characters.';
    }

    if (!formData.location || formData.location.trim().length < 3) {
      errors.location = 'Please enter a location of at least 3 characters.';
    }

    if (!formData.reporterName || formData.reporterName.trim().length < 2) {
      errors.reporterName = 'Please enter a reporter name of at least 2 characters.';
    }

    const phoneRegex = /^0?\d{9,10}$/;
    if (!formData.reporterContact || !phoneRegex.test(formData.reporterContact.trim())) {
      errors.reporterContact = 'Please enter a valid 10-digit phone number (optionally starting with 0).';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear field-specific error as user types
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    // Run client-side validation
    const isValid = validateForm();
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

      const result = await createIssue(payload);
      navigate('/stats');
      setFormData(initialFormState);
      setFieldErrors({});
    } catch (err) {
      if (err.errors && Array.isArray(err.errors)) {
        const serverFieldErrors = {};
        let unhandledMessage = '';

        err.errors.forEach(errItem => {
          if (errItem.field && errItem.field !== 'general' && errItem.field !== 'server') {
            serverFieldErrors[errItem.field] = errItem.message;
          } else {
            unhandledMessage = errItem.message;
          }
        });

        setFieldErrors(prev => ({ ...prev, ...serverFieldErrors }));
        if (unhandledMessage) {
          setGeneralError(unhandledMessage);
        }
      } else {
        setGeneralError(err.message || 'An error occurred while submitting the issue.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCreatedIssue(null);
    setFormData(initialFormState);
    setFieldErrors({});
    setGeneralError('');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      {/* Renders Navbar at the top */}
      <Navbar />

      <main style={{ flex: 1, padding: '2.5rem 1.25rem 4rem' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          {createdIssue ? (
            /* Success Screen replacing form */
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '2.5rem 2rem',
              textAlign: 'center',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#ecfdf5',
                color: '#059669',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                margin: '0 auto 1.25rem'
              }}>
                ✓
              </div>

              <h1 style={{ fontSize: '1.8rem', color: '#0f172a', marginBottom: '0.5rem' }}>
                Your issue has been reported!
              </h1>
              <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.75rem' }}>
                Thank you for contributing to your community. Please save your tracking ID below:
              </p>

              {/* Returned ID prominently displayed */}
              <div style={{
                backgroundColor: '#f0fdfa',
                border: '2px dashed #0f766e',
                borderRadius: '8px',
                padding: '1.25rem',
                display: 'inline-block',
                minWidth: '220px',
                marginBottom: '2rem'
              }}>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#0f766e', fontWeight: '700' }}>
                  Issue ID
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#0f766e', letterSpacing: '0.05em' }}>
                  {createdIssue.id}
                </div>
              </div>

              <div>
                <button
                  onClick={handleReset}
                  style={{
                    backgroundColor: '#0f766e',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Report another issue
                </button>
              </div>
            </div>
          ) : (
            /* Report Form */
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
            }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.4rem' }}>
                Report an Issue
              </h1>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
                Provide accurate details about the hazard or maintenance issue in your area.
              </p>

              {generalError && (
                <div style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fca5a5',
                  color: '#b91c1c',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  marginBottom: '1.25rem'
                }}>
                  {generalError}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* Category */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="category" style={{ display: 'block', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.35rem', color: '#334155' }}>
                    Category <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.75rem',
                      borderRadius: '6px',
                      border: `1.5px solid ${fieldErrors.category ? '#dc2626' : '#cbd5e1'}`,
                      fontSize: '0.95rem',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <option value="">-- Select Category --</option>
                    {ALLOWED_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.category && (
                    <p style={{ color: '#dc2626', fontSize: '0.825rem', marginTop: '0.3rem' }}>
                      {fieldErrors.category}
                    </p>
                  )}
                </div>

                {/* Title */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="title" style={{ display: 'block', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.35rem', color: '#334155' }}>
                    Title <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="e.g. Large pothole near bus stop"
                    value={formData.title}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.75rem',
                      borderRadius: '6px',
                      border: `1.5px solid ${fieldErrors.title ? '#dc2626' : '#cbd5e1'}`,
                      fontSize: '0.95rem'
                    }}
                  />
                  {fieldErrors.title && (
                    <p style={{ color: '#dc2626', fontSize: '0.825rem', marginTop: '0.3rem' }}>
                      {fieldErrors.title}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="description" style={{ display: 'block', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.35rem', color: '#334155' }}>
                    Description <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Provide details about severity, size, or impact..."
                    value={formData.description}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.75rem',
                      borderRadius: '6px',
                      border: `1.5px solid ${fieldErrors.description ? '#dc2626' : '#cbd5e1'}`,
                      fontSize: '0.95rem'
                    }}
                  />
                  {fieldErrors.description && (
                    <p style={{ color: '#dc2626', fontSize: '0.825rem', marginTop: '0.3rem' }}>
                      {fieldErrors.description}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="location" style={{ display: 'block', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.35rem', color: '#334155' }}>
                    Location <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="e.g. Kottawa, Colombo"
                    value={formData.location}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.75rem',
                      borderRadius: '6px',
                      border: `1.5px solid ${fieldErrors.location ? '#dc2626' : '#cbd5e1'}`,
                      fontSize: '0.95rem'
                    }}
                  />
                  {fieldErrors.location && (
                    <p style={{ color: '#dc2626', fontSize: '0.825rem', marginTop: '0.3rem' }}>
                      {fieldErrors.location}
                    </p>
                  )}
                </div>

                {/* Reporter Name */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label htmlFor="reporterName" style={{ display: 'block', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.35rem', color: '#334155' }}>
                    Reporter Name <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="reporterName"
                    name="reporterName"
                    placeholder="e.g. Nimal Perera"
                    value={formData.reporterName}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.75rem',
                      borderRadius: '6px',
                      border: `1.5px solid ${fieldErrors.reporterName ? '#dc2626' : '#cbd5e1'}`,
                      fontSize: '0.95rem'
                    }}
                  />
                  {fieldErrors.reporterName && (
                    <p style={{ color: '#dc2626', fontSize: '0.825rem', marginTop: '0.3rem' }}>
                      {fieldErrors.reporterName}
                    </p>
                  )}
                </div>

                {/* Reporter Contact */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <label htmlFor="reporterContact" style={{ display: 'block', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.35rem', color: '#334155' }}>
                    Reporter Contact Phone <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    id="reporterContact"
                    name="reporterContact"
                    placeholder="e.g. 0771234567"
                    value={formData.reporterContact}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.75rem',
                      borderRadius: '6px',
                      border: `1.5px solid ${fieldErrors.reporterContact ? '#dc2626' : '#cbd5e1'}`,
                      fontSize: '0.95rem'
                    }}
                  />
                  {fieldErrors.reporterContact && (
                    <p style={{ color: '#dc2626', fontSize: '0.825rem', marginTop: '0.3rem' }}>
                      {fieldErrors.reporterContact}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    backgroundColor: '#0f766e',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.85rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
