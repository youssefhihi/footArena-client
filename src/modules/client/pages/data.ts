import { Role, User } from "../../../types/auth"
import { Match } from "../../../types/Match"
import { organization, TeamMember } from "../../../types/organozation"
import { Participant } from "../../../types/participant"
import { Tournament, TournamentStatus } from "../../../types/tournament"
  // Mock Users
  export const mockUsers: User[] = [
    {
        id: "1",
        fullName: { firstName: "Lionel", lastName: "Doe" },
        username: "johndoe92",
        email: "johndoe92@example.com",
        phoneNumber: "123-456-7890",
        role: Role.ADMIN,
        isVerified: true
      },
      {
        id: "2",
        fullName: { firstName: "Alice", lastName: "Smith" },
        username: "alice_smith",
        email: "alice.smith@example.com",
        phoneNumber: "234-567-8901",
        role: Role.USER,
        isVerified: false
      },
      {
        id: "3",
        fullName: { firstName: "Michael", lastName: "Brown" },
        username: "michael_b",
        email: "michael.b@example.com",
        role: Role.ADMIN,
        isVerified: true
      },
      {
        id: "4",
        fullName: { firstName: "Emily", lastName: "Davis" },
        username: "emilyd",
        email: "emily.d@example.com",
        phoneNumber: "345-678-9012",
        role: Role.USER,
        isVerified: true
      },
      {
        id: "5",
        fullName: { firstName: "Robert", lastName: "Wilson" },
        username: "robertw",
        email: "robert.w@example.com",
        role: Role.ADMIN,
        isVerified: false
      },
      {
        id: "6",
        fullName: { firstName: "Sarah", lastName: "Miller" },
        username: "sarah_m",
        email: "sarah.m@example.com",
        phoneNumber: "456-789-0123",
        role: Role.USER,
        isVerified: true
      },
      {
        id: "7",
        fullName: { firstName: "David", lastName: "Martinez" },
        username: "davidm",
        email: "david.m@example.com",
        role: Role.ADMIN,
        isVerified: false
      },
      {
        id: "8",
        fullName: { firstName: "Jessica", lastName: "Taylor" },
        username: "jessica_t",
        email: "jessica.t@example.com",
        phoneNumber: "567-890-1234",
        role: Role.USER,
        isVerified: true
      },
      {
        id: "9",
        fullName: { firstName: "Daniel", lastName: "Anderson" },
        username: "daniel_a",
        email: "daniel.a@example.com",
        role: Role.ADMIN,
        isVerified: true
      },
      {
        id: "10",
        fullName: { firstName: "Laura", lastName: "White" },
        username: "laura_w",
        email: "laura.w@example.com",
        phoneNumber: "678-901-2345",
        role: Role.USER,
        isVerified: false
      },
  ]
    // Mock Team Members
    export const mockTeamMembers: TeamMember[] = [
        {
          teamMemberId: "tm1",
          role: "Captain",
          user: mockUsers[0],
          joinedAt: new Date("2022-01-15"),
          isActive: true,
        },
        {
          teamMemberId: "tm2",
          role: "Player",
          user: mockUsers[1],
          joinedAt: new Date("2022-02-20"),
          isActive: true,
        },
        {
          teamMemberId: "tm3",
          role: "Player",
          user: mockUsers[2],
          joinedAt: new Date("2022-03-10"),
          isActive: true,
        },
        {
          teamMemberId: "tm4",
          role: "Coach",
          user: mockUsers[3],
          joinedAt: new Date("2022-01-05"),
          isActive: true,
        },
        {
          teamMemberId: "tm5",
          role: "Player",
          user: mockUsers[4],
          joinedAt: new Date("2022-04-15"),
          isActive: false,
        },
      ]
      
      // Mock Organizations
      export const mockOrganizations: organization[] = [
        {
          organizationId: "o1",
          name: "FC Barcelona",
          description: "One of the most successful football clubs in the world, known for its distinctive style of play.",
          logo: "/placeholder.svg?height=80&width=80&text=FCB",
          isTeam: "true",
          teamMembers: mockTeamMembers.slice(0, 3),
        },
        {
          organizationId: "o2",
          name: "Real Madrid",
          description: "A professional football club based in Madrid, Spain, known for its rich history and success.",
          logo: "/placeholder.svg?height=80&width=80&text=RM",
          isTeam: "true",
          teamMembers: mockTeamMembers.slice(1, 4),
        },
        {
          organizationId: "o3",
          name: "FIFA Youth Development",
          description: "Organization focused on developing young football talent around the world.",
          logo: "/placeholder.svg?height=80&width=80&text=FIFA",
          isTeam: "false",
          teamMembers: mockTeamMembers.slice(3, 5),
        },
        {
            organizationId: "o3",
            name: "FIFA Youth Development",
            description: "Organization focused on developing young football talent around the world.",
            logo: "/placeholder.svg?height=80&width=80&text=FIFA",
            isTeam: "false",
            teamMembers: mockTeamMembers.slice(3, 5),
          },
          {
            organizationId: "o3",
            name: "FIFA Youth Development",
            description: "Organization focused on developing young football talent around the world.",
            logo: "/placeholder.svg?height=80&width=80&text=FIFA",
            isTeam: "false",
            teamMembers: mockTeamMembers.slice(3, 5),
          },
          {
            organizationId: "o3",
            name: "FIFA Youth Development",
            description: "Organization focused on developing young football talent around the world.",
            logo: "/placeholder.svg?height=80&width=80&text=FIFA",
            isTeam: "false",
            teamMembers: mockTeamMembers.slice(3, 5),
          },
          {
            organizationId: "o3",
            name: "FIFA Youth Development",
            description: "Organization focused on developing young football talent around the world.",
            logo: "/placeholder.svg?height=80&width=80&text=FIFA",
            isTeam: "false",
            teamMembers: mockTeamMembers.slice(3, 5),
          },
          {
            organizationId: "o3",
            name: "FIFA Youth Development",
            description: "Organization focused on developing young football talent around the world.",
            logo: "/placeholder.svg?height=80&width=80&text=FIFA",
            isTeam: "false",
            teamMembers: mockTeamMembers.slice(3, 5),
          },
          {
            organizationId: "o3",
            name: "FIFA Youth Development",
            description: "Organization focused on developing young football talent around the world.",
            logo: "/placeholder.svg?height=80&width=80&text=FIFA",
            isTeam: "false",
            teamMembers: mockTeamMembers.slice(3, 5),
          },
          {
            organizationId: "o3",
            name: "FIFA Youth Development",
            description: "Organization focused on developing young football talent around the world.",
            logo: "/placeholder.svg?height=80&width=80&text=FIFA",
            isTeam: "false",
            teamMembers: mockTeamMembers.slice(3, 5),
          },
      ]
  // Mock Participants
  export const mockParticipants: Participant[] = [
    {
      participantId: "p1",
      organization: mockOrganizations[0],
      
    },
    {
        participantId: "p2",
        organization: mockOrganizations[1],

    },
    {
        participantId: "p3",
        organization: mockOrganizations[2],

    },
    {
        participantId: "p4",
        organization: mockOrganizations[3],

    },
    {
        participantId: "p5",
        organization: mockOrganizations[1],

    },
    {
        participantId: "p6",
        organization: mockOrganizations[4],

    },
    {
        participantId: "p7",
        organization: mockOrganizations[3],

    },
    {
        participantId: "p8",
        organization: mockOrganizations[2],

    },
    {
        participantId: "p8",
        organization: mockOrganizations[5],

    },

  ]
  
  // Mock Tournaments
  export const mockTournaments: Tournament[] = [
    {
      tournamentId: "t1",
      image: "/placeholder.svg?height=160&width=320&text=Champions+League",
      title: "Champions League 2023",
      description: "The premier club football competition in Europe",
      maxParticipants: 32,
      isTeams: true,
      status: TournamentStatus.OnGoing,
      createdAt: "2023-05-15T10:00:00Z",
      startTime: "2023-06-01T18:00:00Z",
      participants: mockParticipants.slice(2, 6),
    },
    {
      tournamentId: "t2",
      image: "/placeholder.svg?height=160&width=320&text=World+Cup",
      title: "FIFA World Cup Qualifiers",
      description: "Qualification matches for the upcoming FIFA World Cup",
      maxParticipants: 48,
      isTeams: true,
      status: TournamentStatus.NotStarted,
      createdAt: "2023-06-10T14:30:00Z",
      startTime: "2023-07-15T16:00:00Z",
      participants: mockParticipants.slice(2, 5),
    },
    {
      tournamentId: "t3",
      image: "/placeholder.svg?height=160&width=320&text=Local+Tournament",
      title: "Local 5-a-side Tournament",
      description: "A friendly local tournament for 5-a-side teams",
      maxParticipants: 16,
      isTeams: true,
      status: TournamentStatus.Completed,
      createdAt: "2023-04-05T09:15:00Z",
      startTime: "2023-04-20T10:00:00Z",
      participants: mockParticipants.slice(2, 7),
    },
    {
      tournamentId: "t4",
      image: "/placeholder.svg?height=160&width=320&text=Friendly+Match",
      title: "Friendly Match Series",
      description: "A series of friendly matches between top players",
      maxParticipants: 8,
      isTeams: false,
      status: TournamentStatus.OnGoing,
      createdAt: "2023-05-25T11:45:00Z",
      startTime: "2023-06-05T19:30:00Z",
      participants: mockParticipants.slice(0, 2).concat(mockParticipants.slice(7, 8)),
    },
    {
      tournamentId: "t5",
      image: "/placeholder.svg?height=160&width=320&text=Cancelled",
      title: "Summer Cup 2023",
      description: "Annual summer football tournament",
      maxParticipants: 24,
      isTeams: true,
      status: TournamentStatus.Cancelled,
      createdAt: "2023-03-20T08:30:00Z",
      startTime: "2023-06-15T14:00:00Z",
      participants: mockParticipants.slice(2, 4),
    },
    {
      tournamentId: "t6",
      image: "/placeholder.svg?height=160&width=320&text=Youth+Tournament",
      title: "Youth Development Tournament",
      description: "Tournament focused on developing young football talent",
      maxParticipants: 12,
      isTeams: true,
      status: TournamentStatus.NotStarted,
      createdAt: "2023-06-01T13:20:00Z",
      startTime: "2023-07-10T09:00:00Z",
      participants: [],
    },
  ]
  

  

  
  // Mock Matches
  export const mockMatches: Match[] = [
    {
      matchId: "m1",
      participant1: mockParticipants[2], // FC Barcelona
      participant2: mockParticipants[3], // Real Madrid
      comments: "El Clásico - The biggest rivalry in club football",
      matchResult: {
        Participant1: 3,
        Participant2: 2,
      },
      matchCarts: {
        participant1: { yellow: 2, red: 0 },
        participant2: { yellow: 3, red: 1 },
      },
      matchTime: "2023-05-15T19:00:00Z",
      createdAt: "2023-05-01T10:00:00Z",
      updatedAt: "2023-05-15T21:30:00Z",
    },
    {
      matchId: "m2",
      participant1: mockParticipants[0], // Lionel Messi
      participant2: mockParticipants[1], // Cristiano Ronaldo
      comments: "The battle of the GOATs",
      matchResult: {
        Participant1: 1,
        Participant2: 1,
      },
      matchCarts: {
        participant1: { yellow: 0, red: 0 },
        participant2: { yellow: 1, red: 0 },
      },
      matchTime: "2023-05-20T18:30:00Z",
      createdAt: "2023-05-05T14:20:00Z",
      updatedAt: "2023-05-20T20:45:00Z",
    },
    {
      matchId: "m3",
      participant1: mockParticipants[4], // Manchester City
      participant2: mockParticipants[6], // Liverpool
      comments: "Premier League top clash",
      matchResult: {
        Participant1: 2,
        Participant2: 2,
      },
      matchCarts: {
        participant1: { yellow: 1, red: 0 },
        participant2: { yellow: 2, red: 0 },
      },
      matchTime: "2023-06-10T17:45:00Z",
      createdAt: "2023-05-25T09:30:00Z",
      updatedAt: "2023-06-10T20:00:00Z",
    },
    {
      matchId: "m4",
      participant1: mockParticipants[5], // Bayern Munich
      participant2: mockParticipants[4], // Manchester City
      comments: "Champions League semi-final",
      matchResult: {
        Participant1: 0,
        Participant2: 0,
      },
      matchCarts: {
        participant1: { yellow: 1, red: 0 },
        participant2: { yellow: 0, red: 0 },
      },
      matchTime: "2023-06-20T19:00:00Z",
      createdAt: "2023-06-01T11:15:00Z",
      updatedAt: "2023-06-01T11:15:00Z",
    },
    {
      matchId: "m5",
      participant1: mockParticipants[0], // Lionel Messi
      participant2: mockParticipants[7], // Kylian Mbappé
      comments: "Friendly exhibition match",
      matchResult: {
        Participant1: 0,
        Participant2: 0,
      },
      matchCarts: {
        participant1: { yellow: 0, red: 0 },
        participant2: { yellow: 0, red: 0 },
      },
      matchTime: "2023-07-05T18:00:00Z",
      createdAt: "2023-06-15T13:45:00Z",
      updatedAt: "2023-06-15T13:45:00Z",
    },
  ]
  
  