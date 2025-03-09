import {  useEffect, useState } from "react"
import { Plus, Search, Filter, ChevronDown } from "lucide-react"
import { Button } from "../../components/ui/button"
import {motion} from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"

import { Input } from "../../components/ui/input"
import { Tournament, TournamentStatus } from "../../../../types/tournament"
import { useTournamentStore } from "../../../../core/store/tournament-store"
import { TournamentCard } from "../../../admin/components/tournament/TournamentCard"
import { useNavigate } from "react-router-dom"
import { FiTrash2 } from "react-icons/fi"

export default function TournamentsManagement() {
  const [selectedTournament, setSelectedTournament] = useState<Tournament>()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<TournamentStatus | "All">("All")
  const { tournaments, isLoading, fetchTournaments,softDeleteTournament } = useTournamentStore();
  const navigate = useNavigate();
  useEffect(() => {
    fetchTournaments();
  }, [fetchTournaments])
  // Filter tournaments based on search query and status
  const filteredTournaments = tournaments.filter((tournament) => {
    const matchesSearch =
      tournament.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tournament.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "All" || tournament.status === statusFilter

    return matchesSearch && matchesStatus
  })
 const handleViewTournament = (tournament: Tournament) => {
    navigate(`/tournaments/${tournament.tournamentId}`)
  }

  const handleEditTournament = (tournament: Tournament) => {
    navigate(`/tournaments/edit/${tournament.tournamentId}`)
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">My Tournaments</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" /> Create Tournament
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search tournaments..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Status: {statusFilter}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter("All")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter(TournamentStatus.NotStarted)}>
              Not Started
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter(TournamentStatus.OnGoing)}>Ongoing</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter(TournamentStatus.Completed)}>Completed</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter(TournamentStatus.Cancelled)}>Cancelled</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tournaments Grid */}
      {isLoading ? (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
          <p className="text-lg font-medium text-gray-500">Loading tournaments...</p>
        </div>
      ) : filteredTournaments.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTournaments.map((tournament,index) => (
            <TournamentCard  
            key={index}
            tournament={tournament}
            onView={handleViewTournament}
            onEdit={handleEditTournament}
            onDelete={handleDeleteTournament} />
          ))}
        </div>
      ) : (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
          <p className="text-lg font-medium text-gray-500">No tournaments found</p>
          <p className="text-sm text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
    {isDeleteModalOpen && selectedTournament && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-lg bg-gray-100 p-6 shadow-xl"
        >
          <div className="text-center">
            <FiTrash2 className="mx-auto mb-4 h-12 w-12 text-red-400" />
            <h3 className="mb-5 text-lg font-medium">Delete Tournament</h3>
            <p className="mb-5 text-gray-800">
              Are you sure you want to delete{" "}
              <span className="font-medium text-red-600">{selectedTournament.title}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <Button onClick={() => setIsDeleteModalOpen(false)} variant="ghost">
                Cancel
              </Button>
              <Button onClick={confirmDeleteTournament} variant={"danger"}>
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

