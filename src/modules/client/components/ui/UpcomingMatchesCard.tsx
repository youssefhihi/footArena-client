import { Match } from "../../../../types/Match"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"

interface UpcomingMatchesCardProps {
  matches: Match[]
}

export function UpcomingMatchesCard({ matches }: UpcomingMatchesCardProps) {
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Upcoming Matches</CardTitle>
        <CardDescription>Your scheduled matches</CardDescription>
      </CardHeader>
      <CardContent>
        {matches.length > 0 ? (
          <div className="space-y-4">
            {matches.map((match) => (
              <div key={match.matchId} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex flex-1 items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Avatar className="h-12 w-12">
                      <AvatarImage imageUrl={match.participant1.organization.logo || " "} alt={match.participant1.organization.name} />
                      <AvatarFallback className="bg-gray-200">{match.participant1.organization.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{match.participant1.organization.name}</p>
                  </div>
                </div>

                <div className="mx-4 text-center">
                  <div className="text-sm font-medium">VS</div>
                  <div className="mt-1 text-xs text-gray-500">{formatDate(match.matchTime)}</div>
                </div>

                <div className="flex flex-1 items-center justify-end space-x-4">
                  <div className="min-w-0 flex-1 text-right">
                    <p className="truncate font-medium">{match.participant2.organization.name}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <Avatar className="h-12 w-12">
                      <AvatarImage imageUrl={match.participant2.organization.logo || " "} alt={match.participant2.organization.name} />
                      <AvatarFallback className="bg-gray-200">{match.participant2.organization.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-4 text-center">
            <p className="text-sm font-medium text-gray-500">No upcoming matches</p>
            <p className="text-xs text-gray-400">Join tournaments to get matched with opponents</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

