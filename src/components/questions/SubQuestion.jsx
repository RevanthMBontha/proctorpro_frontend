import PropTypes from "prop-types";
import { FaEllipsisVertical } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Button from "../Button";
import SubMCQ from "./SubMCQ";
import useTestStore from "../../store/test.store";

const SubQuestion = ({
  id,
  isSelected,
  parentQuestionNumber,
  questionNumber,
  comprehension,
  setComprehension,
  children,
}) => {
  const selectSubQuestionId = useTestStore(
    (state) => state.selectSubQuestionId,
  );

  const handleSelectSubQuestionId = (evt) => {
    evt.stopPropagation();
    selectSubQuestionId(id);
  };

  const handleDeleteSubQuestion = (id) => {
    console.log("Id being deleted: ", id);
    setComprehension({
      ...comprehension,
      subQuestions: [
        ...comprehension.subQuestions.filter(
          (subQuestion) => subQuestion.id !== id,
        ),
      ],
    });
  };

  return (
    <div
      onClick={handleSelectSubQuestionId}
      className="flex w-full flex-grow cursor-pointer"
    >
      {/* Selection Highlighter */}
      <div
        className={`h-full w-2 ${isSelected ? "bg-blue-300" : "bg-white"} flex-grow-0 rounded-none rounded-l-md border border-r-0 border-neutral-300`}
      />
      {/* Question Component */}
      <div className="flex flex-grow flex-col gap-y-4 rounded-md rounded-l-none border border-l-0 border-neutral-300 p-4">
        <div className="flex w-full items-center justify-between border-b border-neutral-300">
          <h1 className="text-xl font-semibold">{`Question ${parentQuestionNumber}.${questionNumber}`}</h1>
          <div className="flex items-center justify-end gap-x-2 py-2">
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
          onClick={() => handleDeleteSubQuestion(id)}
          className="rounded-full border-none bg-sky-700 p-2 text-white hover:bg-sky-900"
        >
          <MdDelete />
        </Button>
      </div>
    </div>
  );
};

SubQuestion.propTypes = {
  id: PropTypes.string,
  isSelected: PropTypes.bool,
  parentQuestionNumber: PropTypes.number,
  questionNumber: PropTypes.number,
  handleSelectSubQuestion: PropTypes.func,
  children: PropTypes.node,
  comprehension: PropTypes.object,
  setComprehension: PropTypes.func,
};

export default SubQuestion;

SubQuestion.SubMCQ = SubMCQ;
