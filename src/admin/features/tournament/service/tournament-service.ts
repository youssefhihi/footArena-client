import fetchApi from "../../../../lib/api/api";
import { ApiResponse } from "../../../../types/ApiResponse";
import { Tournament, TournamentRequest } from "../../../../types/tournament";


const TournamentService = {
  createTournament: async (data: TournamentRequest): Promise<ApiResponse<Tournament>> => {
    return fetchApi<Tournament>('tournament', { data, method: 'POST' });
  },

  updateTournament: async (id: string, data: TournamentRequest): Promise<ApiResponse<Tournament>> => {
    return fetchApi<Tournament>(`tournament/update/${id}`, { data, method: 'PUT' });
  },

  softDeleteTournament: async (id: string): Promise<ApiResponse<void>> => {
    return fetchApi<void>(`tournament/soft-delete/${id}`, { method: 'DELETE' });
  },

  restoreTournament: async (id: string): Promise<ApiResponse<Tournament>> => {
    return fetchApi<Tournament>(`tournament/restore/${id}`, { method: 'PATCH' });
  },

  forceDeleteTournament: async (id: string): Promise<ApiResponse<void>> => {
    return fetchApi<void>(`tournament/delete/${id}`, { method: 'DELETE' });
  },

  getUserTournaments: async (): Promise<ApiResponse<Tournament[]>> => {
    return fetchApi<Tournament[]>('tournament', { method: 'GET' });
  },

  getAvailableTournaments: async (): Promise<ApiResponse<Tournament[]>> => {
    return fetchApi<Tournament[]>('tournament/available', { method: 'GET' });
  },
  getTournamentById: async (id: string): Promise<ApiResponse<Tournament>> => {
    return fetchApi<Tournament>(`tournament/${id}`, { method: 'GET' });
  },
};

export default TournamentService;