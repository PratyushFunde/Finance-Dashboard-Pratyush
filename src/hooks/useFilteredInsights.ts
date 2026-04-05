// hooks/useFilteredInsights.ts
import { useMemo } from "react";
import { useTransactionStore } from "../app/store/useTransactionStore";
import { useInsightsStore } from "../app/store/useInsightStore";

export const useFilteredInsights = () => {
  const transactions = useTransactionStore((s) => s.transactions);
  const { startDate, endDate } = useInsightsStore();

  return useMemo(() => {
    if (!startDate || !endDate) return transactions;

    return transactions.filter((tx) => {
      const d = new Date(tx.date).getTime();
      return (
        d >= new Date(startDate).getTime() &&
        d <= new Date(endDate).getTime()
      );
    });
  }, [transactions, startDate, endDate]);
};