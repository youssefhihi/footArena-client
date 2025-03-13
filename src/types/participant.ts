import { Organization } from "./organozation";
import { Tournament } from "./tournament";

export interface Participant {
    participantId: string,
    organization: Organization,
}
export interface ParticipantRequest {
    tournament: string,
    organization: string
}

export interface ParticipantTournament{
    participantId: string,
    organization: Organization,
    tournament: Tournament
}