import {ParticipantTournament } from './participant';
import { Carts } from "./Carts";

export interface Round {
    roundRobinId: string;
    points: number;
    losses: number;
    wins: number;
    draws: number;
    goals: number;
    carts: Carts;
    participant: ParticipantTournament
}