import { create } from "zustand";
import type { Transaction } from "../../types/transaction";
import { transactions } from "../../data/transactions";

interface TransactionState {
    transactions: Transaction[];
    addTransaction: (tx: Transaction) => void;
    deleteTransaction: (id: string) => void;
    deleteMany: (ids: string[]) => void;
    updateTransaction: (tx: Transaction) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
    transactions: transactions,
    addTransaction: (tx) => (

        set((state) => ({
            transactions: [tx, ...state.transactions], // add on top
        }))
    ),
    deleteTransaction: (id) => (
        set((state) => ({
            transactions: state.transactions.filter((t) => t.id !== id),
        }))
    ),
    deleteMany: (ids) => (

        set((state) => ({
            transactions: state.transactions.filter((t) => !ids.includes(t.id)),
        }))
    ),

    updateTransaction: (updatedTx) => (

        set((state) => ({
            transactions: state.transactions.map((t) =>
                t.id === updatedTx.id ? updatedTx : t
            ),
        }))
    )

}))