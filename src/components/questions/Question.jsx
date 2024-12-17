import PropTypes from "prop-types";
import { FaEllipsisVertical, FaPlus, FaRegCopy } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Select from "react-select";
import Button from "../Button";
import Categorise from "./Categorise";
import Cloze from "./Cloze";
import Comprehension from "./Comprehension";
import MCQ from "./MCQ";
import useTestStore from "../../store/test.store";

const Question = ({
  id,
  questionNumber,
  questionType,
  isSelected,
  children,
}) => {
  const selectQuestion = useTestStore((state) => state.selectQuestion);
  const resetSelection = useTestStore((state) => state.resetSelection);
  const getQuestionById = useTestStore((state) => state.getQuestionById);
  const updateQuestion = useTestStore((state) => state.updateQuestion);
  const deleteQuestion = useTestStore((state) => state.deleteQuestion);

  let thisQuestion = getQuestionById(id);

  const options = [
    { value: "mcq", label: "MCQ" },
    { value: "categorise", label: "Categorise" },
    { value: "cloze", label: "Cloze" },
    { value: "comprehension", label: "Comprehension" },
  ];

  // Function to handle changing the type of question
  const handleQuestionTypeChange = (option) => {
    updateQuestion(id, {
      ...thisQuestion,
      questionType: option.value,
    });
  };

  // Function to handle question selection
  const handleSelectQuestion = () => {
    selectQuestion(id);
  };

  // Function to handle adding a new question below the selected question
  const handleAddQuestionBelow = () => {};

  // Functiont to handle copying the selected question into a new question below
  const handleCopyQuestion = () => {};

  // Function to handle deleting the selected question
  const handleDeleteQuestion = () => {
    resetSelection(); //Reset the selection
    deleteQuestion(id); //Delete the question
  };

  return (
    <div
      onClick={handleSelectQuestion}
      className="flex w-full flex-grow cursor-pointer"
    >
      {/* Selection Highlighter */}
      <div
        className={`h-full w-2 ${isSelected ? "bg-blue-300" : "bg-white"} flex-grow-0 rounded-none rounded-l-md border border-r-0 border-neutral-300`}
      />
      {/* Question Component */}
      <div className="flex flex-grow flex-col gap-y-4 rounded-md rounded-l-none border border-l-0 border-neutral-300 p-4">
        <div className="flex w-full items-center justify-between border-b border-neutral-300">
          <h1 className="text-xl font-semibold">{`Question ${questionNumber.toString().padStart(2, "0")}`}</h1>
          <div className="flex items-center justify-end gap-x-2 py-2">
            {isSelected && (
              <Select
                isSearchable={false}
                className="w-64"
                options={options}
                defaultValue={options.find(
                  (option) => option.value === questionType,
                )}
                placeholder="Select a Question type"
                onChange={handleQuestionTypeChange}
              />
            )}
            <Button className="border-none p-2">
              <FaEllipsisVertical size={20} />
            </Button>
          </div>
        </div>
        {children}
      </div>

      {/* ToolTip for Question */}
      <div
        className={`${isSelected ? "visible" : "invisible"} flex h-full w-fit flex-col items-center gap-y-4 p-2`}
      >
        <Button
          onClick={handleAddQuestionBelow}
          className="rounded-full border-none bg-sky-700 p-2 text-white hover:bg-sky-900"
        >
          <FaPlus />
        </Button>
        <Button
          onClick={handleCopyQuestion}
          className="rounded-full border-none bg-sky-700 p-2 text-white hover:bg-sky-900"
        >
          <FaRegCopy />
        </Button>
        <Button
          onClick={handleDeleteQuestion}
          className="rounded-full border-none bg-sky-700 p-2 text-white hover:bg-sky-900"
        >
          <MdDelete />
        </Button>
      </div>
    </div>
  );
};

Question.propTypes = {
  id: PropTypes.string,
  questionNumber: PropTypes.number,
  questionType: PropTypes.string,
  isSelected: PropTypes.bool,
  children: PropTypes.node,
};

export default Question;

Question.MCQ = MCQ;
Question.Categorise = Categorise;
Question.Cloze = Cloze;
Question.Comprehension = Comprehension;
