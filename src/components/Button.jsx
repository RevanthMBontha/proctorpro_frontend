import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

const Button = ({ className, children, ...props }) => {
  const buttonStyle = twMerge(
    "p-2 px-4 rounded-md border border-black",
    className,
  );
  return (
    <button {...props} className={buttonStyle}>
      {children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default Button;
