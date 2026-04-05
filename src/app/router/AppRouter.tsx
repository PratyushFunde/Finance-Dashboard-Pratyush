import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardPage from "../../features/dashboard/DashboardPage";
import TransactionsPage from "../../features/transactions/TransactionsPage";
import Insights from "../../features/insights/Insights";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        
        {/* Public (all roles) */}
        <Route index element={<DashboardPage />} />
        <Route path="insights" element={<Insights/>} />

        {/* Protected (Admin only example) */}
        <Route
          path="transactions"
          element={
            <ProtectedRoute allowedRoles={["admin", "viewer"]}>
              {/* <TransactionsPage /> */}
              <TransactionsPage/>
            </ProtectedRoute>
          }
        />

      </Route>
    </Routes>
  );
}