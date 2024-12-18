import { Navigate, Outlet } from "react-router";

const IsAuthRoute = () => {
  const checkVerification = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) return true;
    else return false;
  };

  if (checkVerification()) return <Outlet />;
  else return <Navigate to={"/authenticate"} />;
};

export default IsAuthRoute;
