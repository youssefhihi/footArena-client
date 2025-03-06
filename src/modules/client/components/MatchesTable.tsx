import { Match } from "../../../types/Match"
import { Card } from "./ui/card"


interface MatchesTableProps {
  matches: Match[]
  showResults?: boolean
}

export function MatchesTable({ matches, showResults = false }: MatchesTableProps) {
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
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              <th className="whitespace-nowrap px-6 py-3">Participants</th>
              <th className="whitespace-nowrap px-6 py-3">Date & Time</th>
              {showResults && <th className="whitespace-nowrap px-6 py-3">Result</th>}
              <th className="whitespace-nowrap px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {matches.length > 0 ? (
              matches.map((match) => (
                <tr key={match.matchId} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <span className="font-medium">{match.participant1.organization.name}</span>
                      <span className="mx-2 text-gray-500">vs</span>
                      <span className="font-medium">{match.participant2.organization.name}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{formatDate(match.matchTime)}</td>
                  {showResults && (
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-center font-medium">
                        {match.matchResult.Participant1} - {match.matchResult.Participant2}
                      </div>
                    </td>
                  )}
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <button className="mr-2 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100">
                      Details
                    </button>
                    {!showResults && (
                      <button className="rounded-md bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 hover:bg-green-100">
                        Prepare
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={showResults ? 4 : 3} className="px-6 py-8 text-center text-sm text-gray-500">
                  No matches found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

