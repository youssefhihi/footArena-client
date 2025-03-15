import { Participant, ParticipantRequest } from './../../types/participant';
import { create } from 'zustand';
import TournamentService from '../service/tournament-service';
import { toast } from 'react-toastify';
import { Tournament, TournamentRequest, TournamentStatus } from '../../types/tournament';
import { ParticipantService } from '../service/participant-service';

interface TournamentState {
  tournaments: Tournament[];
  availableTournaments: Tournament[];
  allTournaments: Tournament[];
  isLoading: boolean;
  error: Record<string, string> | null;
  fetchTournaments: () => Promise<void>;
  createTournament: (data: TournamentRequest) => Promise<boolean>;
  updateTournament: (id: string, data: TournamentRequest) => Promise<boolean>;
  softDeleteTournament: (id: string) => Promise<void>;
  restoreTournament: (id: string) => Promise<void>;
  forceDeleteTournament: (id: string) => Promise<void>;
  getTournamentById: (id: string) => Promise<Tournament | undefined | null>;
  getAvailableTournaments: () => Promise<void>;
  participateToTournament: (data: ParticipantRequest) => Promise<Participant | undefined>;
  deleteParticipantFromTournament: (particpantId: string) => Promise<void>;
  updateTournamentStatus: (tournamentId: string, newStatus: TournamentStatus) => Promise<void>
  getAllTournaments: () => Promise<void>
}

export const useTournamentStore = create<TournamentState>((set,get) => ({
  tournaments: [],
  availableTournaments: [],
  allTournaments: [],
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
    if(get().tournaments?.length > 0) {
      set({ isLoading: false });
      return;
    }
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

  getAvailableTournaments: async () => {
    set({ isLoading: true, error: null });
    if(get().availableTournaments.length > 0){
      set({ isLoading: false });
      return;
    } 
    const response = await TournamentService.getAvailableTournaments();
    if (!response.success) {
      if (Array.isArray(response.errors)) {
        response.errors.forEach((err) => toast.error(err));
      } else {
        toast.error(response.errors?.message || 'Failed to create tournament');
      }
      return;
    }
    set({ availableTournaments: response.data, isLoading: false });
  },

  participateToTournament: async (data) => {
    set({ isLoading: true, error: null });
      const response = await ParticipantService.participateTotournament(data);
      if (!response.success) {
        set({ error: response.errors, isLoading: false });
        if (Array.isArray(response.errors)) {
          response.errors.forEach((err) => toast.error(err));
        } else {
          toast.error(response.errors?.message || 'Failed to Join this tournament');
        }
        return;
      }
      set({ 
        availableTournaments: [...get().availableTournaments.map((t) => t.tournamentId === data.tournament ? {...t, participants: [...t.participants, response.data ?? {} as Participant]} : t)],
        isLoading: false });
      toast.success(response.message);
      return response.data;
  },
  deleteParticipantFromTournament: async (particpantId) => {
    set({ isLoading: true });
      const response = await ParticipantService.deleteParticipant(particpantId);
      if (!response.success) {
        set({ error: response.errors, isLoading: false });
        if (Array.isArray(response.errors)) {
          response.errors.forEach((err) => toast.error(err));
        } else {
          toast.error(response.errors?.message || 'Failed to Join this tournament');
        }
        return;
      }
      set((state) => ({
        availableTournaments: state.availableTournaments.map((tournament) => ({
          ...tournament,
          participants: tournament.participants.filter((p) => p.participantId !== particpantId),
        })),
        tournaments: state.tournaments.map((tournament) => ({
          ...tournament,
          participants: tournament.participants.filter((p) => p.participantId !== particpantId),
        })),
        allTournaments: state.allTournaments.map((tournament) => ({
          ...tournament,
          participants: tournament.participants.filter((p) => p.participantId !== particpantId),
        })),
        isLoading: false,
      }));
     
      toast.success(response.message);
  },

  updateTournamentStatus: async(tournamentId, newStatus) =>{
      set({ isLoading: true, error: null});
     const response = await TournamentService.updateStatus(tournamentId, newStatus);
     if (!response.success) {
      set({ error: response.errors, isLoading: false });
      if (Array.isArray(response.errors)) {
        response.errors.forEach((err) => toast.error(err));
      } else {
        toast.error(response.errors?.message || 'Failed to Join this tournament');
      }
      return;
    }
    set((state) => ({
      tournaments: state.tournaments.map((t) =>
        t.tournamentId === tournamentId ? response.data ?? t : t
      ),
      allTournaments: state.allTournaments.map((t) =>
        t.tournamentId === tournamentId ? response.data ?? t : t
      ),
      availableTournaments: state.availableTournaments.map((t) =>
        t.tournamentId === tournamentId ? response.data ?? t : t
      ),
      isLoading: false,
    }));
    toast.success(response.message);
  },
  getAllTournaments: async () => {
    set({ isLoading: true, error: null });
    if(get().allTournaments?.length > 0) {
      set({ isLoading: false });
      return;
    }
      const response = await TournamentService.getAllTournaments();
      if (!response.success) {
        set({ error: response.errors, isLoading: false });
        toast.error(response.message);
        return;
      }
      set({ allTournaments: response.data, isLoading: false });
  },
}));