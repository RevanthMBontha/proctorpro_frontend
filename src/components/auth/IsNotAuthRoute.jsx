import { Navigate, Outlet } from "react-router";

const IsNotAuthRoute = () => {
  let isAuthorized = false;

  if (Date.now() < parseInt(localStorage.getItem("exp"))) isAuthorized = true;

  if (!isAuthorized) return <Outlet />;
  else return <Navigate to={"/test-admin"} />;
};

export default IsNotAuthRoute;
