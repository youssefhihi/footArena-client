import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Organization } from "../../../../types/organozation";
import { useOrganizationStore } from "../../../../modules/client/store/organization-store";
import { Plus } from "lucide-react";
import { SearchBar } from "../../tournament/SearchBar";
import { OrganizationCard } from "../organization-card";
import { Button } from "../../../../modules/client/components/ui/button";

export default function List() {
    const [searchQuery, setSearchQuery] = useState("")
    const { allOrganizations , getAllOrganizations } = useOrganizationStore();
    const navigate = useNavigate();
  
    useEffect(() => {
        getAllOrganizations();
    },[getAllOrganizations]);
  

    const OrganizationDetails = (organization: Organization) => {
      navigate(`${organization.organizationId}`);
    }
 
    // Filter organizations based on search query
    const filteredOrganizations = allOrganizations.filter(
      (org) =>
        org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  
    return (
      <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-100">Organizations & Teams</h1>
          <Link to={"/c/organizations/create"}>
            <Button  className="cursor-pointer bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Create Organization
            </Button>
          </Link>
        </div>
  
        {/* Search */}
        <div className="relative">
          
           <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search organizations..." />    
        </div>
  
        {/* Organizations Grid */}
        {filteredOrganizations.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredOrganizations.map((organization) => (
              <OrganizationCard  onView={OrganizationDetails} key={organization.organizationId} organization={organization} /> ))}
          </div>
        ) : (
          <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-800 p-6 text-center">
            <p className="text-lg font-medium text-gray-100">No organizations found</p>
            <p className="text-sm text-gray-200">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
      </>
    )
  }
  
  