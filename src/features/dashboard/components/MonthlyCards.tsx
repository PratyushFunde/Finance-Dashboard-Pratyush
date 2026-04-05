import Card from '../../../components/common/Card';

interface Props {
  total: number;
  topCategory: string;
  avg: number;
}

const MonthlyCards = ({ total, topCategory, avg }: Props) => {
  return (
    <div className="flex flex-col justify-between">

      <Card title="Total Expense" animate animateKey={total}>
        <p className="text-xl font-semibold">${total}</p>
      </Card>

      <Card title="Top Category" animate animateKey={topCategory}>
        <p className="text-xl font-semibold">{topCategory}</p>
      </Card>

      <Card title="Avg Daily Spend" animate animateKey={avg}>
        <p className="text-xl font-semibold">${avg}</p>
      </Card>

    </div>
  )
}

export default MonthlyCards
