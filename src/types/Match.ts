import { Carts } from './Carts';
import { Participant } from './participant';
export interface Match {
        matchId: string,
        participant1: Participant
        participant2: Participant,
        comments:string,
        matchResult: MatchResult,
        matchCarts: MatchCarts,
        matchTime: string,
        createdAt: string,
        updatedAt: string
}

export interface MatchResult{
    Participant1: number,
    Participant2: number
}

export interface MatchCarts{
    participant1: Carts,
    participant2: Carts,
}