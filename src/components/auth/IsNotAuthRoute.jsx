import { Navigate, Outlet } from "react-router";

const IsNotAuthRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Outlet />;
  else return <Navigate to={"/test-admin"} />;
};

export default IsNotAuthRoute;
