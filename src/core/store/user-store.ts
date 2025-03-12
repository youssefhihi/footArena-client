import { create } from "zustand";
import { User } from "../../types/auth";
import { UserService } from "../service/user-service";

interface UserStore{
    authUser: User | undefined,
    isLoading: boolean,
    error: Record<string, string> | null;
    searchUserByUsername: (searchTerm: string) => Promise<User | undefined>
    getAuthUser: () => Promise<User | undefined>
}

export const useUserStore = create<UserStore>((set,get) => ({
  authUser: undefined,
  isLoading: false,
  error: null,

  searchUserByUsername: async (searchTerm: string) => {
    set({ isLoading: true, error: null });
    const response = await UserService.searchUser(searchTerm);

    if (!response.success) {
      set({ error: response.errors, isLoading: false });
      return;
    }
    set({ isLoading: false });
    return response.data;
  },

  getAuthUser: async () => {
    set({ isLoading: true, error: null });
    if (get().authUser) {
      set({ isLoading: false });
      return get().authUser;
    }
    const response = await UserService.getAuthUser();
    if (!response.success) {
      set({ error: response.errors, isLoading: false });
      return;
    }
    set({ authUser: response.data, isLoading: false });
    return response.data;
  }
}));
