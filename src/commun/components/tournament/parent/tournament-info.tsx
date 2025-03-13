import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiActivity, FiInfo, FiList, FiUsers } from "react-icons/fi"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useTournamentStore } from "../../../../core/store/tournament-store"
import { Tournament } from "../../../../types/tournament"
import { useMatchStore } from "../../../../core/store/match-store"
import { useRoundStore } from "../../../../core/store/round-store"
import { RoundRobinTable } from "../../round/RoundRobinTable"
import { MatchCard } from "../../match/matchCard"
import { TournamentDetails } from "../tournament-details"
import { OrganizationCard } from "../../organization/organization-card"
import { MdOutlineGroupAdd } from "react-icons/md"
import { Organization } from "../../../../types/organozation"
import { useOrganizationStore } from "../../../../modules/client/store/organization-store"
import { TournamentHeader } from "../tournament-bar"
import { FormButton } from "../../ui/button/Button"
import MatchForm from "../../match/generate-matches"
import { useAuthStore } from "../../../../modules/auth/store/auth-store"
import { DeleteModel } from "../../ui/model/delete"
import { Participant } from "../../../../types/participant"




const tabs = [
  { id: "overview", label: "Overview", icon: FiInfo },
  { id: "table", label: "Table", icon: FiList },
  { id: "matches", label: "Matches", icon: FiActivity },
  { id:"participants", label: "Participants", icon: FiUsers },
  { id:"join", label: "Join Tournament", icon:  MdOutlineGroupAdd},
]

const url = import.meta.env.VITE_API_URL;
export default function Info() {
  const [activeTab, setActiveTab] = useState("overview")
  const [tournament, setTournament] = useState<Tournament | undefined | null>();
  const [ isOwner , setIsOwner] = useState<boolean>(false);
  const [ selectedOrganization, setSelectedOrganization ] = useState<Organization>();
  const [ showModal, setShowModal ] = useState<boolean>(false);
  const [ showDeleteParticipant, setShowDeleteParticipant] = useState<boolean>(false)
  const [ selectedDeleteParticpant, setSelectedDeleteParticpant] = useState<Participant>()
  const [searchQuery, setSearchQuery] = useState("")
  const [showMatchForm, setShowMatchForm] = useState<boolean>(false);
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const {  getTournamentById, participateToTournament, deleteParticipantFromTournament } = useTournamentStore();
  const {isLoading, matches, fetchTournamentMatches } = useMatchStore();
  const { rounds , fetchTournamentRounds } = useRoundStore();
  const { organizations , fetchOwnOrganization } = useOrganizationStore();
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const path = useLocation().pathname;

  
  const filtredMatches = matches.filter((match) => { 
    return match.participant1.tournament.tournamentId === tournamentId
  });

  useEffect(() => {
    setIsOwner(authUser?.id === tournament?.user.id);
  }, [authUser, tournament?.user.id]);
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
    if(path.startsWith("a/")){
      navigate(`/a/organizations/${organization.organizationId}`);
    } else{
      navigate(`/c/organizations/${organization.organizationId}`);
    }
  }

  const joinTournament = async () => {
    if(!tournament) return
    if(selectedOrganization){
      await participateToTournament({tournament: tournamentId!, organization: selectedOrganization.organizationId!});
      setShowModal(false);
    } 
  }


  const showJoinTournamentModel = () => {
    setShowModal(true);
    fetchOwnOrganization();
  }
  const cancelGenerateMatches =() =>{
    setShowMatchForm(false)
  }
  const filteredOrganizations = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const deleteParticipantModel = (participant: Participant) => {
    setShowDeleteParticipant(true)
    setSelectedDeleteParticpant(participant)
  }
  const cancelDeleteParticipant = () =>{
    setShowDeleteParticipant(false)
    setSelectedDeleteParticpant(undefined)
  }
  const confirmDeleteParticipant = async() => {
    if(!selectedDeleteParticpant) return
    await deleteParticipantFromTournament(selectedDeleteParticpant.participantId)
    setShowDeleteParticipant(false)
    setSelectedDeleteParticpant(undefined)
  }
  return (
    <div className="min-h-screen ">
      {/* Tournament Header */}
      <TournamentHeader tournament={tournament}/>

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
                  <h3 className="text-lg font-medium text-white">The Creator Of tournament</h3>
                  <div className="mt-4 space-y-4">
                      <div className="mb-4 flex items-center space-x-3 rounded-md  p-3">
                      <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                        <img
                          src={url + tournament.user.profileImage || "/placeholder.svg?height=40&width=40"}
                          alt={tournament.user.username}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{tournament.user.fullName.firstName + " " + tournament.user.fullName.lastName}</div>
                        <div className="text-xs text-gray-500">{tournament.user.email}</div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tournament Info */}
                <TournamentDetails  tournament={tournament} />
              </div>
            )}

            {tournament &&  activeTab === "table" && (
              <RoundRobinTable rounds={rounds} />
            )}

            {tournament &&  activeTab === "join" && (
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-lg bg-gray-800 shadow p-6 flex flex-col items-center justify-center"
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
              {isOwner ? (
                  tournament.participants.map((participant, index) => (
                    <OrganizationCard
                      onView={handleViewOrganization}
                      key={index}
                      organization={participant.organization}
                      onRefuse={() => deleteParticipantModel(participant)}
                    />
                  ))
                ) : (
                  tournament.participants.map((participant, index) => (
                    <OrganizationCard
                      onView={handleViewOrganization}
                      key={index}
                      organization={participant.organization}
                    />
                  ))
              )}

                  {isOwner && showDeleteParticipant && selectedDeleteParticpant &&
                  <DeleteModel  
                  textButton="Delete Participant" 
                  name={selectedDeleteParticpant.organization.name}
                  cancelDelete={cancelDeleteParticipant}
                  confirmDelete={confirmDeleteParticipant}
                  />
                  }
              </div>
            )}

            {tournament &&  activeTab === "matches" && (
              <div className="space-y-6">
                {filtredMatches.length > 0 ? (
                  filtredMatches.map((match,index) => (
                    <MatchCard key={index} match={match} />
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
                      {
                        isOwner &&
                      <FormButton loading={isLoading} onClick={() => setShowMatchForm(true)} > Generate matches automatically</FormButton>
                      }
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
             {/*generate matches Modal */}
            {showMatchForm && tournamentId && (
              <MatchForm tournamentId={tournamentId} onCancel={cancelGenerateMatches} />
            )}

       {/* Add Member Modal */}
            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-lg">
                  <h2 className="mb-4 text-lg font-semibold">Shoose The Organization</h2>
      
                  {!selectedOrganization ? (
                    <>
                      <div className="mb-4 flex">
                        <input
                          type="text"
                          placeholder="Search users by name or email"
                          className="w-full rounded-md border border-black px-3 py-2"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
      
                      <div className="max-h-60 overflow-y-auto rounded-md border">
                        {filteredOrganizations.length > 0 ? (
                          <ul className="divide-y">
                            {filteredOrganizations.map((organization, index) => (
                              
                              <li
                                key={index}
                                className="flex cursor-pointer items-center p-3 hover:bg-gray-900"
                                onClick={() => setSelectedOrganization(organization)}
                              >
                                <div className="mr-3 h-8 w-8 overflow-hidden rounded-full bg-gray-600">
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
                            <p className="text-sm font-medium text-gray-300">No organization found</p>
                            <p className="text-xs text-gray-400">Try a different search term</p>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-4 flex items-center space-x-3 rounded-md border p-3">
                        <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-800">
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
                          className=" text-white ml-auto text-sm cursor-pointer hover:text-blue-800"
                          onClick={() => setSelectedOrganization(undefined)}
                        >
                          Change
                        </button>
                      </div>
                    </>
                  )}
      
                  <div className="mt-4 flex justify-end space-x-3">
                    <button
                      className="rounded-md border px-4 py-2 hover:bg-gray-50 hover:text-black duration-300"
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
                        className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-opacity-90"
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

