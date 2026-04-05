import { useState } from "react";
import { Button, ConfigProvider, Modal } from "antd";
import { BarChartOutlined } from "@ant-design/icons";
import type { Transaction } from "../../../../types/transaction";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: Transaction[];
}

const VisualizeTransactions = ({ data }: Props) => {
  const [open, setOpen] = useState(false);

  // ✅ Group data by category
  const chartData = Object.values(
    data.reduce((acc, tx) => {
      if (!acc[tx.category]) {
        acc[tx.category] = { category: tx.category, amount: 0 };
      }
      acc[tx.category].amount += tx.amount;
      return acc;
    }, {} as Record<string, { category: string; amount: number }>)
  );

  return (
    <>
      {/* 🔹 Button */}
      <Button
        icon={<BarChartOutlined />}
        onClick={() => setOpen(true)}
        className="rounded-full bg-(--card-soft) text-(--text) border-(--border) hover:bg-(--primary-soft)"
      >
        Visualize
      </Button>

      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "var(--card)",        // main body
              headerBg: "var(--card)",         // header
              titleColor: "var(--text)",       // title
              colorIcon: "var(--text-muted)",  // close icon
            },
          },
        }}

      >


        {/* 🔹 Modal */}
        <Modal
          open={open}
          onCancel={() => setOpen(false)}
          footer={null}
          title={
            <span className="text-(--text) font-semibold">
              Transactions Overview
            </span>
          }
          className="custom-modal"
        >
          <div className="h-80 bg-(--card) rounded-xl p-3 border border-(--border)">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis
                  dataKey="category"
                  stroke="var(--text-muted)"
                />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    color: "var(--text)",
                  }}
                />
                <Bar
                  dataKey="amount"
                  fill="var(--primary)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default VisualizeTransactions;