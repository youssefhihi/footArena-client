import { Search, Plus } from "lucide-react"

import { useState } from "react"
import { mockOrganizations } from "./data"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { OrganizationCard } from "../components/organization-card"

export default function Organizations() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter organizations based on search query
  const filteredOrganizations = mockOrganizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Organizations & Teams</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Join Organization
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search organizations..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Organizations Grid */}
      {filteredOrganizations.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrganizations.map((organization) => (
            <OrganizationCard key={organization.organizationId} organization={organization} />
          ))}
        </div>
      ) : (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
          <p className="text-lg font-medium text-gray-500">No organizations found</p>
          <p className="text-sm text-gray-400">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  )
}

