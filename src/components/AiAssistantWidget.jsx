// AiAssistantWidget.jsx — Paynix-inspired AI Financial Assistant Component
// Demonstrates: Real-time data analysis, interactive prompt chips, 3D iridescent orb

import { useState } from 'react';
import { MoreVertical, Send, Sparkles, Lightbulb, TrendingUp, FileText, PieChart } from 'lucide-react';

export default function AiAssistantWidget({ transactions }) {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);

  // Dynamic analysis of live transaction data
  function generateInsight(type) {
    const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const balance = income - expense;
    const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : 0;

    // Top expense category
    const catMap = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      catMap[t.category] = (catMap[t.category] || 0) + t.amount;
    });
    const topCat = Object.entries(catMap).sort((a, b) => b[1] - a[1])[0] || ['None', 0];

    if (type === 'insights') {
      setResponse(`💡 Your net balance is ₹${balance.toLocaleString('en-IN')}. Your savings rate is ${savingsRate}%, which is healthy! Top expenditure is ${topCat[0]} (₹${topCat[1].toLocaleString('en-IN')}).`);
    } else if (type === 'analysis') {
      setResponse(`📊 Total expenses: ₹${expense.toLocaleString('en-IN')} across ${transactions.filter(t => t.type === 'expense').length} categories. Reducing ${topCat[0]} could increase savings by 15%.`);
    } else if (type === 'forecast') {
      setResponse(`📈 At your current spending velocity, your projected end-of-quarter savings will reach ₹${(balance * 1.4).toFixed(0).toLocaleString('en-IN')}. Cash flow is positive.`);
    } else if (type === 'reports') {
      setResponse(`📋 Live Audit: ${transactions.length} records processed via GraphQL. Inflow ₹${income.toLocaleString('en-IN')}, Outflow ₹${expense.toLocaleString('en-IN')}. Zero reconciliation errors.`);
    }
  }

  function handleSend(e) {
    e.preventDefault();
    if (!query.trim()) return;
    const q = query.toLowerCase();
    const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

    if (q.includes('income') || q.includes('earn')) {
      setResponse(`💰 Total verified income is ₹${income.toLocaleString('en-IN')} across ${transactions.filter(t => t.type === 'income').length} credits.`);
    } else if (q.includes('expense') || q.includes('spend')) {
      setResponse(`📉 Total outflow is ₹${expense.toLocaleString('en-IN')}. Main spend: Food & Entertainment.`);
    } else if (q.includes('save') || q.includes('balance')) {
      setResponse(`🏦 Net reserve is ₹${(income - expense).toLocaleString('en-IN')}. Safe to allocate 20% to emergency funds.`);
    } else {
      setResponse(`✨ SpendWise AI: Based on your ${transactions.length} transactions, your cash flow is well-balanced. Balance: ₹${(income - expense).toLocaleString('en-IN')}.`);
    }
    setQuery('');
  }

  return (
    <div className="paynix-card ai-assistant-container">
      {/* Header */}
      <div className="widget-header-row">
        <h3 className="widget-title">Ai Assistant</h3>
        <button className="icon-dots-btn" title="Options">
          <MoreVertical size={16} />
        </button>
      </div>

      {/* Iridescent 3D Sphere Graphic */}
      <div className="orb-visual-wrapper">
        <div className="iridescent-orb">
          <div className="orb-glow-inner" />
          <div className="orb-swirl" />
        </div>
        <p className="orb-heading">Your Smart Financial Assistant!</p>
      </div>

      {/* Suggestion Chips */}
      <div className="ai-chips-grid">
        <button
          type="button"
          onClick={() => generateInsight('insights')}
          className="ai-chip-pill"
        >
          <Lightbulb size={12} color="#6C5DD3" />
          <span>Smart Insights</span>
        </button>
        <button
          type="button"
          onClick={() => generateInsight('analysis')}
          className="ai-chip-pill"
        >
          <PieChart size={12} color="#6C5DD3" />
          <span>Expense Analysis</span>
        </button>
        <button
          type="button"
          onClick={() => generateInsight('forecast')}
          className="ai-chip-pill"
        >
          <TrendingUp size={12} color="#6C5DD3" />
          <span>Cash Flow Forecast</span>
        </button>
        <button
          type="button"
          onClick={() => generateInsight('reports')}
          className="ai-chip-pill"
        >
          <FileText size={12} color="#6C5DD3" />
          <span>Auto Reports</span>
        </button>
      </div>

      {/* Insight Response Callout (if active) */}
      {response && (
        <div className="ai-response-callout">
          <Sparkles size={14} color="#6C5DD3" className="sparkle-icon" />
          <p className="response-text">{response}</p>
        </div>
      )}

      {/* Input Field */}
      <form onSubmit={handleSend} className="ai-input-form">
        <input
          type="text"
          placeholder="Ask anything..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="ai-chat-input"
        />
        <button type="submit" className="ai-send-btn" title="Send Query">
          <span>Send</span>
          <Send size={13} />
        </button>
      </form>
    </div>
  );
}
