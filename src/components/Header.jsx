import { FaAngleDown, FaUser } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import Button from "./Button";
import { useState } from "react";
import DropDown from "./portals/DropDown";
import { useNavigate } from "react-router";

const Header = () => {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleClickAccount = () => {
    navigate("/test-admin/account");
    setIsDropDownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    navigate("/authenticate");
    localStorage.clear();
    setIsDropDownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex h-16 w-full flex-shrink-0 items-center justify-end bg-white shadow-md">
      <div className="via- h-full flex-1 bg-gradient-to-br from-green-400 via-blue-400 to-pink-400"></div>
      <div className="relative h-full w-fit">
        <Button
          id="header-dropdown"
          onClick={() => setIsDropDownOpen(!isDropdownOpen)}
          className="flex h-full items-center gap-x-2 rounded-none border border-b-0 border-r-0 border-t-0 border-neutral-300 bg-white"
        >
          Hey, {user.firstName} 👋 <FaAngleDown />
        </Button>
        <DropDown identifier="header-dropdown" isOpen={isDropdownOpen}>
          <div className="flex w-36 flex-col">
            <p
              onClick={handleClickAccount}
              className="flex items-center gap-x-2 rounded-md p-2 px-6 text-end hover:bg-sky-500"
            >
              Account <FaUser size={12} />
            </p>
            <p
              onClick={handleLogout}
              className="flex items-center gap-x-2 rounded-md p-2 px-6 text-end hover:bg-sky-500"
            >
              Logout <LuLogOut size={12} />
            </p>
          </div>
        </DropDown>
      </div>
    </div>
  );
};

export default Header;
