import { toast } from "react-toastify";
import { Match } from "../../../../types/Match";
import MatchService from "../service/match-service";
import { create } from "zustand";

interface MatchState {
    matches: Match[];
    isLoading: boolean;
    error: Record<string, string> | null;
    fetchTournamentMatches: (tournamentId: string) => Promise<void>;
}

export const useMatchStore = create<MatchState>((set, get) => ({
  matches: [],
  isLoading: false,
  error: null,
  fetchTournamentMatches: async (tournamentId) => {
    set({ isLoading: true, error: null });
    if(get().matches.length > 0) {
      set({ isLoading: false });
      return;
    }
    const response = await MatchService.getTournamentMatches(tournamentId);
    if (!response.success) {
      set({ error: response.errors, isLoading: false });
      toast.error(response.message);
      return;
    }
    set({ matches: response.data, isLoading: false });
  },
}));