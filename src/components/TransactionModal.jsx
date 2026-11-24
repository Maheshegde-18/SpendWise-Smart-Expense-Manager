// TransactionModal.jsx — Paynix-inspired Fintech Transaction Form Modal
// Demonstrates: Stateful component, controlled inputs, form validation, event handling

import { useState, useEffect } from 'react';
import { X, Check, TrendingUp, TrendingDown } from 'lucide-react';

const CATEGORIES_BY_TYPE = {
  income: ['Salary', 'Freelance', 'Investment', 'Bonus', 'Consulting', 'Part-time', 'Business', 'Others'],
  expense: ['Food', 'Shopping', 'Transportation', 'Education', 'Entertainment', 'Bills', 'Healthcare', 'Others'],
};

const EMPTY_FORM = {
  title: '',
  amount: '',
  type: 'expense',
  category: '',
  date: '',
  description: '',
};

export default function TransactionModal({ isOpen, onClose, onSave, editData }) {
  // === STATE (Stateful Component) ===
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // Initialize or reset form state
  useEffect(() => {
    if (editData) {
      setForm({ ...editData, amount: String(editData.amount) });
    } else {
      setForm({
        ...EMPTY_FORM,
        date: new Date().toISOString().split('T')[0],
      });
    }
    setErrors({});
  }, [editData, isOpen]);

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  // Handle type toggle
  function handleTypeChange(newType) {
    setForm(prev => ({
      ...prev,
      type: newType,
      category: '', // Reset category when switching type
    }));
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: '' }));
    }
  }

  // Validate form before submission
  function validate() {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Transaction title is required';
    if (!form.amount || Number(form.amount) <= 0) errs.amount = 'Enter a valid amount greater than 0';
    if (!form.category) errs.category = 'Please select a category';
    if (!form.date) errs.date = 'Date is required';
    return errs;
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);
    try {
      await onSave({
        ...form,
        amount: parseFloat(form.amount),
      });
      onClose();
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to save transaction.' });
    } finally {
      setSaving(false);
    }
  }

  if (!isOpen) return null;

  const currentCategories = CATEGORIES_BY_TYPE[form.type] || [];

  return (
    <div className="fintech-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="fintech-modal-card">
        {/* Modal Header */}
        <div className="modal-header-row">
          <div>
            <h2 className="modal-heading-text">
              {editData ? 'Edit Transaction' : 'New Transaction'}
            </h2>
            <p className="modal-subheading-text">
              {editData
                ? 'Update your transaction details below'
                : 'Record an income or expense transaction'}
            </p>
          </div>
          <button onClick={onClose} className="modal-close-icon-btn" title="Close">
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="modal-body-form">
          {/* Segmented Type Toggle */}
          <div className="form-field-group">
            <label className="field-label-text">Transaction Type</label>
            <div className="modal-type-switcher">
              <button
                type="button"
                onClick={() => handleTypeChange('income')}
                className={`type-switcher-tab tab-income ${form.type === 'income' ? 'active' : ''}`}
              >
                <TrendingUp size={16} />
                <span>Income</span>
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('expense')}
                className={`type-switcher-tab tab-expense ${form.type === 'expense' ? 'active' : ''}`}
              >
                <TrendingDown size={16} />
                <span>Expense</span>
              </button>
            </div>
          </div>

          {/* Title & Amount */}
          <div className="form-grid-two-cols">
            <div className="form-field-group">
              <label className="field-label-text">Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Salary, Groceries"
                className={`modal-text-input ${errors.title ? 'input-error' : ''}`}
              />
              {errors.title && <span className="field-error-msg">{errors.title}</span>}
            </div>

            <div className="form-field-group">
              <label className="field-label-text">Amount (₹) *</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="0.00"
                className={`modal-text-input ${errors.amount ? 'input-error' : ''}`}
              />
              {errors.amount && <span className="field-error-msg">{errors.amount}</span>}
            </div>
          </div>

          {/* Category & Date */}
          <div className="form-grid-two-cols">
            <div className="form-field-group">
              <label className="field-label-text">Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={`modal-select-input ${errors.category ? 'input-error' : ''}`}
              >
                <option value="">Select a category</option>
                {currentCategories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <span className="field-error-msg">{errors.category}</span>}
            </div>

            <div className="form-field-group">
              <label className="field-label-text">Date *</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={`modal-text-input ${errors.date ? 'input-error' : ''}`}
              />
              {errors.date && <span className="field-error-msg">{errors.date}</span>}
            </div>
          </div>

          {/* Description (Optional) */}
          <div className="form-field-group">
            <label className="field-label-text">Description / Note (optional)</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={2}
              placeholder="Add details, invoice number or description..."
              className="modal-textarea-input"
            />
          </div>

          {errors.submit && (
            <div className="form-submission-error">{errors.submit}</div>
          )}

          {/* Action Buttons */}
          <div className="modal-actions-footer">
            <button
              type="button"
              onClick={onClose}
              className="btn-modal-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-modal-submit"
            >
              {saving ? 'Processing...' : editData ? 'Update Record' : 'Save Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
