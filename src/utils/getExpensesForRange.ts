// utils/getExpensesForRange.ts
import type { Transaction } from "../types/transaction";

export const getExpensesForRange = (
  transactions: Transaction[],
  startDate: string | null,
  endDate: string | null
) => {
  if (!startDate || !endDate) return [];

  const start = new Date(startDate);
  const end = new Date(endDate);

  const map: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type !== "expense") return;

    const d = new Date(t.date);

    if (d >= start && d <= end) {
      const label = d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      });

      map[label] = (map[label] || 0) + t.amount;
    }
  });

  return Object.entries(map).map(([day, amount]) => ({
    day,
    amount,
  }));
};