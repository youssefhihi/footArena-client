import { FiUsers } from "react-icons/fi"
import { Organization } from "../../../../types/organozation"

interface OrganizationCardProps {
  organization: Organization
}

export const OrganizationCard: React.FC<OrganizationCardProps> = ({ organization }) => {
  return (
    <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
          <img
            src={organization.logo || "/placeholder.svg?height=40&width=40"}
            alt={organization.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-white font-medium">{organization.name}</h4>
          <div className="flex items-center mt-1">
            <span className="text-xs text-gray-400">{organization.isTeam ? "Team" : "Individual"}</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-400 mb-3 line-clamp-2">{organization.description}</p>

      <div className="flex justify-between text-sm">
        <div className="flex items-center text-gray-400">
          <FiUsers className="mr-1" />
          <span>{organization.teamMembers.length} Members</span>
        </div>
      </div>
    </div>
  )
}

