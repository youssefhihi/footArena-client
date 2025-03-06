import fetchApi from '../../../../lib/api/api';
import { ApiResponse } from '../../../../types/ApiResponse';
import { Match } from './../../../../types/Match';

const prefix = 'matches';
const MatchService = {

    getTournamentMatches: async (tournamantId: string): Promise<ApiResponse<Match[]>> => {
        return fetchApi<Match[]>(`${prefix}/${tournamantId}`, { method: 'GET' });
    },

}

export default MatchService