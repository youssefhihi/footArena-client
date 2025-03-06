import { Trophy, Calendar, Users, BarChart3, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

import { mockMatches, mockTournaments } from "./data"
import { StatCard } from "../components/ui/StatCard"
import { TournamentCard } from "../components/TournamentCard"
import { UpcomingMatchesCard } from "../components/ui/UpcomingMatchesCard"

export default function Dashboard() {
  // Get recent tournaments (last 3)
  const recentTournaments = mockTournaments
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)

  // Get upcoming matches
  const upcomingMatches = mockMatches
    .filter((match) => new Date(match.matchTime) > new Date())
    .sort((a, b) => new Date(a.matchTime).getTime() - new Date(b.matchTime).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Tournaments"
          value="24"
          icon={<Trophy className="h-6 w-6 text-green-600" />}
          change="+2"
          changeText="from last month"
        />
        <StatCard
          title="Upcoming Matches"
          value="8"
          icon={<Calendar className="h-6 w-6 text-blue-600" />}
          change="+3"
          changeText="from last week"
        />
        <StatCard
          title="Organizations"
          value="3"
          icon={<Users className="h-6 w-6 text-green-600" />}
          change="0"
          changeText="no change"
        />
        <StatCard
          title="Win Rate"
          value="68%"
          icon={<BarChart3 className="h-6 w-6 text-blue-600" />}
          change="+5%"
          changeText="from last month"
        />
      </div>

      {/* Recent Tournaments */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Recent Tournaments</h2>
          <Link to="/tournaments" className="flex items-center text-sm font-medium text-green-600 hover:text-green-700">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentTournaments.map((tournament) => (
            <TournamentCard key={tournament.tournamentId} tournament={tournament} />
          ))}
        </div>
      </div>

      {/* Upcoming Matches */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Upcoming Matches</h2>
          <Link
            to="/participated"
            className="flex items-center text-sm font-medium text-green-600 hover:text-green-700"
          >
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <UpcomingMatchesCard matches={upcomingMatches} />
      </div>
    </div>
  )
}

