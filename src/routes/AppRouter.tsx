import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../layouts/Auth";
import { Login } from "../features/auth/components/Login";
import { Register } from "../features/auth/components/Register";
import { UpdatePassword } from "../features/auth/components/update-password";
import { ForgetPassword } from "../features/auth/components/forget-password";
import Admin from "../layouts/Admin";
import DashboardHome from "../admin/features/dashboard/components/dashboard";
import TournamentManagement from "../admin/features/tournament/components/tournament";
import { TournamentForm } from "../admin/features/tournament/components/tournament-form";
import TournamentList from "../admin/features/tournament/components/Tournament-list";
import TournamentInfo from "../admin/features/tournament/components/tournament-info";

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