import { useState } from 'react'
import { useTransactionStore } from '../../app/store/useTransactionStore'
import TransactionTable from './components/table/TransactionTable'
import TransactionFilters from './components/shared/TransactionFilters'

const TransactionsPage = () => {
  const data = useTransactionStore((state) => state.transactions)

  const [search, setSearch] = useState("")
  const [type, setType] = useState<"all" | "income" | "expense">("all")
  const [view, setView] = useState<"table" | "card">("table")

  const filteredData = data.filter((tx) => {
    const searchValue = search.toLowerCase()

    const matchesSearch =
      tx.category.toLowerCase().includes(searchValue) ||
      tx.type.toLowerCase().includes(searchValue) ||
      tx.date.toLowerCase().includes(searchValue) ||
      tx.amount.toString().includes(searchValue)

    const matchesType =
      type === "all" ? true : tx.type === type

    return matchesSearch && matchesType
  })

  return (
    <div className="h-screen flex flex-col">
      {/* 🔹 FIXED FILTERS */}
      <div>

        <TransactionFilters
          search={search}
          setSearch={setSearch}
          type={type}
          setType={setType}
          data={filteredData}
        />
      </div>

      {/* 🔹 SCROLLABLE CONTENT */}
      <div className="flex-1 min-h-0">
        <TransactionTable
          data={filteredData}
          view={view}
          setView={setView}
        />
      </div>
    </div>
  )
}

export default TransactionsPage