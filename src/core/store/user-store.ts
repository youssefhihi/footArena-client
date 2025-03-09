import { create } from "zustand";
import { User } from "../../types/auth";
import { UserService } from "../service/user-service";

interface UserStore{
    authUser: User | null,
    isLoading: boolean,
    error: Record<string, string> | null;
    searchUserByUsername: (searchTerm: string) => Promise<User | undefined>
}

export const useUserStore = create<UserStore>((set) => ({
  authUser: null,
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
  }
}));
