import { Avatar, AvatarFallback, AvatarImage } from "../../../modules/client/components/ui/avatar";
import { Round } from "../../../types/Round";

interface RoundRobinProps {
  rounds: Round[];

}
const url = import.meta.env.VITE_API_URL
export const RoundRobinTable: React.FC<RoundRobinProps> = ({ rounds }) => {
    return (
        <div className="rounded-lg bg-gray-800">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                          Team
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                          MP
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                          W
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                          D
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                          L
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                          GF
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                          Points
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {rounds.map((round) => (
                        <tr key={round.roundRobinId} className="hover:bg-gray-700">
                          <td className="whitespace-nowrap px-6 py-4 flex">
                            <Avatar className="flex items-center">
                              <AvatarImage
                                src={url + round.participant.organization.logo || "/placeholder.svg"}
                                alt={round.participant.organization.name}
                                className="h-36 w-36 rounded-full"
                              />
                            <AvatarFallback className="bg-gray-200">{round.participant.organization.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className="ml-4 text-white">{round.participant.organization.name}</p>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-white">
                            {round.wins + round.draws + round.losses}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-white">{round.wins}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-white">{round.draws}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-white">{round.losses}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-white">{round.goals}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-white">{round.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
    )
}