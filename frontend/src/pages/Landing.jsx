// Owner: Member 1 — Feature 1: Landing Page
// Hero section, problem explanation, CTAs, and category showcase.

import React from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { name: 'Pothole', icon: '🕳️', desc: 'Damaged roads & hazardous potholes' },
  { name: 'Streetlight', icon: '💡', desc: 'Broken or non-functioning street lamps' },
  { name: 'Garbage', icon: '🗑️', desc: 'Illegal dumping & uncollected waste' },
  { name: 'Water Leak', icon: '💧', desc: 'Burst water mains & pipe leaks' },
  { name: 'Infrastructure', icon: '🚧', desc: 'Damaged bridges, sidewalks & signs' },
  { name: 'Other', icon: '📌', desc: 'Other public community issues' }
];

export default function Landing() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-badge">
          <span>🇱🇰 Powered by Citizens & Communities</span>
        </div>
        <h1 className="hero-title">
          Empowering Sri Lanka to Fix <span className="hero-highlight">Community Issues</span> Faster
        </h1>
        <p className="hero-subtitle">
          From road potholes in Kottawa to broken streetlights in Kandy, report civic hazards directly, track progress transparently, and make our neighborhoods safer.
        </p>
        <div className="hero-actions">
          <Link to="/report" className="btn btn-primary">
            <span>📢</span> Report an Issue
          </Link>
          <Link to="/track" className="btn btn-secondary">
            <span>🔍</span> Track Your Report
          </Link>
          <Link to="/browse" className="btn btn-secondary">
            <span>📋</span> Browse Issues
          </Link>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="landing-section">
        <div className="section-header">
          <p className="section-tag">Common Civic Challenges</p>
          <h2 className="section-title">What can you report on LankaFix?</h2>
          <p className="section-desc">
            Quickly submit reports for any of the following infrastructure and public utility problems.
          </p>
        </div>

        <div className="category-grid">
          {CATEGORIES.map(cat => (
            <div key={cat.name} className="category-card">
              <div className="category-icon">{cat.icon}</div>
              <h3 className="category-name">{cat.name}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section className="landing-section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--border-color)' }}>
        <div className="section-header">
          <p className="section-tag">Simple & Transparent</p>
          <h2 className="section-title">How LankaFix Works</h2>
          <p className="section-desc">
            A frictionless three-step process to get community problems resolved.
          </p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3 className="step-title">Submit a Report</h3>
            <p className="step-desc">
              Fill out a quick form describing the hazard, exact location, category, and your contact info. Get an instant tracking ID.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <h3 className="step-title">Track Status</h3>
            <p className="step-desc">
              Use your unique Report ID (e.g., LF-0001) anytime to check if the issue is Reported, In Progress, or Resolved.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <h3 className="step-title">Drive Action</h3>
            <p className="step-desc">
              Public visibility holds authorities accountable and informs fellow citizens about road safety and infrastructure status.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/report" className="btn btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}>
            Get Started — Report an Issue Now
          </Link>
        </div>
      </section>
    </div>
  );
}
