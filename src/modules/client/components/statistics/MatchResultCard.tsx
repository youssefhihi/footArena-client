import type React from "react"
import { format, parseISO } from "date-fns"
import { GiWhistle } from "react-icons/gi"
import { Match } from "../../../../types/Match"
import { Participant } from "../../../../types/participant"

interface MatchResultCardProps {
  match: Match
  isUserMatch: boolean
}

export const MatchResultCard: React.FC<MatchResultCardProps> = ({ match }) => {
  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "MMM dd, yyyy")
  }

  const getTeamName = (participant: Participant) => {
    return participant?.organization?.name || "Unknown Team"
  }

  const getTeamLogo = (participant: Participant) => {
    return participant?.organization?.logo || "/placeholder.svg?height=40&width=40"
  }

  const getScoreClass = (score1: number, score2: number) => {
    if (score1 > score2) return "text-green-400"
    if (score1 < score2) return "text-red-400"
    return "text-gray-300"
  }

  return (
    <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">{formatDate(match.matchTime)}</span>
        <div className="flex items-center">
          <GiWhistle className="text-blue-400 mr-1" />
          <span className="text-sm text-gray-400">{format(parseISO(match.matchTime), "h:mm a")}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 w-2/5">
          <img
            src={getTeamLogo(match.participant1) || "/placeholder.svg"}
            alt={getTeamName(match.participant1)}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-white font-medium truncate">{getTeamName(match.participant1)}</span>
        </div>

        <div className="flex items-center justify-center space-x-2 w-1/5">
        {match.matchResult ? (
            <>
          <span
            className={`text-lg font-bold ${getScoreClass(match.matchResult.participant1, match.matchResult.participant2)}`}
          >
            {match.matchResult.participant1}
          </span>
          <span className="text-gray-400">-</span>
          <span
            className={`text-lg font-bold ${getScoreClass(match.matchResult.participant2, match.matchResult.participant1)}`}
          >
            {match.matchResult.participant2}
          </span>
            </>
        ):(
            <span className="text-gray-400">:</span>
        )}
        </div>

        <div className="flex items-center justify-end space-x-3 w-2/5">
          <span className="text-white font-medium truncate text-right">{getTeamName(match.participant2)}</span>
          <img
            src={getTeamLogo(match.participant2) || "/placeholder.svg"}
            alt={getTeamName(match.participant2)}
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>

      <div className="flex justify-between mt-2 text-xs">
        <div className="flex items-center">
          <span className="px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 rounded mr-1">
            {match.carts?.participant1?.yellow || 0}
          </span>
          <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded">
            {match.carts?.participant1?.red || 0}
          </span>
        </div>

        <div className="flex items-center">
          <span className="px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 rounded mr-1">
            {match.carts?.participant2?.yellow || 0}
          </span>
          <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded">
            {match.carts?.participant2?.red || 0}
          </span>
        </div>
      </div>
    </div>
  )
}

