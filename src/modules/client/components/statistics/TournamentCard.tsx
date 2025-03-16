import type React from "react"
import { format, parseISO } from "date-fns"
import { FiUsers } from "react-icons/fi"
import { BsPeopleFill } from "react-icons/bs"
import { GiTrophyCup } from "react-icons/gi"
import { Tournament, TournamentStatus } from "../../../../types/tournament"

// Define tournament status colors
const TOURNAMENT_STATUS_COLORS = {
  NotStarted: "#3b82f6", // blue
  OnGoing: "#10b981", // green
  Completed: "#8b5cf6", // purple
  Cancelled: "#ef4444", // red
}

interface TournamentCardProps {
  tournament: Tournament
}

export const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "MMM dd, yyyy")
  }

  const getStatusColor = (status: TournamentStatus) => {
    return TOURNAMENT_STATUS_COLORS[status] || "#6b7280"
  }

  return (
    <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center mr-3">
          <GiTrophyCup className="text-blue-400" />
        </div>
        <div>
          <h4 className="text-white font-medium">{tournament.title}</h4>
          <div className="flex items-center mt-1">
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${getStatusColor(tournament.status)}20`,
                color: getStatusColor(tournament.status),
              }}
            >
              {tournament.status}
            </span>
            <span className="text-xs text-gray-400 ml-2">{formatDate(tournament.startTime)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between text-sm">
        <div className="flex items-center text-gray-400">
          <FiUsers className="mr-1" />
          <span>
            {tournament.participants.length}/{tournament.maxParticipants} Teams
          </span>
        </div>
        <div className="flex items-center text-gray-400">
          <BsPeopleFill className="mr-1" />
          <span>{tournament.isTeams ? "Team Tournament" : "Individual Tournament"}</span>
        </div>
      </div>
    </div>
  )
}

