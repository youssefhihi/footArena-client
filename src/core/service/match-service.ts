import fetchApi from '../api/fetch-api';
import { ApiResponse } from '../../types/ApiResponse';
import { Match, MatchRequest, UpdateMatchRequest } from '../../types/Match';

const prefix = 'matches';
const MatchService = {

    getTournamentMatches: async (tournamantId: string): Promise<ApiResponse<Match[]>> => {
        return fetchApi<Match[]>(`${prefix}/${tournamantId}`, { method: 'GET' });
    },
    generateTournamentMatches:async (tournamantId: string, data: MatchRequest): Promise<ApiResponse<Match[]>> => {
        return fetchApi<Match[]>(`${prefix}/${tournamantId}`, { data, method: 'POST' });
    },

    updateMatch: async (matchId:string ,data: UpdateMatchRequest): Promise<ApiResponse<Match>> => {
        return fetchApi<Match>(`${prefix}/${matchId}`, { data, method: 'PATCH' });
    },

    getAllMatches: async (): Promise<ApiResponse<Match[]>> => {
        return fetchApi<Match[]>(`${prefix}`, { method: 'GET' });
    },
}

export default MatchService