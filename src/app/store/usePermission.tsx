import { getPermissions } from "../../constants/permissions";
import { useAuthStore } from "./useAuthStore";

export const usePermissions = () => {
  const role = useAuthStore((state) => state.role);
  return getPermissions(role);
};