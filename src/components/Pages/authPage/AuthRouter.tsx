import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface AuthRouterProps {
  element: React.ReactNode;
}

const AuthRouter: React.FC<AuthRouterProps> = ({ element }) => {
  const isAuth = useSelector((state: { auth: { isAuth: boolean } }) => state.auth.isAuth);
  const authToken = localStorage.getItem("user") !== null;

  if (authToken) {
    // Redirect to home if the user is authenticated
    return <Navigate to="/" />;
  }

  // Return the element (will be wrapped in a Route in App component)
  return <>{element}</>;
};

export default AuthRouter;
