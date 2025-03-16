import { useEffect, useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
  FiUsers,
  FiBarChart2,
  FiActivity,
  FiAward,
  FiFlag,
  FiClock,
  FiFilter,
  FiDownload,
} from "react-icons/fi"
import { GiSoccerBall, GiTrophyCup } from "react-icons/gi"
import { BsPersonFill, BsPeopleFill, BsFillTrophyFill } from "react-icons/bs"
import { format, parseISO } from "date-fns"

// Import chart components
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useAuthStore } from "../../../auth/store/auth-store"
import { TournamentCard } from "../../components/statistics/TournamentCard"
import { MatchResultCard } from "../../components/statistics/MatchResultCard"
import { ChartCard } from "../../components/statistics/ChartCard"
import { Match } from "../../../../types/Match"
import { useTournamentStore } from "../../../../core/store/tournament-store"
import { useOrganizationStore } from "../../store/organization-store"
import { useMatchStore } from "../../../../core/store/match-store"
import { TournamentStatus } from "../../../../types/tournament"
import { StatCard } from "../../components/statistics/StatCard"
import { OrganizationCard } from "../../components/statistics/OrganizationCard"

// Define chart colors
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

export default function Statistics() {
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<"all" | "month" | "week">("all")
  const [activeTab, setActiveTab] = useState<"overview" | "tournaments" | "matches" | "organizations">("overview")

  const { availableTournaments, getAvailableTournaments } = useTournamentStore()
  const { organizations, fetchOwnOrganization } = useOrganizationStore()
  const { matches, getAllMatches } = useMatchStore()
  const { authUser } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    const loadData = async () => {
      await getAvailableTournaments()
      await fetchOwnOrganization()
      await getAllMatches()
      setLoading(false)
    }
    loadData()
  }, [getAvailableTournaments, fetchOwnOrganization, getAllMatches])

  // Filter data based on time range and authenticated user
  const filteredData = useMemo(() => {
    if (!authUser) {
      return {
        tournaments: [],
        matches: [],
        organizations: [],
      }
    }

    // Filter tournaments created by the authenticated user
    const userTournaments = availableTournaments.filter((tournament) => tournament.user.id === authUser.id)

    // Filter organizations owned by the authenticated user
    const userOrganizations = organizations

    // Get organization IDs owned by the user
    const userOrganizationIds = userOrganizations.map((org) => org.organizationId)

    // Filter matches where the user's organizations are participating
    const userMatches = matches.filter((match) => {
      const isParticipant1 = userOrganizationIds.includes(match.participant1?.organization?.organizationId)
      const isParticipant2 = userOrganizationIds.includes(match.participant2?.organization?.organizationId)
      return isParticipant1 || isParticipant2
    })

    // Apply time range filter
    if (timeRange === "all") {
      return {
        tournaments: userTournaments,
        matches: userMatches,
        organizations: userOrganizations,
      }
    }

    const now = new Date()
    const filterDate = new Date()

    if (timeRange === "month") {
      filterDate.setMonth(now.getMonth() - 1)
    } else if (timeRange === "week") {
      filterDate.setDate(now.getDate() - 7)
    }

    return {
      tournaments: userTournaments.filter((t) => new Date(t.createdAt) >= filterDate),
      matches: userMatches.filter((m) => new Date(m.createdAt) >= filterDate),
      organizations: userOrganizations, // Organizations don't have a date field to filter by
    }
  }, [availableTournaments, matches, organizations, timeRange, authUser])

  // Calculate statistics
  const stats = useMemo(() => {
    // Tournament stats
    const totalTournaments = filteredData.tournaments.length
    const activeTournaments = filteredData.tournaments.filter((t) => t.status === TournamentStatus.OnGoing).length
    const completedTournaments = filteredData.tournaments.filter((t) => t.status === TournamentStatus.Completed).length
    const upcomingTournaments = filteredData.tournaments.filter((t) => t.status === TournamentStatus.NotStarted).length

    // Match stats
    const totalMatches = filteredData.matches.length

    // Get organization IDs owned by the user
    const userOrganizationIds = filteredData.organizations.map((org) => org.organizationId)

    const wonMatches = filteredData.matches.filter((m) => {
      // Check if the user's organization is participant1 and won
      const isParticipant1 = userOrganizationIds.includes(m.participant1?.organization?.organizationId)

      // Check if the user's organization is participant2 and won
      const isParticipant2 = userOrganizationIds.includes(m.participant2?.organization?.organizationId)

      if (isParticipant1 && m.matchResult) {
        return m.matchResult.participant1 > m.matchResult.participant2
      } else if (isParticipant2 && m.matchResult) {
        return m.matchResult.participant2 > m.matchResult.participant1
      }

      return false
    }).length

    const lostMatches = filteredData.matches.filter((m) => {
      // Check if the user's organization is participant1 and lost
      const isParticipant1 = userOrganizationIds.includes(m.participant1?.organization?.organizationId)

      // Check if the user's organization is participant2 and lost
      const isParticipant2 = userOrganizationIds.includes(m.participant2?.organization?.organizationId)

      if (isParticipant1 && m.matchResult) {
        return m.matchResult.participant1 < m.matchResult.participant2
      } else if (isParticipant2 && m.matchResult) {
        return m.matchResult.participant2 < m.matchResult.participant1
      }

      return false
    }).length

    const drawnMatches = filteredData.matches.filter((m) => {
      // Check if the user's organization is participant1 or participant2
      const isParticipant1 = userOrganizationIds.includes(m.participant1?.organization?.organizationId)
      const isParticipant2 = userOrganizationIds.includes(m.participant2?.organization?.organizationId)

      if (isParticipant1 && m.matchResult || isParticipant2 &&  m.matchResult) {
        return m.matchResult.participant1 === m.matchResult.participant2
      }

      return false
    }).length

    // Organization stats
    const totalOrganizations = filteredData.organizations.length
    const teamOrganizations = filteredData.organizations.filter((o) => o.isTeam).length
    const individualOrganizations = filteredData.organizations.filter((o) => !o.isTeam).length

    // Calculate total team members across all organizations
    const totalTeamMembers = filteredData.organizations.reduce((acc, org) => {
      return acc + (org.teamMembers?.length || 0)
    }, 0)

    // Calculate win rate
    const winRate = totalMatches > 0 ? Math.round((wonMatches / totalMatches) * 100) : 0

    return {
      totalTournaments,
      activeTournaments,
      completedTournaments,
      upcomingTournaments,
      totalMatches,
      wonMatches,
      lostMatches,
      drawnMatches,
      winRate,
      totalOrganizations,
      teamOrganizations,
      individualOrganizations,
      totalTeamMembers,
    }
  }, [filteredData])

  // Prepare chart data
  const tournamentStatusData = useMemo(() => {
    const statusCounts = [
      { name: "Not Started", value: stats.upcomingTournaments },
      { name: "Ongoing", value: stats.activeTournaments },
      { name: "Completed", value: stats.completedTournaments },
      {
        name: "Cancelled",
        value: filteredData.tournaments.filter((t) => t.status === TournamentStatus.Cancelled).length,
      },
    ]
    return statusCounts.filter((item) => item.value > 0)
  }, [filteredData.tournaments, stats])

  const matchResultsData = useMemo(() => {
    return [
      { name: "Won", value: stats.wonMatches },
      { name: "Lost", value: stats.lostMatches },
      { name: "Drawn", value: stats.drawnMatches },
    ]
  }, [stats])

  const organizationTypeData = useMemo(() => {
    return [
      { name: "Team", value: stats.teamOrganizations },
      { name: "Individual", value: stats.individualOrganizations },
    ]
  }, [stats])

  const matchesOverTimeData = useMemo(() => {
    // Get organization IDs owned by the user
    const userOrganizationIds = filteredData.organizations.map((org) => org.organizationId)

    // Group matches by month
    const matchesByMonth: Record<string, { total: number; won: number; lost: number; drawn: number }> = {}

    filteredData.matches.forEach((match) => {
      const date = parseISO(match.matchTime)
      const monthYear = format(date, "MMM yyyy")

      if (!matchesByMonth[monthYear]) {
        matchesByMonth[monthYear] = { total: 0, won: 0, lost: 0, drawn: 0 }
      }

      matchesByMonth[monthYear].total++

      // Check if the user's organization is participant1
      const isParticipant1 = userOrganizationIds.includes(match.participant1?.organization?.organizationId)

      // Check if the user's organization is participant2
      const isParticipant2 = userOrganizationIds.includes(match.participant2?.organization?.organizationId)

      if (isParticipant1 && match.matchResult) {
        if (match.matchResult.participant1 > match.matchResult.participant2) {
          matchesByMonth[monthYear].won++
        } else if (match.matchResult.participant1 < match.matchResult.participant2) {
          matchesByMonth[monthYear].lost++
        } else {
          matchesByMonth[monthYear].drawn++
        }
      } else if (isParticipant2 && match.matchResult) {
        if (match.matchResult.participant2 > match.matchResult.participant1) {
          matchesByMonth[monthYear].won++
        } else if (match.matchResult.participant2 < match.matchResult.participant1) {
          matchesByMonth[monthYear].lost++
        } else {
          matchesByMonth[monthYear].drawn++
        }
      }
    })

    // Convert to array and sort by date
    return Object.entries(matchesByMonth)
      .map(([month, data]) => ({
        month,
        ...data,
      }))
      .sort((a, b) => {
        const dateA = new Date(a.month)
        const dateB = new Date(b.month)
        return dateA.getTime() - dateB.getTime()
      })
  }, [filteredData.matches, filteredData.organizations])

  const tournamentParticipationData = useMemo(() => {
    // Calculate participation rate for each tournament
    return filteredData.tournaments.map((tournament) => ({
      name: tournament.title,
      participationRate: Math.round((tournament.participants.length / tournament.maxParticipants) * 100),
      maxParticipants: tournament.maxParticipants,
      currentParticipants: tournament.participants.length,
    }))
  }, [filteredData.tournaments])

  // Check if user is authenticated
  const isUserMatch = (match: Match) => {
    if (!authUser) return false

    // Get organization IDs owned by the user
    const userOrganizationIds = filteredData.organizations.map((org) => org.organizationId)

    // Check if the user's organization is participant1 or participant2
    const isParticipant1 = userOrganizationIds.includes(match.participant1?.organization?.organizationId)
    const isParticipant2 = userOrganizationIds.includes(match.participant2?.organization?.organizationId)

    return isParticipant1 || isParticipant2
  }

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  // Render no data state if user is not authenticated
  if (!authUser) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="flex flex-col justify-center items-center h-64">
          <FiUsers className="h-16 w-16 text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Authentication Required</h2>
          <p className="text-gray-400">Please sign in to view your statistics</p>
          <button
            onClick={() => navigate("/auth/sign-in")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Statistics Dashboard</h1>
            <p className="text-gray-400">
              Welcome, {authUser.fullName.firstName} {authUser.fullName.lastName}! Track your performance across
              tournaments, matches, and organizations
            </p>
          </div>

          <div className="flex mt-4 md:mt-0">
            <div className="bg-gray-800 rounded-lg p-1 flex">
              <button
                onClick={() => setTimeRange("week")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                  timeRange === "week" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeRange("month")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                  timeRange === "month" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeRange("all")}
                className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                  timeRange === "all" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                All Time
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-800">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("tournaments")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "tournaments"
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                }`}
              >
                Tournaments
              </button>
              <button
                onClick={() => setActiveTab("matches")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "matches"
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                }`}
              >
                Matches
              </button>
              <button
                onClick={() => setActiveTab("organizations")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "organizations"
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                }`}
              >
                Organizations
              </button>
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={<BsFillTrophyFill className="h-6 w-6" />}
                title="Total Tournaments"
                value={stats.totalTournaments}
              />
              <StatCard icon={<FiActivity className="h-6 w-6" />} title="Total Matches" value={stats.totalMatches} />
              <StatCard icon={<FiUsers className="h-6 w-6" />} title="Organizations" value={stats.totalOrganizations} />
              <StatCard
                icon={<FiAward className="h-6 w-6" />}
                title="Win Rate"
                value={`${stats.winRate}%`}
                trend={stats.winRate > 50 ? "up" : stats.winRate < 50 ? "down" : "neutral"}
                trendValue={`${stats.wonMatches}/${stats.totalMatches} matches`}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ChartCard title="Tournament Status" subtitle="Distribution of tournament statuses">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={tournamentStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {tournamentStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} tournaments`, "Count"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>

              <ChartCard title="Match Results" subtitle="Win, loss, and draw distribution">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={matchResultsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#10b981" /> {/* Won - Green */}
                        <Cell fill="#ef4444" /> {/* Lost - Red */}
                        <Cell fill="#f59e0b" /> {/* Drawn - Yellow */}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} matches`, "Count"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-8">
              <ChartCard title="Matches Over Time" subtitle="Performance trends across months">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={matchesOverTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="won" stackId="a" fill="#10b981" name="Won" />
                      <Bar dataKey="drawn" stackId="a" fill="#f59e0b" name="Drawn" />
                      <Bar dataKey="lost" stackId="a" fill="#ef4444" name="Lost" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Recent Tournaments" subtitle="Your latest tournament participation">
                <div className="max-h-96 overflow-y-auto">
                  {filteredData.tournaments.length > 0 ? (
                    filteredData.tournaments
                      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                      .slice(0, 5)
                      .map((tournament) => <TournamentCard key={tournament.tournamentId} tournament={tournament} />)
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <GiTrophyCup className="mx-auto h-12 w-12 mb-3 text-gray-600" />
                      <p>No tournaments found</p>
                    </div>
                  )}
                </div>
              </ChartCard>

              <ChartCard title="Recent Matches" subtitle="Your latest match results">
                <div className="max-h-96 overflow-y-auto">
                  {filteredData.matches.length > 0 ? (
                    filteredData.matches
                      .sort((a, b) => new Date(b.matchTime).getTime() - new Date(a.matchTime).getTime())
                      .slice(0, 5)
                      .map((match) => (
                        <MatchResultCard key={match.matchId} match={match} isUserMatch={isUserMatch(match)} />
                      ))
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <GiSoccerBall className="mx-auto h-12 w-12 mb-3 text-gray-600" />
                      <p>No matches found</p>
                    </div>
                  )}
                </div>
              </ChartCard>
            </div>
          </div>
        )}

        {/* Tournaments Tab */}
        {activeTab === "tournaments" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={<BsFillTrophyFill className="h-6 w-6" />}
                title="Total Tournaments"
                value={stats.totalTournaments}
              />
              <StatCard
                icon={<FiActivity className="h-6 w-6" />}
                title="Active Tournaments"
                value={stats.activeTournaments}
              />
              <StatCard
                icon={<FiFlag className="h-6 w-6" />}
                title="Completed Tournaments"
                value={stats.completedTournaments}
              />
              <StatCard
                icon={<FiClock className="h-6 w-6" />}
                title="Upcoming Tournaments"
                value={stats.upcomingTournaments}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ChartCard title="Tournament Status" subtitle="Distribution of tournament statuses">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={tournamentStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {tournamentStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} tournaments`, "Count"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>

              <ChartCard title="Tournament Participation" subtitle="Fill rate of your tournaments">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={tournamentParticipationData.slice(0, 5)}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} interval={0} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="participationRate" fill="#3b82f6" name="Participation Rate (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
            </div>

            <ChartCard title="All Tournaments" subtitle="Complete list of your tournaments">
              <div className="mb-4 flex justify-between items-center">
                <div className="text-sm text-gray-400">Showing {filteredData.tournaments.length} tournaments</div>
                <div className="flex space-x-2">
                  <button className="bg-gray-700 p-2 rounded-lg text-gray-300 hover:bg-gray-600">
                    <FiFilter className="h-5 w-5" />
                  </button>
                  <button className="bg-gray-700 p-2 rounded-lg text-gray-300 hover:bg-gray-600">
                    <FiDownload className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {filteredData.tournaments.length > 0 ? (
                  filteredData.tournaments
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((tournament) => <TournamentCard key={tournament.tournamentId} tournament={tournament} />)
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <GiTrophyCup className="mx-auto h-12 w-12 mb-3 text-gray-600" />
                    <p>No tournaments found</p>
                  </div>
                )}
              </div>
            </ChartCard>
          </div>
        )}

        {/* Matches Tab */}
        {activeTab === "matches" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard icon={<FiActivity className="h-6 w-6" />} title="Total Matches" value={stats.totalMatches} />
              <StatCard
                icon={<FiBarChart2 className="h-6 w-6" />}
                title="Matches Won"
                value={stats.wonMatches}
                trend="up"
                trendValue={`${stats.winRate}%`}
              />
              <StatCard
                icon={<FiBarChart2 className="h-6 w-6" />}
                title="Matches Lost"
                value={stats.lostMatches}
                trend="down"
                trendValue={`${Math.round((stats.lostMatches / stats.totalMatches) * 100) || 0}%`}
              />
              <StatCard
                icon={<FiBarChart2 className="h-6 w-6" />}
                title="Matches Drawn"
                value={stats.drawnMatches}
                trend="neutral"
                trendValue={`${Math.round((stats.drawnMatches / stats.totalMatches) * 100) || 0}%`}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ChartCard title="Match Results" subtitle="Win, loss, and draw distribution">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={matchResultsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#10b981" /> {/* Won - Green */}
                        <Cell fill="#ef4444" /> {/* Lost - Red */}
                        <Cell fill="#f59e0b" /> {/* Drawn - Yellow */}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} matches`, "Count"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>

              <ChartCard title="Matches Over Time" subtitle="Performance trends across months">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={matchesOverTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="total" stroke="#8884d8" name="Total Matches" />
                      <Line type="monotone" dataKey="won" stroke="#10b981" name="Won" />
                      <Line type="monotone" dataKey="lost" stroke="#ef4444" name="Lost" />
                      <Line type="monotone" dataKey="drawn" stroke="#f59e0b" name="Drawn" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
            </div>

            <ChartCard title="All Matches" subtitle="Complete list of your matches">
              <div className="mb-4 flex justify-between items-center">
                <div className="text-sm text-gray-400">Showing {filteredData.matches.length} matches</div>
                <div className="flex space-x-2">
                  <button className="bg-gray-700 p-2 rounded-lg text-gray-300 hover:bg-gray-600">
                    <FiFilter className="h-5 w-5" />
                  </button>
                  <button className="bg-gray-700 p-2 rounded-lg text-gray-300 hover:bg-gray-600">
                    <FiDownload className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {filteredData.matches.length > 0 ? (
                  filteredData.matches
                    .sort((a, b) => new Date(b.matchTime).getTime() - new Date(a.matchTime).getTime())
                    .map((match) => (
                      <MatchResultCard key={match.matchId} match={match} isUserMatch={isUserMatch(match)} />
                    ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <GiSoccerBall className="mx-auto h-12 w-12 mb-3 text-gray-600" />
                    <p>No matches found</p>
                  </div>
                )}
              </div>
            </ChartCard>
          </div>
        )}

        {/* Organizations Tab */}
        {activeTab === "organizations" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={<FiUsers className="h-6 w-6" />}
                title="Total Organizations"
                value={stats.totalOrganizations}
              />
              <StatCard
                icon={<BsPeopleFill className="h-6 w-6" />}
                title="Team Organizations"
                value={stats.teamOrganizations}
              />
              <StatCard
                icon={<BsPersonFill className="h-6 w-6" />}
                title="Individual Organizations"
                value={stats.individualOrganizations}
              />
              <StatCard
                icon={<FiUsers className="h-6 w-6" />}
                title="Total Team Members"
                value={stats.totalTeamMembers}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ChartCard title="Organization Types" subtitle="Team vs Individual distribution">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={organizationTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#3b82f6" /> {/* Team - Blue */}
                        <Cell fill="#8b5cf6" /> {/* Individual - Purple */}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} organizations`, "Count"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>

              <ChartCard title="Team Members Distribution" subtitle="Members per organization">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={filteredData.organizations.map((org) => ({
                        name: org.name,
                        members: org.teamMembers?.length || 0,
                      }))}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} interval={0} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="members" fill="#3b82f6" name="Team Members" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
            </div>

            <ChartCard title="All Organizations" subtitle="Complete list of your organizations">
              <div className="mb-4 flex justify-between items-center">
                <div className="text-sm text-gray-400">Showing {filteredData.organizations.length} organizations</div>
                <div className="flex space-x-2">
                  <button className="bg-gray-700 p-2 rounded-lg text-gray-300 hover:bg-gray-600">
                    <FiFilter className="h-5 w-5" />
                  </button>
                  <button className="bg-gray-700 p-2 rounded-lg text-gray-300 hover:bg-gray-600">
                    <FiDownload className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {filteredData.organizations.length > 0 ? (
                  filteredData.organizations.map((organization) => (
                    <OrganizationCard key={organization.organizationId} organization={organization} />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <FiUsers className="mx-auto h-12 w-12 mb-3 text-gray-600" />
                    <p>No organizations found</p>
                  </div>
                )}
              </div>
            </ChartCard>
          </div>
        )}
      </div>
    </div>
  )
}

