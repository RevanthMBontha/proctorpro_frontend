import { useEffect, useCallback, useState } from "react";
import ReactQuill from "react-quill";
import { FaImage } from "react-icons/fa6";
import { MdUploadFile } from "react-icons/md";
import PropTypes from "prop-types";
import { isEqual } from "lodash";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../axios";
import Button from "../Button";
import SubQuestion from "./SubQuestion";

const Comprehension = ({
  id,
  isSelected,
  thisQuestion,
  setThisQuestion,
  data,
  setAreEqual,
  questionNumber,
}) => {
  const queryClient = useQueryClient();
  const [selectedSubQuestionId, setSelectedSubQuestionId] = useState(null);

  // Add a new subQuestion
  const addSubQuestionMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post(`/questions/${id}`, {
        type: "mcq",
        questionText: "",
        options: [],
        correctAnswer: "",
        clozeText: "",
        subQuestions: [],
        categories: [],
        items: [],
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["questions", `${id}`]);
    },
  });

  const updateComprehensionMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("type", JSON.stringify(thisQuestion.type));
      formData.append(
        "questionText",
        JSON.stringify(thisQuestion.questionText),
      );
      formData.append("options", JSON.stringify(thisQuestion.options));
      formData.append(
        "correctAnswer",
        JSON.stringify(thisQuestion.correctAnswer),
      );
      formData.append("points", JSON.stringify(thisQuestion.points));
      formData.append("clozeText", JSON.stringify(thisQuestion.clozeText));
      formData.append(
        "subQuestions",
        JSON.stringify(thisQuestion.subQuestions),
      );
      formData.append("categories", JSON.stringify(thisQuestion.categories));
      formData.append("items", JSON.stringify(thisQuestion.items));

      formData.append("file", thisQuestion.questionImg);

      const response = await api.patch(`/questions/${id}`, formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["questions", `${data.question._id}`]);
    },
  });

  // Function to handle Editor changes
  const handleEditorChange = (value) => {
    setThisQuestion((prevState) => ({
      ...prevState,
      questionText: value, // Update only the 'content' key
    }));
  };

  // Function to add image to the question
  const handleImageChange = (e) => {
    e.stopPropagation();
    setThisQuestion({
      ...thisQuestion,
      questionImg: e.target.files[0],
    });
  };

  // Function to check if all necessary inputs are filled or not
  const isValidated = useCallback(() => {
    // Empty Question Text case
    if (!thisQuestion.questionText) return false;
    if (thisQuestion.subQuestions.length === 0) return false;

    return true;
  }, [thisQuestion.questionText, thisQuestion.subQuestions]);

  useEffect(() => {
    setAreEqual(isEqual(data.question, thisQuestion) && isValidated());
  }, [data, thisQuestion, setAreEqual, isValidated]);

  if (isSelected)
    return (
      <div className="flex w-full flex-col gap-y-8 p-4">
        <div className="flex h-fit w-full gap-x-4">
          {/* Question Details */}
          <div className="flex h-fit w-full flex-[2] flex-col items-start gap-y-4">
            {/* Editor */}
            <ReactQuill
              className="w-full"
              placeholder="Enter the text of the Question"
              value={thisQuestion.questionText}
              onChange={handleEditorChange}
            />
          </div>

          {/* Question Metadata */}
          <div className="flex flex-[1] flex-col gap-y-4">
            {/* Points Buttons */}
            <div className="flex items-center justify-end">
              <div className="flex flex-col items-end">
                <label
                  className="pr-1 text-sm text-neutral-400"
                  htmlFor="points"
                >
                  Points
                </label>
                <input
                  name="points"
                  type="text"
                  className="w-16 rounded-md border border-neutral-300 p-2 text-end"
                  value={`${thisQuestion.subQuestions.map((question) => question.points).reduce((acc, cv) => acc + cv)}`}
                  readOnly
                />
              </div>
            </div>
            {/* Image Upload Button */}
            <div className="flex flex-grow flex-col gap-y-2">
              <div className="flex items-center justify-end gap-x-1">
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
              {thisQuestion.questionImg &&
              typeof thisQuestion.questionImg === "string" ? (
                <img
                  className="h-fit w-full rounded-md object-cover"
                  src={thisQuestion.questionImg}
                  alt={thisQuestion.questionText}
                />
              ) : (
                thisQuestion.questionImg && (
                  <img
                    className="h-fit w-full rounded-md object-cover"
                    src={URL.createObjectURL(thisQuestion.questionImg)}
                    alt={thisQuestion.questionText}
                  />
                )
              )}
            </div>
          </div>
        </div>

        {/* Render the SubQuestions */}
        {thisQuestion.subQuestions.map((subQuestion, index) => (
          <SubQuestion
            key={subQuestion._id}
            id={subQuestion._id}
            parentId={id}
            parentQuestionNumber={questionNumber}
            questionNumber={index + 1}
            isSelected={selectedSubQuestionId === subQuestion._id}
            comprehension={thisQuestion}
            setComprehension={setThisQuestion}
            setSelected={setSelectedSubQuestionId}
            data={data}
          />
        ))}

        {/* Add a new SubQuestion */}
        <div className="flex h-fit w-full items-center justify-center gap-x-8">
          <Button
            className="flex items-center gap-x-2 border-sky-700 text-sky-700 hover:border-sky-900 hover:text-sky-900"
            onClick={addSubQuestionMutation.mutate}
          >
            <MdUploadFile size={20} />
            Add SubQuestion
          </Button>
        </div>

        {/* Save changes to the question */}
        {isSelected && (
          <div className="flex w-full justify-end">
            <Button
              disabled={isEqual(data.question, thisQuestion) || !isValidated()}
              onClick={updateComprehensionMutation.mutate}
              className="border-none bg-sky-500 text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-neutral-500"
            >
              Save Question Details
            </Button>
          </div>
        )}
      </div>
    );

  return (
    <div className="flex h-fit w-full flex-col gap-y-8">
      {/* Question details */}
      <div className="flex w-full">
        <div
          className="flex-[2]"
          dangerouslySetInnerHTML={{ __html: thisQuestion.questionText }}
        ></div>
        <div className="flex flex-1 flex-col gap-y-4">
          <div className="ml-auto flex w-fit justify-end gap-x-2 rounded-md border border-neutral-300 p-2">
            <p>Points:</p>
            <p>
              {thisQuestion.subQuestions
                .map((question) => question.points)
                .reduce((acc, cv) => acc + cv)}
            </p>
          </div>
          <div className="h-fit w-auto">
            {thisQuestion.questionImg &&
            typeof thisQuestion.questionImg === "string" ? (
              <img
                className="h-full w-full rounded-md object-cover"
                src={thisQuestion.questionImg}
                alt={thisQuestion.questionText}
              />
            ) : (
              thisQuestion.questionImg && (
                <img
                  className="h-full w-full rounded-md object-cover"
                  src={URL.createObjectURL(thisQuestion.questionImg)}
                  alt={thisQuestion.questionText}
                />
              )
            )}
          </div>
        </div>
      </div>

      {thisQuestion.subQuestions.map((question, index) => (
        <div className="flex h-fit w-full" key={`${question._id}-${index}`}>
          <div className="flex h-full flex-[2] flex-col gap-y-8">
            {/* Test for the Question */}
            {thisQuestion.questionText ? (
              <h1
                className="text-xl font-semibold"
                dangerouslySetInnerHTML={{ __html: question.questionText }}
              ></h1>
            ) : (
              <h1 className="text-xl font-semibold">
                Enter the Text for the Question
              </h1>
            )}

            {/* Options for the Question */}
            {question.options?.map((option, index) => (
              <div className="flex items-center gap-x-2 pl-4" key={option.id}>
                <input
                  className="h-5 w-5"
                  type="radio"
                  checked={option.value === question.correctAnswer}
                  readOnly
                />
                {option.value ? (
                  <p>{option.value}</p>
                ) : (
                  <p>Option {index + 1}</p>
                )}
              </div>
            ))}
          </div>

          {/* Points */}
          <div className="flex h-full flex-[1] flex-col gap-y-8">
            <div className="flex items-center justify-between">
              <div className="flex w-full items-center justify-end gap-x-2">
                <div className="rounded-md border border-neutral-300 p-2">
                  <span>Points: </span>
                  <span>{question.points}</span>
                </div>
              </div>
            </div>
            {question.questionImg &&
            typeof question.questionImg === "string" ? (
              <img
                className="h-full w-full rounded-md object-cover"
                src={question.questionImg}
                alt={question.questionText}
              />
            ) : (
              question.questionImg && (
                <img
                  className="h-full w-full rounded-md object-cover"
                  src={URL.createObjectURL(question.questionImg)}
                  alt={question.questionText}
                />
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

Comprehension.propTypes = {
  id: PropTypes.string,
  isSelected: PropTypes.bool,
  questionNumber: PropTypes.number,
  thisQuestion: PropTypes.object,
  setThisQuestion: PropTypes.func,
  data: PropTypes.object,
  setAreEqual: PropTypes.func,
};

export default Comprehension;
