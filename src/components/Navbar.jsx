// Navbar.jsx — Paynix-inspired Top Header Bar
// Matches reference screenshot: Purple wave logo, "Hey, Welcome 👋 Jhon Lelly", Search with mic, Bell & Avatar

import { Search, Mic, Bell, Waves } from 'lucide-react';

export default function Navbar({ activePage, sidebarOpen, setSidebarOpen, search, setSearch }) {
  return (
    <header className="paynix-navbar">
      {/* Left: Paynix Wave Logo & Welcome Heading */}
      <div className="navbar-brand-welcome">
        {/* Wave Logo */}
        <div className="paynix-logo-box">
          <div className="wave-icon-wrap">
            <Waves size={22} color="#6C5DD3" strokeWidth={2.4} />
          </div>
          <span className="paynix-logo-text">Paynix</span>
        </div>

        {/* Greeting */}
        <div className="navbar-greeting-box">
          <div className="greeting-line">
            <h1 className="greeting-title">Hey, Welcome</h1>
            <span className="greeting-emoji">👋</span>
          </div>
          <span className="greeting-name">Jhon Lelly</span>
        </div>
      </div>

      {/* Right: Pill Search Bar with Mic, Notification Bell & Avatar */}
      <div className="navbar-actions-group">
        {/* Pill Search Input */}
        <div className="paynix-search-pill">
          <Search size={16} className="search-icon-left" />
          <input
            type="text"
            placeholder="Search transaction, invoice..."
            value={search || ''}
            onChange={e => setSearch && setSearch(e.target.value)}
            className="search-input-field"
          />
          <button className="search-mic-btn" title="Voice Search (Mock)">
            <Mic size={15} />
          </button>
        </div>

        {/* Notification Bell */}
        <button
          className="paynix-bell-btn"
          title="Notifications"
          onClick={() => alert('Notifications: All systems operational. 10 GraphQL transactions loaded.')}
        >
          <Bell size={18} />
          <span className="bell-badge-dot" />
        </button>

        {/* User Portrait Avatar */}
        <div className="paynix-avatar-wrap" title="Jhon Lelly">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
            alt="Jhon Lelly"
            className="avatar-img"
            onError={e => {
              // Fallback to stylized initials if image fails to load
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<span class="avatar-fallback">JL</span>';
            }}
          />
        </div>
      </div>
    </header>
  );
}
