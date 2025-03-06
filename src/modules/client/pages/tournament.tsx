"use client"

import { useState } from "react"
import { Plus, Search, Filter, ChevronDown } from "lucide-react"
import { TournamentCard } from "../components/TournamentCard"
import { Button } from "../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

import { Input } from "../components/ui/input"
import { TournamentStatus } from "../../../types/tournament"
import { mockTournaments } from "./data"

export default function TournamentsManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<TournamentStatus | "All">("All")

  // Filter tournaments based on search query and status
  const filteredTournaments = mockTournaments.filter((tournament) => {
    const matchesSearch =
      tournament.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tournament.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "All" || tournament.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
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
      {filteredTournaments.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTournaments.map((tournament) => (
            <TournamentCard key={tournament.tournamentId} tournament={tournament} />
          ))}
        </div>
      ) : (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
          <p className="text-lg font-medium text-gray-500">No tournaments found</p>
          <p className="text-sm text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

