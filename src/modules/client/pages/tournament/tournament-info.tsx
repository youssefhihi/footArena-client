import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import {  FiUsers, FiInfo, FiList, FiActivity } from "react-icons/fi"
import { useParams } from "react-router-dom"
import { useTournamentStore } from "../../../../core/store/tournament-store"
import { Tournament } from "../../../../types/tournament"
import { useMatchStore } from "../../../../core/store/match-store"
import { useRoundStore } from "../../../../core/store/round-store"
import { OrganizationCard } from "../../../../commun/components/organization/organization-card"
import { RoundRobinTable } from "../../../../commun/components/round/RoundRobinTable"
import { TournamentDetails } from "../../../../commun/components/tournament/tournament-details"
import { MatchCard } from "../../../../commun/components/match/matchCard"
import { Organization } from "../../../../types/organozation"
import { TournamentHeader } from "../../../../commun/components/tournament/tournament-bar"
import { MdOutlineGroupAdd } from "react-icons/md";
import { FormButton } from "../../../../commun/components/ui/button/Button"
import { useOrganizationStore } from "../../store/organization-store"




const tabs = [
  { id: "overview", label: "Overview", icon: FiInfo },
  { id: "table", label: "Table", icon: FiList },
  { id: "matches", label: "Matches", icon: FiActivity },
  { id:"participants", label: "Participants", icon: FiUsers },
  { id:"join", label: "Join Tournament", icon:  MdOutlineGroupAdd},
]

export default function TournamentuInfo() {
  const [activeTab, setActiveTab] = useState("overview")
  const [tournament, setTournament] = useState<Tournament | undefined | null>();
  const [ isOwner , setIsOwner] = useState<boolean>(false);
  const [ selectedOrganization, setSelectedOrganization ] = useState<Organization>();
  const [ showModal, setShowModal ] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("")
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const {  getTournamentById, participateToTournament } = useTournamentStore();
  const { matches, fetchTournamentMatches } = useMatchStore();
  const { rounds , fetchTournamentRounds } = useRoundStore();
  const { organizations , fetchOwnOrganization } = useOrganizationStore();
  

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

  const joinTournament = async () => {
    if(!tournament) return
    if(selectedOrganization){
     const participant = await participateToTournament({tournament: tournamentId!, organization: selectedOrganization.organizationId!});
      tournament.participants.push(participant!);
    } 
  }

  const showJoinTournamentModel = () => {
    setShowModal(true);
    fetchOwnOrganization();
  }
  const filteredOrganizations = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )
  return (
    <div className="min-h-screen ">
      {/* Tournament Header */}
      <TournamentHeader tournament={tournament}className="bg-gradient-to-r from-blue-700 to-green-400" />

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

            {tournament &&  activeTab === "join" && (
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-lg bg-gray-600 shadow p-6 flex flex-col items-center justify-center"
            >
              <div className="text-center">
                <div className="text-5xl">⚽️</div>
                <h3 className="my-4 text-lg font-medium text-white">
                  Take the Challenge and Join this Tournament
                </h3>
                <FormButton loading={false} onClick={showJoinTournamentModel} > Join Tournament</FormButton>
              </div>
            </motion.div>
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
       {/* Add Member Modal */}
            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                  <h2 className="mb-4 text-lg font-semibold">Add Team Member</h2>
      
                  {!selectedOrganization ? (
                    <>
                      <div className="mb-4 flex">
                        <input
                          type="text"
                          placeholder="Search users by name or email"
                          className="w-full rounded-md border border-gray-300 px-3 py-2"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
      
                      <div className="max-h-60 overflow-y-auto rounded-md border">
                        {filteredOrganizations ? (
                          <ul className="divide-y">
                            {filteredOrganizations.map((organization, index) => (
                              
                              <li
                                key={index}
                                className="flex cursor-pointer items-center p-3 hover:bg-gray-50"
                                onClick={() => setSelectedOrganization(organization)}
                              >
                                <div className="mr-3 h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                                  <img
                                    src={organization.logo || "/placeholder.svg?height=32&width=32"}
                                    alt={organization.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium">{organization.name}</div>
                                  <div className="text-xs text-gray-500">{organization.teamMembers.length} members</div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          
                          <div className="flex h-32 flex-col items-center justify-center p-4 text-center">
                            <p className="text-sm font-medium text-gray-500">No users found</p>
                            <p className="text-xs text-gray-400">Try a different search term</p>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-4 flex items-center space-x-3 rounded-md border p-3">
                        <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                          <img
                            src={selectedOrganization.logo || "/placeholder.svg?height=40&width=40"}
                            alt={selectedOrganization.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{selectedOrganization.name}</div>
                          <div className="text-xs text-gray-500">{selectedOrganization.teamMembers.length} members</div>
                        </div>
                        <button
                          className="ml-auto text-sm text-blue-600 hover:text-blue-800"
                          onClick={() => setSelectedOrganization(undefined)}
                        >
                          Change
                        </button>
                      </div>
                    </>
                  )}
      
                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      className="rounded-md border px-4 py-2 hover:bg-gray-50"
                      onClick={() => {
                        setShowModal(false)
                        setSelectedOrganization(undefined)
                        setSearchQuery("")
                      }}
                    >
                      Cancel
                    </button>
      
                    {selectedOrganization && (
                      <button
                        className="rounded-md bg-[#0FFF50] px-4 py-2 font-medium text-black hover:bg-opacity-90"
                        onClick={joinTournament}
                      >
                        JoinTournament
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
    </div>
  )
}

