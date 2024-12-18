import { useState } from "react";
import useTestStore from "../store/test.store";

const TestDetails = () => {
  const name = useTestStore((state) => state.name);
  const description = useTestStore((state) => state.description);

  const setTestName = useTestStore((state) => state.setTestName);
  const setTestDescription = useTestStore((state) => state.setTestDescription);

  const [isNameSelected, setIsNameSelected] = useState(false);
  const [isDescSelected, setIsDescSelected] = useState(false);

  const handleClickName = () => {
    setIsNameSelected(true);
    setTimeout(() => {
      document.getElementById("testName").focus();
    }, 0);
  };

  const handleClickDesc = () => {
    setIsDescSelected(true);
    setTimeout(() => {
      document.getElementById("testDesc").focus();
    }, 0);
  };

  return (
    <div className="absolute bottom-4 left-4 flex flex-col items-start justify-end gap-y-2">
      {/* Test Name */}
      {isNameSelected ? (
        <input
          id="testName"
          className="h-fit w-[350px] rounded-md border border-neutral-300 bg-black bg-opacity-40 p-2 text-3xl font-bold text-white focus:outline-none"
          value={name}
          onBlur={() => setIsNameSelected(false)}
          onChange={(e) => setTestName(e.target.value)}
        />
      ) : (
        <span
          className={`w-[350px] rounded-md border border-neutral-300 bg-black bg-opacity-40 p-2 text-3xl font-bold ${name.length > 0 ? "text-white" : "text-neutral-200"}`}
          onClick={handleClickName}
        >
          {name.length > 0 ? name : "Enter the test name"}
        </span>
      )}

      {/* Test Description */}
      {isDescSelected ? (
        <input
          id="testDesc"
          className="w-[450px] rounded-md border border-neutral-300 bg-black bg-opacity-40 p-2 text-white focus:outline-none"
          value={description}
          onBlur={() => setIsDescSelected(false)}
          onChange={(e) => setTestDescription(e.target.value)}
        />
      ) : (
        <span
          className={`w-[450px] rounded-md border border-neutral-300 bg-black bg-opacity-40 p-2 ${description.length > 0 ? "text-white" : "text-neutral-100"}`}
          onClick={handleClickDesc}
        >
          {description.length > 0 ? description : "Enter the test description"}
        </span>
      )}
    </div>
  );
};

export default TestDetails;
