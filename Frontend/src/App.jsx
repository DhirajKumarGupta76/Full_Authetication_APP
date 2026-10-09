import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Verify from "./pages/Verify.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";

import Navbar from './components/Home/Navbar';
import ProtectedRoutes from "./components/Home/ProtectedRoutes";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from './pages/VerifyOTP';
import ChangePassword from "./pages/ChangePassword";
//The router's job is to look at the browser URL and decide which React component should be displayed.
const router = createBrowserRouter([
  {
    path: "/",
    element: <><ProtectedRoutes><Navbar/><Home /></ProtectedRoutes> </> ,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/verify",
    element: <VerifyEmail />,
  },
  {
    path: "/verify/:token",
    element: <Verify />,
  },
  {
    path: "/login",
    element: <Login />,
  },
   {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify-otp/:email",
    element: <VerifyOTP />,
  },
   {
    path: "/change-password/:email",
    element: <ChangePassword />,
  },
]);
const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
