import { useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import { useTransactionStore } from "../../../../app/store/useTransactionStore";
import { getExpensesForMonth } from "../../../../utils/chartHelper";
import { MONTHS } from "../../../../constants/month";
import { Select } from "antd";

interface Props {
    month: string;
    setMonth: (month: string) => void;
}

const ExpenseLinechart = ({ month, setMonth }: Props) => {
    const transactions = useTransactionStore((state) => state.transactions);


    const data = getExpensesForMonth(transactions, month);

    return (
        <div className="bg-(--card) flex flex-col px-3 py-5 rounded-2xl h-80 border  border-(--border) ">

            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <h2 className="font-semibold text-lg">Expenses</h2>

                {/* Dropdown */}
                {/* <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="
    bg-(--card-soft)
    text-(--text)
    border border-(--border)
    px-3 py-1
    rounded-lg
    text-sm
    outline-none
    cursor-pointer
    hover:bg-(--primary-soft)
    focus:ring-2 focus:ring-(--primary)
    transition
  "
                >
                    {MONTHS.map((month) => (
                        <option className="bg-(--card) text-(--text)" >
                            {month}
                        </option>
                    ))}
                </select> */}
                <Select
                    value={month}
                    onChange={(value) => setMonth(value)}
                    size="small"
                    className="w-28 bg-(--card-soft)! border-(--border)! text-(--text)! rounded-lg"
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
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>

                    <defs>
                        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--chart-primary)" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="var(--chart-primary)" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <XAxis dataKey="day" />
                    <YAxis />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: "12px",
                            padding: "8px 12px",
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

export default ExpenseLinechart;