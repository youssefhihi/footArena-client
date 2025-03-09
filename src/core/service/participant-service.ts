import { ApiResponse } from "../../types/ApiResponse";
import { Participant, ParticipantRequest } from "../../types/participant";
import fetchApi from "../api/fetch-api";

const prefix = 'participant';

export const ParticipantService = {
    participateTotournament: async (data: ParticipantRequest): Promise<ApiResponse<Participant>> => {
        return fetchApi<Participant>(`${prefix}`, { data, method: 'POST' });
    }

}