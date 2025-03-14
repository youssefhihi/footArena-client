import { toast } from "react-toastify";
import { Match, MatchRequest, UpdateMatchRequest } from "../../types/Match";
import MatchService from "../service/match-service";
import { create } from "zustand";

interface MatchState {
    matches: Match[];
    isLoading: boolean;
    error: Record<string, string> | null;
    getAllMatches: () => Promise<void>;
    fetchTournamentMatches: (tournamentId: string) => Promise<void>;
    generateTournamentMatches: (tournamentId: string, data: MatchRequest) => Promise<void>;
    updateMatch: (matchId: string ,data: UpdateMatchRequest) => Promise<Match | undefined>
}

export const useMatchStore = create<MatchState>((set, get) => ({
  matches: [],
  isLoading: false,
  error: null,
  getAllMatches: async () => {
    set({ isLoading: true, error: null });
    if(get().matches.length > 0) { 
      set({ isLoading: false });
      return;
    }
    const response = await MatchService.getAllMatches();
    if (!response.success) {
      set({ error: response.errors, isLoading: false });
      toast.error(response.message);
      return;
    }
    set({ matches: response.data, isLoading: false });
  },
  fetchTournamentMatches: async (tournamentId) => {
    set({ isLoading: true, error: null });
    const existingMatches = get().matches.filter((match) => match.participant1.tournament.tournamentId === tournamentId);
    if(existingMatches.length > 0) {
      set({ isLoading: false });
      return;
    }
    const response = await MatchService.getTournamentMatches(tournamentId);
    if (!response.success) {
      set({ error: response.errors, isLoading: false });
      toast.error(response.message);
      return;
    }
    set({       
      matches: response.data,
      isLoading: false });
  },
  generateTournamentMatches: async (tournamentId, data) => {
    set({ isLoading: true, error: null });
    const response = await MatchService.generateTournamentMatches(tournamentId, data);
    if (!response.success) {
      set({ error: response.errors, isLoading: false });
      toast.error(response.message);
      return;
    }
    toast.success(response.message);
    set({ matches: response.data, isLoading: false });
  },

  updateMatch: async (matchId, data) => {
    set({ isLoading: true, error: null });
    const response = await MatchService.updateMatch(matchId,data);
    if (!response.success) {
      set({ error: response.errors, isLoading: false });
      toast.error(response.message);
      return;
    }
    toast.success(response.message);
    return response.data;
  }
}));