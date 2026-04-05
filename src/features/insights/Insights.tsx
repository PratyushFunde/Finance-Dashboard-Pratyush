import { ConfigProvider, DatePicker } from "antd";
import dayjs from "dayjs";

import { useInsights } from "../../hooks/useInsights";
import { useTransactionStore } from "../../app/store/useTransactionStore";

import { getExpensesForRange } from "../../utils/getExpensesForRange";
import { useInsightsStore } from "../../app/store/useInsightStore";
import ExpenseLineChart from "../../components/common/charts/ExpenseLineChart";

const { RangePicker } = DatePicker;

const Card = ({ title, children }: any) => (
    <div className="p-4 rounded-xl bg-(--card-soft) border border-(--border) shadow-sm">
        <p className="text-sm text-(--text-muted) mb-1">{title}</p>
        <div className="text-(--text) text-base font-semibold">
            {children}
        </div>
    </div>
);

const Insights = () => {
    const { startDate, endDate, setDateRange } = useInsightsStore();
    const transactions = useTransactionStore((s) => s.transactions);

    const insights = useInsights(startDate ?? undefined, endDate ?? undefined);

    const chartData = getExpensesForRange(
        transactions,
        startDate,
        endDate
    );

    if (!insights) {
        return (
            <div className="p-6 text-center text-(--text-muted)">
                No data available to generate insights 📭
            </div>
        );
    }

    const {
        totalIncome,
        totalExpense,
        savings,
        savingsRate,
        change,
        topCategory,
        biggestExpense,
        avgDaily,
    } = insights;

    return (
        <div className="p-4 space-y-4">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="text-lg font-semibold text-(--text)">
                    Insights
                </h2>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: "var(--primary)",
                            colorText: "var(--text)",
                            colorTextPlaceholder: "var(--text-muted)",
                            colorBgContainer: "var(--card)",
                            colorBorder: "var(--border)",
                            borderRadius: 10,
                        },
                        components: {
                            DatePicker: {
                                colorBgContainer: "var(--card)",
                                colorBorder: "var(--border)",
                                colorText: "var(--text)",
                                colorTextPlaceholder: "var(--text)",
                                colorPrimary: "var(--primary)",
                                controlItemBgHover: "var(--primary-soft)",
                                controlItemBgActive: "var(--primary)",
                                colorBgElevated: "var(--card)"
                            },
                        },
                    }}
                >
                    <RangePicker
                        value={
                            startDate && endDate
                                ? [dayjs(startDate), dayjs(endDate)]
                                : null
                        }
                        onChange={(dates) => {
                            if (!dates) return;
                            setDateRange(
                                dates[0]?.toISOString() || "",
                                dates[1]?.toISOString() || ""
                            );
                        }}
                        allowClear
                        className="rounded-md"
                    />
                </ConfigProvider>
            </div>

            <div className="p-4 rounded-xl bg-(--card) border border-(--border)">
                <p className="text-(--text)">
                    You earned <b>₹{totalIncome}</b> and spent{" "}
                    <b>₹{totalExpense}</b>. You saved{" "}
                    <b>₹{savings}</b> ({savingsRate}%).
                </p>

                <p className="text-sm mt-2 text-(--text-muted)">
                    {change > 0
                        ? `Spending increased by ${change.toFixed(1)}% 📈`
                        : `Spending decreased by ${Math.abs(change).toFixed(1)}% 🎉`}
                </p>
            </div>

            <ExpenseLineChart
                data={chartData}
                showSelector={false}
                title="Spending Trend"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                <Card title="Top Category">
                    {topCategory
                        ? `${topCategory.name} (₹${topCategory.amount})`
                        : "No data"}
                </Card>

                <Card title="Savings">
                    ₹{savings} ({savingsRate}%)
                </Card>

                <Card title="Trend">
                    {change > 0
                        ? `+${change.toFixed(1)}% 📈`
                        : `${change.toFixed(1)}% 📉`}
                </Card>

                <Card title="Biggest Expense">
                    {biggestExpense
                        ? `₹${biggestExpense.amount} (${biggestExpense.category})`
                        : "No data"}
                </Card>

                <Card title="Daily Spending">
                    ₹{avgDaily.toFixed(0)} / day
                </Card>

                <Card title="Insight">
                    {change > 15
                        ? "⚠️ Spending is significantly higher than usual"
                        : savings > 0
                            ? "👍 You are managing your finances well"
                            : "⚠️ Expenses exceed income"}
                </Card>

            </div>
        </div>
    );
};

export default Insights;