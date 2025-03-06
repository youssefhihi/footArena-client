import { create } from 'zustand';
import { RegisterRequest, ResetPasswordRequest, Role, UpdatePasswordRequest, User } from '../../../types/auth';
import UseAuthService from '../service/auth-service';
import AuthService from '../service/auth-service';
import { toast } from 'react-toastify';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error:  Record<string, string> | null;
  login: (usernameOrEmail: string, password: string) => Promise<Role | null>;
  registerUser: (data: RegisterRequest) => Promise<void>;
  resetPassword: (data: ResetPasswordRequest) => Promise<void>;
  updatePassword: (data: UpdatePasswordRequest) => Promise<boolean>;
  logout: () => void;
}


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,
    login: async (usernameOrEmail, password) => {
      set({ isLoading: true, error: null });
    
      const response = await AuthService.login({ usernameOrEmail, password });
      console.log(response);

      if (!response.success) {
        console.log("inside");
        set({ isLoading: false, error: response.errors });
        return null
      }

      set({
        user: response?.data?.user,
        token: response?.data?.token,
        isLoading: false,
      });
    
        // Store token in localStorage
      if (response.data?.token) {
        localStorage.setItem(
          import.meta.env.VITE_API_AUTH_TOKEN,
          response.data.token
        );
      } 
      toast.success(response.message);
      return response.data?.user.role as Role;
    },
  
      registerUser: async (data) => {
        set({ isLoading: true, error: null });

         const response = await UseAuthService.register(data);

         set({ isLoading: false });
         console.log(response);
         if (!response.success) {
          console.log("inside");
          set({ error: response.errors });
          if (Array.isArray(response.errors)) {
            response.errors.map((errorItem) => {
              toast.error(errorItem.message);
            });
          } else {
            toast.error(response.errors.message);
          }
          return;
        }
        toast.success(response.message);
      },
      resetPassword: async (data) => {
        set({ isLoading: true, error: null });
        const respone = await UseAuthService.resetPassword(data);
        set({ isLoading: false });
        if(!respone.success){
          set({ 
             error: respone.errors, 
          });
          if (Array.isArray(respone.errors)) {
            respone.errors.map((errorItem) => {
              toast.error(errorItem.message);
            });
          } else {
            toast.error(respone.errors.message);
          }
          return;
        }
        toast.success(respone.message);
      },
      updatePassword: async (data) => {
        set({ isLoading: true, error: null });
          const response = await UseAuthService.updatePassword(data);
          set({ isLoading: false });
          if(!response.success){
            set({ 
               error: response.errors, 
            });
            if (Array.isArray(response.errors)) {
              response.errors.map((errorItem) => {
                toast.error(errorItem.message);
              });
            } else {
              toast.error(response.errors.message);
            }
          }
          return response.success;
      },
      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem('authToken');
      }

}));