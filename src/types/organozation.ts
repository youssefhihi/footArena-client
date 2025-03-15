import { User } from "./user"

export interface Organization{
    organizationId: string,
    name: string,
    description: string,
    logo: string,
    isTeam: boolean,
    teamMembers: TeamMember[]
}

export interface TeamMember{
    teamMemberId: string,
    role: string,
    user: User,
    joinedAt: string,
    isActive: boolean
}


export interface OrganizationRequest{
    name: string,
    description: string,
    isTeam: boolean,
    logo?: File
}

export interface TeamMemberRequest{
    role: string,
    user: string,
    organization: string
}

export interface UpdateRoleTeamMemberRequest{
    memberId: string,
    role: string,
    organization: string
}