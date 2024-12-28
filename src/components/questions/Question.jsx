import { FaEllipsisVertical } from "react-icons/fa6";
// import { FaPlus, FaRegCopy } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Select from "react-select";
import Button from "../Button";
import Categorise from "./Categorise";
import Cloze from "./Cloze";
import Comprehension from "./Comprehension";
import MCQ from "./MCQ";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";
import api from "../../axios";

const Question = ({ id, questionNumber, isSelected, setSelected }) => {
  const [areEqual, setAreEqual] = useState(false);
  const [thisQuestion, setThisQuestion] = useState({
    type: "mcq",
    questionText: "",
    options: [],
    correctAnswer: "",
    clozeText: "",
    subQuestions: [],
    categories: [],
    items: [],
  });

  // Get the data of the question
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["questions", `${id}`],
    queryFn: async () => {
      const response = await api.get(`/questions/${id}`);
      return response.data;
    },
  });

  useEffect(() => {
    if (data) {
      setThisQuestion(data.question);
    }
  }, [data]);

  const options = [
    { value: "mcq", label: "MCQ" },
    { value: "categorise", label: "Categorise" },
    { value: "cloze", label: "Cloze" },
    { value: "comprehension", label: "Comprehension" },
  ];

  // Function to handle changing the type of question
  const handleQuestionTypeChange = (option) => {
    setThisQuestion({ ...thisQuestion, type: option.value });
  };

  // Function to handle adding a new question below the selected question
  // const handleAddQuestionBelow = (e) => {
  //   console.log("Add Question below was clicked");
  //   e.stopPropagation();
  //   const test = getNewQuestion();
  //   console.log("Test: ", test);
  //   // TODO: Add logic to insert at a particular position
  // };

  // Function to handle copying the selected question into a new question below
  // const handleCopyQuestion = (e) => {
  //   console.log("Copy Question below was clicked");
  //   e.stopPropagation();
  //   // TODO: Add logic to copy to next index
  // };

  // Function to handle deleting the selected question
  const handleDeleteQuestion = () => {
    setSelected(null);
    // TODO: Add logic to delete the question
  };

  if (isLoading) return <Loading />;

  if (isError) console.log(error);
  if (isError) return <div>Something went wrong! Check the console.</div>;

  return (
    <div
      onClick={() => setSelected(id)}
      className="flex w-full flex-grow cursor-pointer"
    >
      {/* Selection Highlighter */}
      <div
        className={`h-full w-2 ${isSelected ? "bg-blue-300" : areEqual ? "bg-green-300" : "bg-red-300"} flex-shrink-0 flex-grow-0 rounded-none rounded-l-md border border-r-0 border-neutral-300`}
      />
      {/* Question Component */}
      <div className="flex flex-grow flex-col gap-y-4 rounded-md rounded-l-none border border-l-0 border-neutral-300 p-4">
        <div className="flex w-full items-center justify-between border-b border-neutral-300">
          <h1 className="text-xl font-semibold">{`Question ${questionNumber}`}</h1>
          <div className="flex items-center justify-end gap-x-2 py-2">
            {isSelected && (
              <Select
                isSearchable={false}
                className="w-64"
                options={options}
                defaultValue={options.find(
                  (option) => option.value === thisQuestion.type,
                )}
                placeholder="Select a Question type"
                onChange={handleQuestionTypeChange}
              />
            )}
            <Button className="border-none p-2">
              <FaEllipsisVertical className="text-neutral-400" size={20} />
            </Button>
          </div>
        </div>
        {thisQuestion.type === "mcq" && (
          <MCQ
            id={thisQuestion._id}
            isSelected={isSelected}
            thisQuestion={thisQuestion}
            setThisQuestion={setThisQuestion}
            setAreEqual={setAreEqual}
            data={data}
          />
        )}
        {thisQuestion.type === "categorise" && (
          <Categorise
            id={thisQuestion._id}
            isSelected={isSelected}
            thisQuestion={thisQuestion}
            setThisQuestion={setThisQuestion}
            setAreEqual={setAreEqual}
            data={data}
          />
        )}
        {thisQuestion.type === "cloze" && (
          <Cloze
            id={thisQuestion._id}
            isSelected={isSelected}
            thisQuestion={thisQuestion}
            setThisQuestion={setThisQuestion}
            setAreEqual={setAreEqual}
            data={data}
          />
        )}
        {thisQuestion.type === "comprehension" && (
          <Comprehension
            id={thisQuestion._id}
            questionNumber={questionNumber}
            isSelected={isSelected}
            thisQuestion={thisQuestion}
            setThisQuestion={setThisQuestion}
            setAreEqual={setAreEqual}
            data={data}
          />
        )}
      </div>

      {/* ToolTip for Question */}
      <div
        className={`${isSelected ? "visible" : "invisible"} flex h-full w-fit flex-col items-center gap-y-4 p-2`}
      >
        {/* <Button
          onClick={(e) => handleAddQuestionBelow(e, questionNumber)}
          className="rounded-full border-none bg-sky-700 p-2 text-white hover:bg-sky-900"
        >
          <FaPlus />
        </Button> */}
        {/* <Button
          onClick={handleCopyQuestion}
          className="rounded-full border-none bg-sky-700 p-2 text-white hover:bg-sky-900"
        >
          <FaRegCopy />
        </Button> */}
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
  isSelected: PropTypes.bool,
  children: PropTypes.node,
  handleAddQuestionBelow: PropTypes.func,
  setSelected: PropTypes.func,
};

export default Question;
