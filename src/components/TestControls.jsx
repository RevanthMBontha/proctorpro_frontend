import { FaRegImage, FaEye, FaEllipsisVertical } from "react-icons/fa6";
import Button from "./Button";
import useTestStore from "../store/test.store";

const TestControls = () => {
  const setTestImg = useTestStore((state) => state.setTestImg);

  const handleImgChange = (e) => {
    setTestImg(e.target.files[0]);
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
      />
      <Button className="aspect-square border-none p-2">
        <FaEye className="text-white" size={24} />
      </Button>
      <Button className="aspect-square border-none p-2">
        <FaEllipsisVertical className="text-white" size={24} />
      </Button>
    </div>
  );
};

export default TestControls;
