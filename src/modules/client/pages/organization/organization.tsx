import { Search, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { OrganizationCard } from "../../../../commun/components/organization/organization-card"
import { useOrganizationStore } from "../../store/organization-store"
import { Link, useNavigate } from "react-router-dom"
import { Organization } from "../../../../types/organozation"
import { DeleteModel } from "../../../../commun/components/ui/model/delete"

export default function Organizations() {
  const [selectedOrganization, setSelectedOrganization] = useState<Organization>()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  
  const [searchQuery, setSearchQuery] = useState("")
  const { organizations , fetchOwnOrganization, deleteOrganization } = useOrganizationStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOwnOrganization();
  },[fetchOwnOrganization]);

  const handleDeleteOrganization  = (organization: Organization) => {
    setSelectedOrganization(organization)
    setIsDeleteModalOpen(true)
  }

  const confirmDeleteorganization = () => {
      if (selectedOrganization) {
        deleteOrganization(selectedOrganization.organizationId);
        setIsDeleteModalOpen(false);
      }
    }
  const OrganizationDetails = (organization: Organization) => {
    navigate(`/c/organizations/${organization.organizationId}`);
  }
  const editOrganization = (organization: Organization) => {
    navigate(`/c/organizations/edit/${organization.organizationId}`);
  }
  // Filter organizations based on search query
  const filteredOrganizations = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Organizations & Teams</h1>
        <Link to={"/c/organizations/create"}>
          <Button  className="cursor-pointer bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> Create Organization
          </Button>
        </Link>
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
            <OrganizationCard onEdit={editOrganization} onDelete={handleDeleteOrganization } onView={OrganizationDetails} key={organization.organizationId} organization={organization} />          ))}
        </div>
      ) : (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
          <p className="text-lg font-medium text-gray-500">No organizations found</p>
          <p className="text-sm text-gray-400">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
    {isDeleteModalOpen && selectedOrganization && (
      <DeleteModel name={selectedOrganization.name} cancelDelete={() => setIsDeleteModalOpen(false)} confirmDelete={confirmDeleteorganization} />
    )}
    </>
  )
}

