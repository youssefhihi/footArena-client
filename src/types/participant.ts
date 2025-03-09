import { Organization } from "./organozation";

export interface Participant {
    participantId: string,
    organization: Organization,
}
export interface ParticipantRequest {
    tournament: string,
    organization: string
}