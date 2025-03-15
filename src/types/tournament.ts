import { User } from "./user";
import { Participant } from "./participant";

export interface Tournament {
    tournamentId : string;
    image:string,
    title : string;
    description : string;
    maxParticipants : number;
    isTeams : boolean;
    status : TournamentStatus;
    createdAt : string;
    deletedAt : string;
    startTime : string;
    participants : Participant[];
    user: User
}

export enum TournamentStatus {
    Cancelled = "Cancelled",
    Completed = "Completed",
    OnGoing = "OnGoing",
    NotStarted = "NotStarted"
}

export interface TournamentRequest{
    title: string,
    description: string,
    maxParticipants: number,
    isTeams: boolean
    startTime: Date
}