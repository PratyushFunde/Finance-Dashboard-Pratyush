import { useAuthStore } from "../app/store/useAuthStore";

export const useRole = () => {
  const role = useAuthStore((state) => state.role);

  return {
    role,
    isAdmin: role === "admin",
    isViewer: role === "viewer",
  };
};