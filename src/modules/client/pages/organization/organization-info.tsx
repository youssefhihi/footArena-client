
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, SearchIcon, UserPlus} from "lucide-react"
import { Organization, TeamMember, TeamMemberRequest, UpdateRoleTeamMemberRequest } from "../../../../types/organozation"
import { User } from "../../../../types/user"
import { useOrganizationStore } from "../../store/organization-store"
import { useUserStore } from "../../../../core/store/user-store"
import { motion } from "framer-motion"
import { OrganizationDetails } from "../../../../commun/components/organization/organization-details"
import { TeamMemberCard } from "../../components/organization/team-member-card"
import { useAuthStore } from "../../../auth/store/auth-store"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"

export default function OrganizationInfo() {
  const { organizationId } = useParams<{ organizationId: string }>()
  const navigate = useNavigate()
  const [isOwner, setIsOwner] = useState(false)
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [activeTab, setActiveTab] = useState<"details" | "members" | "statistics">("details")
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null)
  const [editedRole, setEditedRole] = useState("")
  const [showAddMember, setShowAddMember] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [ foundUser , setFoundUser] = useState<User | null>(null)
  const [newMemberRole, setNewMemberRole] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)
  const { updateMemberRole, getOrganizationById ,addTeamMemberToOrganization, removeTeamMemberFromOrganization } = useOrganizationStore();
  const { isLoading, searchUserByUsername} = useUserStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    const fetchOrg = async () => {
      const org = await getOrganizationById(organizationId!)
      if (org !== null && org !== undefined) {
        setIsOwner(org.teamMembers.find((m) => m.role === "President")?.user.id === authUser?.id)
        setOrganization(org)
      }
    }
    fetchOrg()
  }, [organizationId, getOrganizationById,isOwner, authUser]);

    
  if (!organization) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-lg text-gray-500">Loading organization details...</p>
      </div>
    )
  }


  const handleEditRole = (member: TeamMember) => {
    setEditingMemberId(member.teamMemberId)
    setEditedRole(member.role)
  }

  const saveEditedRole = async () => {
    if (!editingMemberId) return
    const data: UpdateRoleTeamMemberRequest = { 
      organization: organization.organizationId,
      memberId: editingMemberId,
      role: editedRole 
    }
    const updatedMember = await updateMemberRole(data);
    if (!updatedMember) return
    setOrganization((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        teamMembers: prev.teamMembers.map((m) => (m.teamMemberId === updatedMember.teamMemberId ? { ...m, role: updatedMember.role } : m)),
      }
    })

    setEditingMemberId(null)
  }

  const cancelEditRole = () => {
    setEditingMemberId(null)
  }

  const handleDeleteMember = async (memberId: string) => {
   const deleted = await removeTeamMemberFromOrganization(memberId)
   if (!deleted) return
    setOrganization((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        teamMembers: prev.teamMembers.filter((m) => m.teamMemberId !== memberId),
      }
    })
    setShowDeleteConfirm(null)
  }

    const handleAddMember = async () => {
      if (!selectedUser || !newMemberRole) return
    console.log("iser" +selectedUser.id , "role" + newMemberRole , "org" + organization.organizationId);
    const memberRequet: TeamMemberRequest = {
      role: newMemberRole,
      user: selectedUser.id,
      organization: organization.organizationId
    }
      const newMember = await addTeamMemberToOrganization(memberRequet)
      if (!newMember) return
      setOrganization((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          teamMembers: [...prev.teamMembers, newMember],
        }
      })

    setShowAddMember(false)
    setSelectedUser(null)
    setNewMemberRole("")
    setSearchQuery("")
  }
  
 const handleSearch = async () => {
    if (searchQuery) {
      const user = await searchUserByUsername(searchQuery)
      console.log(user);
      if (user) {
        setFoundUser(user)
      } else {
        setFoundUser(null)
      }
    } else {
      setFoundUser(null)
    }
  }
  

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button
          className="mr-4 flex items-center rounded-md p-2 text-gray-200 hover:bg-gray-700 cursor-pointer duration-300"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-100">{organization.name}</h1>
      </div>

      {/* Tab Buttons */}
      <div className="flex space-x-4 border-b">
        <button
          className={`pb-2 pt-1 font-medium ${
            activeTab === "details"  ? "border-blue-500 text-blue-500 cursor-pointer border-b-2 "
            : "cursor-pointer border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-300"
      }`}
          onClick={() => setActiveTab("details")}
        >
          Organization Details
        </button>
        <button
          className={`pb-2 pt-1 font-medium ${
            activeTab === "members"  ? "border-blue-500 text-blue-500 cursor-pointer border-b-2"
            : " cursor-pointer border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-300"
            }`}
          onClick={() => setActiveTab("members")}
        >
          Team Members
        </button>
      </div>

      {/* Organization Details */}
      {activeTab === "details" && (
       <OrganizationDetails organization={organization} isOwner={isOwner} />
      )}

      {/* Team Members */}
      {activeTab === "members" && (
        <div>
          <div className="mb-4 flex justify-between">
            <h2 className="text-lg font-semibold">Team Members</h2>
            { isOwner && organization.isTeam &&
              <button
                className="rounded-md bg-[#0FFF50] px-4 py-2 font-medium text-black hover:bg-opacity-90"
                onClick={() => setShowAddMember(true)}
              >
                <UserPlus className="mr-2 inline-block h-4 w-4" />
                Add Member
              </button>
            }
          </div>

          {/* Members Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {organization.teamMembers.map((member,index) => (
              <TeamMemberCard key={index} member={member} 
                showDeleteConfirm={showDeleteConfirm}
                onDelete={handleDeleteMember} 
                onSetShowDeleteConfirm={setShowDeleteConfirm} 
                onEditRole={handleEditRole} 
                editingMemberId={editingMemberId} 
                editedRole={editedRole} 
                onSetEditRole={setEditedRole} 
                cancelEditRole={cancelEditRole} 
                saveEditedRole={saveEditedRole}
                isOwner={isOwner} />
            ))}
          </div>

          {organization.teamMembers.length === 0 && (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
              <p className="text-lg font-medium text-gray-500">No team members</p>
              <p className="text-sm text-gray-400">Add members to your organization</p>
            </div>
          )}
        </div>
      )}



      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">Add Team Member</h2>

            {!selectedUser ? (
              <>
                <div className="mb-4 flex">
                  <input
                    type="text"
                    placeholder="Search users by name or email"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    className=" cursor-pointer ml-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    onClick={handleSearch}
                  >
                    <SearchIcon/>
                  </button>
                </div>

                <div className="max-h-60 overflow-y-auto rounded-md border">
                  {foundUser ? (
                    <ul className="divide-y">
                        <li
                          key={foundUser.id}
                          className="flex cursor-pointer items-center p-3 hover:bg-gray-600"
                          onClick={() => setSelectedUser(foundUser)}
                        >
                          <Avatar className="h-8 w-8 overflow-hidden rounded-full bg-gray-200 mr-3">
                            <AvatarImage imageUrl={foundUser.profileImage || ""} alt={foundUser.username} />
                            <AvatarFallback className="bg-white text-gray-800">{foundUser.fullName.firstName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{foundUser.fullName.firstName + " " + foundUser.fullName.lastName}</div>
                            <div className="text-xs text-gray-500">{foundUser.email}</div>
                          </div>
                        </li>
                    </ul>
                  ) : (
                    
                      isLoading ?(

                      <div className="flex h-32 flex-col items-center justify-center p-4 text-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="h-5 w-5 rounded-full border-2 border-green-600 border-t-transparent"
                        />
                        <p className="mt-2 text-sm font-medium text-gray-500">Loading user...</p>
                      </div>
                      ): (
                    
                    <div className="flex h-32 flex-col items-center justify-center p-4 text-center">
                      <p className="text-sm font-medium text-gray-500">No users found</p>
                      <p className="text-xs text-gray-400">Try a different search term</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="mb-4 flex items-center space-x-3 rounded-md border p-3">
                  <Avatar className="h-8 w-8 overflow-hidden rounded-full bg-gray-200 mr-3">
                        <AvatarImage imageUrl={selectedUser.profileImage || ""} alt={selectedUser.username} />
                        <AvatarFallback className="bg-white text-gray-800">{selectedUser.fullName.firstName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedUser.fullName.firstName + " " + selectedUser.fullName.lastName}</div>
                    <div className="text-xs text-gray-500">{selectedUser.email}</div>
                  </div>
                  <button
                    className="ml-auto text-sm text-blue-600 hover:text-blue-800"
                    onClick={() => setSelectedUser(null)}
                  >
                    Change
                  </button>
                </div>

                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium">Role</label>
                  <input
                    type="text"
                    placeholder="Enter member role (e.g., Captain, Coach, Player)"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="mt-4 flex justify-end space-x-3">
              <button
                className="rounded-md border px-4 py-2 hover:bg-gray-50"
                onClick={() => {
                  setShowAddMember(false)
                  setSelectedUser(null)
                  setNewMemberRole("")
                  setSearchQuery("")
                }}
              >
                Cancel
              </button>

              {selectedUser && (
                <button
                  className="rounded-md bg-blue-800 px-4 py-2 font-medium text-black hover:bg-opacity-90"
                  onClick={handleAddMember}
                  disabled={!newMemberRole}
                >
                  Add Member
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

