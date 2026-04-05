import { Button, Dropdown, Input } from "antd";
import {  FileExcelOutlined, FileTextOutlined, FilterOutlined, SearchOutlined } from "@ant-design/icons";
import type { Transaction } from "../../../../types/transaction";
import AddTransaction from "./AddTransaction";
import VisualizeTransactions from "./VisualizeTransactions";
import { exportToCSV, exportToExcel } from "../../../../types/exportTransactions";

type FilterType = "all" | "income" | "expense";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  type: FilterType;
  setType: (v: FilterType) => void;
  data: Transaction[];
}

const TransactionFilters = ({
  search,
  setSearch,
  type,
  setType,
  data,
}: Props) => {
  return (
    <div className="flex justify-between items-center bg-(--card) p-4 border border-(--border) rounded-t-3xl">

      {/* 🔹 LEFT: Add Button */}
      <div className="flex items-center gap-2">
        <AddTransaction />
        <VisualizeTransactions data={data} />

      </div>

      {/* 🔹 RIGHT: Controls */}
      <div className="flex items-center gap-2">

        {/* 🔍 Search */}
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          prefix={
            <SearchOutlined style={{ color: "var(--text-muted)" }} />
          }
          className="w-64 bg-(--card-soft)! border-(--border)! text-(--text)! rounded-full"
        />

        {/* 🔽 Filter Dropdown */}
        <Dropdown
          trigger={["click"]}
          popupRender={() => (
            <div className="bg-(--card) p-3 rounded-xl shadow-md w-44 border border-(--border)">
              <p className="text-sm font-medium mb-2 text-(--text-muted)">
                Filter Type
              </p>

              <div className="flex flex-col gap-1">
                {["all", "income", "expense"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setType(item as FilterType)}
                    className={`text-left px-2 py-1 rounded text-sm capitalize transition
                      ${type === item
                        ? "bg-(--primary-soft) text-(--primary)"
                        : "text-(--text) hover:bg-(--card-soft)"
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        >
          <Button
            icon={<FilterOutlined />}
            className="rounded-full bg-(--card-soft)! border-(--border)! text-(--text)! hover:bg-(--primary-soft)! shadow-sm hover:shadow-md transition"
          />
        </Dropdown>

        <Dropdown
          menu={{
            items: [
              {
                key: "excel",
                icon: <FileExcelOutlined />,
                label: "Export Excel",
                onClick: () => exportToExcel(data),
              },
              {
                key: "csv",
                icon: <FileTextOutlined />,
                label: "Export CSV",
                onClick: () => exportToCSV(data),
              },
            ],
            className: "custom-dropdown-menu", // 👈 IMPORTANT
          }}
        >
          <Button className="bg-(--card-soft)! border-(--border)! text-(--text)! hover:bg-(--primary-soft)!">
            Export All
          </Button>
        </Dropdown>

        {/* 📊 Visualize Button */}

      </div>
    </div>
  );
};

export default TransactionFilters;