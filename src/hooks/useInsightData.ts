// hooks/useInsightsData.ts
import { useMemo } from "react";
import { useFilteredInsights } from "./useFilteredInsights";

export const useInsightsData = () => {
  const data = useFilteredInsights();

  return useMemo(() => {
    const income = data.filter((t) => t.type === "income");
    const expense = data.filter((t) => t.type === "expense");

    const totalIncome = income.reduce((s, t) => s + t.amount, 0);
    const totalExpense = expense.reduce((s, t) => s + t.amount, 0);
    const savings = totalIncome - totalExpense;

    const categoryMap: Record<string, number> = {};
    expense.forEach((t) => {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    });

    const pieData = Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
    }));

    const lineDataMap: Record<string, number> = {};
    expense.forEach((t) => {
      lineDataMap[t.date] =
        (lineDataMap[t.date] || 0) + t.amount;
    });

    const lineData = Object.entries(lineDataMap).map(([date, value]) => ({
      date,
      value,
    }));

    return {
      totalIncome,
      totalExpense,
      savings,
      pieData,
      lineData,
    };
  }, [data]);
};