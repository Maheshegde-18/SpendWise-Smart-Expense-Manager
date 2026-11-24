// App.jsx — Paynix-inspired Root Application Layout
// Matches reference screenshot: Lavender canvas with floating sidebar dock and rounded main board

import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import { getTransactions } from './services/graphql';
import './index.css';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState('');

  // Initial data retrieval via GraphQL
  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    try {
      setLoading(true);
      setError(null);
      const data = await getTransactions();
      setTransactions(data || []);
    } catch (err) {
      setError('Cannot connect to backend. Please ensure the GraphQL server is running on port 4000.');
    } finally {
      setLoading(false);
    }
  }

  function showNotification(msg, type = 'success') {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  }

  const pageProps = {
    transactions,
    setTransactions,
    showNotification,
    loading,
    error,
    fetchTransactions,
    setActivePage,
  };

  return (
    <div className="paynix-outer-screen">
      {/* Floating Vertical Icon Dock Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main White Rounded Dashboard Container */}
      <div className="paynix-main-shell">
        {/* Top Navbar */}
        <Navbar
          activePage={activePage}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          search={search}
          setSearch={setSearch}
        />

        {/* Dynamic Page Views */}
        <main className="paynix-content-area">
          {activePage === 'dashboard'     && <Dashboard     {...pageProps} />}
          {activePage === 'transactions'  && <Transactions  {...pageProps} defaultType="all" />}
          {activePage === 'income'        && <Transactions  {...pageProps} defaultType="income" />}
          {activePage === 'expenses'      && <Transactions  {...pageProps} defaultType="expense" />}
          {activePage === 'reports'       && <Reports        {...pageProps} />}
        </main>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          <span className="notification-icon">✓</span>
          <span className="notification-text">{notification.msg}</span>
        </div>
      )}
    </div>
  );
}
