import PropTypes from "prop-types";

const Input = ({ icon, width = "full", placeholder, name, type, ...props }) => {
  return (
    <div className="relative flex h-fit w-full items-center justify-start gap-x-2 rounded-md border border-neutral-300 p-2">
      {props.icon && <span className="text-neutral-400">{icon}</span>}
      <input
        {...props}
        className="flex-grow focus:outline-none"
        style={{ width: width }}
        placeholder={placeholder}
        name={name}
        type={type}
      />
    </div>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  props: PropTypes.object,
  icon: PropTypes.element,
  className: PropTypes.string,
  width: PropTypes.string,
};
export default Input;
