// CreditCardWidget.jsx — Paynix-inspired "Your Cards" component
// Features: Virtual Visa card with purple/blue wave gradient, chip, contactless icon

import { Plus, Wifi } from 'lucide-react';

export default function CreditCardWidget({ onAddCard, balance }) {
  const formattedBalance = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(balance || 0);

  return (
    <div className="paynix-card your-cards-container">
      {/* Header */}
      <div className="widget-header-row">
        <div>
          <h3 className="widget-title">Your Cards</h3>
          <p className="widget-subtitle">
            Active Currency &bull; <span className="highlight-currency">INR (₹) / USD ($)</span>
          </p>
        </div>
        <button
          onClick={onAddCard}
          className="card-plus-btn"
          title="Add New Card / Transaction"
        >
          <Plus size={16} strokeWidth={2.4} />
        </button>
      </div>

      {/* Cards Slider / Visa Card */}
      <div className="cards-slider-wrapper">
        <div className="visa-credit-card">
          {/* Card Top: Visa Logo & Contactless */}
          <div className="card-top-bar">
            <span className="visa-brand-logo">VISA</span>
            <Wifi size={20} className="contactless-icon" />
          </div>

          {/* Card Number */}
          <div className="card-number-display">
            <span className="dot-group">&bull;&bull;&bull;&bull;</span>
            <span className="dot-group">&bull;&bull;&bull;&bull;</span>
            <span className="dot-group">&bull;&bull;&bull;&bull;</span>
            <span className="card-last-four">6589</span>
          </div>

          {/* Card Bottom: Holder, CVV, Expiry */}
          <div className="card-bottom-bar">
            <div className="card-meta-col">
              <span className="card-meta-label">Holder Name</span>
              <span className="card-meta-value">JHON LELLY</span>
            </div>
            <div className="card-meta-col">
              <span className="card-meta-label">CVV</span>
              <span className="card-meta-value">597</span>
            </div>
            <div className="card-meta-col">
              <span className="card-meta-label">Expiry</span>
              <span className="card-meta-value">12/30</span>
            </div>
          </div>
        </div>

        {/* Secondary Card Peek on right */}
        <div className="visa-secondary-card-peek" />
      </div>
    </div>
  );
}
