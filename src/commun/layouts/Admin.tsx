import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiMenu,
  FiX,
  FiLogOut,
  FiUser,
  FiBell,
} from "react-icons/fi";
import fifaLogo from  "../../assets/imgs/logo.png";
import { BsFillTrophyFill } from "react-icons/bs";
import { useUserStore } from "../../core/store/user-store";
import { SidebarItem } from "../components/ui/sideBar/sidebar-item";


export default function Admin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isTournamentSubmenuOpen, setIsTournamentSubmenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { getAuthUser } = useUserStore();

  useEffect(() => {
    getAuthUser();
  })
  // Check if current route is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Handle logout
  const handleLogout = () => {
    // Implement your logout logic here
    navigate("/auth/sign-in");
  };

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={isMobile ? { x: "-100%" } : false}
        animate={{ x: isSidebarOpen ? 0 : isMobile ? "-100%" : "-280px" }}
        transition={{ type: "spring", damping: 20 }}
        className={`fixed inset-y-0 left-0 z-30 w-64 flex-shrink-0 overflow-y-auto bg-gradient-to-b from-blue-900 to-indigo-900 shadow-lg lg:static`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-4">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <img src={fifaLogo} alt="FIFA" className="h-8 w-8" />
            <span className="text-lg font-bold">FIFA Admin</span>
          </Link>
          {isMobile && (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-lg p-1 text-blue-200 hover:bg-blue-800/40"
            >
              <FiX size={24} />
            </button>
          )}
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-4 px-2">
          <ul className="space-y-1">
            <SidebarItem
              icon={<FiHome />}
              text="Dashboard"
              to="/dashboard"
              isActive={isActive("/dashboard")}
            />
            <SidebarItem
              icon={<FiUsers />}
              text="Users"
              to="/dashboard/users"
              isActive={isActive("/dashboard/users")}
            />
            <SidebarItem
              icon={<BsFillTrophyFill />}
              text="Tournaments"
              to="/dashboard/tournaments"
              isActive={isActive("/dashboard/tournaments")}
              hasSubmenu={true}
              isSubmenuOpen={isTournamentSubmenuOpen}
              toggleSubmenu={() => setIsTournamentSubmenuOpen(!isTournamentSubmenuOpen)}
            />
            
            {/* Tournament Submenu */}
            <AnimatePresence>
              {isTournamentSubmenuOpen && (
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
                        to="/dashboard/tournaments"
                        className={`flex items-center rounded-lg px-4 py-2 text-sm transition-colors ${
                          location.pathname === "/dashboard/tournaments"
                            ? "bg-blue-700/40 text-white"
                            : "text-blue-100 hover:bg-blue-800/30"
                        }`}
                      >
                        All Tournaments
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/tournaments/create"
                        className={`flex items-center rounded-lg px-4 py-2 text-sm transition-colors ${
                          location.pathname === "/dashboard/tournaments/create"
                            ? "bg-blue-700/40 text-white"
                            : "text-blue-100 hover:bg-blue-800/30"
                        }`}
                      >
                        Create Tournament
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
            
            <SidebarItem
              icon={<FiSettings />}
              text="Settings"
              to="/dashboard/settings"
              isActive={isActive("/dashboard/settings")}
            />
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="mt-auto p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center rounded-lg px-4 py-2 text-sm font-medium text-blue-100 hover:bg-blue-800/40"
          >
            <FiLogOut className="mr-3 h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-gray-900 px-4 shadow-md">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-4 rounded-lg p-1 text-gray-400 hover:bg-gray-800 hover:text-white lg:hidden"
            >
              <FiMenu size={24} />
            </button>
            <h1 className="text-xl font-semibold">
              {location.pathname === "/dashboard"
                ? "Dashboard Overview"
                : location.pathname.includes("/users")
                ? "User Management"
                : location.pathname.includes("/tournaments")
                ? "Tournament Management"
                : "Settings"}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative rounded-full p-1 text-gray-400 hover:bg-gray-800 hover:text-white">
              <FiBell size={20} />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs">
                3
              </span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center rounded-full text-sm focus:outline-none"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                  <FiUser />
                </div>
              </button>

              {/* User Dropdown */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5"
                  >
                    <Link
                      to="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/dashboard/settings"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700"
                    >
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-900 p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
