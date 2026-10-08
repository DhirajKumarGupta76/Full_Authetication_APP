import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Verify from "./pages/Verify.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";

import Navbar from './components/Home/Navbar';
import ProtectedRoutes from "./components/Home/ProtectedRoutes";
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
]);
const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
