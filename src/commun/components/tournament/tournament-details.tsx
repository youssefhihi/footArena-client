import { FiUsers } from "react-icons/fi";
import { GiSoccerBall } from "react-icons/gi";
import { Tournament } from "../../../types/tournament";
import { cn } from "../../utils/constant/cn";

interface TournamentDetailsProps {
    tournament: Tournament,
    className?: string
}
export const TournamentDetails: React.FC<TournamentDetailsProps> = ({className, tournament }) => {
    return (
      <div className={cn('bg-gray-800 rounded-lg  p-6', className)}>
        <h3 className="text-lg font-medium text-white">Tournament Information</h3>
        <div className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className={'rounded-md  p-4 bg-gray-700'}>
              <div className="flex items-center">
                <FiUsers className="h-5 w-5 text-blue-400" />
                <span className="ml-2 text-sm text-gray-300">Participants</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-white">{tournament.maxParticipants}</p>
            </div>
            <div className={cn('rounded-md  p-4 bg-gray-700')}>
              <div className="flex items-center">
                <GiSoccerBall className="h-5 w-5 text-blue-400" />
                <span className="ml-2 text-sm text-gray-300">Type</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-white">
                {tournament.isTeams ? "Teams" : "Individual"}
              </p>
            </div>
          </div>
          {tournament.description && (
            // Using an article tag with Tailwind's typography classes for a refined article style.
            <article
              className="prose prose-invert max-w-none"
              // Be sure the HTML content is sanitized to avoid XSS attacks.
              dangerouslySetInnerHTML={{ __html: tournament.description }}
            />
          )}
        </div>
      </div>
    );
  };
  