import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import {
  FiHome,
  FiUsers,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import fifaLogo from  "../../assets/imgs/logo.png";
import { BsFillTrophyFill } from "react-icons/bs";
import { SidebarItem } from "../components/ui/sideBar/sidebar-item";
import { Role } from "../../types/user";
import { useAuthStore } from "../../modules/auth/store/auth-store";
import LoadingPage from "../components/ui/loading/loading-page";
import { Club } from "lucide-react";
import { SubmenuItem } from "../components/ui/sideBar/submenu";
import { CgProfile } from "react-icons/cg";
import { Avatar, AvatarFallback, AvatarImage } from "../../modules/client/components/ui/avatar";


export default function Admin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isTournamentSubmenuOpen, setIsTournamentSubmenuOpen] = useState(false);
  const [ loading , setLoading] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { authUser, getAuthUser ,logout} = useAuthStore();


  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/sign-in");
  };

  useEffect(() => {
    const Loaduser = async () => {
      await getAuthUser();
      setLoading(false);
    }
    Loaduser();
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
  }, [getAuthUser]);

  return (
    <>
     {loading ? ( <LoadingPage />):
           (authUser ? (
            authUser.role === Role.ADMIN ? (
     
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
            <img src={fifaLogo} alt="FIFA" className="h-10 w-10 rounded-full" />
            <span className="text-lg font-bold">Foot Arena</span>
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
              to="/a/dashboard"
              isActive={isActive("/a/dashboard")}
            />
            <SidebarItem
              icon={<FiUsers />}
              text="Users"
              to="/a/users"
              isActive={isActive("/a/users")}
            />
            <SidebarItem
            icon={<Club />}
            text="Organizations"
            to="/a/organizations"
            isActive={isActive("/a/organizations")}
          />
            <SidebarItem
              icon={<BsFillTrophyFill />}
              text="Tournaments"
              to="/a/tournaments"
              isActive={isActive("/a/tournaments")}
              hasSubmenu={true}
              isSubmenuOpen={isTournamentSubmenuOpen}
              toggleSubmenu={() => setIsTournamentSubmenuOpen(!isTournamentSubmenuOpen)}
            />
            {/* Tournament Submenu */}
             <ul className="ml-6 space-y-1 pt-1 scrollbar-hide">
              <SubmenuItem text="All Tournaments" to="/a/tournaments/all" isopen={isTournamentSubmenuOpen} />
              <SubmenuItem text="Available Tournaments" to="/a/tournaments/available" isopen={isTournamentSubmenuOpen} />
              <SubmenuItem text="My Tournaments" to="/a/tournaments" isopen={isTournamentSubmenuOpen} />
              <SubmenuItem text="create" to="/a/tournaments/create" isopen={isTournamentSubmenuOpen} />
            </ul>            
            <SidebarItem
              icon={<CgProfile size={20} />}
              text="Profile"
              to="/a/profile"
              isActive={isActive("/a/profile")}
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
              Admin Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-4">
      
            {/* User Menu */}
            <div className="relative "
                
                >
               <div className="flex space-x-4">  
                <p className="pt-2 cursor-pointer ">{authUser.fullName.firstName + " " + authUser.fullName.lastName}</p>
                <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className=" cursor-pointer  flex items-center rounded-full text-sm focus:outline-none"
                >
                    <Avatar className=" flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                      <AvatarImage imageUrl={authUser.profileImage || ""} alt={authUser.username} />
                      <AvatarFallback className="bg-blue-600 text-white">{authUser.fullName.firstName.charAt(0)}</AvatarFallback>
                    </Avatar>
                </button>
              </div>

              {/* User Dropdown */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-50 right-0 mt-3 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5"
                  >
                    <Link
                      to="/a/profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Your Profile
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
    ):(
      <Navigate to="/forbidden" replace  />
    )):(
      <Navigate to="/auth/sign-in" replace  />
    )
  )}
    </>
  );
}
