import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import UnauthorizedPage from "../modules/errors/401";
import ForbiddenPage from "../modules/errors/403";
import ServerErrorPage from "../modules/errors/500";
import NotFoundPage from "../modules/errors/404";
const AllTournaments = lazy(() => import("../modules/admin/pages/tournament/all-tournament"));
const ProfilePage = lazy(() => import("../modules/profile/pages/profile"));
const UserManagement = lazy(() => import("../modules/admin/pages/users"));
const Auth = lazy(() => import("../commun/layouts/Auth"));
const Admin = lazy(() => import("../commun/layouts/Admin"));
const ClientLayout = lazy(() => import("../commun/layouts/Client"));
const Login = lazy(() => import("../modules/auth/pages/Login"));
const Register = lazy(() => import("../modules/auth/pages/Register"));
const UpdatePassword = lazy(() => import("../modules/auth/pages/update-password"));
const ForgetPassword = lazy(() => import("../modules/auth/pages/forget-password"));
const TournamentsManagement = lazy(() => import("../modules/client/pages/tournament/tournament"));
const Organizations = lazy(() => import("../modules/client/pages/organization/organization"));
const Statistics = lazy(() => import("../modules/client/pages/statistic"));
const Dashboard = lazy(() => import("../modules/client/pages/dashboard"));
const DashboardHome = lazy(() => import("../modules/admin/pages/dashboard"));
const TournamentManagement = lazy(() => import("../modules/admin/layouts/tournament"));
const TournamentList = lazy(() => import("../modules/admin/pages/tournament/tournament-list"));
const TournamentForm = lazy(() => import("../modules/admin/pages/tournament/tournament-form"));
const TournamentInfo = lazy(() => import("../modules/admin/pages/tournament/tournament-info"));
const TournamentuInfo = lazy(() => import("../modules/client/pages/tournament/tournament-info"));
const TournamentFormP = lazy(() => import("../modules/client/pages/tournament/tournament-form"));
const OrganizationForm = lazy(() => import("../modules/client/pages/organization/organization-form"));
const OrganizationInfo = lazy(() => import("../modules/client/pages/organization/organization-info"));
const OrganizationInfoA = lazy(() => import("../modules/admin/pages/organization/organization-info"));
const OrganizationList = lazy(() => import("../modules/admin/pages/organization/organization-list"));
const AvailableTournaments = lazy(() => import("../modules/client/pages/tournament/available-tournament"));
const AvailableTournamentA = lazy(() => import("../modules/admin/pages/tournament/available-tournament"));


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
            <Route path="profile" element={<ProfilePage />} />
            <Route path="tournaments" element={<TournamentManagement />} >
              <Route path="" element={<TournamentsManagement/>}/>
              <Route path="available" element={<AvailableTournaments/>}/>
              <Route path=":tournamentId" element={<TournamentuInfo/>}/>
              <Route path="create" element={<TournamentFormP/>}/>
              <Route path="edit/:tournamentId" element={<TournamentFormP/>}/>
            </Route>
            <Route path="organizations" element={<Organizations/>}/>
            <Route path="organizations/create" element={<OrganizationForm/>}/>
            <Route path="organizations/edit/:organizationId" element={<OrganizationForm/>}/>
            <Route path="organizations/:organizationId" element={<OrganizationInfo/>}/>
            <Route path="statistics" element={<Statistics/>}/>
          </Route>
          {/* Dashboard Routes */}
          <Route path="/a" element={<Admin />}>
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="organizations" element={<OrganizationList />} />
            <Route path="organizations/:organizationId" element={<OrganizationInfoA />} />
            <Route path="tournaments" element={<TournamentManagement />} >
              <Route path="all" element={<AllTournaments/>} />
              <Route path="" element={<TournamentList />} />
              <Route path="create" element={<TournamentForm />} />
              <Route path="edit/:tournamentId" element={<TournamentForm />} />
              <Route path=":tournamentId" element={<TournamentInfo />}/>
              <Route path="available" element={<AvailableTournamentA />}/>
            </Route>
          </Route>


            {/* Error Routes */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/forbidden" element={<ForbiddenPage />} />
          <Route path="/server-error" element={<ServerErrorPage />} />

            {/* 404 - Not Found - This should be the last route */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default AppRouter;