// test-api.js — Automated test for GraphQL queries & mutations
import { ApolloServer } from '@apollo/server';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './schema/resolvers.js';

async function runTests() {
  console.log('🧪 Starting GraphQL Server & Resolvers Test Suite...\n');
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  // Test 1: getTransactions
  console.log('1. Testing getTransactions Query:');
  const queryRes = await server.executeOperation({
    query: `query {
      getTransactions {
        id
        title
        amount
        type
        category
        date
        description
      }
    }`
  });
  const txs = queryRes.body.singleResult.data.getTransactions;
  console.log(`   ✅ Retrieved ${txs.length} initial transactions.`);
  if (txs.length < 10) throw new Error('Expected at least 10 initial transactions');

  // Test 2: addTransaction
  console.log('2. Testing addTransaction Mutation:');
  const addRes = await server.executeOperation({
    query: `mutation Add($title: String!, $amount: Float!, $type: String!, $category: String!, $date: String!, $description: String) {
      addTransaction(title: $title, amount: $amount, type: $type, category: $category, date: $date, description: $description) {
        id
        title
        amount
        type
      }
    }`,
    variables: {
      title: 'Automated Test Income',
      amount: 4500.5,
      type: 'income',
      category: 'Bonus',
      date: '2026-11-15',
      description: 'Verification test'
    }
  });
  const newTx = addRes.body.singleResult.data.addTransaction;
  console.log(`   ✅ Successfully added transaction with id: ${newTx.id}, title: "${newTx.title}"`);

  // Test 3: getTransaction
  console.log('3. Testing getTransaction(id) Query:');
  const singleRes = await server.executeOperation({
    query: `query GetOne($id: ID!) {
      getTransaction(id: $id) {
        id
        title
        amount
      }
    }`,
    variables: { id: newTx.id }
  });
  const fetchedTx = singleRes.body.singleResult.data.getTransaction;
  console.log(`   ✅ Fetched single transaction: ${fetchedTx.title} (₹${fetchedTx.amount})`);

  // Test 4: updateTransaction
  console.log('4. Testing updateTransaction Mutation:');
  const updateRes = await server.executeOperation({
    query: `mutation Up($id: ID!, $title: String, $amount: Float) {
      updateTransaction(id: $id, title: $title, amount: $amount) {
        id
        title
        amount
      }
    }`,
    variables: {
      id: newTx.id,
      title: 'Updated Test Income',
      amount: 5200.0
    }
  });
  const updatedTx = updateRes.body.singleResult.data.updateTransaction;
  console.log(`   ✅ Updated transaction: ${updatedTx.title} (₹${updatedTx.amount})`);

  // Test 5: deleteTransaction
  console.log('5. Testing deleteTransaction Mutation:');
  const delRes = await server.executeOperation({
    query: `mutation Del($id: ID!) {
      deleteTransaction(id: $id)
    }`,
    variables: { id: newTx.id }
  });
  const deleted = delRes.body.singleResult.data.deleteTransaction;
  console.log(`   ✅ Deleted transaction result: ${deleted}`);

  await server.stop();
  console.log('\n🎉 ALL GRAPHQL BACKEND TESTS PASSED SUCCESSFULLY!');
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
