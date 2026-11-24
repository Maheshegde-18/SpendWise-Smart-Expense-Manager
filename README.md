# SpendWise – Income & Expense Manager

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express-4.18.2-000000?logo=express&logoColor=white)
![Apollo Server](https://img.shields.io/badge/Apollo%20Server-4.10.0-311C87?logo=apollographql&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-16.x-E10098?logo=graphql&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2.12.0-22B5BF)

**SpendWise** is a full-stack interactive income and expense management web application built with **React 18**, **Node.js**, **Express.js**, and **Apollo Server 4 (GraphQL)**. It enables users to record, categorize, search, update, delete, and visualize personal financial transactions in real time—communicating with the GraphQL API purely through the browser's **native JavaScript Fetch API** without heavyweight client-side GraphQL SDKs.

> **Documentation:** [Architecture Guide](docs/ARCHITECTURE.md) · [GraphQL API Reference](docs/GRAPHQL_API.md) · [Developer Setup Guide](docs/SETUP.md) · [Project Report (PDF)](docs/project-report/SpendWise_Mini_Project_Report_Revised.pdf)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Objectives](#objectives)
3. [Key Features](#key-features)
4. [Technology Stack](#technology-stack)
5. [Application Screenshots](#application-screenshots)
6. [Project Architecture](#project-architecture)
7. [Folder Structure](#folder-structure)
8. [Installation Requirements](#installation-requirements)
9. [Installation and Setup Instructions](#installation-and-setup-instructions)
10. [How to Run the Frontend](#how-to-run-the-frontend)
11. [How to Run the Backend](#how-to-run-the-backend)
12. [GraphQL API Overview](#graphql-api-overview)
13. [GraphQL Queries and Mutations](#graphql-queries-and-mutations)
14. [Application Working Flow](#application-working-flow)
15. [Future Enhancements](#future-enhancements)
16. [Author Information](#author-information)

---

## Project Overview

Personal finance tracking through manual notebooks or scattered spreadsheets often leads to calculation errors, delayed visibility into available balances, and poor awareness of category-level spending. SpendWise solves this by providing a responsive Single Page Application (SPA) with real-time financial aggregation, interactive charts, and full CRUD transaction management backed by a strongly typed GraphQL API.

On startup, the Express + Apollo Server backend serves 10 pre-seeded financial transactions from an **in-memory JavaScript data store** (`server/data/store.js`). Every create, update, or delete action executed in the React UI dispatches a GraphQL mutation over HTTP `POST` using `window.fetch()` and immediately recalculates dashboard metrics and charts.

---

## Objectives

- Develop an interactive, responsive income and expense management SPA using **React 18** functional components.
- Record and categorize financial transactions into **Income** and **Expense** types with dedicated category lists.
- Dynamically calculate **Total Balance**, **Net Profit**, **Monthly Income**, and **Monthly Expenses** using React Hooks (`useState`, `useEffect`, `useMemo`).
- Provide complete transaction CRUD functionality (add, edit, delete, and inline search) with client-side form validation.
- Visualize financial trends and category breakdowns using **Recharts**.
- Implement a strongly typed **GraphQL** schema, queries, mutations, and resolver functions with **Apollo Server 4** and **Express.js**.
- Communicate with the GraphQL backend using the **native Fetch API** instead of third-party client libraries.

---

## Key Features

- **Dashboard Overview (`Dashboard.jsx`):**
  - 4 real-time summary cards (`SummaryCard`): Total Balance, Net Profit, Monthly Income, and Monthly Expenses.
  - Virtual account card widget (`CreditCardWidget`) with quick-add trigger.
  - **Transaction Overview (`IncomeExpenseChart`):** Recharts `AreaChart` comparing monthly income and expense trends with custom tooltips.
  - **Expense Breakdown (`ExpensePieChart`):** Recharts Donut `PieChart` showing expense category distribution and centered total spend.
  - **Recent Transactions (`TransactionList`):** Compact list with merchant/category badges, inline search, and hover edit/delete actions.
  - **AI Assistant Widget (`AiAssistantWidget`):** Interactive heuristic assistant providing live insights, expense analysis, and cash-flow summaries from the active transaction list.
- **Transactions, Income & Expenses Views (`Transactions.jsx`):**
  - Full transaction ledger with Net Balance, Total Inflow, and Total Outflow summary cards.
  - Dedicated navigation views for **All Transactions**, **Income Operations**, and **Expense Operations**.
  - Inline real-time search by title or category.
- **Add / Edit Transaction Modal (`TransactionModal.jsx`):**
  - Controlled form inputs with segmented **Income / Expense** toggle, type-specific categories, date picker, and optional description.
  - Client-side validation for required title, positive amount, category, and date.
  - Delete confirmation modal before removing any record.
- **Reports & Analytics (`Reports.jsx`):**
  - 3-column analytics layout featuring a Revenue grouped `BarChart`, Spending Limit progress bar, Weekly Expense proportional bubbles, Daily Expense stacked `BarChart`, Saving Goal radial SVG gauge, and 2×2 saving goal cards.

---

## Technology Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Frontend Framework** | React & React DOM | `18.2.0` | Functional components, Hooks (`useState`, `useEffect`, `useMemo`), SPA UI |
| **Build Tool** | Vite (`@vitejs/plugin-react`) | `5.2.0` | Fast development server and production bundling |
| **Data Visualization** | Recharts | `2.12.0` | Responsive `AreaChart`, `BarChart`, and Donut `PieChart` |
| **Icons** | Lucide React | `0.372.0` | Lightweight SVG icon components |
| **API Client** | Native Fetch API | Browser built-in | HTTP `POST` GraphQL requests (`src/services/graphql.js`) |
| **Styling** | HTML5 & CSS3 | — | Custom Flexbox/Grid responsive layout (`src/index.css`) |
| **Backend Runtime** | Node.js | `18+` | Server-side JavaScript (ES Modules) |
| **Web Server** | Express.js | `4.18.2` | HTTP server, CORS (`2.8.5`), body-parser (`1.20.2`) |
| **GraphQL Engine** | Apollo Server (`@apollo/server`) & GraphQL | `4.10.0` / `16.x` | Schema validation, query/mutation execution, resolvers |
| **Data Storage** | In-Memory JavaScript Store | — | Seeded array with CRUD helpers (`server/data/store.js`) |
| **Dev Utility** | Nodemon | `3.1.0` | Auto-reload for backend development (`server/package.json`) |

---

## Application Screenshots

Genuine screenshots of the running application should be placed in [`docs/screenshots/`](docs/screenshots/README.md). No placeholder or mockup images are embedded here.

Recommended screenshots to capture from `http://localhost:5173` and add to `docs/screenshots/`:

1. `dashboard.png` — Main Dashboard with summary cards, area chart, donut chart, recent transactions, and AI widget
2. `transactions.png` — Full Transactions Ledger page with summary metrics and inline search
3. `add-transaction.png` — Add Transaction modal form with type toggle and validation
4. `edit-transaction.png` — Edit Transaction modal pre-filled with an existing entry
5. `income.png` — Income Operations view
6. `expenses.png` — Expense Operations view
7. `reports.png` — Reports & Analytics 3-column page with Recharts bar charts and radial gauge

See [`docs/screenshots/README.md`](docs/screenshots/README.md) for instructions on embedding captured screenshots here.

---

## Project Architecture

SpendWise separates the UI presentation, GraphQL API layer, and in-memory data store:

```text
React 18 SPA (Vite :5173)
   │  Native fetch() — HTTP POST { query, variables }
   ▼
Express.js + Apollo Server 4 (:4000/graphql)
   │  Schema validation (typeDefs.js) → Resolvers (resolvers.js)
   ▼
In-Memory Data Store (server/data/store.js)
   │  getAll(), getById(), add(), update(), remove()
   ▼
JSON Response → React State Update → Instant Dashboard & Chart Re-render
```

For the full component hierarchy and state-flow breakdown, see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## Folder Structure

```text
SpendWise-Income-Expense-Manager/
├── index.html                        # HTML5 entry point for Vite
├── package.json                      # Frontend dependencies & root scripts
├── package-lock.json                 # Frontend dependency lockfile
├── vite.config.js                    # Vite + React plugin configuration
├── .gitignore                        # Git ignore rules
├── README.md                         # Project documentation
├── src/
│   ├── main.jsx                      # React root entry (ReactDOM.createRoot)
│   ├── App.jsx                       # Root layout, global state, view routing, toasts
│   ├── index.css                     # Application stylesheet
│   ├── services/
│   │   └── graphql.js                # Native Fetch API GraphQL client
│   ├── components/
│   │   ├── Sidebar.jsx               # Floating vertical navigation dock
│   │   ├── Navbar.jsx                # Top header bar with search & notifications
│   │   ├── SummaryCard.jsx           # Reusable financial metric card
│   │   ├── CreditCardWidget.jsx      # Virtual card widget with quick-add button
│   │   ├── IncomeExpenseChart.jsx    # Monthly Income vs Expense AreaChart
│   │   ├── ExpensePieChart.jsx       # Category Expense Breakdown Donut PieChart
│   │   ├── TransactionList.jsx       # Searchable transaction list with edit/delete
│   │   ├── TransactionModal.jsx      # Controlled Add/Edit form modal with validation
│   │   └── AiAssistantWidget.jsx     # Heuristic financial insights widget
│   └── pages/
│       ├── Dashboard.jsx             # Main overview dashboard
│       ├── Transactions.jsx          # Ledger page (All / Income / Expenses)
│       └── Reports.jsx               # 3-column analytics & saving goals page
├── server/
│   ├── package.json                  # Backend dependencies & scripts
│   ├── package-lock.json             # Backend dependency lockfile
│   ├── server.js                     # Express + Apollo Server 4 setup (port 4000)
│   ├── test-api.js                   # Automated GraphQL query & mutation test suite
│   ├── data/
│   │   └── store.js                  # In-memory store with 10 seed transactions
│   └── schema/
│       ├── typeDefs.js               # GraphQL SDL (Transaction, Query, Mutation)
│       └── resolvers.js              # Query and Mutation resolver functions
└── docs/
    ├── ARCHITECTURE.md               # Architecture & component hierarchy
    ├── GRAPHQL_API.md                # Detailed GraphQL schema & request examples
    ├── SETUP.md                      # Detailed developer setup & troubleshooting
    ├── screenshots/                  # Directory for live application screenshots
    │   └── README.md                 # Screenshot checklist & capture guide
    └── project-report/               # Academic mini-project report documents
        ├── SpendWise_Mini_Project_Report_Revised.pdf
        ├── SpendWise_Mini_Project_Report.pdf
        └── SpendWise_Mini_Project_Report.docx
```

---

## Installation Requirements

- **Node.js** `v18.x` or later
- **npm** `v9.x` or later
- A modern web browser (Chrome, Edge, Firefox, or Safari)
- No database server or `.env` configuration is required (uses an in-memory store).

---

## Installation and Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/SpendWise-Income-Expense-Manager.git
cd SpendWise-Income-Expense-Manager

# 2. Install frontend dependencies
npm install

# 3. Install backend dependencies
cd server
npm install
cd ..
```

### Verify Backend Tests & Frontend Build

```bash
# Run automated GraphQL query & mutation tests
npm run test:backend

# Verify production frontend build
npm run build
```

---

## How to Run the Frontend

Start the Vite development server from the project root:

```bash
npm run dev
```

- **Frontend URL:** `http://localhost:5173`

> Ensure the GraphQL backend is running first so the dashboard can load transactions.

---

## How to Run the Backend

From the **project root**:

```bash
npm run server
```

Or from the **`server/` directory**:

```bash
cd server
npm start       # Standard run (node server.js)
# or
npm run dev     # Auto-reload with nodemon
```

- **GraphQL Endpoint:** `http://localhost:4000/graphql`

---

## GraphQL API Overview

The backend mounts Apollo Server 4 on Express at `POST /graphql` with CORS and JSON body parsing enabled. The core data model is the `Transaction` type:

```graphql
type Transaction {
  id: ID!
  title: String!
  amount: Float!
  type: String!
  category: String!
  date: String!
  description: String
}
```

---

## GraphQL Queries and Mutations

### Queries

| Query | Arguments | Returns | Usage |
|---|---|---|---|
| `getTransactions` | None | `[Transaction!]!` | Loaded on app mount in `App.jsx` |
| `getTransaction` | `id: ID!` | `Transaction` | Single transaction lookup by ID |

### Mutations

| Mutation | Arguments | Returns | Usage |
|---|---|---|---|
| `addTransaction` | `title!`, `amount!`, `type!`, `category!`, `date!`, `description` | `Transaction!` | Creates a new transaction from `TransactionModal` |
| `updateTransaction` | `id!`, `title`, `amount`, `type`, `category`, `date`, `description` | `Transaction` | Updates an existing record from `TransactionModal` |
| `deleteTransaction` | `id: ID!` | `Boolean!` | Deletes a transaction after confirmation |

For full SDL, resolver details, and `curl` / Fetch examples, see [`docs/GRAPHQL_API.md`](docs/GRAPHQL_API.md).

---

## Application Working Flow

1. User opens SpendWise in the browser (`http://localhost:5173`).
2. React mounts `App.jsx` and triggers `useEffect` to call `getTransactions()`.
3. `src/services/graphql.js` sends a `POST` request to `http://localhost:4000/graphql` using `window.fetch()`.
4. Express.js receives the request, applies CORS and JSON parsing, and passes it to Apollo Server 4.
5. Apollo Server validates the query against `typeDefs.js` and invokes the matching resolver in `resolvers.js`.
6. The resolver reads from or mutates the in-memory array in `server/data/store.js`.
7. The server returns a typed JSON payload (`{ data: { ... } }`).
8. React updates the `transactions` state in `App.jsx`.
9. `useMemo` recalculates Total Balance, Net Profit, Monthly Income, Monthly Expenses, and category totals.
10. Summary cards, Recharts visualizations, and transaction lists re-render immediately.
11. Adding, editing, or deleting a transaction follows the same mutation → resolver → state-update cycle without reloading the page.

---

## Future Enhancements

- **Persistent Database:** Replace the in-memory store in `server/data/store.js` with MongoDB + Mongoose (or PostgreSQL) while keeping the same CRUD interface.
- **User Authentication:** Add JWT-based sign-up/login so multiple users can maintain isolated ledgers.
- **Data Export:** Export filtered transactions and monthly summaries to CSV or PDF.
- **Recurring Transactions & Custom Budgets:** Automate monthly subscriptions and user-configurable spending limits.

---

## Author Information

- **Author:** Mahesh Shivarama Hegde
- **Program:** Master of Computer Applications (MCA)
- **Institution:** NMAM Institute of Technology, Nitte (An off-Campus Institution of Nitte (Deemed to be University), Mangalore)
- **Academic Year:** 2026
