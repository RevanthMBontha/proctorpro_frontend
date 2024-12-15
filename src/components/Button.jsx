import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

const Button = ({ className }) => {
  const buttonStyle = twMerge("p-2 px-4", className);
  return <button className={buttonStyle}>Button</button>;
};

Button.propTypes = {
  className: PropTypes.string,
};

export default Button;
