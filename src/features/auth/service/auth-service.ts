import fetchApi from "../../../lib/api/api";
import { ApiResponse } from "../../../types/ApiResponse";
import { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  ResetPasswordRequest, 
  UpdatePasswordRequest 
} from "../../../types/auth";

const AuthService = {
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    return fetchApi<LoginResponse>('auth/login', { data, method: 'POST' });
  },

  register: async (data: RegisterRequest): Promise<ApiResponse<null>> => {
    return fetchApi<null>('auth/register', { data, method: 'POST' });
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<ApiResponse<null>> => {
    return fetchApi<null>('auth/reset-password', { data, method: 'POST' });
  },

  updatePassword: async (data: UpdatePasswordRequest): Promise<ApiResponse<null>> => {
    return fetchApi<null>('auth/update-password', { data, method: 'POST' });
  },
};

export default AuthService;
