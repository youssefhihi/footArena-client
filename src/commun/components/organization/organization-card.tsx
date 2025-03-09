import { Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../modules/client/components/ui/card"
import { Organization } from "../../../types/organozation"
import { Avatar, AvatarFallback, AvatarImage } from "../../../modules/client/components/ui/avatar"
import { Badge } from "../../../modules/client/components/ui/badge"
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi"
import { Button } from "../../../modules/admin/components/ui/Button"

interface OrganizationCardProps {
  organization: Organization,
    onView: (organization: Organization) => void
    onEdit?: (organization: Organization) => void
    onDelete?: (organization: Organization) => void
}
const url =import.meta.env.VITE_API_URL
export function OrganizationCard({ organization, onView, onEdit, onDelete }: OrganizationCardProps) {
  // Get active members count
  const activeMembers = organization.teamMembers.filter((member) => member.isActive).length
  const image = url+organization.logo ? url+organization.logo : "";
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={image} alt={organization.name} />
            <AvatarFallback className="bg-gray-200">{organization.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="line-clamp-1">{organization.name}</CardTitle>
            <CardDescription className="flex items-center">
              <Users className="mr-1 h-3 w-3" />
              {activeMembers} active members
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="mb-4 line-clamp-3 text-sm text-gray-600">{organization.description}</p>

        <div className="mt-4 space-y-1">
          <Badge variant="outline" className="mr-2">
            {organization.isTeam ? "Team" : "Indivudual"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-2">
        <div className="mt-4 flex space-x-2 items-right">
            <Button onClick={() => onView(organization)} icon={FiEye} variant="default" className="text center">
            </Button>
            {onDelete && onEdit && 
            <>
              <Button onClick={() => onEdit(organization)} icon={FiEdit2} variant="primary" className="text center">
              </Button>
              <Button onClick={() => onDelete(organization)} icon={FiTrash2} variant="danger" className="text center">
              </Button>
            </>
            }
        </div>
      </CardFooter>
    </Card>
  )
}
