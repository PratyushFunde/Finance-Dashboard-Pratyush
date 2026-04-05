import React, { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
  ConfigProvider,
  Table,
  Pagination,
  Select,
  Segmented,
  Button,
  message,
  Dropdown,
} from "antd";
import {
  TableOutlined,
  AppstoreOutlined,
  FileExcelOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import type { Transaction } from "../../../../types/transaction";
import type { TableProps } from "antd";
import { useTransactionStore } from "../../../../app/store/useTransactionStore";
import { usePermissions } from "../../../../app/store/usePermission";
import { exportToCSV, exportToExcel } from "../../../../types/exportTransactions";

interface Props {
  data: Transaction[];
  view: "table" | "card";
  setView: Dispatch<SetStateAction<"table" | "card">>;
}

const TransactionTable = ({ data, view, setView }: Props) => {
  const permissions = usePermissions();

  const updateTransaction = useTransactionStore((s) => s.updateTransaction);
  const deleteMany = useTransactionStore((s) => s.deleteMany);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [isMobile, setIsMobile] = useState(false);
  const effectiveView = isMobile ? "card" : view;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768); // md breakpoint
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const paginatedData = data.slice(
    (current - 1) * pageSize,
    current * pageSize
  );

  // 🔹 BASE COLUMNS
  const baseColumns: TableProps<Transaction>["columns"] = [
    { title: "ID", dataIndex: "id" },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (value) => `₹${value}`,
    },
    { title: "Category", dataIndex: "category" },
    {
      title: "Type",
      dataIndex: "type",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${value === "income"
            ? "bg-(--accent-soft) text-(--success)"
            : "bg-(--primary-soft) text-(--danger)"
            }`}
        >
          {value}
        </span>
      ),
    },
    { title: "Date", dataIndex: "date" },
  ];

  // 🔹 ACTION COLUMN (RBAC controlled)
  const actionColumn: TableProps<Transaction>["columns"] = [
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Transaction) => (
        <Button
          size="small"
          disabled={!permissions.canEditTransaction}
          className="rounded-md bg-(--card-soft)! border-(--border)! text-(--text)!"
          onClick={() => {
            if (!permissions.canEditTransaction) {
              message.error("Action not allowed 🚫");
              return;
            }

            const newAmount = prompt(
              "Enter new amount",
              record.amount.toString()
            );
            if (!newAmount) return;

            updateTransaction({
              ...record,
              amount: Number(newAmount),
            });
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  const columns = [...baseColumns, ...actionColumn];

  // 🔹 ROW SELECTION (RBAC controlled)
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => {
      if (!permissions.canDeleteTransaction) {
        message.error("Viewer cannot delete. Change to admin for full access !");
        return;
      }
      setSelectedRowKeys(keys);
    },
  };

  return (
    // <div className="p-4 bg-(--card) shadow-md border border-(--border) rounded-b-xl">
    <div className="p-4 bg-(--card) shadow-md border border-(--border) rounded-b-xl h-full flex flex-col">
      {/* 🔹 HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-(--text)">
            Transaction history
          </h2>
          <p className="text-sm text-(--text-muted)">
            Track your transactions easily
          </p>
        </div>

        <div className="flex items-center gap-2">

          {permissions.canDeleteTransaction && selectedRowKeys.length > 0 && (
            <Button
              danger
              size="small"
              onClick={() => {
                deleteMany(selectedRowKeys as string[]);
                setSelectedRowKeys([]);
              }}
            >
              Delete ({selectedRowKeys.length})
            </Button>
          )}


          <Dropdown
            menu={{
              items: [
                {
                  key: "excel",
                  icon: <FileExcelOutlined />,

                  label: "Export Excel",
                  onClick: () => exportToExcel(paginatedData),
                },
                {
                  key: "csv",
                  icon: <FileTextOutlined />,
                  label: "Export CSV",
                  onClick: () => exportToCSV(paginatedData),
                },
              ],
              className: "custom-dropdown-menu", // 👈 IMPORTANT
            }}
          >
            <Button className="bg-(--card-soft)! border-(--border)! text-(--text)! hover:bg-(--primary-soft)!">
              Export Table
            </Button>
          </Dropdown>
          {/* <Segmented
            value={view}
            onChange={(val) => setView(val as "table" | "card")}
            options={[
              { icon: <TableOutlined />, value: "table" },
              { icon: <AppstoreOutlined />, value: "card" },
            ]}
            className="custom-segmented"
          /> */}
          {!isMobile && (
            <Segmented
              value={view}
              onChange={(val) => setView(val as "table" | "card")}
              options={[
                { icon: <TableOutlined />, value: "table" },
                { icon: <AppstoreOutlined />, value: "card" },
              ]}
              className="custom-segmented"
            />
          )}
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="flex-1 min-h-0 transition-all duration-300">
        {effectiveView === "table" ? (
          <div className="h-[60vh] flex flex-col">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "var(--primary)",
                  colorText: "var(--text)",
                  colorBgContainer: "var(--card)",
                },
                components: {
                  Table: {
                    headerBg: "var(--card-soft)",
                    headerColor: "var(--text-muted)",
                    rowHoverBg: "var(--card-soft)",
                    rowSelectedBg: "var(--border)",
                    rowSelectedHoverBg: "var(--card)",
                  },
                  Checkbox: {
                    colorPrimary: "var(--primary)",
                    colorPrimaryHover: "var(--primary)",
                    colorBorder: "var(--border)",
                  },
                },
              }}
            >
              {/* TABLE */}
              <div className="flex-1 min-h-0">
                <Table
                  dataSource={paginatedData}
                  columns={columns}
                  rowKey="id"
                  pagination={false}
                  scroll={{ y: "calc(60vh - 140px)", }}
                  rowSelection={rowSelection}
                />
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center pt-3 border-t border-(--border)">

                {/* ROWS PER PAGE */}
                <div className="flex items-center gap-2 text-sm text-(--text-muted)">
                  <span>Rows per page:</span>

                  <Select
                    value={pageSize}
                    onChange={(value) => {
                      setPageSize(value);
                      setCurrent(1);
                    }}
                    size="small"
                    className="{w-20 bg-(--card-soft)! border-(--border)! text-(--text)! rounded-md}"
                    classNames={{
                      popup: {
                        root: "theme-select-dropdown"
                      }
                    }}
                    options={[
                      { value: 5, label: "5" },
                      { value: 7, label: "7" },
                      { value: 10, label: "10" },
                      { value: 20, label: "20" },
                    ]}
                  />
                </div>

                {/* PAGINATION */}
                <Pagination
                  current={current}
                  pageSize={pageSize}
                  total={data.length}
                  onChange={(page) => setCurrent(page)}
                  simple
                />
              </div>
            </ConfigProvider>
          </div>
        ) : (
          // <div className="flex-1 overflow-y-auto pr-1">
          <div className="flex-1 min-h-0 overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.map((tx) => (
                <div
                  key={tx.id}
                  className="p-4 rounded-xl bg-(--card-soft) border border-(--border)"
                >
                  <p className="text-sm text-(--text-muted)">
                    {tx.category}
                  </p>
                  <p className="text-lg font-semibold text-(--text)">
                    ₹{tx.amount}
                  </p>
                  <p className="text-xs text-(--text-muted)">
                    {tx.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionTable;