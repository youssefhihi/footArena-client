import { create } from 'zustand';
import TournamentService from '../service/tournament-service';
import { toast } from 'react-toastify';
import { Tournament, TournamentRequest } from '../../../../types/tournament';

interface TournamentState {
  tournaments: Tournament[];
  isLoading: boolean;
  error: Record<string, string> | null;
  fetchTournaments: () => Promise<void>;
  createTournament: (data: TournamentRequest) => Promise<boolean>;
  updateTournament: (id: string, data: TournamentRequest) => Promise<boolean>;
  softDeleteTournament: (id: string) => Promise<void>;
  restoreTournament: (id: string) => Promise<void>;
  forceDeleteTournament: (id: string) => Promise<void>;
  getTournamentById: (id: string) => Promise<Tournament | undefined | null>;
}

export const useTournamentStore = create<TournamentState>((set,get) => ({
  tournaments: [],
  isLoading: false,
  error: null,
  getTournamentById: async (id) => {
    set({ isLoading: true, error: null });
      const existingTournament = get().tournaments.find(t => t.tournamentId === id);
      if (existingTournament) {
        set({ isLoading: false });
        console.log("inside", existingTournament);
        return existingTournament;
      }
      const response = await TournamentService.getTournamentById(id);
      if (!response.success) {
        toast.error(response.message || 'Failed to get tournament');
        set({ error: response.errors, isLoading: false });
        return null;
      }
      set({ isLoading: false });
      return response.data;
  },
  fetchTournaments: async () => {
    set({ isLoading: true, error: null });
      const response = await TournamentService.getUserTournaments();
      if (!response.success) {
        set({ error: response.errors, isLoading: false });
        toast.error(response.message);
        return;
      }
      set({ tournaments: response.data, isLoading: false });
  },

  createTournament: async (data) => {
    set({ isLoading: true, error: null });
      const response = await TournamentService.createTournament(data);
      if (!response.success) {
        set({ error: response.errors, isLoading: false });
        if (Array.isArray(response.errors)) {
          response.errors.forEach((err) => toast.error(err.message));
        } else {
          toast.error(response.errors?.message || 'Failed to create tournament');
        }
        return false;
      }
      
      set((state) => ({
        tournaments: [...state.tournaments, response.data ?? {} as Tournament],
        isLoading: false,
      }));
      toast.success(response.message);
      return true;
    
  },

  updateTournament: async (id, data) => {
    set({ isLoading: true, error: null });
      const response = await TournamentService.updateTournament(id, data);
      if (!response.success) {
        set({ error: response.errors, isLoading: false });
        if (Array.isArray(response.errors)) {
          response.errors.forEach((err) => toast.error(err.message));
        } else {
          toast.error(response.errors?.message || 'Failed to update tournament');
        }
        return false;
      }
      set((state) => ({
        tournaments: state.tournaments.map((t) =>
          t.tournamentId === id ? response.data ?? t : t
        ),
        isLoading: false,
      }));
      toast.success(response.message);
      return response.success;
  },

  softDeleteTournament: async (id) => {
    set({ isLoading: true });
      const response = await TournamentService.softDeleteTournament(id);
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      set((state) => ({
        tournaments: state.tournaments.filter((t) => t.tournamentId !== id),
        isLoading: false,
      }));
      toast.success(response.message);
  },

  restoreTournament: async (id) => {
    set({ isLoading: true });
      const response = await TournamentService.restoreTournament(id);
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      set((state) => ({
        tournaments: [...state.tournaments, response.data ?? {} as Tournament],
        isLoading: false,
      }));
      toast.success(response.message);
    
  },

  forceDeleteTournament: async (id) => {
    set({ isLoading: true });
      const response = await TournamentService.forceDeleteTournament(id);
      if (!response.success) {
        set({ error: response.errors, isLoading: false });
        toast.error(response.message);
        return;
      }
      set((state) => ({
        tournaments: state.tournaments.filter((t) => t.tournamentId !== id),
        isLoading: false,
      }));
      toast.success(response.message);
  },
}));