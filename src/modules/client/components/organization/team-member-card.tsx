import { Check, Trash2, X } from "lucide-react";
import { TeamMember } from "../../../../types/organozation";
import { formatDate } from "../../../../commun/utils/constant/date-formater";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface TeamMemberCardProps {
    member: TeamMember,
    showDeleteConfirm: string | null,
    onDelete: (id: string) => void,
    onSetShowDeleteConfirm: (id: string | null) => void,
    editingMemberId: string | null
    onEditRole: (member: TeamMember) => void
    editedRole: string
    onSetEditRole: (role: string) => void,
    cancelEditRole: () => void,
    saveEditedRole: () => void,
    isOwner: boolean

}

export function TeamMemberCard({ member,
    showDeleteConfirm,
    onDelete,
    onSetShowDeleteConfirm,
    onEditRole,
    editingMemberId,
    editedRole,
    onSetEditRole,
    cancelEditRole,
    saveEditedRole,
    isOwner
}: TeamMemberCardProps) {
    return (
        <div
                key={member.teamMemberId}
                className="relative rounded-lg border bg-gray-800 p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Delete Confirmation */}
                {isOwner && showDeleteConfirm === member.teamMemberId && member.role !== "President" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black/95 p-4">
                    <p className="mb-4 text-center font-medium">Are you sure you want to remove this member?</p>
                    <div className="flex space-x-3">
                      <button
                        className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
                        onClick={() => onDelete(member.teamMemberId)}
                      >
                        Remove
                      </button>
                      <button
                        className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 hover:text-black"
                        onClick={() => onSetShowDeleteConfirm(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                       <Avatar className="h-16 w-16 overflow-hidden rounded-full bg-gray-200">
                        <AvatarImage imageUrl={member.user.profileImage || ""} alt={member.user.username} />
                        <AvatarFallback className="border border-white bg-gray-200 text-gray-800">{member.user.fullName.firstName.charAt(0)}</AvatarFallback>
                      </Avatar>
                    <div>
                      <h3 className="font-medium">{member.user.fullName.firstName + " " + member.user.fullName.lastName}</h3>
                      <p className="text-sm text-gray-500">{member.user.email}</p>
                    </div>
                  </div>
                    { isOwner && member.role !== "President" &&

                    <button
                        className="rounded-full p-1 text-red-500 hover:bg-red-50"
                        onClick={() => onSetShowDeleteConfirm(member.teamMemberId)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                    }
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Role</p>
                    { isOwner && editingMemberId === member.teamMemberId &&  member.role !== "President" ? (
                      <div className="mt-1 flex items-center space-x-1">
                        <input
                          type="text"
                          value={editedRole}
                          onChange={(e) => onSetEditRole(e.target.value)}
                          className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
                        />
                        <button className="rounded-full p-1 text-green-600 hover:bg-green-50" onClick={saveEditedRole}>
                          <Check className="h-4 w-4" />
                        </button>
                        <button className="rounded-full p-1 text-red-600 hover:bg-red-50" onClick={cancelEditRole}>
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                        <div className="relative group"
                            onDoubleClick={() => onEditRole(member)}>
                        <p className="cursor-pointer rounded px-2 py-1 font-medium hover:bg-gray-900">
                          {member.role}
                        </p>
                        { isOwner &&  member.role !== "President" && (
                          <span className="absolute text-sm left-1/2 bottom-full mb-2 w-max -translate-x-1/2 rounded bg-gray-700 px-2 py-1  text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            Double-click to edit
                          </span>
                        )}
                      </div>
                      
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Joined</p>
                    <p className="text-sm">{formatDate(member.joinedAt)}</p>
                  </div>
                </div>

                <div className="mt-2">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      member.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {member.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
    )
}