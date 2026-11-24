// Sidebar.jsx — Paynix-inspired Vertical Icon Dock Sidebar
// Matches reference screenshot: floating white vertical pill dock with active circle highlights

import {
  LayoutDashboard,
  ArrowLeftRight,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Wallet,
  Plus,
  RotateCw,
  LogOut
} from 'lucide-react';

const primaryNav = [
  { id: 'dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'income',       label: 'Income',       icon: TrendingUp },
  { id: 'expenses',     label: 'Expenses',     icon: TrendingDown },
  { id: 'reports',      label: 'Reports',      icon: BarChart3 },
];

export default function Sidebar({ activePage, setActivePage, isOpen, setIsOpen }) {
  return (
    <aside className="paynix-sidebar-dock">
      {/* Top Navigation Group */}
      <div className="dock-top-group">
        {primaryNav.map(({ id, label, icon: Icon }) => {
          const isActive = activePage === id;
          return (
            <button
              key={id}
              onClick={() => setActivePage(id)}
              className={`dock-btn ${isActive ? 'active' : ''}`}
              title={label}
              aria-label={label}
            >
              <Icon size={19} strokeWidth={isActive ? 2.4 : 1.8} />
              <span className="dock-tooltip">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom Utility Group */}
      <div className="dock-bottom-group">
        <button
          onClick={() => {
            const ev = new CustomEvent('open-add-transaction');
            window.dispatchEvent(ev);
          }}
          className="dock-btn dock-btn-add"
          title="Add Transaction"
          aria-label="Add Transaction"
        >
          <Plus size={18} strokeWidth={2.4} />
          <span className="dock-tooltip">Add Transaction</span>
        </button>

        <button
          onClick={() => window.location.reload()}
          className="dock-btn dock-btn-logout"
          title="Reload App"
          aria-label="Reload App"
        >
          <RotateCw size={17} strokeWidth={2} />
          <span className="dock-tooltip">Refresh Data</span>
        </button>
      </div>
    </aside>
  );
}
