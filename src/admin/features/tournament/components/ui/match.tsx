import { GiWhistle } from "react-icons/gi";
import { Match } from "../../../../../types/Match";
import {motion} from "framer-motion"
import { FiMessageSquare } from "react-icons/fi";
import { formatDate } from "../../../../../lib/utils/constants/date-formater";

interface MatchProps {
    match: Match
}
export const MatchCard: React.FC<MatchProps> = ({ match }) => {
    return(
                  <motion.div
                    key={match.matchId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="overflow-hidden rounded-lg bg-gray-800 shadow"
                  >
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-1 items-center justify-end">
                          <span className="text-lg font-medium text-white">{match.participant1.organization.name}</span>
                          <img
                            src={match.participant1.organization.logo || "/placeholder.svg"}
                            alt={match.participant1.organization.name}
                            className="ml-4 h-10 w-10 rounded-full"
                          />
                        </div>
                        <div className="mx-8 flex items-center space-x-4">
                          <span className="text-2xl font-bold text-white">{match.matchResult.Participant1}</span>
                          <span className="text-xl text-gray-400">-</span>
                          <span className="text-2xl font-bold text-white">{match.matchResult.Participant2}</span>
                        </div>
                        <div className="flex flex-1 items-center">
                          <img
                            src={match.participant2.organization.logo || "/placeholder.svg"}
                            alt={match.participant2.organization.name}
                            className="mr-4 h-10 w-10 rounded-full"
                          />
                          <span className="text-lg font-medium text-white">{match.participant2.organization.name}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <GiWhistle className="mr-1.5 h-4 w-4" />
                            <span>{formatDate(match.matchTime)}</span>
                          </div>
                          <div className="flex items-center">
                            <FiMessageSquare className="mr-1.5 h-4 w-4" />
                            <span>{match.comments}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <span className="mr-1 rounded-sm bg-yellow-400 px-1.5 py-0.5 text-xs font-medium text-yellow-800">
                              {match.MatchCarts.participant1.yellow}
                            </span>
                            <span className="rounded-sm bg-red-400 px-1.5 py-0.5 text-xs font-medium text-red-800">
                              {match.MatchCarts.participant1.red}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="mr-1 rounded-sm bg-yellow-400 px-1.5 py-0.5 text-xs font-medium text-yellow-800">
                              {match.MatchCarts.participant2.yellow}
                            </span>
                            <span className="rounded-sm bg-red-400 px-1.5 py-0.5 text-xs font-medium text-red-800">
                              {match.MatchCarts.participant2.red}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
               
    );
}