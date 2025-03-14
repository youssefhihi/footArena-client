import { create } from "zustand";
import { User } from "../../types/auth";
import { UserService } from "../service/user-service";
import { toast } from "react-toastify";

interface UserStore{
    users: User[],
    isLoading: boolean,
    error: Record<string, string> | null;
    searchUserByUsername: (searchTerm: string) => Promise<User | undefined>
    getAllUsers: () => Promise<void>
    banUser: (userId: string) => Promise<void>
    unBanUser: (userId: string) => Promise<void>
}

export const useUserStore = create<UserStore>((set,get) => ({
  users: [],
  isLoading: false,
  error: null,

  searchUserByUsername: async (searchTerm: string) => {
    set({ isLoading: true, error: null });
    const existingUser = get().users.find((user) => user.username === searchTerm);
    if (existingUser) {
      set({ isLoading: false });
      return existingUser;
    }
    const response = await UserService.searchUser(searchTerm);
    if (!response.success) {
      set({ error: response.errors, isLoading: false });
      return;
    }
    set({ isLoading: false });
    return response.data;
  },
  getAllUsers: async () => {
    set({ isLoading: true, error: null });
    if(get().users?.length > 0) {
      set({ isLoading: false });
      return;
    }
    const response = await UserService.getAllUsers();
    if (!response.success) {
      set({ error: response.errors, isLoading: false });
      return;
    }
    set({ users: response.data, isLoading: false });
  },
  banUser: async (userId) => {
    set({ isLoading: true, error: null });
    const response = await UserService.banUser(userId);
   if (!response.success) {
      set({ error: response.errors, isLoading: false });
      if (Array.isArray(response.errors)) {
        response.errors.forEach((err) => toast.error(err));
      } else {
        toast.error(response.errors?.message || 'Failed to Ban this user');
      }
      return;
    }

    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? response.data ?? user : user
      ),
      isLoading: false
    })  
    );  
    toast.success(response.message);
  },

  unBanUser: async (userId) => {
    set({ isLoading: true, error: null });
    const response = await UserService.unBanUser(userId);
    if (!response.success) {
      set({ error: response.errors, isLoading: false });
      if (Array.isArray(response.errors)) {
        response.errors.forEach((err) => toast.error(err));
      } else {
        toast.error(response.errors?.message || 'Failed to UnBan this user');
      }
      return;
    }
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? response.data ?? user : user
      ),
      isLoading: false
    })  
    );  
    toast.success(response.message);
  }
}));
