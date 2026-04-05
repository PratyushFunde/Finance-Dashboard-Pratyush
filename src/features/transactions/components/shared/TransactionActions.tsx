import { useAuthStore } from "../../../../app/store/useAuthStore";

const TransactionActions = () => {
  const role = useAuthStore((s) => s.role);

  if (role === "viewer") return null;

  return (
    <div className="flex gap-2 mt-2">
      <button>Edit</button>
      <button className="text-red-500">Delete</button>
    </div>
  );
};

export default TransactionActions;