// Dashboard.jsx — Paynix-inspired Fintech Dashboard Overview Page
// Matches exact 3-tier layout from reference screenshot

import { useMemo, useState } from 'react';
import {
  Wallet,
  Coins,
  ArrowDownLeft,
  ArrowUpRight,
  Plus,
  AlertCircle
} from 'lucide-react';
import SummaryCard from '../components/SummaryCard';
import CreditCardWidget from '../components/CreditCardWidget';
import IncomeExpenseChart from '../components/IncomeExpenseChart';
import ExpensePieChart from '../components/ExpensePieChart';
import TransactionList from '../components/TransactionList';
import AiAssistantWidget from '../components/AiAssistantWidget';
import TransactionModal from '../components/TransactionModal';
import { addTransaction, updateTransaction, deleteTransaction } from '../services/graphql';

export default function Dashboard({
  transactions,
  setTransactions,
  showNotification,
  loading,
  error,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Derive dynamic metrics from live GraphQL transactions
  const { totalBalance, netProfit, monthlyIncome, monthlyExpenses } = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;
    const profit = Math.max(0, balance);

    return {
      totalBalance: balance,
      netProfit: profit,
      monthlyIncome: income,
      monthlyExpenses: expenses,
    };
  }, [transactions]);

  // Handle Save (Add or Update) via GraphQL Mutation
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
      showNotification('New transaction recorded successfully!');
    }
  }

  // Handle Delete via GraphQL Mutation
  async function handleDeleteConfirm() {
    if (!deleteConfirm) return;
    try {
      await deleteTransaction(deleteConfirm.id);
      setTransactions(prev => prev.filter(t => t.id !== deleteConfirm.id));
      showNotification('Transaction removed.', 'success');
    } catch {
      showNotification('Failed to remove transaction.', 'error');
    } finally {
      setDeleteConfirm(null);
    }
  }

  function openAddModal() {
    setEditData(null);
    setModalOpen(true);
  }

  function openEditModal(tx) {
    setEditData(tx);
    setModalOpen(true);
  }

  if (loading) {
    return (
      <div className="paynix-loading-wrap">
        <div className="paynix-spinner" />
        <p className="loading-txt">Synchronizing Paynix ledger...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="paynix-card error-alert-card">
        <AlertCircle size={20} color="#FF5B5B" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="paynix-dashboard-canvas">
      {/* 1. TOP ROW: 4 Summary Metric Cards */}
      <section className="paynix-top-metrics-row">
        <SummaryCard
          title="Total Balance"
          amount={totalBalance}
          subtitle="Available Funds"
          icon={Wallet}
          trend="+12.5%"
          trendPositive={true}
        />
        <SummaryCard
          title="Net Profit"
          amount={netProfit}
          subtitle="This Month"
          icon={Coins}
          trend="+15.3%"
          trendPositive={true}
        />
        <SummaryCard
          title="Monthly Income"
          amount={monthlyIncome}
          subtitle="This Month"
          icon={ArrowDownLeft}
          trend="+8.2%"
          trendPositive={true}
        />
        <SummaryCard
          title="Monthly Expenses"
          amount={monthlyExpenses}
          subtitle="This Month"
          icon={ArrowUpRight}
          trend="+3.1%"
          trendPositive={false}
        />
      </section>

      {/* 2. MIDDLE ROW: Your Cards (Left) + Transaction Overview Chart (Right) */}
      <section className="paynix-middle-row">
        <div className="middle-col-cards">
          <CreditCardWidget onAddCard={openAddModal} balance={totalBalance} />
        </div>
        <div className="middle-col-chart">
          <IncomeExpenseChart transactions={transactions} />
        </div>
      </section>

      {/* 3. BOTTOM ROW: Expense Breakdown (Col 1) + Recent Transactions (Col 2) + Ai Assistant (Col 3) */}
      <section className="paynix-bottom-row">
        {/* Col 1: Expense Breakdown Donut */}
        <div className="bottom-col">
          <ExpensePieChart transactions={transactions} />
        </div>

        {/* Col 2: Recent Transactions List */}
        <div className="bottom-col">
          <TransactionList
            transactions={transactions}
            onAdd={openAddModal}
            onEdit={openEditModal}
            onDelete={tx => setDeleteConfirm(tx)}
            isCompact={true}
          />
        </div>

        {/* Col 3: AI Assistant Interactive Widget */}
        <div className="bottom-col">
          <AiAssistantWidget transactions={transactions} />
        </div>
      </section>

      {/* Add / Edit Transaction Modal */}
      <TransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editData={editData}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fintech-modal-overlay">
          <div className="fintech-modal-card delete-confirm-modal">
            <h3 className="delete-confirm-title">Delete Transaction?</h3>
            <p className="delete-confirm-text">
              Are you sure you want to delete &ldquo;<strong>{deleteConfirm.title}</strong>&rdquo;?
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
