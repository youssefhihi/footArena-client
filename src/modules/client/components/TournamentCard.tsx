
import { Tournament, TournamentStatus } from "../../../types/tournament"
import { motion } from "framer-motion"
import { Button } from "../../../commun/components/tournament/Button"
import { BsFillTrophyFill } from "react-icons/bs"
import { FiCalendar, FiEdit2, FiEye, FiTrash2, FiUsers } from "react-icons/fi"
import { GiSoccerBall } from "react-icons/gi"
interface TournamentCardProps {
  tournament: Tournament
}

export function TournamentCard({ tournament }: TournamentCardProps) {
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Get status badge color
  const getStatusColor = (status: TournamentStatus) => {
    switch (status) {
      case TournamentStatus.NotStarted:
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case TournamentStatus.OnGoing:
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case TournamentStatus.Completed:
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case TournamentStatus.Cancelled:
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }
  const on = () => {}
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
                <span>{tournament.participants.length} / {tournament.maxParticipants} Participants</span>
              </div>
    
              <div className="flex items-center text-sm text-gray-400">
                <BsFillTrophyFill className="mr-2 h-4 w-4" />
                <span> {tournament.isTeams ? "Team Tournament" : "Individual Tournament"}</span>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <Button onClick={() => on()} icon={FiEye} variant="secondary">
                View
              </Button>
              <Button onClick={() => on()} icon={FiEdit2} variant="primary">
                Edit
              </Button>
              <Button onClick={() => on()} icon={FiTrash2} variant="danger">
                Delete
              </Button>
            </div>
          </div>
        </motion.div>
  )
}

