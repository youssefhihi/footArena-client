import { Edit } from "lucide-react"
import { Organization } from "../../../types/organozation"
import { Avatar, AvatarFallback, AvatarImage } from "../../../modules/client/components/ui/avatar";
import { Link } from "react-router-dom";

interface OrganizationDetailsProps {
  organization: Organization,

}
const url = import.meta.env.VITE_API_URL
export function OrganizationDetails({ organization }: OrganizationDetailsProps) {
    const image = url+organization.logo ? url+organization.logo : "";
    return (
        <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center space-y-4 md:flex-row md:items-start md:space-x-6 md:space-y-0">
            <Avatar className="h-32 w-32 overflow-hidden rounded-full bg-gray-200">
            <AvatarImage src={image} alt={organization.name} />
            <AvatarFallback className="bg-gray-200">{organization.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <h2 className="text-xl font-bold">{organization.name}</h2>
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                {organization.isTeam ? "Team" : "Induvidual"}
              </span>
            </div>

            <p className="text-gray-600">{organization.description}</p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-md bg-gray-50 p-3">
                <p className="text-sm font-medium text-gray-500">Active Members</p>
                <p className="text-lg font-semibold">{organization.teamMembers.filter((m) => m.isActive).length}</p>
              </div>

              <div className="rounded-md bg-gray-50 p-3">
                <p className="text-sm font-medium text-gray-500">Total Members</p>
                <p className="text-lg font-semibold">{organization.teamMembers.length}</p>
              </div>
            </div>

            <Link
                to={`/c/organizations/edit/${organization.organizationId}`}
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <Edit className="mr-2 inline-block h-4 w-4" />
              Edit Organization
            </Link>
          </div>
        </div>
      </div>
    )
}
