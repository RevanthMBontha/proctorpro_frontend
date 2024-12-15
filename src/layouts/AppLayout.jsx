import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const AppLayout = () => {
  return (
    <div className="w-screen h-screen flex">
      <Navbar />
      <div className="w-full flex flex-col flex-grow h-full">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
