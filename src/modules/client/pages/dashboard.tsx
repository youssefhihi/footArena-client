import { Trophy, Calendar, Users, BarChart3, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

import { TournamentCard } from "../components/TournamentCard"
import { UpcomingMatchesCard } from "../components/ui/UpcomingMatchesCard"
import { StatCard } from "../../../commun/components/ui/stat-card"
import { useTournamentStore } from "../../../core/store/tournament-store"
import { TournamentStatus } from "../../../types/tournament"
import { useOrganizationStore } from "../store/organization-store"
import { useEffect, useState } from "react"
import { useMatchStore } from "../../../core/store/match-store"

export default function Dashboard() {
  const [ loading , setLoading ] = useState(true);
  const { availableTournaments, getAvailableTournaments } = useTournamentStore();
  const { organizations , fetchOwnOrganization } = useOrganizationStore();
  const { matches, getAllMatches } = useMatchStore();
    

 useEffect(() => {
    const loadData = async () => {
      await getAvailableTournaments();
      await fetchOwnOrganization();
      await getAllMatches();
      setLoading(false);
    }
    loadData();

  },[getAvailableTournaments, fetchOwnOrganization, getAllMatches])

  // Get recent tournaments (last 3)
  const recentTournaments = availableTournaments
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)

  // Get upcoming matches
  const upcomingMatches = matches
    .filter((match) => new Date(match.matchTime) > new Date())
    .sort((a, b) => new Date(a.matchTime).getTime() - new Date(b.matchTime).getTime())
    .slice(0, 5)

    const winPer = matches;
    
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
          value={availableTournaments.length}
          icon={<Trophy className="h-6 w-6 text-blue-800" />}
        />
        <StatCard
          title="Upcoming Matches"
          value={availableTournaments.filter((t) => t.status === TournamentStatus.NotStarted).length}
          icon={<Calendar className="h-6 w-6 text-blue-600" />}
        />
        <StatCard
          title="Organizations"
          value={organizations.length}
          icon={<Users className="h-6 w-6 text-blue-600" />}
        />
        <StatCard
          title="Win Rate"
          value={0}
          icon={<BarChart3 className="h-6 w-6 text-blue-600" />}
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

