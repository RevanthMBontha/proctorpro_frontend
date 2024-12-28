import { FaRegImage, FaEye, FaEllipsisVertical } from "react-icons/fa6";
import Button from "./Button";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

const TestControls = ({ setImageSelected, testId }) => {
  const navigate = useNavigate();

  const handleImgChange = (e) => {
    setImageSelected(e.target.files[0]);
  };

  return (
    <div className="absolute bottom-4 right-4 flex gap-x-2 rounded-md bg-black bg-opacity-40">
      <Button
        onClick={() => document.getElementById("testImg").click()}
        className="aspect-square border-none p-2"
      >
        <FaRegImage className="text-white" size={24} />
      </Button>
      <input
        onChange={handleImgChange}
        id="testImg"
        className="hidden"
        type="file"
        accept="image/*"
      />
      <Button
        onClick={() => navigate(`/attempt/${testId}`)}
        className="aspect-square border-none p-2"
      >
        <FaEye className="text-white" size={24} />
      </Button>
      <Button className="aspect-square border-none p-2">
        <FaEllipsisVertical className="text-white" size={24} />
      </Button>
    </div>
  );
};

TestControls.propTypes = {
  setImageSelected: PropTypes.func,
  testId: PropTypes.string,
};

export default TestControls;
