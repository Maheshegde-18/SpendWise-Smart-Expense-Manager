export let transactions = [
  {
    id: "1",
    title: "Salary",
    amount: 55000,
    type: "income",
    category: "Salary",
    date: "2026-07-01",
    description: "Monthly salary for July"
  },
  {
    id: "2",
    title: "Groceries",
    amount: 4500,
    type: "expense",
    category: "Food",
    date: "2026-07-10",
    description: "Monthly grocery shopping"
  },
  {
    id: "3",
    title: "Netflix+Hotstar",
    amount: 1200,
    type: "expense",
    category: "Entertainment",
    date: "2026-07-15",
    description: "Streaming subscriptions"
  },
  {
    id: "4",
    title: "Freelance",
    amount: 15000,
    type: "income",
    category: "Freelance",
    date: "2026-08-05",
    description: "Freelance web development project"
  },
  {
    id: "5",
    title: "Electricity Bill",
    amount: 2800,
    type: "expense",
    category: "Bills",
    date: "2026-08-12",
    description: "Monthly electricity bill"
  },
  {
    id: "6",
    title: "Bonus",
    amount: 10000,
    type: "income",
    category: "Bonus",
    date: "2026-09-01",
    description: "Performance bonus for Q2"
  },
  {
    id: "7",
    title: "College Fees",
    amount: 12000,
    type: "expense",
    category: "Education",
    date: "2026-09-10",
    description: "Semester college fees"
  },
  {
    id: "8",
    title: "Part-time",
    amount: 8000,
    type: "income",
    category: "Part-time",
    date: "2026-10-05",
    description: "Part-time tutoring income"
  },
  {
    id: "9",
    title: "Metro Pass",
    amount: 1500,
    type: "expense",
    category: "Transportation",
    date: "2026-10-01",
    description: "Monthly metro pass"
  },
  {
    id: "10",
    title: "Consulting",
    amount: 7000,
    type: "income",
    category: "Consulting",
    date: "2026-11-03",
    description: "IT consulting services"
  }
];

export function getAll() { return transactions; }
export function getById(id) { return transactions.find(t => t.id === id); }
export function add(tx) { transactions.push(tx); return tx; }
export function update(id, fields) {
  const idx = transactions.findIndex(t => t.id === id);
  if (idx === -1) return null;
  transactions[idx] = { ...transactions[idx], ...fields };
  return transactions[idx];
}
export function remove(id) {
  const idx = transactions.findIndex(t => t.id === id);
  if (idx === -1) return false;
  transactions.splice(idx, 1);
  return true;
}
