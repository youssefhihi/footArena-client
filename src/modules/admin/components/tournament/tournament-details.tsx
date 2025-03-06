import { FiUsers } from "react-icons/fi";
import { GiSoccerBall } from "react-icons/gi";
import { Tournament } from "../../../../types/tournament";

interface TournamentDetailsProps {
    tournament: Tournament
}
export const TournamentDetails: React.FC<TournamentDetailsProps> = ({ tournament }) => {
    return (
      <div className="rounded-lg bg-gray-800 p-6">
        <h3 className="text-lg font-medium text-white">Tournament Information</h3>
        <div className="mt-4 space-y-4">
          {tournament.description && (
            // Using an article tag with Tailwind's typography classes for a refined article style.
            <article
              className="prose prose-invert max-w-none"
              // Be sure the HTML content is sanitized to avoid XSS attacks.
              dangerouslySetInnerHTML={{ __html: tournament.description }}
            />
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-md bg-gray-700 p-4">
              <div className="flex items-center">
                <FiUsers className="h-5 w-5 text-blue-400" />
                <span className="ml-2 text-sm text-gray-300">Participants</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-white">{tournament.maxParticipants}</p>
            </div>
            <div className="rounded-md bg-gray-700 p-4">
              <div className="flex items-center">
                <GiSoccerBall className="h-5 w-5 text-blue-400" />
                <span className="ml-2 text-sm text-gray-300">Type</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-white">
                {tournament.isTeams ? "Teams" : "Individual"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  