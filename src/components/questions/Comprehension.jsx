import { useState } from "react";
import ReactQuill from "react-quill";
import { FaImage } from "react-icons/fa6";
import { MdUploadFile } from "react-icons/md";
import PropTypes from "prop-types";
import { isEqual } from "lodash";
import Input from "./../Input";
import Button from "../Button";
import SubQuestion from "./SubQuestion";
import { getNewSubQuestion } from "../../data";
import useTestStore from "../../store/test.store";

const Comprehension = ({ id, isSelected, questionNumber }) => {
  const getQuestionById = useTestStore((state) => state.getQuestionById);
  const updateQuestion = useTestStore((state) => state.updateQuestion);

  const selectedSubQuestionId = useTestStore(
    (state) => state.selectedSubQuestionId,
  );

  console.log("ID in Comprehension is: ", id);

  const temp = getQuestionById(id);
  const [thisQuestion, setThisQuestion] = useState(temp); //It is what it should be

  // Function to handle Editor changes
  const handleEditorChange = (value) => {
    setThisQuestion((prevState) => ({
      ...prevState,
      questionText: value, // Update only the 'content' key
    }));
  };

  // Function to handle change in points allocated to question
  const handlePointsChange = (e, field) => {
    setThisQuestion({ ...thisQuestion, [field]: +e.target.value });
  };

  // Function to add image to the question
  const handleImageChange = (e) => {
    setThisQuestion({
      ...thisQuestion,
      questionImg: e.target.files[0],
    });
  };

  // Function to check if all necessary inputs are filled or not
  const isValidated = () => {
    // Empty Question Text case
    if (!thisQuestion.questionText) return false;

    return true;
  };

  // Function to update the Question in Store
  const handleUpdateStore = () => {
    updateQuestion(id, thisQuestion);
  };

  // Functions for the subQuestions ------------------------------------------

  // Function to add new sub Question
  const handleAddSubQuestion = () => {
    setThisQuestion({
      ...thisQuestion,
      subQuestions: [...thisQuestion.subQuestions, getNewSubQuestion()],
    });
  };

  if (isSelected)
    return (
      <div className="flex w-full flex-col gap-y-8 p-4">
        <div className="flex h-fit w-full">
          {/* Question Details */}
          <div className="flex h-fit w-full flex-[2] flex-col items-start gap-y-4 p-2">
            {/* Editor */}
            <ReactQuill
              className="w-full"
              placeholder="Enter the text of the Question"
              value={thisQuestion.questionText}
              onChange={handleEditorChange}
            />
          </div>

          {/* Question Metadata */}
          <div className="flex flex-[1] flex-col gap-y-4 p-2">
            {/* Points Buttons */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm text-neutral-400" htmlFor="points">
                  Points
                </label>
                <Input
                  width="6rem"
                  name="negPoints"
                  type="text"
                  value={`${thisQuestion.points}`}
                  onChange={(e) => handlePointsChange(e, "points")}
                />
              </div>
            </div>
            {/* Image Upload Button */}
            <div className="flex flex-grow flex-col gap-y-2">
              <div className="flex items-center gap-x-1">
                <Button
                  onClick={() => document.getElementById("questionImg").click()}
                  className="w-fit border-none text-sky-700"
                >
                  <FaImage size={32} />
                </Button>
                <input
                  className="hidden"
                  type="file"
                  id="questionImg"
                  onChange={handleImageChange}
                />
              </div>
              {thisQuestion.questionImg && (
                <img
                  className="h-full w-full rounded-md object-cover"
                  src={URL.createObjectURL(thisQuestion.questionImg)}
                  alt={thisQuestion.questionText}
                />
              )}
            </div>
          </div>
        </div>

        {/* Render the SubQuestions */}
        {thisQuestion.subQuestions.map((subQuestion, index) => (
          <SubQuestion
            key={subQuestion.id}
            id={subQuestion.id}
            parentQuestionNumber={questionNumber}
            questionNumber={index + 1}
            isSelected={selectedSubQuestionId === subQuestion.id}
            comprehension={thisQuestion}
            setComprehension={setThisQuestion}
          >
            <SubQuestion.SubMCQ
              id={subQuestion.id}
              parentId={id}
              isSelected={selectedSubQuestionId === subQuestion.id}
            />
          </SubQuestion>
        ))}

        {/* Add a new SubQuestion */}
        <div className="flex h-fit w-full items-center justify-center gap-x-8">
          <Button
            className="flex items-center gap-x-2 border-sky-700 text-sky-700 hover:border-sky-900 hover:text-sky-900"
            onClick={handleAddSubQuestion}
          >
            <MdUploadFile size={20} />
            Add SubQuestion
          </Button>
        </div>

        {/* Save changes to the question */}
        {isSelected && (
          <div className="flex w-full justify-end">
            <Button
              disabled={
                isEqual(getQuestionById(id), thisQuestion) || !isValidated()
              }
              onClick={handleUpdateStore}
              className="border-none bg-sky-500 text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-neutral-500"
            >
              Save Question Details
            </Button>
          </div>
        )}
      </div>
    );

  return <div>Hello, World!I am a comprehension</div>;
};

Comprehension.propTypes = {
  id: PropTypes.string,
  isSelected: PropTypes.bool,
  questionNumber: PropTypes.number,
};

export default Comprehension;
