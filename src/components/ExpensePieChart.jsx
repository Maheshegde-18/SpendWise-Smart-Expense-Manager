// ExpensePieChart.jsx — Paynix-inspired "Expense Breakdown" Donut Chart
// Matches reference screenshot: Left category list with dots, bottom pill, Right Donut with centered Total Spent

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { MoreVertical, TrendingUp } from 'lucide-react';

const PAYNIX_DONUT_COLORS = [
  '#6C5DD3', // Paynix Purple
  '#8E82E3', // Soft Indigo
  '#191928', // Dark Slate/Black
  '#C7C3E8', // Light Lilac
  '#3B82F6', // Blue
  '#FF5B5B', // Coral
];

function buildCategoryData(transactions) {
  const map = {};
  let total = 0;

  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
      total += t.amount;
    });

  const list = Object.entries(map).map(([name, value]) => ({
    name,
    value: Math.round(value),
  }));

  // Sort descending
  list.sort((a, b) => b.value - a.value);

  // Fallback defaults if no expense data yet
  if (list.length === 0) {
    return {
      list: [
        { name: 'Marketing', value: 500 },
        { name: 'Operations', value: 400 },
        { name: 'Payroll', value: 350 },
        { name: 'Software', value: 250 },
      ],
      total: 1500,
    };
  }

  return { list, total };
}

export default function ExpensePieChart({ transactions }) {
  const { list, total } = buildCategoryData(transactions);

  const formattedTotal = `$${Number(total || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <div className="paynix-card expense-breakdown-card">
      {/* Header Row */}
      <div className="widget-header-row">
        <h3 className="widget-title">Expense Breakdown</h3>
        <button className="icon-dots-btn" title="Options">
          <MoreVertical size={16} />
        </button>
      </div>

      {/* Two Column Layout: Left Legend & Pill, Right Donut */}
      <div className="breakdown-body-layout">
        {/* Left Column: Categories List & Pill */}
        <div className="breakdown-left-col">
          <div className="category-dots-list">
            {list.slice(0, 4).map((cat, idx) => (
              <div key={cat.name} className="cat-dot-row">
                <span
                  className="cat-colored-dot"
                  style={{ background: PAYNIX_DONUT_COLORS[idx % PAYNIX_DONUT_COLORS.length] }}
                />
                <span className="cat-name-label">{cat.name}</span>
              </div>
            ))}
          </div>

          {/* Increased By Pill matching screenshot */}
          <div className="breakdown-trend-pill">
            <span>Increased By 19%</span>
            <TrendingUp size={13} strokeWidth={2.2} />
          </div>
        </div>

        {/* Right Column: Donut Chart with Centered Total Spent */}
        <div className="breakdown-right-col">
          <div className="donut-relative-wrap">
            <ResponsiveContainer width={170} height={170}>
              <PieChart>
                <Pie
                  data={list}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={3}
                  stroke="none"
                >
                  {list.map((_, i) => (
                    <Cell
                      key={`donut-${i}`}
                      fill={PAYNIX_DONUT_COLORS[i % PAYNIX_DONUT_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={val => [
                    `$${Number(val).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                    'Amount',
                  ]}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #EDEFF5',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Centered Total Spent Text */}
            <div className="donut-center-overlay">
              <span className="donut-spent-label">Total Spent</span>
              <span className="donut-spent-amount">{formattedTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
