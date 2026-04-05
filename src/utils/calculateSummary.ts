import type { Transaction } from "../types/transaction";

export const calculateSummary = (
  transactions: Transaction[],
  month: string
) => {
  const filtered = transactions.filter((t) => {
    const date = new Date(t.date);
    const monthName = date.toLocaleString("default", {
      month: "short",
    });
    return monthName === month;
  });

  const income = filtered
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = filtered
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  const savings = income > 0 ? (balance / income) * 100 : 0;

  return {
    income,
    expense,
    balance,
    savings,
  };
};