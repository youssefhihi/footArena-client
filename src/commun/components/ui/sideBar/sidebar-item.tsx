import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type SidebarItemProps = {
    icon: React.ReactNode;
    text: string;
    to: string;
    isActive: boolean;
    hasSubmenu?: boolean;
    isSubmenuOpen?: boolean;
    toggleSubmenu?: () => void;
    onClick?: () => void;
  };
export const SidebarItem = ({
    icon,
    text,
    to,
    isActive,
    hasSubmenu = false,
    isSubmenuOpen = false,
    toggleSubmenu,
    onClick,
  }: SidebarItemProps) => {
    return (
      <li>
        <Link
          to={to}
          className={`group  transition-all duration-200  flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors${
            isActive
              ? "bg-blue-600 text-white"
            : "text-blue-100 hover:bg-blue-800/40"
          }`}
          onClick={onClick || (hasSubmenu ? toggleSubmenu : undefined)}
        >
          <span className="mr-3 flex h-6 w-6 items-center justify-center">
            {icon}
          </span>
          <span className="flex-1">{text}</span>
          {hasSubmenu && (
            <motion.span
              animate={{ rotate: isSubmenuOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiChevronDown />
            </motion.span>
          )}
        </Link>
        
        </li>
    );
  };