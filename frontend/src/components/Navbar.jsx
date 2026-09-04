// Owner: Member 1
// Nav bar linking to Home (/), Report (/report), Track (/track), Browse (/browse), Stats (/stats)

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="navbar" style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      padding: '0.75rem 1.25rem',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <Link
          to="/"
          onClick={closeMenu}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#0f766e'
          }}
        >
          <span style={{ fontSize: '1.4rem' }}>🇱🇰</span>
          <span>LankaFix</span>
        </Link>

        {/* Mobile menu toggle button */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          style={{
            display: 'none',
            background: 'none',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            padding: '0.4rem 0.6rem',
            fontSize: '1.1rem',
            cursor: 'pointer'
          }}
          className="navbar-mobile-btn"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Navigation Links */}
        <div
          className={`navbar-links-container ${mobileMenuOpen ? 'show' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}
        >
          <Link to="/" onClick={closeMenu} className="nav-link-item">
            Home
          </Link>
          <Link to="/report" onClick={closeMenu} className="nav-link-item">
            Report
          </Link>
          <Link to="/track" onClick={closeMenu} className="nav-link-item">
            Track
          </Link>
          <Link to="/browse" onClick={closeMenu} className="nav-link-item">
            Browse
          </Link>
          <Link to="/stats" onClick={closeMenu} className="nav-link-item">
            Stats
          </Link>
        </div>
      </div>

      <style>{`
        .nav-link-item {
          text-decoration: none;
          color: #475569;
          font-weight: 500;
          font-size: 0.95rem;
          padding: 0.4rem 0.75rem;
          border-radius: 6px;
          transition: all 0.2s;
        }
        .nav-link-item:hover {
          color: #0f766e;
          background-color: #f1f5f9;
        }
        @media (max-width: 600px) {
          .navbar-mobile-btn {
            display: block !important;
          }
          .navbar-links-container {
            display: none !important;
            width: 100%;
            flex-direction: column;
            align-items: flex-start !important;
            padding-top: 0.75rem;
            gap: 0.25rem !important;
          }
          .navbar-links-container.show {
            display: flex !important;
          }
          .nav-link-item {
            width: 100%;
            padding: 0.6rem 0.5rem;
          }
        }
      `}</style>
    </nav>
  );
}
