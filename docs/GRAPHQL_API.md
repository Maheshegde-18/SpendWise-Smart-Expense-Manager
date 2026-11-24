# SpendWise GraphQL API Reference

**Endpoint:** `POST http://localhost:4000/graphql`  
**Content-Type:** `application/json`  
**Server Stack:** Express.js 4 + Apollo Server 4 (`@apollo/server/express4`)

## 1. Schema Definition (`server/schema/typeDefs.js`)

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

type Query {
  getTransactions: [Transaction!]!
  getTransaction(id: ID!): Transaction
}

type Mutation {
  addTransaction(
    title: String!
    amount: Float!
    type: String!
    category: String!
    date: String!
    description: String
  ): Transaction!

  updateTransaction(
    id: ID!
    title: String
    amount: Float
    type: String
    category: String
    date: String
    description: String
  ): Transaction

  deleteTransaction(id: ID!): Boolean!
}
```

## 2. Operations Summary

| Operation | Type | Arguments | Return Type | Resolver Backing (`store.js`) |
|---|---|---|---|---|
| `getTransactions` | Query | None | `[Transaction!]!` | `getAll()` |
| `getTransaction` | Query | `id: ID!` | `Transaction` | `getById(id)` |
| `addTransaction` | Mutation | `title`, `amount`, `type`, `category`, `date`, `description` | `Transaction!` | `add(tx)` |
| `updateTransaction` | Mutation | `id`, optional fields | `Transaction` | `update(id, fields)` |
| `deleteTransaction` | Mutation | `id: ID!` | `Boolean!` | `remove(id)` |

## 3. Native Fetch API Client (`src/services/graphql.js`)

The frontend does not use Apollo Client or Relay. All operations use a lightweight `gqlFetch(query, variables)` helper built on `window.fetch()`:

```javascript
async function gqlFetch(query, variables = {}) {
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  const json = await response.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}
```

## 4. Example Requests

### Fetch All Transactions (`curl`)

```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"query { getTransactions { id title amount type category date description } }"}'
```

### Add a Transaction

```graphql
mutation AddTransaction(
  $title: String!, $amount: Float!, $type: String!,
  $category: String!, $date: String!, $description: String
) {
  addTransaction(
    title: $title, amount: $amount, type: $type,
    category: $category, date: $date, description: $description
  ) {
    id
    title
    amount
    type
    category
    date
    description
  }
}
```

### Update a Transaction

```graphql
mutation UpdateTransaction($id: ID!, $title: String, $amount: Float) {
  updateTransaction(id: $id, title: $title, amount: $amount) {
    id
    title
    amount
    type
    category
    date
    description
  }
}
```

### Delete a Transaction

```graphql
mutation DeleteTransaction($id: ID!) {
  deleteTransaction(id: $id)
}
```
