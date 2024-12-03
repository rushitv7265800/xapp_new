import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface AuthRouterProps {
  element: React.ReactNode;
}
const isAuthenticated = () => {
  // Replace with actual authentication logic (e.g., check token or user state)
  return 
};


const PrivateRouter: React.FC<AuthRouterProps> = ({ element }) => {
  const isAuth = useSelector((state: { auth: { isAuth: boolean } }) => state.auth.isAuth);
  const authToken =localStorage.getItem("user") !== null;

  console.log("authToken",authToken)
  if (authToken) {
    return <>{element}</>;
  }
  return <Navigate to="/" />;

};

export default PrivateRouter;
