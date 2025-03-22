import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  FiSearch,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiUser,
} from "react-icons/fi"
import { CgUnblock } from "react-icons/cg";
import { Role, User } from "../../../types/user"
import { useUserStore } from "../../../core/store/user-store"
import { formatDate } from "../../../commun/utils/constant/date-formater"
import { Avatar, AvatarFallback, AvatarImage } from "../../client/components/ui/avatar"
import { BanIcon } from "lucide-react"
import { DeleteModel } from "../../../commun/components/ui/model/delete"
import { UserCreateForm } from "../components/user-form/user-form";

// User Management Component
export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const { users, getAllUsers, banUser , unBanUser} = useUserStore();
  const [filters, setFilters] = useState({
    status: "all",
  });
  
  const usersPerPage = 5;
  
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);


  const filteredUsers = users.filter(user => {
    const isPlayer = user.role !== Role.ADMIN ;
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase());  
    const isBanned = user.deletedAt ? "Banned" : "NotBanned";
    const matchesStatusFilter =
      filters.status === "all" || isBanned.toLowerCase() === filters.status.toLowerCase();
    return matchesSearch && matchesStatusFilter && isPlayer;
  });
  
  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  
 
  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };
  
  const confirmDeleteUser = async () => {
    if (!selectedUser) return;
    await banUser(selectedUser.id);
    setIsDeleteModalOpen(false);
  };

  const confirmRestoreUser = async (userId: string) => {
    await unBanUser(userId);
  };
  

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <FiPlus className="mr-2" />
          Add New User
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col space-y-4 rounded-xl bg-gray-800 p-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border-gray-600 bg-gray-700 p-2.5 pl-10 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <div className="relative">
            <button
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="flex items-center rounded-lg bg-gray-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-600"
            >
              <FiFilter className="mr-2" />
              Filter
            </button>
            
            {isFilterMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-gray-700 p-4 shadow-lg"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Role</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-600 bg-gray-600 py-2 pl-3 pr-10 text-white focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                      value={filters.status}
                      onChange={(e) => setFilters({...filters, status: e.target.value})}
                    >
                      <option value="all">All</option>
                      <option value="Banned">Banned</option>
                      <option value="NotBanned">Not Banned</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setFilters({status: "all" });
                        setIsFilterMenuOpen(false);
                      }}
                      className="rounded-md bg-gray-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-500"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setIsFilterMenuOpen(false)}
                      className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
         
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-xl bg-gray-800 shadow-md">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-gray-700 text-xs uppercase text-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">User</th>
              <th scope="col" className="px-6 py-3">Phone Number</th>
              <th scope="col" className="px-6 py-3">Joined Date</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user,index) => (
              <motion.tr 
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`border-b border-gray-700 ${user.deletedAt ? "hover:bg-red-600" : "hover:bg-gray-700"} `}
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium flex space-x-2">
                    <Avatar className="h-12 w-12">
                        <AvatarImage imageUrl={user.profileImage || " "} alt={user.username} />
                        <AvatarFallback className="bg-gray-200 text-gray-800">{user.fullName.firstName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm text-gray-300 flex flex-col">
                        <span>
                            {user.fullName.firstName} {user.fullName.lastName}
                        </span>
                        <span>
                           {user.email} 
                        </span>
                    </p>
                </td>                
                <td className="px-6 py-4">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium`}>
                    {user.phoneNumber || "N/A"}
                  </span>
                </td>
                <td className="px-6 py-4">{formatDate(user.createdAt)}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                   { user.deletedAt ? 
                    (
                            <button
                            onClick={() => confirmRestoreUser(user.id)}
                            className="rounded p-1.5 text-red-900 hover:bg-red-900 hover:text-white"
                        >
                            <CgUnblock size={20} />
                        </button>
                    ):(
                        <button
                            onClick={() => handleDeleteUser(user)}
                            className="rounded p-1.5 text-red-600 hover:bg-red-900/30"
                        >
                            <BanIcon size={16} />
                        </button>
                    )
                   } 
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        
        {/* Empty State */}
        {currentUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FiUser size={48} className="mb-4 text-gray-500" />
            <h3 className="mb-1 text-lg font-medium">No users found</h3>
            <p className="text-gray-400">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{" "}
            <span className="font-medium">
              {indexOfLastUser > filteredUsers.length ? filteredUsers.length : indexOfLastUser}
            </span>{" "}
            of <span className="font-medium">{filteredUsers.length}</span> users
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center rounded-lg bg-gray-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiChevronLeft className="mr-1" />
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center rounded-lg bg-gray-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
              <FiChevronRight className="ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedUser && (
        <DeleteModel 
            textButton="Block User"
            confirmDelete={confirmDeleteUser}
            name={selectedUser.username} 
            cancelDelete={() => setIsDeleteModalOpen(false)}
             />
      )}
      { isCreateModalOpen && (
        <UserCreateForm onClose={() => setIsCreateModalOpen(false)} />
      )}
    </div>
  );
}

