import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import { Draggable, Droppable, DragDropContext } from "@hello-pangea/dnd";
import { FaImage } from "react-icons/fa6";
import { PiSquaresFour } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { isEqual } from "lodash";
import { v4 as uuidV4 } from "uuid";
import Input from "./../Input";
import Button from "../Button";
import useTestStore from "../../store/test.store";
import PropTypes from "prop-types";

const SubMCQ = ({ id, parentId, isSelected }) => {
  // Function to handle drag end
  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside a valid droppable, return
    if (!destination) return;

    // Reorder options in the list
    const reorderedItems = Array.from(thisQuestion.options);
    const [movedItem] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, movedItem);
    setThisQuestion({ ...thisQuestion, options: reorderedItems });
  };

  // Function to handle Editor changes
  const handleEditorChange = (value) => {
    setThisQuestion((prevState) => ({
      ...prevState,
      questionText: value, // Update only the 'content' key
    }));
  };

  // Function to add image to the question
  const handleImageChange = (e) => {
    setThisQuestion({
      ...thisQuestion,
      questionImg: e.target.files[0],
    });
  };

  // Function to handle change in points allocated to question
  const handlePointsChange = (e, field) => {
    setThisQuestion({ ...thisQuestion, [field]: +e.target.value });
  };

  // Function to change answer to checked option
  const handleCorrectAnswerChange = (e) => {
    setThisQuestion({ ...thisQuestion, correctAnswer: e.target.value });
  };

  // Function to add a new Option
  const handleOptionAdd = (e) => {
    if (e.target.value.length > 0) {
      setThisQuestion({
        ...thisQuestion,
        options: [
          ...thisQuestion.options,
          { id: uuidV4(), value: e.target.value },
        ],
      });
    }

    document.getElementById(`newOptionSub-${id}`).value = "";
    document.getElementById(`newOptionSub-${id}`).blur();

    // Focus the new input field after adding it
    setTimeout(() => {
      inputRefs.current[thisQuestion.options.length]?.focus();
    }, 0);
  };

  // Function to edit an Option in place
  const handleOptionEdit = (e, id, value) => {
    const thisOption = thisQuestion.options.find((option) => option.id === id);
    const thisOptionIndex = thisQuestion.options.findIndex(
      (option) => option.id === id,
    );

    const startOptions = thisQuestion.options.slice(0, thisOptionIndex);
    const endOptions = thisQuestion.options.slice(
      thisOptionIndex + 1,
      thisQuestion.options.length,
    );

    if (value === thisQuestion.correctAnswer) {
      setThisQuestion({
        ...thisQuestion,
        correctAnswer: e.target.value,
        options: [
          ...startOptions,
          { id: thisOption.id, value: e.target.value },
          ...endOptions,
        ],
      });
    } else {
      setThisQuestion({
        ...thisQuestion,
        options: [
          ...startOptions,
          { id: thisOption.id, value: e.target.value },
          ...endOptions,
        ],
      });
    }
  };

  // Function to delete an option on click of delete button
  const handleOptionDelete = (id, length) => {
    if (length > 2) {
      setThisQuestion({
        ...thisQuestion,
        options: [...thisQuestion.options.filter((option) => option.id !== id)],
      });
    }
  };

  // Function to check if all necessary inputs are filled or not
  const isValidated = () => {
    // Empty Question Text case
    if (!thisQuestion.questionText) return false;

    // No correct answer selected for the question
    if (!thisQuestion.correctAnswer) return false;

    return true;
  };

  // Function to update the Question in Store
  const handleUpdateQuestion = () => {
    const thisIndex = thisParentQuestion.subQuestions.find(
      (subQuestion) => subQuestion.id === id,
    );

    const startSlice = thisParentQuestion.subQuestions.slice(0, thisIndex);
    const endSlice = thisParentQuestion.subQuestions.slice(
      thisIndex + 1,
      thisParentQuestion.subQuestions.length,
    );
    setThisParentQuestion({
      ...thisParentQuestion,
      subQuestions: [...startSlice, { ...thisQuestion }, ...endSlice],
    });
  };

  if (isSelected)
    return (
      <div className="flex h-fit w-full flex-col gap-y-4">
        <div className="flex h-fit w-full p-4">
          {/* Question Details */}
          <div className="flex h-fit w-full flex-[2] flex-col items-start gap-y-4 p-2">
            {/* Editor */}
            <ReactQuill
              className="w-full"
              placeholder="Enter the text of the Question"
              value={thisQuestion.questionText}
              onChange={handleEditorChange}
            />

            <div className="flex flex-col gap-y-4">
              {/* Draggable Options list */}
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="droppable-list">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex w-fit flex-col gap-y-4 rounded-lg"
                    >
                      {thisQuestion.options?.map((option, index) => (
                        <Draggable
                          key={option.id}
                          draggableId={option.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: "none",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "8px",
                                backgroundColor: snapshot.isDragging
                                  ? "#e1f5fe"
                                  : "#ffffff",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                boxShadow: snapshot.isDragging
                                  ? "0px 4px 8px rgba(0, 0, 0, 0.2)"
                                  : "none",
                                ...provided.draggableProps.style,
                              }}
                            >
                              {/* Icon to help dragging */}
                              <PiSquaresFour
                                size={24}
                                className="text-sky-700"
                              />
                              {/* Radio and Option Inputs */}
                              <div className="flex items-center gap-x-1">
                                <input
                                  className="h-5 w-5"
                                  type="radio"
                                  value={option.value}
                                  checked={
                                    thisQuestion.correctAnswer === option.value
                                  }
                                  onChange={handleCorrectAnswerChange}
                                />
                                <input
                                  ref={(el) => (inputRefs.current[index] = el)}
                                  className="h-10 rounded-md border border-neutral-300 pl-1 placeholder:text-neutral-300"
                                  style={{
                                    backgroundColor: snapshot.isDragging
                                      ? "#e1f5fe"
                                      : "#ffffff",
                                  }}
                                  type="text"
                                  value={option.value}
                                  placeholder={
                                    index < 2
                                      ? `Option ${(index + 1).toString().padStart(2, "0")}`
                                      : `Option ${(index + 1).toString().padStart(2, "0")} (Optional)`
                                  }
                                  onChange={(e) =>
                                    handleOptionEdit(e, option.id, option.value)
                                  }
                                />
                              </div>
                              {/* Icon to delete the option */}
                              <Button
                                onClick={() =>
                                  handleOptionDelete(
                                    option.id,
                                    thisQuestion.options.length,
                                  )
                                }
                                disabled={thisQuestion.options.length < 3}
                                className="rounded-full border-none bg-neutral-400 p-1 text-white hover:bg-red-400 disabled:invisible"
                              >
                                <IoClose size={18} />
                              </Button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              {/* Add new Option ------------------- */}
              <div
                style={{
                  userSelect: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "8px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxShadow: "none",
                }}
              >
                {/* Icon to help dragging */}
                <PiSquaresFour size={24} className="text-white" />
                {/* Radio and Option Inputs */}
                <div className="flex items-center gap-x-1">
                  <input
                    className="h-5 w-5"
                    type="radio"
                    readOnly
                    checked={false}
                  />
                  <input
                    className="h-10 rounded-md border border-neutral-300 pl-1"
                    placeholder="Add New Option"
                    id={`newOptionSub-${id}`}
                    style={{
                      backgroundColor: "#ffffff",
                    }}
                    type="text"
                    onChange={(e) => handleOptionAdd(e)}
                  />
                </div>
                {/* Icon to delete the option */}
                <Button className="rounded-full border-none bg-white p-1 text-white">
                  <IoClose size={18} />
                </Button>
              </div>
            </div>
          </div>

          {/* Metadata for the Question */}
          <div className="flex flex-[1] flex-col gap-y-4 p-2">
            {/* Points Buttons */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm text-neutral-400" htmlFor="points">
                  Points
                </label>
                <Input
                  width="6rem"
                  name="points"
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

        {/* Save changes to the question */}
        {isSelected && (
          <div className="flex w-full justify-end">
            <Button
              disabled={
                isEqual(
                  thisParentQuestion.subQuestions.find(
                    (subQuestion) => subQuestion.id === id,
                  ),
                  thisQuestion,
                ) || !isValidated()
              }
              onClick={handleUpdateQuestion}
              className="border-none bg-sky-500 text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-neutral-500"
            >
              Save Question Details
            </Button>
          </div>
        )}
      </div>
    );

  return (
    <div className="flex h-96 w-full p-4">
      <div className="flex h-full flex-[2] flex-col gap-y-8">
        {thisQuestion.questionText ? (
          <h1
            className="text-xl font-semibold"
            dangerouslySetInnerHTML={{ __html: thisQuestion.questionText }}
          ></h1>
        ) : (
          <h1 className="text-xl font-semibold">
            Enter the Text for the Question
          </h1>
        )}
        {thisQuestion.options?.map((option, index) => (
          <div className="flex items-center gap-x-2 pl-4" key={option.id}>
            <input
              className="h-5 w-5"
              type="radio"
              checked={option.value === thisQuestion.correctAnswer}
              readOnly
            />
            {option.value ? <p>{option.value}</p> : <p>Option {index + 1}</p>}
          </div>
        ))}
      </div>
      <div className="flex h-full flex-[1] flex-col gap-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 rounded-md border border-neutral-300 p-2">
            <span>Points: </span>
            <span>{thisQuestion.points}</span>
          </div>
        </div>
        {thisQuestion.questionImg && (
          <div className="w-full">
            <img
              className="rounded-md object-cover"
              src={URL.createObjectURL(thisQuestion.questionImg)}
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
};

SubMCQ.propTypes = {
  id: PropTypes.string,
  parentId: PropTypes.string,
  isSelected: PropTypes.bool,
};

export default SubMCQ;
