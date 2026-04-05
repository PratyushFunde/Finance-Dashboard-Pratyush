import * as XLSX from "xlsx";
import type { Transaction } from "../types/transaction";

export const exportToExcel = (data: Transaction[]) => {
  const formatted = data.map((tx) => ({
    ID: tx.id,
    Amount: tx.amount,
    Category: tx.category,
    Type: tx.type,
    Date: tx.date,
  }));

  const worksheet = XLSX.utils.json_to_sheet(formatted);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

  XLSX.writeFile(workbook, "transactions.xlsx");
};

export const exportToCSV = (data: Transaction[]) => {
  const headers = ["ID", "Amount", "Category", "Type", "Date"];

  const rows = data.map((tx) =>
    [tx.id, tx.amount, tx.category, tx.type, tx.date].join(",")
  );

  const csvContent = [headers.join(","), ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "transactions.csv";
  link.click();
};