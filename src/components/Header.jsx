import { FaAngleDown } from "react-icons/fa6";
import Button from "./Button";
import { useState } from "react";
import DropDown from "./portals/DropDown";

const Header = () => {
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  return (
    <div className="flex h-16 w-full flex-shrink-0 items-center justify-end bg-neutral-200 shadow-md">
      <div className="relative h-full w-fit">
        <Button
          id="header-dropdown"
          onClick={() => setIsDropDownOpen(!isDropdownOpen)}
          className="flex h-full items-center gap-x-2 rounded-none border-none bg-white"
        >
          Hey, User 👋 <FaAngleDown />
        </Button>
        <DropDown identifier="header-dropdown" isOpen={isDropdownOpen}>
          <div className="flex w-fit flex-col">
            <p
              onClick={() => {
                setIsDropDownOpen(!isDropdownOpen);
              }}
              className="rounded-md p-2 px-6 hover:bg-sky-500"
            >
              Account
            </p>
            <p
              onClick={() => {
                setIsDropDownOpen(!isDropdownOpen);
              }}
              className="rounded-md p-2 px-6 hover:bg-sky-500"
            >
              Logout
            </p>
          </div>
        </DropDown>
      </div>
    </div>
  );
};

export default Header;
