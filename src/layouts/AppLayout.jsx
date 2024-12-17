import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const AppLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-y-auto">
      <Navbar />
      <div className="flex h-full w-full flex-grow flex-col">
        <Header />
        <div className="flex h-full w-full flex-grow overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
