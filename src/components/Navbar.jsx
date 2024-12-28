import { useState } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { VscNewFile } from "react-icons/vsc";
import { FaUser } from "react-icons/fa6";
import { Link } from "react-router";

const Navbar = () => {
  const [isActive, setIsActive] = useState("");
  return (
    <div className="flex h-full w-72 flex-grow-0 flex-col items-center justify-start gap-y-4 bg-sky-950 text-white transition-all duration-300">
      {/* Logo for the App */}
      <Link
        to="/"
        className="flex h-16 w-full cursor-pointer items-center justify-center gap-x-2 shadow-md"
      >
        <FaGraduationCap size={28} />
        <span className="text-xl font-semibold">ProctorPro</span>
      </Link>

      {/* Link to Home */}
      <Link
        to="/test-admin"
        onClick={() => setIsActive("home")}
        className={`flex w-3/4 items-center justify-start gap-x-2 rounded-md p-2 text-neutral-400 hover:bg-white hover:bg-opacity-20 hover:text-white ${isActive === "home" ? "bg-white bg-opacity-20 text-white" : ""}`}
      >
        <FaHome />
        <span>Home</span>
      </Link>

      {/* <Link
        className="flex w-3/4 items-center justify-start gap-x-2 rounded-md p-2 text-neutral-400 hover:bg-white hover:bg-opacity-20 hover:text-white"
        to="/test-admin/recent"
      >
        Recent Tests
      </Link> */}

      {/* Link to Create and edit Tests */}
      <Link
        to="/test-admin/create"
        onClick={() => setIsActive("create")}
        className={`flex w-3/4 items-center justify-start gap-x-2 rounded-md p-2 text-neutral-400 hover:bg-white hover:bg-opacity-20 hover:text-white ${isActive === "create" ? "bg-white bg-opacity-20 text-white" : ""}`}
      >
        <VscNewFile />
        <span>Create Test</span>
      </Link>

      {/* Link to access user Account */}
      <Link
        to="/test-admin/account"
        onClick={() => setIsActive("account")}
        className={`flex w-3/4 items-center justify-start gap-x-2 rounded-md p-2 text-neutral-400 hover:bg-white hover:bg-opacity-20 hover:text-white ${isActive === "account" ? "bg-white bg-opacity-20 text-white" : ""}`}
      >
        <FaUser />
        <span>Account</span>
      </Link>
    </div>
  );
};

export default Navbar;
