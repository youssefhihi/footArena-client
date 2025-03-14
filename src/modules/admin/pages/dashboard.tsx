import { motion } from "framer-motion"
import { FiUsers, FiActivity, FiCalendar, FiMoreVertical } from "react-icons/fi"
import { GiSoccerBall } from "react-icons/gi"
import { BsFillTrophyFill } from "react-icons/bs"
import { useTournamentStore } from "../../../core/store/tournament-store"
import { TournamentStatus } from "../../../types/tournament"
import { useEffect, useMemo, useState } from "react"
import { useUserStore } from "../../../core/store/user-store"
import { formatDate } from "../../../commun/utils/constant/date-formater"
import { Link } from "react-router-dom"
import { getStatusColor } from "../../../commun/utils/constant/status-color"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { StatCard } from "../../../commun/components/ui/stat-card"




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
  const [ loading , setLoading ] = useState(true);
  const { availableTournaments, getAvailableTournaments } = useTournamentStore();
  const { users , getAllUsers } = useUserStore();

  useEffect(() => {
    const loadData = async () => {
      await getAvailableTournaments();
      await getAllUsers();
      setLoading(false);
    }
    loadData();

  },[getAvailableTournaments, getAllUsers])


  const userGrowth = useMemo(() => {
    if (!users || users.length === 0) return [];

    // Initialize months with zero users
    const monthlyCounts: Record<string, number> = {
      Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
      Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0
    };

    // Count users per month
    users.forEach((user) => {
      if (!user.createdAt) return;
      const month = new Date(user.createdAt).toLocaleString("en-US", { month: "short" });
      monthlyCounts[month] += 1;
    });

    return Object.entries(monthlyCounts).map(([month, users]) => ({ month, users }));
  }, [users]);

  if(loading) return (<div className="text-center items-center h-full flex justify-center">
                        <div>
                          <div
                            className="w-16 h-16 border-4   border-dashed rounded-full animate-spin border-blue-800 mx-auto"
                          ></div>
                          <h2 className="text-zinc-900 dark:text-white mt-4">Loading Data...</h2>
                          <p className="text-zinc-600 dark:text-zinc-400">
                            Your adventure is about to begin
                          </p>
                        </div>
                      </div>
                      );

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
        value={users.length}
        />
        <StatCard
          icon={<BsFillTrophyFill size={24} />}
          title="Total Tournaments"
          value={availableTournaments.length}
        />
        <StatCard
          icon={<FiActivity 
          size={24} />} 
          title="Active Tournaments" 
          value={availableTournaments.filter((t) => t.status === TournamentStatus.OnGoing).length}
           />
        <StatCard
          icon={<FiCalendar size={24} />}
          title="Upcoming Tournaments"
          value={availableTournaments.filter((t) => t.status === TournamentStatus.NotStarted).length}
        />
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <RecentActivityCard title="Recent Users">
          <div className="space-y-4">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between rounded-lg bg-gray-700/30 p-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
                    <FiUsers size={18} />
                  </div>
                  <div>
                    <p className="font-medium">{user.username}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400">Joined {formatDate(user.createdAt)}</div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full rounded-lg bg-gray-700 py-2 text-center text-sm font-medium text-gray-300 hover:bg-gray-600">
            <Link to="/a/users">View All Users</Link>
          </button>
        </RecentActivityCard>

        {/* Recent Tournaments */}
        <RecentActivityCard title="Recent Tournaments">
          <div className="space-y-4">
            {availableTournaments.slice(0, 5).map((tournament,index) => (
              <div key={index} className="flex items-center justify-between rounded-lg bg-gray-700/30 p-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
                    <GiSoccerBall size={18} />
                  </div>
                  <div>
                    <p className="font-medium">{tournament.title}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs ${getStatusColor(tournament.status)}`}>
                        {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-400">{tournament.participants.length} Teams</span>
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-400">
                  <div>{formatDate(tournament.startTime)}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full rounded-lg bg-gray-700 py-2 text-center text-sm font-medium text-gray-300 hover:bg-gray-600">
           <Link to="/a/tournaments"> View All Tournaments </Link>
          </button>
        </RecentActivityCard>
      </div>

      {/* User Growth Chart */}
      <div className="rounded-xl bg-gray-800 p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-semibold text-white">📈 User Growth</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={userGrowth}>
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip wrapperClassName="bg-gray-900 text-white p-2 rounded-md" />
          <Bar dataKey="users" fill="rgb(59,130,246)" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
    </div>
  )
}

