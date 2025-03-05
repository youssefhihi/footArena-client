import type React from "react"
import { motion } from "framer-motion"
import { FiCalendar, FiUsers, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi"
import { GiSoccerBall } from "react-icons/gi"
import { BsFillTrophyFill } from "react-icons/bs"
import { Button } from "./Button"
import { Tournament, TournamentStatus } from "../../../../../types/tournament"

interface TournamentCardProps {
  tournament: Tournament
  onView: (tournament: Tournament) => void
  onEdit: (tournament: Tournament) => void
  onDelete: (tournament: Tournament) => void
}

export const TournamentCard: React.FC<TournamentCardProps> = ({ tournament, onView, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const getStatusColor = (status: TournamentStatus) => {
    switch (status) {
      case TournamentStatus.OnGoing:
        return "bg-green-500/20 text-green-400 animate-pulse"
      case TournamentStatus.NotStarted:
        return "bg-blue-100/20 text-blue-400"
      case TournamentStatus.Completed:
        return "bg-gray-500/20 text-gray-400"
      case TournamentStatus.Cancelled:
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-xl bg-gray-800 shadow-lg"
    >
      <div className="relative h-32 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="absolute inset-0 flex items-center justify-center">
          <GiSoccerBall className="h-16 w-16 text-white/30" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/80 to-transparent p-4">
          <h3 className="text-lg font-bold text-white">{tournament.title}</h3>
          <div className="flex items-center space-x-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(tournament.status)}`}>
              {tournament.status}
            </span>
            <span className="text-xs text-gray-300">{tournament.isTeams}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-400">
            <FiCalendar className="mr-2 h-4 w-4" />
            <span>
              {formatDate(tournament.startTime)}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-400">
            <FiUsers className="mr-2 h-4 w-4" />
            <span>{tournament.participants.length} Participants</span>
          </div>

          <div className="flex items-center text-sm text-gray-400">
            <BsFillTrophyFill className="mr-2 h-4 w-4" />
            <span>{tournament.maxParticipants}</span>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          <Button onClick={() => onView(tournament)} icon={FiEye} variant="secondary">
            View
          </Button>
          <Button onClick={() => onEdit(tournament)} icon={FiEdit2} variant="primary">
            Edit
          </Button>
          <Button onClick={() => onDelete(tournament)} icon={FiTrash2} variant="danger">
            Delete
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

