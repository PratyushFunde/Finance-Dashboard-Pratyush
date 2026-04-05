import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import { Select } from "antd";
import { getExpensesForMonth } from "../../../utils/chartHelper";
import type { Transaction } from "../../../types/transaction";
import { MONTHS } from "../../../constants/month";

interface Props {
    transactions?: Transaction[];
    month?: string;
    data?: { day: string | number; amount: number }[];

    onMonthChange?: (month: string) => void;
    showSelector?: boolean;
    title?: string;
}

const ExpenseLineChart = ({
    transactions,
    month,
    data,
    onMonthChange,
    showSelector = true,
    title = "Expenses",
}: Props) => {

    // 🔥 Decide data source
    const chartData = data
        ? data
        : transactions && month
            ? getExpensesForMonth(transactions, month)
            : [];

    return (
        <div className="bg-(--card) flex flex-col px-3 py-5 rounded-2xl h-80 border border-(--border)">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-5">
                <h2 className="font-semibold text-lg text-(--text)">
                    {title}
                </h2>

                {showSelector && onMonthChange && month && (
                    <Select
                        value={month}
                        onChange={onMonthChange}
                        size="small"
                        className="w-28"
                        classNames={{
                            popup: {
                                root: "theme-select-dropdown",
                            },
                        }}
                        options={MONTHS.map((m) => ({
                            value: m,
                            label: m,
                        }))}
                    />
                )}
            </div>

            {/* CHART */}
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor="var(--chart-primary)"
                                stopOpacity={0.4}
                            />
                            <stop
                                offset="95%"
                                stopColor="var(--chart-primary)"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>

                    <XAxis dataKey="day" />
                    <YAxis />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: "12px",
                        }}
                        labelStyle={{ color: "var(--text)" }}
                        itemStyle={{ color: "var(--chart-primary)" }}
                    />

                    <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="var(--chart-primary)"
                        fill="url(#colorExpense)"
                        strokeWidth={3}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExpenseLineChart;