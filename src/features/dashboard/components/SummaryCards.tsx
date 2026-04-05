import { useTransactionStore } from "../../../app/store/useTransactionStore";
import { calculateSummary } from "../../../utils/calculateSummary";
import { getTrend, getPreviousMonth } from "../../../utils/chartHelper";
import Card from "../../../components/common/Card";

interface Props {
  month: string;
}

const SummaryCards = ({ month }: Props) => {
  const transactions = useTransactionStore((state) => state.transactions);

  // Current month data
  const current = calculateSummary(transactions, month);

  // Previous month
  const prevMonth = getPreviousMonth(month);
  const previous = calculateSummary(transactions, prevMonth);

  // Trends
  const incomeTrend = getTrend(current.income, previous.income);
  const expenseTrend = getTrend(current.expense, previous.expense);
  const balanceTrend = getTrend(current.balance, previous.balance);

  return (
    <>
      {/* Balance */}
      <div className="cards flex flex-col gap-5 md:grid md:grid-cols-2">

        <Card title="Balance" animate animateKey={current.balance}>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">${current.balance}</p>
            <span className={balanceTrend >= 0 ? "text-green-500" : "text-red-500"}>
              {balanceTrend >= 0 ? "↑" : "↓"} {Math.abs(balanceTrend).toFixed(1)}%
            </span>
          </div>
        </Card>

        {/* Income */}
        <Card title="Income" animate animateKey={current.income}>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-green-500">
              ${current.income}
            </p>
            <span className={incomeTrend >= 0 ? "text-green-500" : "text-red-500"}>
              {incomeTrend >= 0 ? "↑" : "↓"} {Math.abs(incomeTrend).toFixed(1)}%
            </span>
          </div>
        </Card>

        {/* Expense */}
        <Card title="Expense" animate animateKey={current.expense}>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-red-500">
              ${current.expense}
            </p>
            <span className={expenseTrend >= 0 ? "text-red-500" : "text-green-500"}>
              {expenseTrend >= 0 ? "↑" : "↓"} {Math.abs(expenseTrend).toFixed(1)}%
            </span>
          </div>
        </Card>

        {/* Savings */}
        <Card title="Savings %" animate animateKey={current.savings.toFixed(2)}>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">
              {current.savings.toFixed(2)}%
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default SummaryCards;