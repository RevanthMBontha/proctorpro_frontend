import { useNavigate } from "react-router";
import { FaEllipsisVertical, FaPlus } from "react-icons/fa6";
import Button from "../components/Button";

const CreateTest = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex flex-grow flex-col gap-y-8 overflow-y-auto p-8">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">My Tests</h1>
        <hr className="border-neutral-300" />
      </div>

      {/* List of created Tests */}
      <div className="grid flex-1 grid-cols-3 gap-4 p-4">
        {/* Create new Test */}
        <Button
          onClick={() => navigate("/test-admin/create/new")}
          className="flex h-28 w-full cursor-pointer rounded-lg border-2 border-dashed border-sky-700 bg-neutral-200 p-0"
        >
          <div className="flex h-full flex-[1] flex-col items-center justify-center p-2">
            <FaPlus className="aspect-square h-full w-full text-green-700" />
            <span className="text-lg text-green-700">Add New</span>
          </div>
          <div className="flex h-full flex-[2] items-start justify-start p-2 text-start text-sm">
            MCQs, Categorizations, Fill in the Blanks, and Comprehensions are
            supported.
          </div>
        </Button>

        {/* Get a list of created Tests */}
        {user.tests.map((item, index) => (
          <Button
            key={index + 1}
            onClick={() => navigate(`/test-admin/create/${item}`)}
            className="flex h-28 w-full cursor-pointer rounded-lg border-none bg-neutral-200 p-0"
          >
            <div className="flex h-full flex-[1] flex-col items-center justify-center rounded-md rounded-r-none bg-pink-400 p-2">
              <p className="text-6xl text-white">{item}</p>
            </div>
            <div className="relative flex h-full flex-[2] flex-col items-start justify-start gap-y-1 p-2 text-start text-base">
              <p className="text-2xl">Test Title</p>
              <p>Test Description</p>
              <Button className="absolute right-2 top-2 border-none p-1">
                <FaEllipsisVertical />
              </Button>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CreateTest;
