import { Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { organization } from "../../../types/organozation"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"

interface OrganizationCardProps {
  organization: organization
}

export function OrganizationCard({ organization }: OrganizationCardProps) {
  // Get active members count
  const activeMembers = organization.teamMembers.filter((member) => member.isActive).length

  // Format date
//   const formatDate = (dateString: string | Date) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={organization.logo} alt={organization.name} />
            <AvatarFallback>{organization.name.substring(0, 2).toUpperCase()}</AvatarFallback>
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
            {organization.isTeam ? "Team" : "Organization"}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="grid w-full grid-cols-2 gap-2">
          <button className="flex items-center justify-center rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
            Members
          </button>
          <button className="flex items-center justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">
            View Details
          </button>
        </div>
      </CardFooter>
    </Card>
  )
}
