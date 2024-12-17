import PropTypes from "prop-types";
import { createPortal } from "react-dom";

const DropDown = ({ identifier, isOpen, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="absolute right-2 top-[90%] z-10 w-fit rounded-md bg-sky-900 p-2 text-white">
      {children}
    </div>,
    document.getElementById(identifier),
  );
};

DropDown.propTypes = {
  identifier: PropTypes.string,
  isOpen: PropTypes.bool,
  children: PropTypes.node,
};

export default DropDown;
