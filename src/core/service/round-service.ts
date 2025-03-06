import fetchApi from '../api/fetch-api';
import { ApiResponse } from '../../types/ApiResponse';
import { Round } from '../../types/Round';


const prefix = 'score/roundRobin';

const RoundService = {
    getTournamentRounds: async (tournamentId:string): Promise<ApiResponse<Round[]>> => {
        return fetchApi<Round[]>(`${prefix}/${tournamentId}`, { method: 'GET' });
    }
}

export default RoundService;