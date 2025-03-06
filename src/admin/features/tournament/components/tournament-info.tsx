import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import { FiCalendar, FiUsers, FiAward, FiInfo, FiList, FiActivity, FiMessageSquare } from "react-icons/fi"
import { GiWhistle } from "react-icons/gi"
import { useParams } from "react-router-dom"
import { useTournamentStore } from "../store/tournament-store"
import { Tournament } from "../../../../types/tournament"
import { useMatchStore } from "../store/match-store"
import { useRoundStore } from "../store/round-store"
import { Frown } from "lucide-react";
import { TournamentDetails } from "./ui/tournament-details"
import { RoundRobinTable } from "./ui/round-roben"
import { formatDate } from "../../../../lib/utils/constants/date-formater"



const tabs = [
  { id: "overview", label: "Overview", icon: FiInfo },
  { id: "table", label: "Table", icon: FiList },
  { id: "matches", label: "Matches", icon: FiActivity },
]

export default function TournamentInfo() {
  const [activeTab, setActiveTab] = useState("overview")
  const [tournament, setTournament] = useState<Tournament | undefined | null>();
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const {  getTournamentById } = useTournamentStore();
  const { matches, fetchTournamentMatches } = useMatchStore();
  const { rounds , fetchTournamentRounds } = useRoundStore();

  const fetchTournament = async () => {
      const tournament = await getTournamentById(tournamentId!);
      setTournament(tournament);
  };


    useEffect(() => {
      fetchTournament();
      if(activeTab === "matches") fetchTournamentMatches(tournamentId!);
      if(activeTab === "matches") fetchTournamentMatches(tournamentId!);
      if(activeTab === "table") fetchTournamentRounds(tournamentId!);
    }, [tournamentId, getTournamentById, fetchTournamentMatches, activeTab]);

  
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Tournament Header */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl">
          <div className="md:flex md:items-center md:justify-between">
            {tournament ? (
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                  {tournament.title}
                </h2>
                <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                  <div className="mt-2 flex items-center text-sm text-blue-100">
                    <FiCalendar className="mr-1.5 h-5 w-5 flex-shrink-0" />
                    {formatDate(tournament.startTime)}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-blue-100">
                    <FiUsers className="mr-1.5 h-5 w-5 flex-shrink-0" />
                    {tournament.maxParticipants} Participants
                  </div>
                  <div className="mt-2 flex items-center text-sm text-blue-100">
                    <FiAward className="mr-1.5 h-5 w-5 flex-shrink-0" />
                    {tournament.isTeams ? "Teams" : "Individual"}
                  </div>
                </div>
              </div>
            ) : ( 
              <div className="w-full text-center py-10">
                <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                  <Frown className="w-8 h-8 text-white" />
                  <span>Tournament Not Found</span>
                </h2>
                <p className="text-blue-200">
                  The requested tournament does not exist or has been deleted.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  disabled={tournament === undefined || tournament === null || activeTab === tab.id}                
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center border-b-2 px-1 py-4 text-sm font-medium
                    ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-500"
                        : "border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-300"
                    }
                  `}
                >
                  <Icon className="mr-2 h-5 w-5" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
           {tournament && activeTab === "overview" && (
              <div className="grid gap-6 ">
                {/* Recent Activity */}
                <div className="rounded-lg bg-gray-800 p-6">
                  <h3 className="text-lg font-medium text-white">Recent Activity</h3>
                  <div className="mt-4 space-y-4">
                    {matches.slice(0, 3).map((match) => (
                      <div key={match.matchId} className="rounded-md bg-gray-700 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img
                              src={match.participant1.organization.logo || "/placeholder.svg"}
                              alt={match.participant1.organization.name}
                              className="h-8 w-8 rounded-full"
                            />
                            <span className="text-white">{match.participant1.organization.name}</span>
                            <span className="text-lg font-bold text-white">
                              {match.matchResult.Participant1} - {match.matchResult.Participant2}
                            </span>
                            <img
                              src={match.participant2.organization.logo || "/placeholder.svg"}
                              alt={match.participant2.organization.name}
                              className="h-8 w-8 rounded-full"
                            />
                            <span className="text-white">{match.participant2.organization.name}</span>
                          </div>
                          <span className="text-sm text-gray-400">{format(new Date(match.matchTime), "PP")}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Tournament Info */}
                <TournamentDetails tournament={tournament} />
              </div>
            )}

            {tournament &&  activeTab === "table" && (
              <RoundRobinTable rounds={rounds} />
            )}

            {tournament &&  activeTab === "matches" && (
              <div className="space-y-6">
                {matches.map((match) => (
                  <motion.div
                    key={match.matchId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="overflow-hidden rounded-lg bg-gray-800 shadow"
                  >
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-1 items-center justify-end">
                          <span className="text-lg font-medium text-white">{match.participant1.organization.name}</span>
                          <img
                            src={match.participant1.organization.logo || "/placeholder.svg"}
                            alt={match.participant1.organization.name}
                            className="ml-4 h-10 w-10 rounded-full"
                          />
                        </div>
                        <div className="mx-8 flex items-center space-x-4">
                          <span className="text-2xl font-bold text-white">{match.matchResult.Participant1}</span>
                          <span className="text-xl text-gray-400">-</span>
                          <span className="text-2xl font-bold text-white">{match.matchResult.Participant2}</span>
                        </div>
                        <div className="flex flex-1 items-center">
                          <img
                            src={match.participant2.organization.logo || "/placeholder.svg"}
                            alt={match.participant2.organization.name}
                            className="mr-4 h-10 w-10 rounded-full"
                          />
                          <span className="text-lg font-medium text-white">{match.participant2.organization.name}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <GiWhistle className="mr-1.5 h-4 w-4" />
                            <span>{format(new Date(match.matchTime), "PPp")}</span>
                          </div>
                          <div className="flex items-center">
                            <FiMessageSquare className="mr-1.5 h-4 w-4" />
                            <span>{match.comments}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <span className="mr-1 rounded-sm bg-yellow-400 px-1.5 py-0.5 text-xs font-medium text-yellow-800">
                              {match.MatchCarts.participant1.yellow}
                            </span>
                            <span className="rounded-sm bg-red-400 px-1.5 py-0.5 text-xs font-medium text-red-800">
                              {match.MatchCarts.participant1.red}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="mr-1 rounded-sm bg-yellow-400 px-1.5 py-0.5 text-xs font-medium text-yellow-800">
                              {match.MatchCarts.participant2.yellow}
                            </span>
                            <span className="rounded-sm bg-red-400 px-1.5 py-0.5 text-xs font-medium text-red-800">
                              {match.MatchCarts.participant2.red}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

