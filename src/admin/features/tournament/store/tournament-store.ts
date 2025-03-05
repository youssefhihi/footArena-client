import { create } from 'zustand';
import TournamentService from '../service/tournament-service';
import { toast } from 'react-toastify';
import { Tournament, TournamentRequest } from '../../../../types/tournament';

interface TournamentState {
  tournaments: Tournament[];
  isLoading: boolean;
  error: Record<string, string> | null;
  fetchTournaments: () => Promise<void>;
  createTournament: (data: TournamentRequest) => Promise<void>;
  updateTournament: (id: string, data: TournamentRequest) => Promise<void>;
  softDeleteTournament: (id: string) => Promise<void>;
  restoreTournament: (id: string) => Promise<void>;
  forceDeleteTournament: (id: string) => Promise<void>;
}

export const useTournamentStore = create<TournamentState>((set) => ({
  tournaments: [],
  isLoading: false,
  error: null,

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
        return;
      }
      
      set((state) => ({
        tournaments: [...state.tournaments, response.data ?? {} as Tournament],
        isLoading: false,
      }));
      toast.success(response.message);
    
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
        return;
      }
      set((state) => ({
        tournaments: state.tournaments.map((t) =>
          t.tournamentId === id ? response.data ?? t : t
        ),
        isLoading: false,
      }));
      toast.success(response.message);
   
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