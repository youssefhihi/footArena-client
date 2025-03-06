import { useState } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import { Home, Trophy, Users, BarChart3, Calendar, LogOut, Menu, X, User } from "lucide-react"
import { cn } from "../utils/constant/cn"

const sidebarItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "My Tournaments", icon: Trophy, path: "/tournaments" },
  { name: "Participated", icon: Calendar, path: "/participated" },
  { name: "Organizations", icon: Users, path: "/organizations" },
  { name: "Statistics", icon: BarChart3, path: "/statistics" },
]

export default function ClientLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const location = useLocation()

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-green-800 to-blue-900 text-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-white p-1">
              <img src="/fifa-logo.svg" alt="FIFA Logo" className="h-full w-full" />
            </div>
            <span className="text-xl font-bold">FIFA Platform</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="rounded-md p-1 hover:bg-green-700 md:hidden">
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 px-4">
          <div className="mb-8 flex items-center space-x-3 rounded-lg bg-white/10 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">Lionel Messi</p>
              <p className="text-xs text-gray-300">Player</p>
            </div>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  location.pathname === item.path ? "bg-green-700 text-white" : "text-gray-200 hover:bg-green-700/50",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-4">
          <button className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-200 transition-colors hover:bg-green-700/50">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
          <button onClick={() => setIsSidebarOpen(true)} className="rounded-md p-1 hover:bg-gray-100 md:hidden">
            <Menu size={24} />
          </button>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                <User className="h-6 w-6" />
              </div>
              <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}