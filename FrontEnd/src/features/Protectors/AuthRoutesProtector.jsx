import { Navigate, Outlet } from "react-router-dom";
import useLoginData from "../Login/useLoginData";
import PageLoader from "../../ui/PageLoader";

function AuthRoutesProtector() {
  const { data, isLoading } = useLoginData();
  if (isLoading) return <PageLoader />;
  if (data?.error) return <Outlet />; //error means user is not authenticated
  return <Navigate to="/user/dashboard" />;
}

export default AuthRoutesProtector;
