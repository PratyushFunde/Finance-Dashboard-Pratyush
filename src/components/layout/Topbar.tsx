import { BarChart, Home, Menu, Receipt, Sun, Moon } from "lucide-react";
import  { useState } from "react";
import { useThemeStore } from "../../app/store/useThemeStore";
import { useAuthStore } from "../../app/store/useAuthStore";
import { NavLink } from "react-router-dom";
import { ConfigProvider, Drawer } from "antd";
import { motion } from "framer-motion";

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar = ({}: TopbarProps) => {
  const { toggleTheme, theme } = useThemeStore();
  const [open, setOpen] = useState(false);

  const role = useAuthStore((state) => state.role);
  const setRole = useAuthStore((state) => state.setRole);

  const links = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Transactions", path: "/transactions", icon: Receipt },
    { name: "Insights", path: "/insights", icon: BarChart },
  ];

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-(--border) bg-(--card) backdrop-blur-md">

      {/* 🔹 LEFT */}
      <div className="flex items-center gap-3">

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setOpen(true)}
          className="md:hidden p-2 rounded-lg hover:bg-(--card-soft)"
        >
          <Menu size={20} />
        </motion.button>

        {/* Logo / Title */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-semibold tracking-tight text-(--text)"
        >
          💰 Finance Dashboard
        </motion.h1>
      </div>

      {/* 🔹 RIGHT */}
      <div className="flex items-center gap-3">

        {/* Role Switch (Styled) */}
        <motion.select
          whileTap={{ scale: 0.95 }}
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
          className="
            px-2 py-1 rounded-lg text-sm
            border border-(--border)
            bg-(--card-soft)
            text-(--text)
            hover:bg-(--primary-soft)
            transition
          "
        >
          <option value="viewer">👁 Viewer</option>
          <option value="admin">🛠 Admin</option>
        </motion.select>

        {/* Theme Toggle (Icon Button) */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ rotate: 15 }}
          onClick={toggleTheme}
          className="
            p-2 rounded-lg
            border border-(--border)
            bg-(--card-soft)
            hover:bg-(--primary-soft)
            transition
          "
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </motion.button>
      </div>

      <ConfigProvider
        theme={{
          token: {
            colorBgElevated: "var(--card)",
            colorText: "var(--text)",
          },
          components: {
            Drawer: {
              colorBgElevated: "var(--card)",
            },
          },
        }}
      >
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          placement="left"
          width={260}
        >
          <div className="flex flex-col gap-2">
            {links.map((link, i) => {
              const Icon = link.icon;

              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg transition
                      ${
                        isActive
                          ? "bg-(--primary-soft) text-(--primary)"
                          : "text-(--text) hover:bg-(--card-soft)"
                      }`
                    }
                  >
                    <Icon size={18} />
                    {link.name}
                  </NavLink>
                </motion.div>
              );
            })}
          </div>
        </Drawer>
      </ConfigProvider>
      
    </header>
  );
};

export default Topbar;