import { FiAward, FiCalendar, FiUsers } from "react-icons/fi";
import { Tournament } from "../../../types/tournament";
import { formatDate } from "../../utils/constant/date-formater";
import { Frown } from "lucide-react";
import { cn } from "../../utils/constant/cn";

interface TournamentHeaderProps {
    tournament: Tournament | undefined | null,
    className?: string

}
export const TournamentHeader: React.FC<TournamentHeaderProps> = ({className, tournament }) => {
    return (
    <div className={cn(className,'relative  px-4 py-8 sm:px-6 lg:px-8 rounded-lg')}>
        <div className="relative mx-auto max-w-7xl">
          <div className="md:flex md:items-center md:justify-between">
            {tournament ? (
                <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight pb-5">
                  {tournament.title}
                </h2>
                <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                  <div className="mt-2 flex items-center text-sm text-blue-100">
                    <FiCalendar className="mr-1.5 h-5 w-5 flex-shrink-0" />
                    {formatDate(tournament.startTime)}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-blue-100">
                    <FiUsers className="mr-1.5 h-5 w-5 flex-shrink-0" />
                    {tournament.maxParticipants} Participants
                  </div>
                  <div className="mt-2 flex items-center text-sm text-blue-100">
                    <FiAward className="mr-1.5 h-5 w-5 flex-shrink-0" />
                    {tournament.isTeams ? "Teams" : "Individual"}
                  </div>
                </div>
              </div>
            ) : ( 
              <div className="w-full text-center py-10">
                <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                  <Frown className="w-8 h-8 text-white" />
                  <span>Tournament Not Found</span>
                </h2>
                <p className="text-blue-200">
                  The requested tournament does not exist or has been deleted.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}