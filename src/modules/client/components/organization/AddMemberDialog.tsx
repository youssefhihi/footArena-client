"use client"

import { useState } from "react"
import { Search, UserPlus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Role, User } from "../../../../types/user"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

interface AddMemberDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddMember: (user: User, role: string) => void
  existingMemberIds: string[]
}
const mockUsers: User[] = [
  {
    id: "1",
    fullName: {
      firstName: "John",
      lastName: "Doe",
    },
    username: "johndoe",
    email: "qf7g3@example.com", 
    phoneNumber: "123-456-7890",
    role: Role.USER,
    isVerified: true,
  },
  {
    id: "2",
    fullName: {
      firstName: "Jane",
      lastName: "Smith",
    },
    username: "janesmith",
    email: "2Kz7p@example.com",
    phoneNumber: "987-654-3210",
    role: Role.USER,
    isVerified: false,
  },
  {
    id: "3",
    fullName: {
      firstName: "Bob",
      lastName: "Johnson",
    },
    username: "bobjohnson",
    email: "lYV2q@example.com",
    role: Role.USER,
    isVerified: true,
  },
    
]

export function AddMemberDialog({ open, onOpenChange, onAddMember, existingMemberIds }: AddMemberDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [role, setRole] = useState("")

  // Filter users based on search query and exclude existing members
  const filteredUsers = mockUsers.filter(
    (user: User) =>
      !existingMemberIds.includes(user.id) &&
      (user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleSelectUser = (user: User) => {
    setSelectedUser(user)
  }

  const handleAddMember = () => {
    if (selectedUser && role) {
      onAddMember(selectedUser, role)
      resetForm()
    }
  }

  const resetForm = () => {
    setSearchQuery("")
    setSelectedUser(null)
    setRole("")
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen:boolean) => {
        onOpenChange(isOpen)
        if (!isOpen) resetForm()
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>Add a new member to your organization.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!selectedUser ? (
            <>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search users by name or email"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="max-h-60 overflow-y-auto rounded-md border">
                {filteredUsers.length > 0 ? (
                  <ul className="divide-y">
                    {filteredUsers.map((user: User) => (
                      <li
                        key={user.id}
                        className="flex cursor-pointer items-center p-3 hover:bg-gray-50"
                        onClick={() => handleSelectUser(user)}
                      >
                        <Avatar className="mr-3 h-8 w-8">
                          <AvatarImage src={user.profileImage} alt={user.username} />
                          <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.fullName.firstName + " " + user.fullName.lastName}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex h-32 flex-col items-center justify-center p-4 text-center">
                    <p className="text-sm font-medium text-gray-500">No users found</p>
                    <p className="text-xs text-gray-400">Try a different search term</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-3 rounded-md border p-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedUser.profileImage} alt={selectedUser.username} />
                  <AvatarFallback>{selectedUser.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedUser.fullName.firstName + " " + selectedUser.fullName.lastName}</div>
                  <div className="text-xs text-gray-500">{selectedUser.email}</div>
                </div>
                <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setSelectedUser(null)}>
                  Change
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  placeholder="Enter member role (e.g., Captain, Coach, Player)"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          {selectedUser && (
            <Button onClick={handleAddMember} disabled={!role} style={{ backgroundColor: "#0FFF50", color: "#000" }}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

