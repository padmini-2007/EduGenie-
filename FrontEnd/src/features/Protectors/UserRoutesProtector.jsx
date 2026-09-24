import { Navigate, Outlet, useLocation } from "react-router-dom";
import useLoginData from "../Login/useLoginData";
import PageLoader from "../../ui/PageLoader";
import AppLayout from "../../ui/AppLayout";

function UserRoutesProtector() {
  const { data, isLoading } = useLoginData();
  const location = useLocation();
  if (isLoading) return <PageLoader />;
  if (!data?.error)
    // no error means user is authenticated
    return (
      <AppLayout isFooter={location.pathname.includes("/dashboard")}>
        <Outlet />
      </AppLayout>
    );
  return <Navigate to="/auth/login" />;
}

export default UserRoutesProtector;
