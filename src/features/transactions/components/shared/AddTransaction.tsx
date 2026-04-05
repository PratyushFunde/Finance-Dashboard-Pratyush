import { useState } from "react";
import { Button, Modal, Form, Input, Select, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTransactionStore } from "../../../../app/store/useTransactionStore";

const AddTransaction = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const handleSubmit = (values: any) => {
    const newTx = {
      id: Date.now().toString(),
      amount: Number(values.amount),
      category: values.category,
      type: values.type,
      date: values.date.format("YYYY-MM-DD"),
    };

    addTransaction(newTx);
    form.resetFields();
    setOpen(false);
  };

  return (
    <>
      {/* ➕ BUTTON */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setOpen(true)}
        className="rounded-full bg-(--primary)! border-none"
      >
        Add
      </Button>

      {/* 🧾 MODAL */}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        okText="Add Transaction"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>

          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { label: "Income", value: "income" },
                { label: "Expense", value: "expense" },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
};

export default AddTransaction;