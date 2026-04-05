import type { Transaction } from "../types/transaction"
export const getExpensesByDate = (transactions: Transaction[]) => {
  const map: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      map[t.date] = (map[t.date] || 0) + t.amount;
    }
  });

  return Object.entries(map).map(([date, amount]) => ({
    date,
    amount,
  }));
};


export const getCategoryBreakdown = (transactions: Transaction[]) => {
  const map: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      map[t.category] = (map[t.category] || 0) + t.amount;
    }
  });

  return Object.entries(map).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));
};

export const getExpensesForMonth = (transactions:Transaction[], selectedMonth: string) => {
  const map: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      const date = new Date(t.date);
      const month = date.toLocaleString("default", { month: "short" });

      if (month === selectedMonth) {
        const day = date.getDate();

        map[day] = (map[day] || 0) + t.amount;
      }
    }
  });

  return Object.entries(map)
    .map(([day, amount]) => ({
      day,
      amount,
    }))
    .sort((a, b) => Number(a.day) - Number(b.day));
};

export const getMonthlyInsights = (
  transactions: Transaction[],
  selectedMonth: string
) => {
  const categoryMap: Record<string, number> = {};
  let total = 0;
  let days = new Set<number>();

  transactions.forEach((t) => {
    if (t.type === "expense") {
      const date = new Date(t.date);
      const month = date.toLocaleString("default", { month: "short" });

      if (month === selectedMonth) {
        total += t.amount;
        days.add(date.getDate());

        categoryMap[t.category] =
          (categoryMap[t.category] || 0) + t.amount;
      }
    }
  });

  // Top category
  const topCategory = Object.entries(categoryMap).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const avg = days.size ? Math.round(total / days.size) : 0;

  return {
    total,
    topCategory: topCategory?.[0] || "N/A",
    avg,
    categoryMap,
  };
};

export const getTopCategories = (categoryMap: Record<string, number>) => {
  return Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, value]) => ({ name, value }));
};

export const getTrend = (current: number, previous: number) => {
  if (!previous) return 0;

  return ((current - previous) / previous) * 100;
};

export const getPreviousMonth = (month: string) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const index = months.indexOf(month);
  return index === 0 ? "Dec" : months[index - 1];
};