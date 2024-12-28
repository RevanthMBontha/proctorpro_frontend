import PropTypes from "prop-types";
import { useState } from "react";

const TestDetails = ({ test, setTest }) => {
  const [isTitleSelected, setIsTitleSelected] = useState(false);
  const [isDescSelected, setIsDescSelected] = useState(false);

  const handleClickName = () => {
    setIsTitleSelected(true);
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
      {isTitleSelected ? (
        <input
          id="testName"
          className="h-fit w-[350px] rounded-md border border-neutral-300 bg-black bg-opacity-40 p-2 text-3xl font-bold text-white focus:outline-none"
          value={test.title}
          onBlur={() => setIsTitleSelected(false)}
          onChange={(e) => setTest({ ...test, title: e.target.value })}
        />
      ) : (
        <span
          className={`w-[350px] rounded-md border border-neutral-300 bg-black bg-opacity-40 p-2 text-3xl font-bold ${test.title?.length > 0 ? "text-white" : "text-neutral-200"}`}
          onClick={handleClickName}
        >
          {test.title?.length > 0 ? test.title : "Enter the test name"}
        </span>
      )}

      {/* Test Description */}
      {isDescSelected ? (
        <input
          id="testDesc"
          className="w-[450px] rounded-md border border-neutral-300 bg-black bg-opacity-40 p-2 text-white focus:outline-none"
          value={test.description}
          onBlur={() => setIsDescSelected(false)}
          onChange={(e) => setTest({ ...test, description: e.target.value })}
        />
      ) : (
        <span
          className={`w-[450px] rounded-md border border-neutral-300 bg-black bg-opacity-40 p-2 ${test.description?.length > 0 ? "text-white" : "text-neutral-100"}`}
          onClick={handleClickDesc}
        >
          {test.description?.length > 0
            ? test.description
            : "Enter the test description"}
        </span>
      )}
    </div>
  );
};

TestDetails.propTypes = {
  test: PropTypes.object,
  setTest: PropTypes.func,
};

export default TestDetails;
