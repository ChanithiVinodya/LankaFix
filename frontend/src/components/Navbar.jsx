// Owner: Member 1
// Navigation bar linking to Landing, Report, Track, Browse, and Stats.

import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(prev => !prev);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMobile}>
          <span className="navbar-brand-badge">🇱🇰</span>
          <span>LankaFix</span>
        </Link>

        <button
          className="mobile-toggle"
          onClick={toggleMobile}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>

        <nav className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobile}
          >
            Home
          </NavLink>
          <NavLink
            to="/report"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobile}
          >
            Report Issue
          </NavLink>
          <NavLink
            to="/track"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobile}
          >
            Track Issue
          </NavLink>
          <NavLink
            to="/browse"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobile}
          >
            Browse
          </NavLink>
          <NavLink
            to="/stats"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobile}
          >
            Stats
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
