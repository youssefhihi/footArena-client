import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export const SubmenuItem = ({ text, to , isopen}: { text: string; to: string, isopen: boolean }) => {
    return (
      <AnimatePresence>
        {isopen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <ul className="ml-6 space-y-1 pt-1">
              <li>
                <Link
                  to={to}
                  className={`flex items-center rounded-lg px-4 py-2 text-sm transition-colors ${
                    location.pathname === to
                      ? "bg-blue-700 text-white"
                      : "text-gray-200 hover:bg-blue-700/50"
                  }`}
                >
                  {text}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }