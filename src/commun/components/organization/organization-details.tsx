import { Edit } from "lucide-react"
import { Organization } from "../../../types/organozation"
import { Avatar, AvatarFallback, AvatarImage } from "../../../modules/client/components/ui/avatar";
import { Link } from "react-router-dom";

interface OrganizationDetailsProps {
  organization: Organization,
  isOwner: boolean

}
export function OrganizationDetails({ organization, isOwner }: OrganizationDetailsProps) {
    return (
        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-6">
            <Avatar className="h-32 w-32 overflow-hidden rounded-full bg-gray-200">
            <AvatarImage imageUrl={organization.logo || " "} alt={organization.name} />
            <AvatarFallback className="bg-gray-200">{organization.name.charAt(0)}</AvatarFallback>
          </Avatar>
           {/* Organization Details */}
        <div className="mt-4 flex-1 space-y-4 text-center md:mt-0 md:text-left">
          <div>
            <h2 className="text-2xl font-bold text-white">{organization.name}</h2>
            <span className="mt-2 inline-block rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-400">
              {organization.isTeam ? "Team" : "Individual"}
            </span>
          </div>

          <div className="flex-1 justify-center gap-4 max-w-xl mx-auto">
            <div className="rounded-lg bg-gray-700 p-4 text-center">
              <p className="text-sm font-medium text-gray-300">Total Members</p>
              <p className="text-xl font-semibold text-white">{organization.teamMembers.length}</p>
            </div>
          </div>

          {/* Statistics */}
          <p className="text-white text-xl font-medium ">Description:</p>
          <p className="text-gray-300 text-ms pl-3">{organization.description}</p>

          { isOwner &&
            <Link
              to={`/c/organizations/edit/${organization.organizationId}`}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2 text-white transition-all duration-300 hover:bg-blue-700"
            >
              <Edit className="mr-2 h-5 w-5" />
              Edit Organization
            </Link>
          }

        </div>
      </div>
    </div>
    )
}
