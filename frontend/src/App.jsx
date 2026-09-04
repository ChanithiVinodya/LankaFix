// Shared — route setup (react-router-dom).
// Routes: / (Landing), /report, /track, /browse, /stats

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Landing from './pages/Landing.jsx';
import Report from './pages/Report.jsx';

// Placeholders for features owned by other team members
// TODO (Member 2): import Track from './pages/Track.jsx';
const TrackPlaceholder = () => (
  <div className="report-container" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
    <h2>Track Issue</h2>
    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
      Feature 2: Track an Issue by ID (under development).
    </p>
  </div>
);

// TODO (Member 3): import Browse from './pages/Browse.jsx';
const BrowsePlaceholder = () => (
  <div className="report-container" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
    <h2>Browse Issues</h2>
    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
      Feature 3: Browse, Search & Filter Issues (under development).
    </p>
  </div>
);

// TODO (Member 4): import Stats from './pages/Stats.jsx';
const StatsPlaceholder = () => (
  <div className="report-container" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
    <h2>Stats Dashboard</h2>
    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
      Feature 4: Stats Dashboard & Status Updates (under development).
    </p>
  </div>
);

export default function App() {
  return (
    <div className="app-container">
      <style>{`
        :root {
          --primary: #0f766e;
          --primary-hover: #115e59;
          --primary-light: #ccfbf1;
          --secondary: #0369a1;
          --secondary-hover: #075985;
          --accent: #f59e0b;
          --bg-main: #f8fafc;
          --bg-card: #ffffff;
          --text-main: #0f172a;
          --text-muted: #64748b;
          --border-color: #e2e8f0;
          --error-bg: #fef2f2;
          --error-border: #fca5a5;
          --error-text: #b91c1c;
          --success-bg: #ecfdf5;
          --success-border: #6ee7b7;
          --success-text: #065f46;
          --radius: 10px;
          --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: var(--bg-main);
          color: var(--text-main);
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
        }
        .app-container { display: flex; flex-direction: column; min-height: 100vh; }
        .main-content { flex: 1; width: 100%; }
        .navbar { background-color: #ffffff; border-bottom: 1px solid var(--border-color); position: sticky; top: 0; z-index: 100; box-shadow: var(--shadow-sm); }
        .navbar-container { max-width: 1200px; margin: 0 auto; padding: 0.85rem 1.5rem; display: flex; align-items: center; justify-content: space-between; }
        .navbar-brand { display: flex; align-items: center; gap: 0.6rem; text-decoration: none; font-weight: 800; font-size: 1.35rem; color: var(--primary); letter-spacing: -0.02em; }
        .navbar-brand-badge { background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
        .navbar-links { display: flex; align-items: center; gap: 0.5rem; list-style: none; }
        .nav-link { text-decoration: none; font-size: 0.95rem; font-weight: 500; color: var(--text-muted); padding: 0.5rem 0.85rem; border-radius: 6px; transition: all 0.2s ease; }
        .nav-link:hover { color: var(--primary); background-color: var(--bg-main); }
        .nav-link.active { color: var(--primary); background-color: var(--primary-light); font-weight: 600; }
        .mobile-toggle { display: none; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-main); }
        .landing-hero { background: linear-gradient(180deg, #f0fdfa 0%, #f8fafc 100%); padding: 4.5rem 1.5rem 3.5rem; text-align: center; border-bottom: 1px solid var(--border-color); }
        .hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; background-color: var(--primary-light); color: var(--primary); padding: 0.35rem 0.9rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600; margin-bottom: 1.5rem; }
        .hero-title { font-size: 2.75rem; font-weight: 800; line-height: 1.15; color: #0f172a; max-width: 850px; margin: 0 auto 1.25rem; letter-spacing: -0.03em; }
        .hero-highlight { color: var(--primary); background: linear-gradient(135deg, var(--primary), #0284c7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-subtitle { font-size: 1.15rem; color: var(--text-muted); max-width: 650px; margin: 0 auto 2.25rem; line-height: 1.6; }
        .hero-actions { display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap; }
        .btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.75rem 1.4rem; border-radius: 8px; font-size: 0.95rem; font-weight: 600; text-decoration: none; cursor: pointer; border: 1px solid transparent; transition: all 0.2s ease; }
        .btn-primary { background-color: var(--primary); color: #ffffff; box-shadow: 0 4px 12px rgba(15, 118, 110, 0.25); }
        .btn-primary:hover { background-color: var(--primary-hover); transform: translateY(-1px); }
        .btn-secondary { background-color: #ffffff; color: var(--text-main); border-color: var(--border-color); box-shadow: var(--shadow-sm); }
        .btn-secondary:hover { background-color: #f1f5f9; border-color: #cbd5e1; }
        .landing-section { max-width: 1140px; margin: 0 auto; padding: 4rem 1.5rem; }
        .section-header { text-align: center; max-width: 600px; margin: 0 auto 3rem; }
        .section-tag { color: var(--primary); font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
        .section-title { font-size: 2rem; font-weight: 700; color: var(--text-main); letter-spacing: -0.02em; }
        .section-desc { color: var(--text-muted); margin-top: 0.5rem; font-size: 1rem; }
        .category-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 1.25rem; }
        .category-card { background-color: #ffffff; border: 1px solid var(--border-color); border-radius: var(--radius); padding: 1.5rem 1rem; text-align: center; transition: all 0.2s ease; box-shadow: var(--shadow-sm); }
        .category-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); border-color: var(--primary); }
        .category-icon { font-size: 2rem; margin-bottom: 0.75rem; }
        .category-name { font-weight: 600; font-size: 1rem; color: var(--text-main); }
        .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
        .step-card { background-color: #ffffff; border: 1px solid var(--border-color); border-radius: var(--radius); padding: 2rem 1.75rem; position: relative; box-shadow: var(--shadow-sm); }
        .step-number { width: 36px; height: 36px; border-radius: 50%; background-color: var(--primary-light); color: var(--primary); font-weight: 700; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; margin-bottom: 1.25rem; }
        .step-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem; }
        .step-desc { color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; }
        .report-container { max-width: 760px; margin: 2.5rem auto 4rem; padding: 0 1.5rem; }
        .report-header { margin-bottom: 2rem; text-align: center; }
        .report-title { font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; color: var(--text-main); }
        .report-subtitle { color: var(--text-muted); margin-top: 0.4rem; font-size: 1rem; }
        .form-card { background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 2.25rem; box-shadow: var(--shadow-md); }
        .form-group { margin-bottom: 1.5rem; }
        .form-label { display: block; font-size: 0.9rem; font-weight: 600; color: var(--text-main); margin-bottom: 0.4rem; }
        .form-label .required { color: var(--error-text); margin-left: 0.2rem; }
        .form-hint { font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem; }
        .form-input, .form-select, .form-textarea { width: 100%; padding: 0.75rem 0.9rem; border: 1.5px solid var(--border-color); border-radius: 8px; font-size: 0.95rem; font-family: inherit; color: var(--text-main); background-color: #ffffff; transition: border-color 0.2s, box-shadow 0.2s; }
        .form-input:focus, .form-select:focus, .form-textarea:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.15); }
        .form-input.has-error, .form-select.has-error, .form-textarea.has-error { border-color: var(--error-border); background-color: #fffbfb; }
        .form-error { color: var(--error-text); font-size: 0.825rem; font-weight: 500; margin-top: 0.35rem; display: flex; align-items: center; gap: 0.3rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        .alert-banner { padding: 1rem 1.25rem; border-radius: 8px; margin-bottom: 1.5rem; display: flex; align-items: flex-start; gap: 0.75rem; font-size: 0.9rem; }
        .alert-danger { background-color: var(--error-bg); border: 1px solid var(--error-border); color: var(--error-text); }
        .alert-danger ul { margin-top: 0.4rem; padding-left: 1.2rem; }
        .success-card { background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 2.75rem 2rem; text-align: center; box-shadow: var(--shadow-lg); }
        .success-icon-wrap { width: 64px; height: 64px; background-color: var(--success-bg); border: 2px solid var(--success-border); color: var(--success-text); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.75rem; margin: 0 auto 1.5rem; }
        .success-title { font-size: 1.75rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem; }
        .success-subtitle { color: var(--text-muted); font-size: 1rem; max-width: 500px; margin: 0 auto 1.75rem; }
        .id-badge-container { background: linear-gradient(135deg, #f0fdfa, #e0f2fe); border: 2px dashed #99f6e4; border-radius: 10px; padding: 1.25rem; max-width: 440px; margin: 0 auto 2rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
        .id-label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); font-weight: 600; }
        .id-value { font-size: 1.6rem; font-weight: 800; color: var(--primary); letter-spacing: 0.05em; font-family: monospace; }
        .copy-btn { background-color: #ffffff; border: 1px solid var(--border-color); padding: 0.5rem 0.85rem; border-radius: 6px; font-size: 0.85rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; color: var(--text-main); transition: all 0.2s; }
        .copy-btn:hover { background-color: #f8fafc; border-color: var(--primary); color: var(--primary); }
        .issue-summary-box { background-color: #f8fafc; border: 1px solid var(--border-color); border-radius: 8px; padding: 1.25rem; text-align: left; max-width: 540px; margin: 0 auto 2rem; }
        .summary-row { display: flex; justify-content: space-between; padding: 0.4rem 0; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem; }
        .summary-row:last-child { border-bottom: none; }
        .summary-label { color: var(--text-muted); font-weight: 500; }
        .summary-val { font-weight: 600; color: var(--text-main); }
        .status-tag { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
        .status-tag.status-Reported { background-color: #e0f2fe; color: #0369a1; }
        .status-tag.status-In-Progress { background-color: #fef3c7; color: #b45309; }
        .status-tag.status-Resolved { background-color: #d1fae5; color: #065f46; }
        .success-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .footer { background-color: #ffffff; border-top: 1px solid var(--border-color); padding: 2rem 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.875rem; margin-top: auto; }
        @media (max-width: 768px) {
          .hero-title { font-size: 2rem; }
          .form-row { grid-template-columns: 1fr; gap: 0; }
          .navbar-links { display: none; flex-direction: column; width: 100%; padding-top: 1rem; }
          .navbar-links.open { display: flex; }
          .navbar-container { flex-wrap: wrap; }
          .mobile-toggle { display: block; }
          .form-card { padding: 1.5rem; }
        }
      `}</style>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/report" element={<Report />} />
          <Route path="/track" element={<TrackPlaceholder />} />
          <Route path="/browse" element={<BrowsePlaceholder />} />
          <Route path="/stats" element={<StatsPlaceholder />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} LankaFix. Community Civic Issue Reporting Platform for Sri Lanka.</p>
      </footer>
    </div>
  );
}
