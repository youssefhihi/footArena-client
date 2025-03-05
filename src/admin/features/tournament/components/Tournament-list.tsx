
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FiPlus, FiFilter, FiDownload, FiChevronLeft, FiChevronRight, FiTrash2 } from "react-icons/fi"
import { GiTrophy } from "react-icons/gi"
import { Tournament } from "../../../../types/tournament"
import { SearchBar } from "./ui/SearchBar"
import { Button } from "./ui/Button"
import { TournamentCard } from "./ui/TournamentCard"
import { useTournamentStore } from "../store/tournament-store"



// Tournament Management Component
export default function TournamentList() {
    const { tournaments, fetchTournaments, softDeleteTournament } = useTournamentStore();
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedTournament, setSelectedTournament] = useState<Tournament>()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
    const [filters, setFilters] = useState({
        status: "all",
        isTeams: "all",
    })

    useEffect(() => {
        fetchTournaments();
    }, [fetchTournaments]);
      
  const tournamentsPerPage = 5

  // Filter and search tournaments
  const filteredTournaments = tournaments ? tournaments.filter((tournament) => {
    const matchesSearch =
      tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tournament.participants.filter((participant) => participant.organization.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatusFilter =
      filters.status === "all" || tournament.status.toLowerCase() === filters.status.toLowerCase();
    const matchesCategoryFilter =
      filters.isTeams === "all" || tournament.isTeams.toString() === filters.isTeams;

    return matchesSearch && matchesStatusFilter && matchesCategoryFilter;
  }) : []

  // Pagination
  const indexOfLastTournament = currentPage * tournamentsPerPage
  const indexOfFirstTournament = indexOfLastTournament - tournamentsPerPage
  const currentTournaments = filteredTournaments.slice(indexOfFirstTournament, indexOfLastTournament)
  const totalPages = Math.ceil(filteredTournaments.length / tournamentsPerPage)

  // Handle tournament actions
  const handleViewTournament = (tournament: Tournament) => {
    console.log("View tournament:", tournament)
  }

  const handleEditTournament = (tournament: Tournament) => {
    console.log("Edit tournament:", tournament)
  }

  const handleDeleteTournament = (tournament: Tournament) => {
    setSelectedTournament(tournament)
    setIsDeleteModalOpen(true)
  }

  const confirmDeleteTournament = () => {
    if (selectedTournament) {
      softDeleteTournament(selectedTournament.tournamentId);
      setIsDeleteModalOpen(false);
    }
  }

  return (
    
    <>
      {/* Search and Filter Bar */}
      <div className="flex flex-col space-y-4 rounded-xl bg-gray-800 p-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search tournaments..." />

        <div className="flex space-x-2">
          <Button onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)} icon={FiFilter} variant="secondary">
            Filter
          </Button>

          <Button onClick={() => console.log("Export")} icon={FiDownload} variant="secondary">
            Export
          </Button>
        </div>
      </div>

      {/* Filter Menu */}
      {isFilterMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-gray-700 p-4 shadow-lg"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Status</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-600 py-2 pl-3 pr-10 text-white focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Category</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-600 bg-gray-600 py-2 pl-3 pr-10 text-white focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                value={filters.isTeams}
                onChange={(e) => setFilters({ ...filters, isTeams: e.target.value })}
              >
                <option value="all">All Categories</option>
                <option value="international">International</option>
                <option value="continental">Continental</option>
                <option value="national">National</option>
                <option value="club">Club</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setFilters({ status: "all", isTeams: "all" })
                  setIsFilterMenuOpen(false)
                }}
                className="rounded-md bg-gray-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-500"
              >
                Reset
              </button>
              <button
                onClick={() => setIsFilterMenuOpen(false)}
                className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tournaments Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentTournaments.map((tournament: Tournament,index: number) => (
          <TournamentCard
            key={index}
            tournament={tournament}
            onView={handleViewTournament}
            onEdit={handleEditTournament}
            onDelete={handleDeleteTournament}
          />
        ))}
      </div>

      {/* Empty State */}
      {currentTournaments.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl bg-gray-800 py-12 text-center">
          <GiTrophy size={48} className="mb-4 text-gray-500" />
          <h3 className="mb-1 text-lg font-medium">No tournaments found</h3>
          <p className="text-gray-400">Try adjusting your search or filter to find what you're looking for.</p>
          <Button onClick={() => console.log("Create new tournament")} icon={FiPlus}>
            Create Tournament
          </Button>
        </div>
      )}

      {/* Pagination */}
      {filteredTournaments.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing <span className="font-medium">{indexOfFirstTournament + 1}</span> to{" "}
            <span className="font-medium">
              {indexOfLastTournament > filteredTournaments.length ? filteredTournaments.length : indexOfLastTournament}
            </span>{" "}
            of <span className="font-medium">{filteredTournaments.length}</span> tournaments
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              icon={FiChevronLeft}
              variant="secondary"
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              icon={FiChevronRight}
              variant="secondary"
            >
              Next
            </Button>
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
                <span className="font-medium text-white">{selectedTournament.title}</span>? This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-4">
                <Button onClick={() => setIsDeleteModalOpen(false)} variant="secondary">
                  Cancel
                </Button>
                <Button onClick={confirmDeleteTournament} variant="danger">
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

