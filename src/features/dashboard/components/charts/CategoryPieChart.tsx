import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface Props {
    data: { name: string; value: number }[];
}

const COLORS = ["#7C8CF8", "#34D399", "#F87171"];

const CategoryPieChart = ({ data }: Props) => {
    // Empty State
    if (!data || data.length === 0) {
        return (
            <div className="bg-(--card) border border-(--border) rounded-2xl p-6 h-80 flex items-center justify-center">
                <p className="text-(--text-muted) text-sm">
                    No category data available
                </p>
            </div>
        );
    }

    return (
        <div className="bg-(--card) border border-(--border) rounded-2xl p-6">

            {/* Header */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold">
                    Top Spending Categories
                </h2>
                <p className="text-xs text-(--text-muted)">
                    Top 3 categories for selected month
                </p>
            </div>

            {/* Chart Container (Square) */}
            <div className="w-full aspect-square max-h-[240px] mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius="80%"
                            innerRadius="55%" // donut style
                            paddingAngle={3}
                            isAnimationActive={true}
                            label={({ percent }) =>
                                percent ? `${(percent * 100).toFixed(0)}%` : ""
                            }
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        {/* Tooltip */}
                        <Tooltip
                            // formatter={(value: number) => `$${value}`}
                            formatter={(value) => [`$${Number(value ?? 0)}`, "Amount"]}
                            contentStyle={{
                                background: "var(--card)",
                                border: "1px solid var(--border)",
                                borderRadius: "10px",
                                fontSize: "12px",
                            }}
                            labelStyle={{
                                color: "var(--text-muted)",
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs">
                {data.map((item, index) => (
                    <div
                        key={item.name}
                        className="flex items-center gap-2 max-w-[110px]"
                    >
                        <span
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{
                                backgroundColor: COLORS[index % COLORS.length],
                            }}
                        />
                        <span className="text-(--text-muted) truncate">
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryPieChart;