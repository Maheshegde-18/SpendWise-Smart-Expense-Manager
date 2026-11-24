import { getAll, getById, add, update, remove } from '../data/store.js';

export const resolvers = {
  Query: {
    getTransactions: () => getAll(),
    getTransaction: (_, { id }) => getById(id),
  },
  Mutation: {
    addTransaction: (_, args) => {
      const tx = { id: String(Date.now() + Math.floor(Math.random() * 1000)), ...args };
      return add(tx);
    },
    updateTransaction: (_, { id, ...fields }) => update(id, fields),
    deleteTransaction: (_, { id }) => remove(id),
  },
};
