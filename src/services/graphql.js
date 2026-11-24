// graphql.js — All GraphQL operations using native Fetch API
// Demonstrates: Fetch API for GraphQL, no client library needed

const GRAPHQL_URL = 'http://localhost:4000/graphql';

// Generic helper: sends any GraphQL query or mutation via Fetch API
async function gqlFetch(query, variables = {}) {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  const json = await response.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

// QUERY: Retrieve all transactions
export async function getTransactions() {
  const data = await gqlFetch(`
    query GetTransactions {
      getTransactions {
        id title amount type category date description
      }
    }
  `);
  return data.getTransactions;
}

// QUERY: Retrieve single transaction
export async function getTransaction(id) {
  const data = await gqlFetch(`
    query GetTransaction($id: ID!) {
      getTransaction(id: $id) {
        id title amount type category date description
      }
    }
  `, { id });
  return data.getTransaction;
}

// MUTATION: Add a new transaction
export async function addTransaction(input) {
  const data = await gqlFetch(`
    mutation AddTransaction(
      $title: String!, $amount: Float!, $type: String!,
      $category: String!, $date: String!, $description: String
    ) {
      addTransaction(
        title: $title, amount: $amount, type: $type,
        category: $category, date: $date, description: $description
      ) { id title amount type category date description }
    }
  `, input);
  return data.addTransaction;
}

// MUTATION: Update an existing transaction
export async function updateTransaction(input) {
  const data = await gqlFetch(`
    mutation UpdateTransaction(
      $id: ID!, $title: String, $amount: Float, $type: String,
      $category: String, $date: String, $description: String
    ) {
      updateTransaction(
        id: $id, title: $title, amount: $amount, type: $type,
        category: $category, date: $date, description: $description
      ) { id title amount type category date description }
    }
  `, input);
  return data.updateTransaction;
}

// MUTATION: Delete a transaction by ID
export async function deleteTransaction(id) {
  const data = await gqlFetch(`
    mutation DeleteTransaction($id: ID!) {
      deleteTransaction(id: $id)
    }
  `, { id });
  return data.deleteTransaction;
}
