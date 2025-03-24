import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import {
  FiFilter,
  FiSearch,
  FiTrash2,
  FiEye,
  FiEdit,
  FiRefreshCw,
  FiX,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiAlertTriangle,
  FiUsers,
  FiUser,
} from "react-icons/fi"
import { GiSoccerBall, GiWhistle } from "react-icons/gi"
import { BsPersonFill, BsPeopleFill } from "react-icons/bs"
import { useTournamentStore } from "../../../../core/store/tournament-store"
import { Tournament, TournamentStatus } from "../../../../types/tournament"
import { getStatusColor } from "../../../../commun/utils/constant/status-color"
import { useNavigate } from "react-router-dom"

const url = import.meta.env.VITE_API_URL
export default function AllTournaments() {
  // Store access
  const {
    allTournaments,
    isLoading,
    getAllTournaments,
    softDeleteTournament,
    restoreTournament,
    forceDeleteTournament,
    updateTournamentStatus,
  } = useTournamentStore()

  // State for UI
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showDeletedOnly, setShowDeletedOnly] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [teamFilter, setTeamFilter] = useState<string>("all")
  const [creatorFilter, setCreatorFilter] = useState<string>("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false)
  const [isForceDeleteModalOpen, setIsForceDeleteModalOpen] = useState(false)
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const [newStatus, setNewStatus] = useState<TournamentStatus>(TournamentStatus.NotStarted)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const navigate = useNavigate();
  // Fetch tournaments on component mount
  useEffect(() => {
    getAllTournaments()
  }, [getAllTournaments])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, showDeletedOnly, statusFilter, teamFilter, creatorFilter])

  // Get unique creators for filter dropdown
  const uniqueCreators = useMemo(() => {
    const creators = allTournaments.map((tournament) => tournament.user)
    return Array.from(new Map(creators.map((creator) => [creator.id, creator])).values())
  }, [allTournaments])

  // Apply filters to tournaments
  const filteredTournaments = useMemo(() => {
    return allTournaments.filter((tournament) => {
      // Filter by search term
      const matchesSearch =
        tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tournament.description.toLowerCase().includes(searchTerm.toLowerCase())

      // Filter by deleted status
      const matchesDeletedFilter = showDeletedOnly ? tournament.deletedAt !== null : tournament.deletedAt === null

      // Filter by tournament status
      const matchesStatusFilter = statusFilter === "all" || tournament.status === statusFilter

      // Filter by team/individual
      const matchesTeamFilter =
        teamFilter === "all" || (teamFilter === "team" ? tournament.isTeams : !tournament.isTeams)

      // Filter by creator
      const matchesCreatorFilter = creatorFilter === "" || tournament.user.id === creatorFilter

      return matchesSearch && matchesDeletedFilter && matchesStatusFilter && matchesTeamFilter && matchesCreatorFilter
    })
  }, [allTournaments, searchTerm, showDeletedOnly, statusFilter, teamFilter, creatorFilter])

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredTournaments.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredTournaments.length / itemsPerPage)

  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy")
  }

  // Format time
  const formatTime = (dateString: string) => {
    return format(new Date(dateString), "h:mm a")
  }

  // Handle tournament deletion
  const handleDelete = async (tournament: Tournament) => {
    setSelectedTournament(tournament)
    setIsDeleteModalOpen(true)
  }

  // Confirm tournament deletion
  const confirmDelete = async () => {
    if (selectedTournament) {
      await softDeleteTournament(selectedTournament.tournamentId)
      setIsDeleteModalOpen(false)
      getAllTournaments()
    }
  }

  // Handle tournament restoration
  const handleRestore = async (tournament: Tournament) => {
    setSelectedTournament(tournament)
    setIsRestoreModalOpen(true)
  }

  // Confirm tournament restoration
  const confirmRestore = async () => {
    if (selectedTournament) {
      await restoreTournament(selectedTournament.tournamentId)
      setIsRestoreModalOpen(false)
      getAllTournaments()
    }
  }

  // Handle force delete
  const handleForceDelete = async (tournament: Tournament) => {
    setSelectedTournament(tournament)
    setIsForceDeleteModalOpen(true)
  }

  // Confirm force delete
  const confirmForceDelete = async () => {
    if (selectedTournament) {
      await forceDeleteTournament(selectedTournament.tournamentId)
      setIsForceDeleteModalOpen(false)
      getAllTournaments()
    }
  }

  // Handle status update
  const handleStatusUpdate = (tournament: Tournament) => {
    setSelectedTournament(tournament)
    setNewStatus(tournament.status)
    setIsStatusModalOpen(true)
  }

  // Confirm status update
  const confirmStatusUpdate = async () => {
    if (selectedTournament) {
      await updateTournamentStatus(selectedTournament.tournamentId, newStatus)
      setIsStatusModalOpen(false)
      getAllTournaments()
    }
  }

  // Handle view details
  const handleViewDetails = (tournament: Tournament) => {
    navigate(`/a/tournaments/${tournament.tournamentId}`)
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <h2 className="text-2xl font-bold">All Tournaments</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowDeletedOnly(!showDeletedOnly)}
            className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              showDeletedOnly
                ? "bg-amber-600 text-white hover:bg-amber-700"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            {showDeletedOnly ? (
              <>
                <FiRefreshCw className="mr-2 h-4 w-4" />
                Showing Deleted
              </>
            ) : (
              <>
                <FiTrash2 className="mr-2 h-4 w-4" />
                Show Deleted
              </>
            )}
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col space-y-4 rounded-xl bg-gray-800 p-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border-gray-600 bg-gray-700 p-2.5 pl-10 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search tournaments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex space-x-2">
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center rounded-lg bg-gray-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-600"
            >
              <FiFilter className="mr-2" />
              Filter
              <FiChevronDown className="ml-2" />
            </button>

            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-gray-700 p-4 shadow-lg"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Status</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-600 bg-gray-600 py-2 pl-3 pr-10 text-white focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      <option value={TournamentStatus.NotStarted}>Not Started</option>
                      <option value={TournamentStatus.OnGoing}>Ongoing</option>
                      <option value={TournamentStatus.Completed}>Completed</option>
                      <option value={TournamentStatus.Cancelled}>Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300">Tournament Type</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-600 bg-gray-600 py-2 pl-3 pr-10 text-white focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      value={teamFilter}
                      onChange={(e) => setTeamFilter(e.target.value)}
                    >
                      <option value="all">All Types</option>
                      <option value="team">Team Tournaments</option>
                      <option value="individual">Individual Tournaments</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300">Creator</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-600 bg-gray-600 py-2 pl-3 pr-10 text-white focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      value={creatorFilter}
                      onChange={(e) => setCreatorFilter(e.target.value)}
                    >
                      <option value="">All Creators</option>
                      {uniqueCreators.map((creator) => (
                        <option key={creator.id} value={creator.id}>
                          {creator.username} ({creator.fullName.firstName} {creator.fullName.lastName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setStatusFilter("all")
                        setTeamFilter("all")
                        setCreatorFilter("")
                        setIsFilterOpen(false)
                      }}
                      className="rounded-md bg-gray-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-500"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Tournaments Table */}
      <div className="overflow-x-auto rounded-xl bg-gray-800 shadow-md">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-gray-700 text-xs uppercase text-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">
                Tournament
              </th>
              <th scope="col" className="px-6 py-3">
                Creator
              </th>
              <th scope="col" className="px-6 py-3">
                Participants
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Created
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // Loading state
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse border-b border-gray-700">
                  <td className="px-6 py-4">
                    <div className="h-4 w-3/4 rounded bg-gray-600"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-1/2 rounded bg-gray-600"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-1/4 rounded bg-gray-600"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-1/2 rounded bg-gray-600"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-1/4 rounded bg-gray-600"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-1/2 rounded bg-gray-600"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-3/4 rounded bg-gray-600"></div>
                  </td>
                </tr>
              ))
            ) : currentItems.length > 0 ? (
              // Tournament data
              currentItems.map((tournament) => (
                <motion.tr
                  key={tournament.tournamentId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`border-b border-gray-700 hover:bg-gray-700 ${
                    tournament.deletedAt ? "bg-red-900/10" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-gray-700">
                        {tournament.image ? (
                          <img
                            src={tournament.image || "/placeholder.svg"}
                            alt={tournament.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <GiSoccerBall className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-white">{tournament.title}</div>
                        
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-blue-900/30">
                        {tournament.user.profileImage ? (
                          <img
                            src={url + tournament.user.profileImage || "/placeholder.svg"}
                            alt={tournament.user.username}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <FiUser className="h-4 w-4 text-blue-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-white">{tournament.user.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="mr-2 text-sm font-medium">
                        {tournament.participants.length}/{tournament.maxParticipants}
                      </span>
                      <div className="h-2 w-16 overflow-hidden rounded-full bg-gray-600">
                        <div
                          className="h-full bg-blue-500"
                          style={{
                            width: `${(tournament.participants.length / tournament.maxParticipants) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(tournament.status)}`}
                    >
                      {tournament.status}
                    </span>
                    {tournament.deletedAt && (
                      <span className="ml-2 rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-medium text-red-400">
                        Deleted
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center">
                      {tournament.isTeams ? (
                        <>
                          <BsPeopleFill className="mr-1.5 text-blue-400" />
                          <span>Team</span>
                        </>
                      ) : (
                        <>
                          <BsPersonFill className="mr-1.5 text-purple-400" />
                          <span>Individual</span>
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{formatDate(tournament.createdAt)}</div>
                    <div className="text-xs text-gray-400">{formatTime(tournament.createdAt)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(tournament)}
                        className="rounded p-1.5 text-blue-400 hover:bg-blue-900/30"
                        title="View Details"
                      >
                        <FiEye size={16} />
                      </button>

                      {!tournament.deletedAt ? (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(tournament)}
                            className="rounded p-1.5 text-green-400 hover:bg-green-900/30"
                            title="Update Status"
                          >
                            <FiEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(tournament)}
                            className="rounded p-1.5 text-red-400 hover:bg-red-900/30"
                            title="Delete Tournament"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleRestore(tournament)}
                            className="rounded p-1.5 text-amber-400 hover:bg-amber-900/30"
                            title="Restore Tournament"
                          >
                            <FiRefreshCw size={16} />
                          </button>
                          <button
                            onClick={() => handleForceDelete(tournament)}
                            className="rounded p-1.5 text-red-400 hover:bg-red-900/30"
                            title="Permanently Delete"
                          >
                            <FiX size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              // Empty state
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <GiSoccerBall className="mb-4 h-12 w-12 text-gray-500" />
                    <h3 className="mb-1 text-lg font-medium">No tournaments found</h3>
                    <p className="text-gray-400">
                      {showDeletedOnly
                        ? "No deleted tournaments match your filters."
                        : "Try adjusting your search or filter to find what you're looking for."}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredTournaments.length > 0 && (
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="text-sm text-gray-400">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
            <span className="font-medium">
              {indexOfLastItem > filteredTournaments.length ? filteredTournaments.length : indexOfLastItem}
            </span>{" "}
            of <span className="font-medium">{filteredTournaments.length}</span> tournaments
          </div>

          <div className="flex items-center space-x-2">
            <select
              className="rounded-md border-gray-600 bg-gray-700 py-1.5 pl-3 pr-10 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
            </select>

            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center rounded-lg bg-gray-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiChevronLeft className="mr-1" />
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center rounded-lg bg-gray-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
              <FiChevronRight className="ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedTournament && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-xl"
          >
            <div className="text-center">
              <FiTrash2 className="mx-auto mb-4 h-12 w-12 text-red-400" />
              <h3 className="mb-5 text-lg font-medium">Delete Tournament</h3>
              <p className="mb-5 text-gray-400">
                Are you sure you want to delete{" "}
                <span className="font-medium text-white">{selectedTournament.title}</span>? This will soft-delete the
                tournament and it can be restored later.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="rounded-lg border border-gray-600 bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Restore Confirmation Modal */}
      {isRestoreModalOpen && selectedTournament && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-xl"
          >
            <div className="text-center">
              <FiRefreshCw className="mx-auto mb-4 h-12 w-12 text-amber-400" />
              <h3 className="mb-5 text-lg font-medium">Restore Tournament</h3>
              <p className="mb-5 text-gray-400">
                Are you sure you want to restore{" "}
                <span className="font-medium text-white">{selectedTournament.title}</span>? This will make the
                tournament active again.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setIsRestoreModalOpen(false)}
                  className="rounded-lg border border-gray-600 bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRestore}
                  className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-amber-700"
                >
                  Restore
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Force Delete Confirmation Modal */}
      {isForceDeleteModalOpen && selectedTournament && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-xl"
          >
            <div className="text-center">
              <FiAlertTriangle className="mx-auto mb-4 h-12 w-12 text-red-400" />
              <h3 className="mb-5 text-lg font-medium">Permanently Delete Tournament</h3>
              <p className="mb-5 text-gray-400">
                Are you sure you want to permanently delete{" "}
                <span className="font-medium text-white">{selectedTournament.title}</span>? This action cannot be undone
                and all tournament data will be lost forever.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setIsForceDeleteModalOpen(false)}
                  className="rounded-lg border border-gray-600 bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmForceDelete}
                  className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700"
                >
                  Permanently Delete
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Status Update Modal */}
      {isStatusModalOpen && selectedTournament && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-xl"
          >
            <div className="text-center">
              <GiWhistle className="mx-auto mb-4 h-12 w-12 text-green-400" />
              <h3 className="mb-5 text-lg font-medium">Update Tournament Status</h3>
              <p className="mb-5 text-gray-400">
                Change the status of <span className="font-medium text-white">{selectedTournament.title}</span>
              </p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300">Status</label>
                <select
                  className="mt-2 block w-full rounded-md border-gray-600 bg-gray-700 py-2 pl-3 pr-10 text-white focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as TournamentStatus)}
                >
                  <option value={TournamentStatus.NotStarted}>Not Started</option>
                  <option value={TournamentStatus.OnGoing}>Ongoing</option>
                  <option value={TournamentStatus.Completed}>Completed</option>
                  <option value={TournamentStatus.Cancelled}>Cancelled</option>
                </select>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setIsStatusModalOpen(false)}
                  className="rounded-lg border border-gray-600 bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmStatusUpdate}
                  className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700"
                >
                  Update Status
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Tournament Details Modal */}
      {isDetailsModalOpen && selectedTournament && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl rounded-lg bg-gray-800 p-6 shadow-xl"
          >
            <div className="flex justify-between">
              <h3 className="text-xl font-medium text-white">Tournament Details</h3>
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* Tournament Info */}
              <div className="space-y-4 rounded-lg bg-gray-700 p-4">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-600">
                    {selectedTournament.image ? (
                      <img
                        src={selectedTournament.image || "/placeholder.svg"}
                        alt={selectedTournament.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <GiSoccerBall className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">{selectedTournament.title}</h4>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(selectedTournament.status)}`}
                    >
                      {selectedTournament.status}
                    </span>
                    {selectedTournament.deletedAt && (
                      <span className="ml-2 rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-medium text-red-400">
                        Deleted
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h5 className="mb-1 text-sm font-medium text-gray-400">Description</h5>
                  <p className="text-sm text-white">{selectedTournament.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="mb-1 text-sm font-medium text-gray-400">Type</h5>
                    <p className="flex items-center text-sm text-white">
                      {selectedTournament.isTeams ? (
                        <>
                          <BsPeopleFill className="mr-1.5 text-blue-400" />
                          Team Tournament
                        </>
                      ) : (
                        <>
                          <BsPersonFill className="mr-1.5 text-purple-400" />
                          Individual Tournament
                        </>
                      )}
                    </p>
                  </div>
                  <div>
                    <h5 className="mb-1 text-sm font-medium text-gray-400">Max Participants</h5>
                    <p className="text-sm text-white">{selectedTournament.maxParticipants}</p>
                  </div>
                  <div>
                    <h5 className="mb-1 text-sm font-medium text-gray-400">Created At</h5>
                    <p className="text-sm text-white">{formatDate(selectedTournament.createdAt)}</p>
                  </div>
                  <div>
                    <h5 className="mb-1 text-sm font-medium text-gray-400">Start Time</h5>
                    <p className="text-sm text-white">{formatDate(selectedTournament.startTime)}</p>
                  </div>
                </div>

                <div>
                  <h5 className="mb-1 text-sm font-medium text-gray-400">Creator</h5>
                  <div className="flex items-center">
                    <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-blue-900/30">
                      {selectedTournament.user.profileImage ? (
                        <img
                          src={selectedTournament.user.profileImage || "/placeholder.svg"}
                          alt={selectedTournament.user.username}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <FiUser className="h-4 w-4 text-blue-400" />
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-white">{selectedTournament.user.username}</div>
                      <div className="text-xs text-gray-400">
                        {selectedTournament.user.fullName.firstName} {selectedTournament.user.fullName.lastName}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Participants */}
              <div className="rounded-lg bg-gray-700 p-4">
                <h4 className="mb-4 text-lg font-medium text-white">Participants</h4>

                <div className="mb-4 flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    {selectedTournament.participants.length} of {selectedTournament.maxParticipants} spots filled
                  </div>
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-600">
                    <div
                      className="h-full bg-blue-500"
                      style={{
                        width: `${(selectedTournament.participants.length / selectedTournament.maxParticipants) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {selectedTournament.participants.length > 0 ? (
                  <div className="max-h-64 overflow-y-auto">
                    <ul className="space-y-2">
                      {selectedTournament.participants.map((participant, index) => (
                        <li key={participant.participantId} className="rounded-lg bg-gray-600 p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
                                {index + 1}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-white">{participant.organization.name}</div>
                                <div className="text-xs text-gray-400">
                                  {participant.organization.isTeam ? "Team" : "Individual"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg bg-gray-600 p-8 text-center">
                    <FiUsers className="mb-2 h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-300">No participants have joined this tournament yet.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="rounded-lg border border-gray-600 bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700"
              >
                Close
              </button>

              {!selectedTournament.deletedAt ? (
                <>
                  <button
                    onClick={() => {
                      setIsDetailsModalOpen(false)
                      handleStatusUpdate(selectedTournament)
                    }}
                    className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700"
                  >
                    Update Status
                  </button>
                  <button
                    onClick={() => {
                      setIsDetailsModalOpen(false)
                      handleDelete(selectedTournament)
                    }}
                    className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsDetailsModalOpen(false)
                    handleRestore(selectedTournament)
                  }}
                  className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-amber-700"
                >
                  Restore
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

