import type { ReactNode } from "react";
import { useAuthStore, type Role } from "../store/useAuthStore";

interface Props{
    children:ReactNode,
    allowedRoles:Role[];
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const role = useAuthStore((state) => state.role);

  if (!allowedRoles.includes(role)) {
    return (
      <div className="p-6 text-red-500">
        Access Denied 🚫
      </div>
    );
  }

  return <>{children}</>;
}