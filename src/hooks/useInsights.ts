// hooks/useInsights.ts
import { useMemo } from "react";
import { useTransactionStore } from "../app/store/useTransactionStore";

export const useInsights = (startDate?: string, endDate?: string) => {
  const transactions = useTransactionStore((s) => s.transactions);

  return useMemo(() => {
    if (!transactions.length) return null;

    // 🔥 Filter by date range
    const filtered = transactions.filter((t) => {
      if (!startDate || !endDate) return true;

      const d = new Date(t.date);
      return d >= new Date(startDate) && d <= new Date(endDate);
    });

    const income = filtered.filter((t) => t.type === "income");
    const expenses = filtered.filter((t) => t.type === "expense");

    const totalIncome = income.reduce((s, t) => s + t.amount, 0);
    const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);

    const savings = totalIncome - totalExpense;

    const savingsRate =
      totalIncome > 0
        ? Number(((savings / totalIncome) * 100).toFixed(1))
        : 0;

    // 🔥 Previous period comparison (same duration)
    let change = 0;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      const diff = end.getTime() - start.getTime();

      const prevStart = new Date(start.getTime() - diff);
      const prevEnd = new Date(end.getTime() - diff);

      const prevExpenses = transactions
        .filter((t) => {
          const d = new Date(t.date);
          return (
            t.type === "expense" &&
            d >= prevStart &&
            d <= prevEnd
          );
        })
        .reduce((sum, t) => sum + t.amount, 0);

      change =
        prevExpenses === 0
          ? 0
          : ((totalExpense - prevExpenses) / prevExpenses) * 100;
    }

    // 🔥 Category
    const categoryTotals: Record<string, number> = {};

    expenses.forEach((t) => {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + t.amount;
    });

    const topCategoryEntry = Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1]
    )[0];

    const topCategory = topCategoryEntry
      ? { name: topCategoryEntry[0], amount: topCategoryEntry[1] }
      : null;

    // 🔥 Biggest expense
    const biggestExpense = expenses.sort(
      (a, b) => b.amount - a.amount
    )[0];

    // 🔥 Avg daily
    const days =
      startDate && endDate
        ? Math.max(
            1,
            (new Date(endDate).getTime() -
              new Date(startDate).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        : 30;

    const avgDaily = totalExpense / days;

    return {
      totalIncome,
      totalExpense,
      savings,
      savingsRate,
      change,
      topCategory,
      biggestExpense,
      avgDaily,
    };
  }, [transactions, startDate, endDate]);
};