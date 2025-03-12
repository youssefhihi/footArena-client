
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, SearchXIcon, UserPlus} from "lucide-react"
import { Organization, TeamMember, TeamMemberRequest, UpdateRoleTeamMemberRequest } from "../../../../types/organozation"
import { User } from "../../../../types/auth"
import { useOrganizationStore } from "../../store/organization-store"
import { useUserStore } from "../../../../core/store/user-store"
import { motion } from "framer-motion"
import { OrganizationDetails } from "../../../../commun/components/organization/organization-details"
import { TeamMemberCard } from "../../components/organization/team-member-card"

export default function OrganizationInfo() {
  const { organizationId } = useParams<{ organizationId: string }>()
  const navigate = useNavigate()

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

  useEffect(() => {
    const fetchOrg = async () => {
      const org = await getOrganizationById(organizationId!)
      if (org !== null && org !== undefined) {
        setOrganization(org)
      }
    }
    fetchOrg()
  }, [organizationId, getOrganizationById]);

    
  if (!organization) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-lg text-gray-500">Loading organization details...</p>
      </div>
    )
  }

  // Format date


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
          onClick={() => navigate("/organizations")}
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
            activeTab === "details"  ? "border-blue-500 text-blue-500"
            : "border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-300"
      }`}
          onClick={() => setActiveTab("details")}
        >
          Organization Details
        </button>
        <button
          className={`pb-2 pt-1 font-medium ${
            activeTab === "members"  ? "border-blue-500 text-blue-500"
            : "border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-300"
            }`}
          onClick={() => setActiveTab("members")}
        >
          Team Members
        </button>
        <button
          className={`pb-2 pt-1 font-medium ${
            activeTab === "statistics"
            ? "border-blue-500 text-blue-500"
            : "border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-300"
    }`}
          onClick={() => setActiveTab("statistics")}
        >
          Statistics
        </button>
      </div>

      {/* Organization Details */}
      {activeTab === "details" && (
       <OrganizationDetails organization={organization} />
      )}

      {/* Team Members */}
      {activeTab === "members" && (
        <div>
          <div className="mb-4 flex justify-between">
            <h2 className="text-lg font-semibold">Team Members</h2>
            <button
              className="rounded-md bg-[#0FFF50] px-4 py-2 font-medium text-black hover:bg-opacity-90"
              onClick={() => setShowAddMember(true)}
            >
              <UserPlus className="mr-2 inline-block h-4 w-4" />
              Add Member
            </button>
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
                saveEditedRole={saveEditedRole} />
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

      {/* Organization Statistics */}
      {activeTab === "statistics" && (
        <div>
          <div className="mb-6 flex justify-between">
            <h2 className="text-lg font-semibold">Organization Statistics</h2>
          </div>

          {/* Performance Overview */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Tournaments Participated</p>
              <p className="mt-1 text-3xl font-bold text-blue-600">12</p>
              <p className="mt-1 text-xs text-green-600">+2 from last month</p>
            </div>

            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Win Rate</p>
              <p className="mt-1 text-3xl font-bold text-[#0FFF50]">68%</p>
              <p className="mt-1 text-xs text-green-600">+5% from last month</p>
            </div>

            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Tournaments Won</p>
              <p className="mt-1 text-3xl font-bold text-blue-600">5</p>
              <p className="mt-1 text-xs text-green-600">+1 from last month</p>
            </div>

            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Active Members</p>
              <p className="mt-1 text-3xl font-bold text-[#0FFF50]">
                {organization.teamMembers.filter((m) => m.isActive).length}
              </p>
              <p className="mt-1 text-xs text-blue-600">Total: {organization.teamMembers.length}</p>
            </div>
          </div>

          {/* Win/Loss Chart */}
          <div className="mb-6 rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-base font-semibold">Performance History</h3>
            <div className="h-64">
              <div className="flex h-full items-end space-x-2">
                {[65, 40, 75, 50, 85, 60, 70].map((value, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center">
                    <div className="w-full bg-blue-500" style={{ height: `${value}%` }}></div>
                    <p className="mt-2 text-xs">{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"][index]}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between">
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 bg-blue-500"></div>
                  <span className="text-xs">Win Rate (%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Tournaments */}
          <div className="mb-6 rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-base font-semibold">Recent Tournaments</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    <th className="pb-2">Tournament</th>
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Position</th>
                    <th className="pb-2">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="text-sm">
                    <td className="py-3">Champions League 2023</td>
                    <td className="py-3">Jun 15, 2023</td>
                    <td className="py-3">
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        1st Place
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="h-2 w-24 rounded-full bg-gray-200">
                        <div className="h-2 w-20 rounded-full bg-[#0FFF50]"></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="text-sm">
                    <td className="py-3">FIFA World Cup Qualifiers</td>
                    <td className="py-3">May 22, 2023</td>
                    <td className="py-3">
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                        2nd Place
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="h-2 w-24 rounded-full bg-gray-200">
                        <div className="h-2 w-16 rounded-full bg-blue-500"></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="text-sm">
                    <td className="py-3">Local 5-a-side Tournament</td>
                    <td className="py-3">Apr 10, 2023</td>
                    <td className="py-3">
                      <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                        3rd Place
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="h-2 w-24 rounded-full bg-gray-200">
                        <div className="h-2 w-12 rounded-full bg-yellow-500"></div>
                      </div>
                    </td>
                  </tr>
                  <tr className="text-sm">
                    <td className="py-3">Friendly Match Series</td>
                    <td className="py-3">Mar 5, 2023</td>
                    <td className="py-3">
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                        Participated
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="h-2 w-24 rounded-full bg-gray-200">
                        <div className="h-2 w-10 rounded-full bg-gray-500"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Performers */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-base font-semibold">Top Performers</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {organization.teamMembers.slice(0, 3).map((member) => (
                <div key={member.teamMemberId} className="flex items-center space-x-3 rounded-md border p-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                    <img
                      src={member.user.profileImage || "/placeholder.svg?height=40&width=40"}
                      alt={member.user.username}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{member.user.fullName.firstName + " " + member.user.fullName.lastName}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="rounded-full bg-[#0FFF50] bg-opacity-20 px-2 py-1 text-xs font-medium text-black">
                      {["92%", "87%", "83%"][organization.teamMembers.indexOf(member) % 3]} Win Rate
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
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
                    <SearchXIcon/>
                  </button>
                </div>

                <div className="max-h-60 overflow-y-auto rounded-md border">
                  {foundUser ? (
                    <ul className="divide-y">
                        <li
                          key={foundUser.id}
                          className="flex cursor-pointer items-center p-3 hover:bg-gray-50"
                          onClick={() => setSelectedUser(foundUser)}
                        >
                          <div className="mr-3 h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                            <img
                              src={foundUser.profileImage || "/placeholder.svg?height=32&width=32"}
                              alt={foundUser.username}
                              className="h-full w-full object-cover"
                            />
                          </div>
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
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                    <img
                      src={selectedUser.profileImage || "/placeholder.svg?height=40&width=40"}
                      alt={selectedUser.username}
                      className="h-full w-full object-cover"
                    />
                  </div>
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
                  className="rounded-md bg-[#0FFF50] px-4 py-2 font-medium text-black hover:bg-opacity-90"
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

