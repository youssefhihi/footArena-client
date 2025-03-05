import { User } from "./auth"

export interface organization{
    organizationId: string,
    name: string,
    description: string,
    logo: string,
    isTeam: string,
    teamMembers: TeamMember[]
}

export interface TeamMember{
    teamMemberId: string,
    role: string,
    user: User,
    joinedAt: Date,
    isActive: boolean
}