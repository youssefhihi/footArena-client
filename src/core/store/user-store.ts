import { create } from "zustand";
import { CreateUserRequest, UpdateCurrentPasswordRequest, User } from "../../types/user";
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
    createUser: (data: CreateUserRequest) => Promise<boolean>
    updateProfile: (data: FormData) => Promise<void>
    updatePassword: (data: UpdateCurrentPasswordRequest) => Promise<boolean>
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
        response.errors.forEach((err) => toast.error(err.message));
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
  },

  createUser: async (data) => {
    set({ isLoading: true, error: null });
    const response = await UserService.createUser(data);
    if (!response.success) {
      set({ error: response.errors, isLoading: false });
      if (Array.isArray(response.errors)) {
        response.errors.forEach((err) => toast.error(err));
      } else {
        toast.error(response.errors?.message || 'Failed to create user');
      }
      return false;
    }
    set((state) => ({
       users: [...state.users, response.data ?? {} as User],
       isLoading: false 
    }));
    toast.success(response.message);
    return response.success;
  },

  updateProfile: async (data) => {
    set({ isLoading: true, error: null });
    const response = await UserService.updateProfile(data);
    if (!response.success) {
      set({ error: response.errors, isLoading: false });
      if (Array.isArray(response.errors)) {
        response.errors.forEach((err) => toast.error(err));
      } else {
        toast.error(response.errors?.message || 'Failed to update profile');
      }
      return;
    }
    if (response.data?.token) {
      localStorage.setItem(
        import.meta.env.VITE_API_AUTH_TOKEN,
        response.data.token
      );
    } 
    set({
      isLoading: false
    });
    toast.success(response.message);
  },
  updatePassword: async (data) => {
    set({ isLoading: true, error: null });
    const response = await UserService.updatePassword(data);
    if (!response.success) {
      set({ error: response.errors, isLoading: false });
      if (Array.isArray(response.errors)) {
        response.errors.forEach((err) => toast.error(err));
      } else {
        toast.error(response.errors?.message || 'Failed to update Password');
      }
      return response.success;
    }
    set({
      isLoading: false
    });
    toast.success(response.message);
    return response.success
  }
}));
