export const typeDefs = `#graphql
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
    addTransaction(title: String!, amount: Float!, type: String!, category: String!, date: String!, description: String): Transaction!
    updateTransaction(id: ID!, title: String, amount: Float, type: String, category: String, date: String, description: String): Transaction
    deleteTransaction(id: ID!): Boolean!
  }
`;
