import { motion } from "framer-motion"
import { FiUsers, FiActivity, FiCalendar, FiArrowUp, FiArrowDown, FiMoreVertical } from "react-icons/fi"
import { GiSoccerBall } from "react-icons/gi"
import { BsFillTrophyFill } from "react-icons/bs"

// Mock data for the dashboard
const mockStats = {
  totalUsers: 1248,
  totalTournaments: 32,
  activeTournaments: 8,
  upcomingTournaments: 5,
  recentUsers: [
    { id: 1, name: "John Doe", email: "john@example.com", joinedAt: "2023-05-15T10:30:00Z" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", joinedAt: "2023-05-14T14:20:00Z" },
    { id: 3, name: "Robert Johnson", email: "robert@example.com", joinedAt: "2023-05-13T09:15:00Z" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", joinedAt: "2023-05-12T16:45:00Z" },
  ],
  recentTournaments: [
    {
      id: 1,
      name: "FIFA World Cup 2023",
      status: "active",
      participants: 32,
      startDate: "2023-05-01T00:00:00Z",
      endDate: "2023-06-30T00:00:00Z",
    },
    {
      id: 2,
      name: "European Championship",
      status: "upcoming",
      participants: 24,
      startDate: "2023-07-15T00:00:00Z",
      endDate: "2023-08-15T00:00:00Z",
    },
    {
      id: 3,
      name: "Copa America",
      status: "active",
      participants: 16,
      startDate: "2023-04-10T00:00:00Z",
      endDate: "2023-05-25T00:00:00Z",
    },
    {
      id: 4,
      name: "Champions League",
      status: "completed",
      participants: 32,
      startDate: "2023-01-15T00:00:00Z",
      endDate: "2023-04-01T00:00:00Z",
    },
  ],
  userGrowth: [
    { month: "Jan", users: 850 },
    { month: "Feb", users: 920 },
    { month: "Mar", users: 980 },
    { month: "Apr", users: 1050 },
    { month: "May", users: 1248 },
  ],
}

// Stat Card Component
const StatCard = ({
  icon,
  title,
  value,
  change,
  changeType,
}: { icon: React.ReactNode; title: string; value: number; change?: number; changeType?: "increase" | "decrease" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl bg-gray-800 p-6 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="rounded-lg bg-blue-600/20 p-3 text-blue-400">{icon}</div>
        <div className="flex items-center space-x-1 text-sm font-medium">
          {changeType && (
            <>
              <span className={changeType === "increase" ? "text-green-400" : "text-red-400"}>
                {changeType === "increase" ? <FiArrowUp /> : <FiArrowDown />}
              </span>
              <span className={changeType === "increase" ? "text-green-400" : "text-red-400"}>{change}%</span>
            </>
          )}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <p className="mt-2 text-3xl font-bold">{value.toLocaleString()}</p>
      </div>
    </motion.div>
  )
}

// Recent Activity Card Component
const RecentActivityCard = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="rounded-xl bg-gray-800 p-6 shadow-lg"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button className="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white">
          <FiMoreVertical />
        </button>
      </div>
      {children}
    </motion.div>
  )
}

export default function DashboardHome() {
  const stats= mockStats

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400"
      case "upcoming":
        return "bg-blue-500/20 text-blue-400"
      case "completed":
        return "bg-gray-500/20 text-gray-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Last updated: {new Date().toLocaleString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<FiUsers size={24} />}
          title="Total Users"
          value={stats.totalUsers}
          change={12}
          changeType="increase"
        />
        <StatCard
          icon={<BsFillTrophyFill size={24} />}
          title="Total Tournaments"
          value={stats.totalTournaments}
          change={5}
          changeType="increase"
        />
        <StatCard icon={<FiActivity size={24} />} title="Active Tournaments" value={stats.activeTournaments} />
        <StatCard
          icon={<FiCalendar size={24} />}
          title="Upcoming Tournaments"
          value={stats.upcomingTournaments}
          change={2}
          changeType="increase"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <RecentActivityCard title="Recent Users">
          <div className="space-y-4">
            {stats.recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between rounded-lg bg-gray-700/30 p-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
                    <FiUsers size={18} />
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400">Joined {formatDate(user.joinedAt)}</div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full rounded-lg bg-gray-700 py-2 text-center text-sm font-medium text-gray-300 hover:bg-gray-600">
            View All Users
          </button>
        </RecentActivityCard>

        {/* Recent Tournaments */}
        <RecentActivityCard title="Recent Tournaments">
          <div className="space-y-4">
            {stats.recentTournaments.map((tournament) => (
              <div key={tournament.id} className="flex items-center justify-between rounded-lg bg-gray-700/30 p-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
                    <GiSoccerBall size={18} />
                  </div>
                  <div>
                    <p className="font-medium">{tournament.name}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs ${getStatusColor(tournament.status)}`}>
                        {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-400">{tournament.participants} Teams</span>
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-400">
                  <div>{formatDate(tournament.startDate)}</div>
                  <div>to {formatDate(tournament.endDate)}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full rounded-lg bg-gray-700 py-2 text-center text-sm font-medium text-gray-300 hover:bg-gray-600">
            View All Tournaments
          </button>
        </RecentActivityCard>
      </div>

      {/* User Growth Chart */}
      <RecentActivityCard title="User Growth">
        <div className="h-64">
          <div className="flex h-full items-end justify-between">
            {stats.userGrowth.map((item, index) => (
              <div key={index} className="flex flex-1 flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.users / 1248) * 100}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-12 rounded-t-lg bg-gradient-to-t from-blue-600 to-indigo-500"
                />
                <div className="mt-2 text-xs text-gray-400">{item.month}</div>
              </div>
            ))}
          </div>
        </div>
      </RecentActivityCard>
    </div>
  )
}

