import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from "react";

const Auth = lazy(() => import("../commun/layouts/Auth"));
const Admin = lazy(() => import("../commun/layouts/Admin"));
const ClientLayout = lazy(() => import("../commun/layouts/Client"));
const Login = lazy(() => import("../modules/auth/pages/Login"));
const Register = lazy(() => import("../modules/auth/pages/Register"));
const UpdatePassword = lazy(() => import("../modules/auth/pages/update-password"));
const ForgetPassword = lazy(() => import("../modules/auth/pages/forget-password"));
const TournamentsManagement = lazy(() => import("../modules/client/pages/tournament/tournament"));
const Organizations = lazy(() => import("../modules/client/pages/organization/organization"));
const ParticipatedTournaments = lazy(() => import("../modules/client/pages/tournament/participated-tournaments"));
const Statistics = lazy(() => import("../modules/client/pages/statistic"));
const Dashboard = lazy(() => import("../modules/client/pages/dashboard"));
const DashboardHome = lazy(() => import("../modules/admin/pages/dashboard"));
const TournamentManagement = lazy(() => import("../modules/admin/layouts/tournament"));
const TournamentList = lazy(() => import("../modules/admin/pages/Tournament-list"));
const TournamentForm = lazy(() => import("../modules/admin/pages/tournament-form"));
const TournamentInfo = lazy(() => import("../modules/admin/pages/tournament-info"));
const TournamentuInfo = lazy(() => import("../modules/client/pages/tournament/tournament-info"));
const TournamentFormP = lazy(() => import("../modules/client/pages/tournament/tournament-form"));
const OrganizationForm = lazy(() => import("../modules/client/pages/organization/organization-form"));
const OrganizationInfo = lazy(() => import("../modules/client/pages/organization/organization-info"));
const AvailableTournaments = lazy(() => import("../modules/client/pages/tournament/available-tournaments"));


const AppRouter = () => {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />}>
            <Route path="sign-in" element={<Login />} />
            <Route path="sign-up" element={<Register />} />
            <Route path="update-password" element={<UpdatePassword />} />
            <Route path="forget-password" element={<ForgetPassword />} />
          </Route>
          <Route path="/c" element={<ClientLayout />}>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="tournaments/me" element={<TournamentsManagement/>}/>
            <Route path="tournaments" element={<AvailableTournaments/>}/>
            <Route path="tournaments/:tournamentId" element={<TournamentuInfo/>}/>
            <Route path="organizations" element={<Organizations/>}/>
            <Route path="organizations/create" element={<OrganizationForm/>}/>
            <Route path="organizations/edit/:organizationId" element={<OrganizationForm/>}/>
            <Route path="organizations/:organizationId" element={<OrganizationInfo/>}/>
            <Route path="participated-tournaments" element={<ParticipatedTournaments/>}/>
            <Route path="statistics" element={<Statistics/>}/>
            <Route path="tournaments/create" element={<TournamentFormP/>}/>
            <Route path="tournaments/edit/:tournamentId" element={<TournamentFormP/>}/>
          </Route>
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Admin />}>
            <Route path="" element={<DashboardHome />} />
            <Route path="tournaments" element={<TournamentManagement />} >
              <Route path="" element={<TournamentList />} />
              <Route path="create" element={<TournamentForm />} />
              <Route path="edit/:tournamentId" element={<TournamentForm />} />
              <Route path=":tournamentId" element={<TournamentInfo />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default AppRouter;