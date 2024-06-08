import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { Navigate, Outlet } from "react-router-dom";



export default function ProtectedRoutes() {
    const { user, isLoading } = useContext(UserContext);
    if (isLoading) {
      return <h1>Loading...</h1>;
    }
    if (!isLoading && !user) {
      return <Navigate to="/signin" />;
    }
    if (!isLoading && user) {
      return (
      <>
      <Outlet />
      </>)
    }
}
