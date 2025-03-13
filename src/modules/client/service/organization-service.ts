import fetchApi from "../../../core/api/fetch-api";
import { ApiResponse } from "../../../types/ApiResponse";
import {  Organization, OrganizationRequest } from "../../../types/organozation";

const prefix = "organization";

export const OrganizationService = {
    getAllOrganizations: async (): Promise<ApiResponse<Organization[]>> => {
        return fetchApi<Organization[]>(`${prefix}`, { method: "GET" });
    },
    getOwnOrganization: async (): Promise<ApiResponse<Organization[]>> => {
        return fetchApi<Organization[]>(`${prefix}/me`, { method: "GET" });
    },

    createOrganization: async (data: OrganizationRequest): Promise<ApiResponse<Organization>> => {
        return fetchApi<Organization>(`${prefix}`, { data, method: "POST" });
    },

    getOrganizationById: async (id: string): Promise<ApiResponse<Organization>> => {
        return fetchApi<Organization>(`${prefix}/${id}`, { method: "GET" });
    },

    updateOrganization: async (id: string, data: OrganizationRequest): Promise<ApiResponse<Organization>> => {
        return fetchApi<Organization>(`${prefix}/${id}`, { data, method: "PUT" });
    },

    deleteOrganization: async (id: string): Promise<ApiResponse<null>> => {
        return fetchApi<null>(`${prefix}/${id}`, { method: "DELETE" });
    },
    
}