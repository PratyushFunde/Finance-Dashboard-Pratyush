import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Receipt, BarChart } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const links = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Transactions", path: "/transactions", icon: Receipt },
  { name: "Insights", path: "/insights", icon: BarChart },
];

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {

  const [isHovered, setIsHovered] = useState(false);

  const expanded = isHovered || isOpen;

  return (
    <>
      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          width: expanded ? 256 : 72, // 256px = w-64, 72px = w-18
        }}
        transition={{ duration: 0.25 }}
        className={`fixed top-0 left-0 z-50 h-full 
        bg-(--card) border-r border-(--border)
        flex flex-col
        md:static`}
      >
        <div className="p-4 text-xl font-semibold whitespace-nowrap">
          {expanded ? "Finance" : "F"}
        </div>

        <nav className="flex flex-col gap-2 p-2">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition
                  ${
                    isActive
                      ? "bg-(--primary-soft) text-(--primary)"
                      : "hover:bg-(--card-soft)"
                  }`
                }
              >
                <Icon size={20} />

                {expanded && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="whitespace-nowrap"
                  >
                    {link.name}
                  </motion.span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </motion.aside>
      
    </>
  );
};

export default Sidebar;


