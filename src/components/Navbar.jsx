import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="h-full flex-grow-0 w-80 bg-sky-950 flex flex-col items-center justify-start gap-y-8 text-white duration-300 transition-all">
      <Link
        to="/"
        className="h-16 flex justify-center items-center shadow-md w-full cursor-pointer"
      >
        ProctorPro
      </Link>
      <Link
        className="w-3/4 rounded-md text-neutral-400 hover:text-white hover:bg-white hover:bg-opacity-20 p-2 flex justify-start items-center gap-x-2"
        to="/all-tests"
      >
        Home
      </Link>

      <Link
        className="w-3/4 rounded-md text-neutral-400 hover:text-white hover:bg-white hover:bg-opacity-20 p-2 flex justify-start items-center gap-x-2"
        to="/all-tests"
      >
        Recent Tests
      </Link>

      <Link
        className="w-3/4 rounded-md text-neutral-400 hover:text-white hover:bg-white hover:bg-opacity-20 p-2 flex justify-start items-center gap-x-2"
        to="/all-tests"
      >
        Create Test
      </Link>

      <Link
        className="w-3/4 rounded-md text-neutral-400 hover:text-white hover:bg-white hover:bg-opacity-20 p-2 flex justify-start items-center gap-x-2"
        to="/all-tests"
      >
        Account
      </Link>
    </div>
  );
};

export default Navbar;
