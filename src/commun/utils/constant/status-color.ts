import { TournamentStatus } from "../../../types/tournament"

export const getStatusColor = (status: TournamentStatus) => {
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