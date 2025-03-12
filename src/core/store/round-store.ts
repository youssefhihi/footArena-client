import { create } from "zustand";
import { Round } from "../../types/Round";
import RoundService from "../service/round-service";
import { toast } from "react-toastify";

interface RoundState {
    rounds: Round[];
    isLoading: boolean;
    error: Record<string, string> | null;
    fetchTournamentRounds: (tournamentId: string) => Promise<void>;
}

export const useRoundStore = create<RoundState>((set, get) => ({
    rounds: [],
    isLoading: false,
    error: null,
    fetchTournamentRounds: async (tournamentId) => {
        set({ isLoading: true, error: null });
        const existingRounds = get().rounds.filter((round) => round.participant.tournament.tournamentId === tournamentId);
        if (existingRounds.length > 0) {
         set({ isLoading: false });
            return;
        }
        const response = await RoundService.getTournamentRounds(tournamentId);
        if (!response.success) {
            set({ error: response.errors, isLoading: false });
            toast.error(response.message);
            return;
        }
        set((state) => ({       
              rounds: [...state.rounds, ...(response.data as Round[])],
             isLoading: false 
            }));
    },
}));