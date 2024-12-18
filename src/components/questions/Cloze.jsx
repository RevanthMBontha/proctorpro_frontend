import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import { Draggable, Droppable, DragDropContext } from "@hello-pangea/dnd";
import { FaImage } from "react-icons/fa6";
import { PiSquaresFour } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { isEqual } from "lodash";
import { v4 as uuidV4 } from "uuid";
import Button from "../Button";
import useTestStore from "../../store/test.store";
import PropTypes from "prop-types";

const blankPattern = /<u>([a-zA-Z0-9]+)<\/u>/g;
const paraPattern = /<\/?p>/g;

const Cloze = ({ id, isSelected, setAreEqual }) => {
  const getQuestionById = useTestStore((state) => state.getQuestionById);
  const updateQuestion = useTestStore((state) => state.updateQuestion);

  const inputRefs = useRef([]);

  const temp = getQuestionById(id);
  const [thisQuestion, setThisQuestion] = useState({ ...temp });

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
    setThisQuestion((prevState) => {
      // Extract unique words from matchAll
      const matchedWords = Array.from(
        value.matchAll(blankPattern),
        (m) => m[1],
      );

      // Create a new options array
      const updatedOptions = matchedWords.map((word) => {
        // Check if the word already exists in options
        const existingOption = prevState.options.find(
          (option) => option.value === word,
        );

        // Return the existing option or create a new one
        return existingOption || { id: uuidV4(), value: word };
      });

      return {
        ...prevState,
        questionText: value,
        clozeText: value.replace(paraPattern, "").replace(blankPattern, "____"),
        options: updatedOptions, // Only keep matched options and add new ones
        correctAnswer: matchedWords,
      };
    });
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

    document.getElementById(`newOption-${id}`).value = "";
    document.getElementById(`newOption-${id}`).blur();

    // Focus the new input field after adding it
    setTimeout(() => {
      inputRefs.current[thisQuestion.options.length]?.focus();
    }, 0);
  };

  // Function to edit an Option in place
  const handleOptionEdit = (e, id) => {
    const thisOption = thisQuestion.options.find((option) => option.id === id);
    const thisOptionIndex = thisQuestion.options.findIndex(
      (option) => option.id === id,
    );

    const startOptions = thisQuestion.options.slice(0, thisOptionIndex);
    const endOptions = thisQuestion.options.slice(
      thisOptionIndex + 1,
      thisQuestion.options.length,
    );

    setThisQuestion({
      ...thisQuestion,
      options: [
        ...startOptions,
        { id: thisOption.id, value: e.target.value },
        ...endOptions,
      ],
    });
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

    return true;
  };

  // Function to update the Question in Store
  const handleUpdateStore = () => {
    updateQuestion(id, thisQuestion);
  };

  setAreEqual(isEqual(getQuestionById(id), thisQuestion) && isValidated());

  if (isSelected)
    return (
      <div className="flex h-fit w-full flex-col gap-y-4">
        <div className="flex h-fit w-full gap-x-4 p-4">
          {/* Question Details */}
          <div className="flex h-fit w-full flex-[2] flex-col items-start gap-y-4">
            <div className="w-full">
              <p>Preview</p>
              <input
                className="h-12 w-full rounded-md border border-neutral-300 pl-1"
                type="text"
                value={thisQuestion.clozeText}
                readOnly
              />
            </div>
            {/* Editor */}
            <div className="w-full">
              <p>Sentence</p>
              <ReactQuill
                className="w-full"
                placeholder="Enter the text of the Question"
                value={thisQuestion.questionText}
                onChange={handleEditorChange}
              />
            </div>

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
                      {thisQuestion.options
                        ?.filter((option) => option !== undefined)
                        .map((option, index) => (
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
                                      thisQuestion.correctAnswer ===
                                      option.value
                                    }
                                  />
                                  <input
                                    ref={(el) =>
                                      (inputRefs.current[index] = el)
                                    }
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
                                      handleOptionEdit(
                                        e,
                                        option.id,
                                        option.value,
                                      )
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
                                  disabled={thisQuestion.correctAnswer?.includes(
                                    option.value,
                                  )}
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

              {/* Add new Option ------------------------- */}
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
                    id={`newOption-${id}`}
                    className="h-10 rounded-md border border-neutral-300 pl-1"
                    placeholder="Add New Option"
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
                  value={`${thisQuestion.points}`}
                  onChange={(e) => handlePointsChange(e, "points")}
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

  return <div>Hello,World!</div>;
};

Cloze.propTypes = {
  id: PropTypes.string,
  isSelected: PropTypes.bool,
  setAreEqual: PropTypes.func,
};

export default Cloze;
