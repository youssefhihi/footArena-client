import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import { FiCalendar, FiUsers, FiAward, FiInfo, FiList, FiActivity } from "react-icons/fi"
import { useParams } from "react-router-dom"
import { useTournamentStore } from "../../../../core/store/tournament-store"
import { Tournament } from "../../../../types/tournament"
import { useMatchStore } from "../../../../core/store/match-store"
import { useRoundStore } from "../../../../core/store/round-store"
import { Frown } from "lucide-react";
import { formatDate } from "../../../../commun/utils/constant/date-formater"
import { OrganizationCard } from "../../../../commun/components/organization/organization-card"
import { RoundRobinTable } from "../../../../commun/components/round/RoundRobinTable"
import { TournamentDetails } from "../../../../commun/components/tournament/tournament-details"
import { MatchCard } from "../../../../commun/components/match/matchCard"
import { Organization } from "../../../../types/organozation"




const tabs = [
  { id: "overview", label: "Overview", icon: FiInfo },
  { id: "table", label: "Table", icon: FiList },
  { id: "matches", label: "Matches", icon: FiActivity },
  { id:"participants", label: "Participants", icon: FiUsers },
]

export default function TournamentuInfo() {
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

  const handleViewOrganization = (organization: Organization) => {
    console.log("Viewing organization:", organization);
  }
  return (
    <div className="min-h-screen ">
      {/* Tournament Header */}
      <div className="relative bg-gradient-to-r from-blue-700 to-green-400 px-4 py-8 sm:px-6 lg:px-8 rounded-lg">
        <div className="relative mx-auto max-w-7xl">
          <div className="md:flex md:items-center md:justify-between">
            {tournament ? (
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight pb-5">
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
                        ? "border-green-500 text-green-500"
                        : "border-transparent text-blue-400 hover:border-blue-300 hover:text-blue-300"
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
                <div className="rounded-lg bg-gray-600 p-6">
                  <h3 className="text-lg font-medium text-white">Recent Activity</h3>
                  <div className="mt-4 space-y-4">
                    {matches.slice(0, 3).map((match) => (
                      <div key={match.matchId} className="rounded-md bg-gray-500 p-4">
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
                <TournamentDetails className="bg-gray-600" tournament={tournament} />
              </div>
            )}

            {tournament &&  activeTab === "table" && (
              <RoundRobinTable rounds={rounds} />
            )}

            {tournament &&  activeTab === "participants" && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {tournament.participants.map((participant) => (
                      <OrganizationCard onView={handleViewOrganization} key={participant.participantId} organization={participant.organization} />
                  ))}
              </div>
            )}

            {tournament &&  activeTab === "matches" && (
              <div className="space-y-6">
                {matches.length > 0 ? (
                  matches.map((match) => (
                    <MatchCard key={match.matchId} match={match} />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="overflow-hidden rounded-lg bg-gray-800 shadow p-6 flex flex-col items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="text-5xl">⚽️</div>
                      <h3 className="mt-4 text-lg font-medium text-white">
                        Matches Not Organized Yet!
                      </h3>
                      <p className="mt-2 text-gray-400">
                        No matches have been scheduled.
                      </p>
                      
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

