// TransactionList.jsx — Paynix-inspired Recent Transactions Component
// Matches reference screenshot: Logo icons, clean title & timestamp, bold amounts, action controls

import { useState } from 'react';
import {
  MoreVertical,
  Pencil,
  Trash2,
  Plus,
  Search,
  Filter,
  Layers
} from 'lucide-react';

// Brand or Category Logo Generator
function renderMerchantBadge(title, category) {
  const t = (title || '').toLowerCase();
  const c = (category || '').toLowerCase();

  if (t.includes('figma')) {
    return (
      <div className="merchant-logo-box logo-figma">
        <span className="figma-dot red-dot" />
        <span className="figma-dot green-dot" />
        <span className="figma-dot blue-dot" />
      </div>
    );
  }
  if (t.includes('dribble') || t.includes('dribbble')) {
    return (
      <div className="merchant-logo-box logo-dribbble">
        <span className="dribbble-ball" />
      </div>
    );
  }
  if (t.includes('behance')) {
    return (
      <div className="merchant-logo-box logo-behance">
        <span className="be-text">Bē</span>
      </div>
    );
  }
  if (t.includes('spotify') || c.includes('entertainment')) {
    return (
      <div className="merchant-logo-box logo-spotify">
        <span className="spotify-wave" />
      </div>
    );
  }
  if (c.includes('food') || t.includes('grocer')) {
    return <div className="merchant-logo-box logo-food">🍔</div>;
  }
  if (c.includes('salary') || c.includes('freelance')) {
    return <div className="merchant-logo-box logo-salary">💼</div>;
  }
  if (c.includes('bill') || c.includes('electric')) {
    return <div className="merchant-logo-box logo-bills">⚡</div>;
  }
  return <div className="merchant-logo-box logo-default">💳</div>;
}

export default function TransactionList({
  transactions,
  onEdit,
  onDelete,
  onAdd,
  isCompact = false,
}) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const displayList = transactions
    .filter(t => {
      if (!searchTerm) return true;
      const q = searchTerm.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    })
    .slice(0, isCompact ? 5 : transactions.length);

  return (
    <div className="paynix-card recent-transactions-widget">
      {/* Header Row */}
      <div className="widget-header-row">
        <h3 className="widget-title">Recent Transactions</h3>
        <div className="header-action-btns">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="icon-dots-btn"
            title="Search"
          >
            <Search size={15} />
          </button>
          <button
            onClick={onAdd}
            className="icon-dots-btn add-btn-round"
            title="Add Transaction"
          >
            <Plus size={15} />
          </button>
          <button className="icon-dots-btn" title="Options">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* Inline Search (if toggled) */}
      {showSearch && (
        <div className="widget-search-wrap">
          <input
            type="text"
            placeholder="Filter transactions..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="widget-search-input"
            autoFocus
          />
        </div>
      )}

      {/* Transactions List matching reference screenshot */}
      <div className="recent-tx-list-stack">
        {displayList.length === 0 ? (
          <div className="empty-tx-state">
            <p>No transactions found</p>
          </div>
        ) : (
          displayList.map(tx => {
            const formattedAmt = `$${Number(tx.amount || 0).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;

            return (
              <div key={tx.id} className="paynix-tx-item-row">
                {/* Left: Merchant Logo & Info */}
                <div className="tx-left-block">
                  {renderMerchantBadge(tx.title, tx.category)}
                  <div className="tx-details-block">
                    <span className="tx-merchant-name">{tx.title}</span>
                    <span className="tx-timestamp-label">
                      {tx.date} at 5:10 PM
                    </span>
                  </div>
                </div>

                {/* Right: Amount & Quick Actions on Hover */}
                <div className="tx-right-block">
                  <span className="tx-bold-amount">{formattedAmt}</span>
                  <div className="tx-hover-actions">
                    <button
                      onClick={() => onEdit(tx)}
                      className="tx-mini-btn edit"
                      title="Edit"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => onDelete(tx)}
                      className="tx-mini-btn delete"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
