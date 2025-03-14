import { ApiResponse } from "../../types/ApiResponse";
import { User } from "../../types/auth";
import { UpdateCurrentPasswordRequest } from "../../types/user";
import fetchApi from "../api/fetch-api";

const prefix = "users";

export const UserService = {
    getAuthUser: async (): Promise<ApiResponse<User>> => {
        return fetchApi<User>(`${prefix}/me`, { method: 'GET' });
    },

    updateProfile: async (data: User): Promise<ApiResponse<User>> => {
        return fetchApi<User>(`${prefix}/update-profile`, { data, method: 'PUT' });
    },

    updatePassword(data: UpdateCurrentPasswordRequest): Promise<ApiResponse<null>> {
        return fetchApi<null>(`${prefix}/update-password`, { data, method: 'PATCH' });
    },

    searchUser: async (searchTerm: string): Promise<ApiResponse<User>> => {
        return fetchApi<User>(`${prefix}/search/${searchTerm}`, { method: 'GET' });
    },

    getAllUsers: async (): Promise<ApiResponse<User[]>> => {
        return fetchApi<User[]>(`${prefix}`, { method: 'GET' });
    },

    banUser: async (userId: string): Promise<ApiResponse<User>> => {
        return fetchApi<User>(`${prefix}/soft-delete/${userId}`, { method: 'DELETE' });
    },
    unBanUser: async (userId: string): Promise<ApiResponse<User>> => {
        return fetchApi<User>(`${prefix}/restore/${userId}`, { method: 'PATCH' });
    },

}