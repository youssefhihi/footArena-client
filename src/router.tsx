import { Login} from "./features/auth/components/Login";
import { Register} from "./features/auth/components/Register";

export const routes = [
  {
    title: "auth pages",
    layout: "auth",  // Used to filter for auth layout in the Auth component
    pages: [
      {
        name: "sign in",
        path: "/sign-in",  // The path to the login page
        element: <Login />,
      },
      {
        name: "sign up",
        path: "/sign-up",  // The path to the register 
        element: <Register />,
      },
    ],
  },
];

export default routes;
