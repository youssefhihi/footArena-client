import fetchApi from '../../../core/api/fetch-api';
import { ApiResponse } from '../../../types/ApiResponse';
import { TeamMember, TeamMemberRequest, UpdateRoleTeamMemberRequest } from './../../../types/organozation';
const prefix = "organization/members";

export const TeamMemberService = {
    addTeamMember: async (data: TeamMemberRequest): Promise<ApiResponse<TeamMember>> => {
        return fetchApi<TeamMember>(`${prefix}`, {data, method: "POST" });
    },
    removeTeamMember: async (id: string): Promise<ApiResponse<null>> => {
        return fetchApi<null>(`${prefix}/${id}`, { method: "DELETE" });
    },
    
    updateMemberRole: async (data: UpdateRoleTeamMemberRequest): Promise<ApiResponse<TeamMember>> => {
        return fetchApi<TeamMember>(`${prefix}/role`, { data, method: "PATCH" });
    },
}