# SpendWise Architecture

## 1. System Overview

SpendWise uses a decoupled client-server architecture with three logical layers:

```text
┌──────────────────────────────────────────────────────────┐
│  Frontend (React 18 SPA — Vite on http://localhost:5173) │
│  • App.jsx (global state & view switching)               │
│  • Pages: Dashboard, Transactions, Reports               │
│  • Charts: Recharts (AreaChart, BarChart, PieChart)      │
│  • API Client: src/services/graphql.js (Native Fetch)    │
└────────────────────────────┬─────────────────────────────┘
                             │ HTTP POST /graphql (JSON)
                             ▼
┌──────────────────────────────────────────────────────────┐
│  Backend (Node.js + Express 4 + Apollo Server 4 :4000)   │
│  • server/server.js (CORS, body-parser, middleware)      │
│  • server/schema/typeDefs.js (GraphQL SDL)               │
│  • server/schema/resolvers.js (Query & Mutation logic)   │
└────────────────────────────┬─────────────────────────────┘
                             │ CRUD Function Calls
                             ▼
┌──────────────────────────────────────────────────────────┐
│  Data Layer (In-Memory Store — server/data/store.js)     │
│  • Seeded array of 10 transactions                       │
│  • Pure CRUD exports: getAll, getById, add, update,      │
│    remove (ready for future database substitution)       │
└──────────────────────────────────────────────────────────┘
```

## 2. React Component Hierarchy

```text
App (src/App.jsx)
├── Sidebar (src/components/Sidebar.jsx)
├── Navbar (src/components/Navbar.jsx)
└── <main> (conditionally rendered by activePage)
    ├── Dashboard (src/pages/Dashboard.jsx)
    │   ├── SummaryCard (×4)
    │   ├── CreditCardWidget
    │   ├── IncomeExpenseChart (Recharts AreaChart)
    │   ├── ExpensePieChart (Recharts PieChart / Donut)
    │   ├── TransactionList (isCompact=true)
    │   ├── AiAssistantWidget
    │   └── TransactionModal
    ├── Transactions (src/pages/Transactions.jsx)
    │   ├── TransactionList (isCompact=false)
    │   └── TransactionModal
    │   (Reused for activePage = 'transactions', 'income', and 'expenses' via defaultType prop)
    └── Reports (src/pages/Reports.jsx)
        ├── Revenue Grouped BarChart (Recharts)
        ├── Spending Limit Progress Bar
        ├── Weekly Expense Proportional Bubbles
        ├── Daily Expense Stacked BarChart (Recharts)
        └── Saving Goal Radial SVG Gauge & Goals Grid
```

## 3. State & Data Flow

- **Single Source of Truth:** `App.jsx` owns the `transactions` array, `loading`, `error`, `activePage`, `search`, and `notification` states.
- **Initial Load:** `App.jsx` runs `useEffect` on mount to call `getTransactions()` from `src/services/graphql.js`.
- **Derived Metrics:** `Dashboard.jsx`, `Transactions.jsx`, and `Reports.jsx` compute balance, income, expense, and category totals using `useMemo` whenever `transactions` changes.
- **Mutations & Immediate UI Sync:** After `addTransaction`, `updateTransaction`, or `deleteTransaction` resolves from the GraphQL server, the parent state is updated via `setTransactions`, immediately re-rendering cards, lists, and charts without reloading the page.

## 4. Data Persistence Note

SpendWise currently uses an **in-memory JavaScript array** in `server/data/store.js` pre-seeded with 10 sample transactions. Changes persist while the backend server process is running and reset to the initial 10 records when the server restarts. The store exports clean CRUD functions (`getAll`, `getById`, `add`, `update`, `remove`) so a persistent database such as MongoDB can be swapped in without changing the GraphQL schema or frontend.
