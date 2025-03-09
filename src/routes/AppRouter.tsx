import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../commun/layouts/Auth";
import Admin from "../commun/layouts/Admin";
import DashboardPage from "../commun/layouts/Client";
import ClientLayout from "../commun/layouts/Client";
import { Login } from "../modules/auth/pages/Login";
import { Register } from "../modules/auth/pages/Register";
import { UpdatePassword } from "../modules/auth/pages/update-password";
import { ForgetPassword } from "../modules/auth/pages/forget-password";
import TournamentsManagement from "../modules/client/pages/tournament/tournament";
import Organizations from "../modules/client/pages/organization/organization";
import ParticipatedTournaments from "../modules/client/pages/tournament/participated-tournaments";
import Statistics from "../modules/client/pages/statistic";
import Dashboard from "../modules/client/pages/dashboard";
import DashboardHome from "../modules/admin/pages/dashboard";
import TournamentManagement from "../modules/admin/layouts/tournament";
import TournamentList from "../modules/admin/pages/Tournament-list";
import { TournamentForm } from "../modules/admin/pages/tournament-form";
import TournamentInfo from "../modules/admin/pages/tournament-info";
import TournamentuInfo from "../modules/client/pages/tournament/tournament-info";
import { TournamentFormP } from "../modules/client/pages/tournament/tournament-form";
import OrganizationForm from "../modules/client/pages/organization/organization-form";
import OrganizationInfo from "../modules/client/pages/organization/organization-info";


const AppRouter = () => {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/auth" element={<Auth />}>
            <Route path="sign-in" element={<Login />} />
            <Route path="sign-up" element={<Register />} />
            <Route path="update-password" element={<UpdatePassword />} />
            <Route path="forget-password" element={<ForgetPassword />} />
          </Route>
          <Route path="/c" element={<ClientLayout />}>
            <Route path="dashboard" element={<Dashboard/>}/>
            <Route path="tournaments/me" element={<TournamentsManagement/>}/>
            <Route path="tournaments" element={<TournamentsManagement/>}/>
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