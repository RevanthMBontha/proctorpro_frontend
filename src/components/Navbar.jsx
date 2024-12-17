import { FaGraduationCap } from "react-icons/fa6";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="flex h-full w-32 flex-grow-0 flex-col items-center justify-start gap-y-4 bg-sky-950 text-white transition-all duration-300">
      <Link
        to="/"
        className="flex h-16 w-full cursor-pointer items-center justify-center gap-x-2 shadow-md"
      >
        <FaGraduationCap size={28} />
        <span className="text-xl font-semibold">ProctorPro</span>
      </Link>
      <Link
        className="flex w-3/4 items-center justify-start gap-x-2 rounded-md p-2 text-neutral-400 hover:bg-white hover:bg-opacity-20 hover:text-white"
        to="/test-admin"
      >
        Home
      </Link>

      {/* <Link
        className="flex w-3/4 items-center justify-start gap-x-2 rounded-md p-2 text-neutral-400 hover:bg-white hover:bg-opacity-20 hover:text-white"
        to="/test-admin/recent"
      >
        Recent Tests
      </Link> */}

      <Link
        className="flex w-3/4 items-center justify-start gap-x-2 rounded-md p-2 text-neutral-400 hover:bg-white hover:bg-opacity-20 hover:text-white"
        to="/test-admin/create"
      >
        Create Test
      </Link>

      <Link
        className="flex w-3/4 items-center justify-start gap-x-2 rounded-md p-2 text-neutral-400 hover:bg-white hover:bg-opacity-20 hover:text-white"
        to="/test-admin/account"
      >
        Account
      </Link>
    </div>
  );
};

export default Navbar;
