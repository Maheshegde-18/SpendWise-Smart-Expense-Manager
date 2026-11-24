// Transactions.jsx — Paynix-inspired Full Transactions Ledger Page
// Demonstrates: Full transaction management, search, filters, CRUD modals

import { useState, useMemo } from 'react';
import { Plus, ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react';
import TransactionList from '../components/TransactionList';
import TransactionModal from '../components/TransactionModal';
import { addTransaction, updateTransaction, deleteTransaction } from '../services/graphql';

export default function Transactions({
  transactions,
  setTransactions,
  showNotification,
  loading,
  error,
  defaultType = 'all',
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Derive metrics
  const metrics = useMemo(() => {
    const incomeTxs = transactions.filter(t => t.type === 'income');
    const expenseTxs = transactions.filter(t => t.type === 'expense');

    const totalIncome = incomeTxs.reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = expenseTxs.reduce((sum, t) => sum + t.amount, 0);

    return {
      incomeCount: incomeTxs.length,
      expenseCount: expenseTxs.length,
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  }, [transactions]);

  const formatCurrency = val =>
    `$${Number(val || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  async function handleSave(formData) {
    if (editData) {
      const updated = await updateTransaction({ id: editData.id, ...formData });
      setTransactions(prev =>
        prev.map(t => (t.id === updated.id ? updated : t))
      );
      showNotification('Transaction updated successfully!');
    } else {
      const added = await addTransaction(formData);
      setTransactions(prev => [...prev, added]);
      showNotification('Transaction recorded successfully!');
    }
  }

  async function handleDeleteConfirm() {
    if (!deleteConfirm) return;
    try {
      await deleteTransaction(deleteConfirm.id);
      setTransactions(prev => prev.filter(t => t.id !== deleteConfirm.id));
      showNotification('Transaction removed.');
    } catch {
      showNotification('Failed to remove transaction.', 'error');
    } finally {
      setDeleteConfirm(null);
    }
  }

  if (loading) {
    return (
      <div className="paynix-loading-wrap">
        <div className="paynix-spinner" />
        <p className="loading-txt">Loading Paynix transactions...</p>
      </div>
    );
  }

  if (error) {
    return <div className="paynix-card error-alert-card">{error}</div>;
  }

  const headings = {
    all: { title: 'Transactions Ledger', subtitle: 'Detailed record of all cash flow transactions' },
    income: { title: 'Income Operations', subtitle: 'Track verified inflow, revenue, and payroll' },
    expense: { title: 'Expense Operations', subtitle: 'Track outflows, software licenses, and operational costs' },
  };

  const activeHeading = headings[defaultType] || headings.all;

  return (
    <div className="paynix-dashboard-canvas">
      {/* Top Banner Row */}
      <div className="widget-header-row" style={{ marginBottom: 20 }}>
        <div>
          <h2 className="greeting-title" style={{ fontSize: 22 }}>{activeHeading.title}</h2>
          <p className="widget-subtitle">{activeHeading.subtitle}</p>
        </div>

        <button
          onClick={() => {
            setEditData(null);
            setModalOpen(true);
          }}
          className="btn-fintech-primary"
        >
          <Plus size={16} strokeWidth={2.4} />
          <span>New Transaction</span>
        </button>
      </div>

      {/* Summary Row */}
      <div className="paynix-top-metrics-row" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 24 }}>
        <div className="paynix-card paynix-summary-card">
          <span className="summary-card-title">Net Balance</span>
          <div className="summary-amount-text" style={{ fontSize: 24, margin: '8px 0 4px' }}>
            {formatCurrency(metrics.balance)}
          </div>
          <span className="summary-subtitle-text">{transactions.length} total entries</span>
        </div>

        <div className="paynix-card paynix-summary-card">
          <span className="summary-card-title">Total Inflow</span>
          <div className="summary-amount-text" style={{ fontSize: 24, margin: '8px 0 4px', color: '#22C55E' }}>
            {formatCurrency(metrics.totalIncome)}
          </div>
          <span className="summary-subtitle-text">{metrics.incomeCount} revenue credits</span>
        </div>

        <div className="paynix-card paynix-summary-card">
          <span className="summary-card-title">Total Outflow</span>
          <div className="summary-amount-text" style={{ fontSize: 24, margin: '8px 0 4px', color: '#191928' }}>
            {formatCurrency(metrics.totalExpense)}
          </div>
          <span className="summary-subtitle-text">{metrics.expenseCount} expenditure debits</span>
        </div>
      </div>

      {/* Transactions List */}
      <TransactionList
        transactions={transactions}
        onAdd={() => {
          setEditData(null);
          setModalOpen(true);
        }}
        onEdit={tx => {
          setEditData(tx);
          setModalOpen(true);
        }}
        onDelete={tx => setDeleteConfirm(tx)}
        isCompact={false}
      />

      {/* Modals */}
      <TransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editData={editData}
      />

      {deleteConfirm && (
        <div className="fintech-modal-overlay">
          <div className="fintech-modal-card delete-confirm-modal">
            <h3 className="delete-confirm-title">Delete Transaction?</h3>
            <p className="delete-confirm-text">
              Delete &ldquo;<strong>{deleteConfirm.title}</strong>&rdquo;?
            </p>
            <div className="delete-confirm-actions">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn-modal-cancel"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="btn-modal-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
