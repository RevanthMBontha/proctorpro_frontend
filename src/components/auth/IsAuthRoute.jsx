import { Navigate, Outlet } from "react-router";

const IsAuthRoute = () => {
  let isAuthorized = false;

  if (Date.now() < parseInt(localStorage.getItem("exp"))) isAuthorized = true;

  if (isAuthorized) return <Outlet />;
  else return <Navigate to={"/authenticate"} />;
};

export default IsAuthRoute;
