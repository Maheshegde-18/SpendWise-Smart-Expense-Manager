// SummaryCard.jsx — Paynix-inspired Top Metric Card
// Matches reference screenshot: Title with 3 dots, Left icon circle, Big amount + subtitle, Right trend pill

import { MoreVertical, TrendingUp, TrendingDown } from 'lucide-react';

export default function SummaryCard({
  title,
  amount,
  subtitle,
  icon: Icon,
  trend,
  trendPositive = true,
  currencySymbol = '$',
}) {
  // Format numeric amount with 2 decimal places like the screenshot ($1245.00)
  const formattedAmount = `${currencySymbol}${Number(amount || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <div className="paynix-card paynix-summary-card">
      {/* Top Row: Title & 3 Dots */}
      <div className="summary-header-row">
        <span className="summary-card-title">{title}</span>
        <button className="summary-dots-btn" title="Options">
          <MoreVertical size={14} />
        </button>
      </div>

      {/* Main Content Row: Left icon, Amount & Subtitle, Right Trend Pill */}
      <div className="summary-body-row">
        {/* Left Icon inside circle */}
        <div className="summary-icon-circle">
          <Icon size={18} strokeWidth={2} />
        </div>

        {/* Middle: Amount & Subtitle */}
        <div className="summary-value-meta">
          <div className="summary-amount-text">{formattedAmount}</div>
          <div className="summary-subtitle-text">{subtitle}</div>
        </div>

        {/* Right: Trend Pill (Green or Red) */}
        {trend && (
          <div className={`summary-trend-pill ${trendPositive ? 'trend-up' : 'trend-down'}`}>
            <span className="trend-sim-char">~</span>
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
}
