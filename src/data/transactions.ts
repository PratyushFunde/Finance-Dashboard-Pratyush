import type {Transaction} from "../types/transaction"
export const transactions: Transaction[] = [
  // Income
  { id: "1", amount: 5000, category: "Salary", type: "income", date: "2024-01-05" },
  { id: "2", amount: 5200, category: "Salary", type: "income", date: "2024-02-05" },
  { id: "3", amount: 5100, category: "Salary", type: "income", date: "2024-03-05" },
  { id: "4", amount: 5300, category: "Salary", type: "income", date: "2024-04-05" },
  { id: "5", amount: 5400, category: "Salary", type: "income", date: "2024-05-05" },

  // Expenses - Food
  { id: "6", amount: 120, category: "Food", type: "expense", date: "2024-01-10" },
  { id: "7", amount: 80, category: "Food", type: "expense", date: "2024-01-15" },
  { id: "8", amount: 150, category: "Food", type: "expense", date: "2024-02-12" },
  { id: "9", amount: 90, category: "Food", type: "expense", date: "2024-03-18" },
  { id: "10", amount: 200, category: "Food", type: "expense", date: "2024-04-11" },

  // Rent
  { id: "11", amount: 1200, category: "Rent", type: "expense", date: "2024-01-01" },
  { id: "12", amount: 1200, category: "Rent", type: "expense", date: "2024-02-01" },
  { id: "13", amount: 1200, category: "Rent", type: "expense", date: "2024-03-01" },
  { id: "14", amount: 1200, category: "Rent", type: "expense", date: "2024-04-01" },
  { id: "15", amount: 1200, category: "Rent", type: "expense", date: "2024-05-01" },

  // Shopping
  { id: "16", amount: 300, category: "Shopping", type: "expense", date: "2024-01-20" },
  { id: "17", amount: 450, category: "Shopping", type: "expense", date: "2024-02-22" },
  { id: "18", amount: 250, category: "Shopping", type: "expense", date: "2024-03-10" },
  { id: "19", amount: 600, category: "Shopping", type: "expense", date: "2024-04-25" },
  { id: "20", amount: 350, category: "Shopping", type: "expense", date: "2024-05-14" },

  // Transport
  { id: "21", amount: 60, category: "Transport", type: "expense", date: "2024-01-08" },
  { id: "22", amount: 75, category: "Transport", type: "expense", date: "2024-02-09" },
  { id: "23", amount: 55, category: "Transport", type: "expense", date: "2024-03-11" },
  { id: "24", amount: 90, category: "Transport", type: "expense", date: "2024-04-19" },
  { id: "25", amount: 70, category: "Transport", type: "expense", date: "2024-05-21" },

  // Entertainment
  { id: "26", amount: 150, category: "Entertainment", type: "expense", date: "2024-01-28" },
  { id: "27", amount: 200, category: "Entertainment", type: "expense", date: "2024-02-17" },
  { id: "28", amount: 180, category: "Entertainment", type: "expense", date: "2024-03-25" },
  { id: "29", amount: 220, category: "Entertainment", type: "expense", date: "2024-04-18" },
  { id: "30", amount: 160, category: "Entertainment", type: "expense", date: "2024-05-23" },

  // Utilities
  { id: "31", amount: 100, category: "Utilities", type: "expense", date: "2024-01-12" },
  { id: "32", amount: 110, category: "Utilities", type: "expense", date: "2024-02-13" },
  { id: "33", amount: 95, category: "Utilities", type: "expense", date: "2024-03-14" },
  { id: "34", amount: 120, category: "Utilities", type: "expense", date: "2024-04-15" },
  { id: "35", amount: 105, category: "Utilities", type: "expense", date: "2024-05-16" },

  // Freelance Income
  { id: "36", amount: 800, category: "Freelance", type: "income", date: "2024-02-20" },
  { id: "37", amount: 600, category: "Freelance", type: "income", date: "2024-03-22" },
  { id: "38", amount: 900, category: "Freelance", type: "income", date: "2024-04-28" },
  { id: "39", amount: 700, category: "Freelance", type: "income", date: "2024-05-30" },

  // Misc
  { id: "40", amount: 50, category: "Misc", type: "expense", date: "2024-01-18" },
  { id: "41", amount: 75, category: "Misc", type: "expense", date: "2024-02-21" },
  { id: "42", amount: 60, category: "Misc", type: "expense", date: "2024-03-27" },
  { id: "43", amount: 90, category: "Misc", type: "expense", date: "2024-04-29" },
  { id: "44", amount: 80, category: "Misc", type: "expense", date: "2024-05-31" },

  // Bonus Income
  { id: "45", amount: 1000, category: "Bonus", type: "income", date: "2024-03-01" },
  { id: "46", amount: 1200, category: "Bonus", type: "income", date: "2024-05-01" },

  // Extra Expenses
  { id: "47", amount: 300, category: "Travel", type: "expense", date: "2024-03-05" },
  { id: "48", amount: 400, category: "Travel", type: "expense", date: "2024-04-10" },
  { id: "49", amount: 350, category: "Travel", type: "expense", date: "2024-05-12" },
  { id: "50", amount: 200, category: "Health", type: "expense", date: "2024-04-22" },
];