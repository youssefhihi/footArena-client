import { Calendar, Users, Trophy } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Tournament, TournamentStatus } from "../../../types/tournament"

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

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-40 w-full overflow-hidden bg-gray-200">
        <img
          src={tournament.image || "/placeholder.svg?height=160&width=320"}
          alt={tournament.title}
          className="h-full w-full object-cover"
        />
        <Badge className={`absolute right-2 top-2 ${getStatusColor(tournament.status)}`}>{tournament.status}</Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1">{tournament.title}</CardTitle>
        <CardDescription className="line-clamp-2">{tournament.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-500">
            <Calendar className="mr-2 h-4 w-4" />
            {formatDate(tournament.startTime)}
          </div>
          <div className="flex items-center text-gray-500">
            <Users className="mr-2 h-4 w-4" />
            {tournament.participants.length} / {tournament.maxParticipants} Participants
          </div>
          <div className="flex items-center text-gray-500">
            <Trophy className="mr-2 h-4 w-4" />
            {tournament.isTeams ? "Team Tournament" : "Individual Tournament"}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">View Details</button>
        {tournament.status === TournamentStatus.NotStarted && (
          <button className="text-sm font-medium text-green-600 hover:text-green-800">Edit Tournament</button>
        )}
      </CardFooter>
    </Card>
  )
}

