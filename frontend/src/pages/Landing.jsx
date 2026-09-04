// Owner: Member 1 — Feature 1: Landing Page
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      {/* Renders Navbar at the top */}
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(180deg, #f0fdfa 0%, #f8fafc 100%)',
          padding: '4rem 1.5rem 3rem',
          textAlign: 'center',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: '2.75rem',
              fontWeight: '800',
              color: '#0f172a',
              letterSpacing: '-0.02em',
              marginBottom: '1rem'
            }}>
              LankaFix
            </h1>
            <p style={{
              fontSize: '1.25rem',
              fontWeight: '500',
              color: '#0f766e',
              marginBottom: '2rem'
            }}>
              A community-powered platform for reporting and tracking public infrastructure issues across Sri Lanka.
            </p>

            {/* Problem explanation paragraph */}
            <div style={{
              backgroundColor: '#ffffff',
              padding: '1.75rem',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              textAlign: 'left',
              marginBottom: '2.25rem',
              lineHeight: '1.7',
              color: '#334155'
            }}>
              <p>
                Across Sri Lanka, dangerous potholes, broken streetlights, unattended garbage dumping, burst water pipes, and deteriorating public infrastructure routinely endanger daily life. These hazards severely disrupt <strong>commuters</strong> navigating congested roads, threaten the safety of <strong>pedestrians</strong> walking in poorly lit neighborhoods at night, and frustrate local <strong>residents</strong> dealing with uncollected waste and utility outages. Timely reporting and transparent tracking ensure local authorities and community leaders can identify problems quickly, allocate repair resources efficiently, and make Sri Lankan neighborhoods safer and cleaner for everyone.
              </p>
            </div>

            {/* Two Call-to-Action buttons/links */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                to="/report"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#0f766e',
                  color: '#ffffff',
                  fontWeight: '600',
                  padding: '0.85rem 1.6rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 6px -1px rgba(15, 118, 110, 0.2)'
                }}
              >
                <span>📢</span> Report an Issue
              </Link>
              <Link
                to="/track"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  border: '1px solid #cbd5e1',
                  fontWeight: '600',
                  padding: '0.85rem 1.6rem',
                  borderRadius: '8px',
                  textDecoration: 'none'
                }}
              >
                <span>🔍</span> Track an Issue
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer style={{
        padding: '1.5rem',
        textAlign: 'center',
        borderTop: '1px solid #e2e8f0',
        color: '#64748b',
        fontSize: '0.875rem'
      }}>
        <p>&copy; {new Date().getFullYear()} LankaFix. Civic Issue Reporting for Sri Lanka.</p>
      </footer>
    </div>
  );
}
