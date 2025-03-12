import { Carts } from './Carts';
import { ParticipantTournament } from './participant';
export interface Match {
        matchId: string,
        participant1: ParticipantTournament,
        participant2: ParticipantTournament,
        comments:string,
        matchResult: MatchResult,
        carts: MatchCarts,
        matchTime: string,
        createdAt: string,
        updatedAt: string
}



export interface MatchResult{
    participant1: number,
    participant2: number
}

export interface MatchCarts{
    participant1: Carts,
    participant2: Carts,
}

export interface MatchRequest {
    startTime: string,
    intervalDays: number,
    matchesPerDay: number,
    roundGapHours: number
}


export interface UpdateMatchRequest {
    comments?: string,
    matchResult: MatchResult,
    carts: MatchCarts
}