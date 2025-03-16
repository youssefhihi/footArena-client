import { create } from "zustand";
import { Organization, TeamMember, TeamMemberRequest, UpdateRoleTeamMemberRequest } from "../../../types/organozation";
import { toast } from "react-toastify";
import { OrganizationService } from "../service/organization-service";
import { TeamMemberService } from "../service/team-member-service";

interface OrganizationState {
    organizations: Organization[];
    allOrganizations: Organization[];
    isLoading: boolean;
    error: Record<string, string> | null;
    fetchOwnOrganization: () => Promise<void>;
    createOrganization: (data: FormData) => Promise<boolean>;
    getOrganizationById: (id: string) => Promise<Organization | undefined | null>;
    updateOrganization: (id: string, data: FormData) => Promise<boolean>;
    deleteOrganization: (id: string) => void;
    addTeamMemberToOrganization: (teamMember: TeamMemberRequest) => Promise<TeamMember | undefined>
    removeTeamMemberFromOrganization: (id: string) => Promise<boolean>
    updateMemberRole: (data: UpdateRoleTeamMemberRequest) => Promise<TeamMember | undefined>
    getAllOrganizations: () => Promise<void>
}

export const useOrganizationStore = create<OrganizationState>((set, get) => ({
    organizations: [],
    allOrganizations: [],
    isLoading: false,
    error: null,
    getOrganizationById: async (id) => {
        set({ isLoading: true, error: null });
        const existingOrganization = get().organizations.find(o => o.organizationId === id);
        if (existingOrganization) {
            set({ isLoading: false });
            return existingOrganization;
        }
        const response = await OrganizationService.getOrganizationById(id);
        if (!response.success) {
            set({ error: response.errors, isLoading: false });
            toast.error(response.errors.message);
            return null;
        }
        set({ isLoading: false });
        return response.data;
    },
    fetchOwnOrganization: async () => {
        set({ isLoading: true, error: null });
        const existingOrganizations = get().organizations;
        if(existingOrganizations?.length > 0) {
            set({ isLoading: false });
            return
        }
        const response = await OrganizationService.getOwnOrganization();
        if (!response.success) {
            set({ error: response.errors, isLoading: false });
            toast.error(response.message);
            return;
        }
        set({ organizations: response.data, isLoading: false });
    },
    createOrganization: async (data) => {
        set({ isLoading: true, error: null });
        const response = await OrganizationService.createOrganization(data);
        if (!response.success) {
            if (Array.isArray(response.errors)) {
                response.errors.map((errorItem) => {
                  toast.error(errorItem );
                });
              } 
            set({ error: response.errors, isLoading: false });
            return false;
        }
        set((state) => ({
            organizations: [...state.organizations, response.data ?? {} as Organization],
            isLoading: false,
        }));
        toast.success(response.message);
        set({ isLoading: false });
        return true;
    },
    updateOrganization: async (id, data) => {
        set({ isLoading: true, error: null });
        const response = await OrganizationService.updateOrganization(id, data);
        if (!response.success) {
            set({ error: response.errors, isLoading: false });
            if (Array.isArray(response.errors)) {
                response.errors.forEach((err) => toast.error(err.message));
              } else {
                toast.error(response.errors?.message || 'Failed to update tournament');
              }
            return false;
        }
       
        set((state) => ({
            organizations: state.organizations.map((t) =>
              t.organizationId === id ? response.data ?? t : t
            ),
            isLoading: false,
          }));
        return response.success;
    },
    deleteOrganization: async (id) => {
        set({ isLoading: true });
        const response = await OrganizationService.deleteOrganization(id);
        if (!response.success) {
            if (Array.isArray(response.errors)) {
                response.errors.forEach((err) => toast.error(err.message));
              } else {
                toast.error(response.errors?.message || 'Failed to update tournament');
              }
        return;
        }
        set((state) => ({
            organizations: state.organizations.filter((t) => t.organizationId !== id),
            isLoading: false,
        }));
        toast.success("sfhsudff");
        toast.success(response.message);
    },

    addTeamMemberToOrganization: async (teamMember: TeamMemberRequest) => {
        set({ isLoading: true });
        const response = await TeamMemberService.addTeamMember(teamMember);
        if (!response.success) {
            set({ error: response.errors, isLoading: false });
            if (Array.isArray(response.errors)) {
                response.errors.forEach((err) => toast.error(err.message));
              } else {
                toast.error(response.errors?.message || 'Failed to delete team member');
              }            
        return;
        }
        toast.success(response.message);
        set({ 
            organizations: get().organizations.map((o) => 
                o.organizationId === teamMember.organization ? 
            {...o, teamMembers: [...o.teamMembers, response.data ?? {} as TeamMember]} : o),
            isLoading: false 
        });
        return response.data;
    },

    removeTeamMemberFromOrganization: async (id) => {
        set({ isLoading: true });
        const response = await TeamMemberService.removeTeamMember(id);
        if (!response.success) {
            set({ error: response.errors, isLoading: false });
            if (Array.isArray(response.errors)) {
                response.errors.forEach((err) => toast.error(err.message));
              } else {
                toast.error(response.errors?.message || 'Failed to delete team member');
              }            
            return false;
        }
        toast.success(response.message);
        set({ 
            organizations: get().organizations.map((o) => 
                o.organizationId === id ? 
            {...o, teamMembers: o.teamMembers.filter((tm) => tm.teamMemberId !== id)} : o),
            isLoading: false 
        });
        return response.success;
    },
    updateMemberRole: async (data: UpdateRoleTeamMemberRequest) => {
        set({ isLoading: true });
        const response = await TeamMemberService.updateMemberRole(data);
        if (!response.success) {
            set({ error: response.errors, isLoading: false });
            if (Array.isArray(response.errors)) {
                response.errors.forEach((err) => toast.error(err));
              } else {
                toast.error(response.errors?.message || 'Failed to update team member role');
              }            
            return;
        }
        toast.success(response.message);
        set({ 
            organizations: get().organizations.map((o) => 
                o.organizationId === data.organization ? 
            {...o, teamMembers: o.teamMembers.map((tm) => tm.teamMemberId === data.memberId ? {...tm, role: data.role} : tm)} : o),
            isLoading: false 
        });
        return response.data;
    },
    getAllOrganizations: async () => {
        set({ isLoading: true });
        if(get().allOrganizations.length > 0) {
            set({ isLoading: false });
            return;
        }
        const response = await OrganizationService.getAllOrganizations();
        if (!response.success) {
            set({ error: response.errors, isLoading: false });
            if (Array.isArray(response.errors)) {
                response.errors.forEach((err) => toast.error(err.message));
              } else {
                toast.error(response.errors?.message || 'Failed to get all organizations');
              }            
            return;
        }
        set({ allOrganizations: response.data, isLoading: false });
    },
}));