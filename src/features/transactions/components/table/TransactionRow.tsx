import TransactionActions from "../shared/TransactionActions";
import type { Transaction } from "../../../../types/transaction";

interface Props {
  transaction: Transaction;
}

const TransactionRow = ({ transaction }:Props) => {
  return (
    <tr className="border-b">
      <td>{transaction.date}</td>

      <td>
        <span className="px-2 py-1 rounded bg-blue-100 text-blue-600">
          {transaction.category}
        </span>
      </td>

      <td
        className={
          transaction.type === "expense"
            ? "text-red-500"
            : "text-green-500"
        }
      >
        ${transaction.amount}
      </td>

      <td>{transaction.type}</td>

      <td>
        <TransactionActions />
      </td>
    </tr>
  );
};

export default TransactionRow;