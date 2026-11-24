# Developer Setup & Verification Guide

## Prerequisites

- **Node.js:** v18.x or later (verified on Node.js v24.14.1)
- **npm:** v9.x or later
- **Browser:** Any modern browser (Chrome, Edge, Firefox, Safari)

> **Environment Variables:** SpendWise does not require any `.env` file or external database credentials. The backend listens on port `4000` (`server/server.js`) and the frontend connects to `http://localhost:4000/graphql` (`src/services/graphql.js`).

## Step-by-Step Installation

```bash
# 1. Clone the repository
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd SpendWise-Income-Expense-Manager

# 2. Install frontend dependencies
npm install

# 3. Install backend dependencies
cd server
npm install
cd ..
```

## Available npm Scripts

### Root Directory (`package.json`)

| Script | Command | Description |
|---|---|---|
| `npm run dev` | `vite` | Starts the React frontend dev server on `http://localhost:5173` |
| `npm run build` | `vite build` | Builds the production frontend bundle into `dist/` |
| `npm run preview` | `vite preview` | Previews the production build locally |
| `npm run server` | `node server/server.js` | Starts the Express + Apollo GraphQL server on port `4000` |
| `npm run test:backend` | `node server/test-api.js` | Runs the automated GraphQL schema and resolver test suite |

### Server Directory (`server/package.json`)

| Script | Command | Description |
|---|---|---|
| `npm start` | `node server.js` | Starts the GraphQL backend server |
| `npm run dev` | `nodemon server.js` | Starts the backend with auto-restart on file changes |

## Running Locally

1. **Terminal 1 (Backend):**
   ```bash
   npm run server
   ```
   Wait for: `SpendWise GraphQL server ready at http://localhost:4000/graphql`

2. **Terminal 2 (Frontend):**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

## Troubleshooting

- **"Cannot connect to backend" banner in UI:** Ensure the GraphQL backend is running on port `4000` (`npm run server`) before refreshing the frontend.
- **Port 4000 or 5173 already in use:** Stop the conflicting process or update the port in `server/server.js` and `GRAPHQL_URL` in `src/services/graphql.js`.
- **Changes reset after server restart:** Expected behavior — `server/data/store.js` stores transactions in memory and resets to the 10 seed records when the Node process restarts.
