import { Round } from "../../../../../types/Round"

interface RoundRobinProps {
    rounds: Round[]
}

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
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex items-center">
                              <img
                                src={round.Participant.organization.logo || "/placeholder.svg"}
                                alt={round.Participant.organization.name}
                                className="h-8 w-8 rounded-full"
                              />
                              <span className="ml-3 text-white">{round.Participant.organization.name}</span>
                            </div>
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
    );
}