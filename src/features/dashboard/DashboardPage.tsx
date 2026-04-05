import { useState } from "react";
import { getMonthlyInsights, getTopCategories } from "../../utils/chartHelper";
import SummaryCards from "./components/SummaryCards";
import { useTransactionStore } from "../../app/store/useTransactionStore";
import MonthlyCards from "./components/MonthlyCards";
import CategoryPieChart from "./components/charts/CategoryPieChart";
import Card from "../../components/common/Card";
import ExpenseLineChart from "../../components/common/charts/ExpenseLineChart";

const DashboardPage = () => {
    const [month, setMonth] = useState("Jan");

    const transactions = useTransactionStore((state) => state.transactions)
    const insights = getMonthlyInsights(transactions, month);

    const topCategories = getTopCategories(insights.categoryMap)

    return (

        <div className="space-y-6">

            <SummaryCards month={month} />

            <div className="grid grid-cols-1  lg:grid-cols-2 gap-6">
                
                <ExpenseLineChart
                    transactions={transactions}
                    month={month}
                    onMonthChange={setMonth}
                />
                
                <MonthlyCards
                    total={insights.total}
                    topCategory={insights.topCategory}
                    avg={insights.avg}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="" animate animateKey={insights.avg}>
                    <div className="space-y-4">

                        <div className="flex items-center justify-between p-3 rounded-xl bg-(--card-soft)">
                            <div>
                                <p className="text-xs text-(--text-muted)">Top Category</p>
                                <p className="text-sm font-medium">{insights.topCategory}</p>
                            </div>
                            <span className="text-lg">🏆</span>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl bg-(--card-soft)">
                            <div>
                                <p className="text-xs text-(--text-muted)">Avg Daily Spend</p>
                                <p className="text-sm font-medium">${insights.avg}</p>
                            </div>
                            <span className="text-lg">📊</span>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl bg-(--card-soft)">
                            <div>
                                <p className="text-xs text-(--text-muted)">Total This Month</p>
                                <p className="text-sm font-medium">${insights.total}</p>
                            </div>
                            <span className="text-lg">💸</span>
                        </div>

                    </div>
                </Card>

                <CategoryPieChart data={topCategories} />

            </div>


        </div>
    );
}

export default DashboardPage
