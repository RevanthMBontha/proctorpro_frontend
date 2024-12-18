import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import { Draggable, Droppable, DragDropContext } from "@hello-pangea/dnd";
import Select from "react-select";
import { FaImage } from "react-icons/fa6";
import { PiSquaresFour } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { isEqual } from "lodash";
import { v4 as uuidV4 } from "uuid";
import Button from "../Button";
import useTestStore from "../../store/test.store";
import PropTypes from "prop-types";

const Categorise = ({ id, isSelected, setAreEqual }) => {
  const getQuestionById = useTestStore((state) => state.getQuestionById);
  const updateQuestion = useTestStore((state) => state.updateQuestion);

  const categoryRefs = useRef([]);
  const itemRefs = useRef([]);

  const temp = getQuestionById(id);
  const [thisQuestion, setThisQuestion] = useState({ ...temp });
  const [hasGeneratedCorrectAnswer, setHasGeneratedCorrectedAnswer] =
    useState(true);

  // Function to handle drag end for Categories
  const handleOnCategoryDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside a valid droppable, return
    if (!destination) return;

    // Reorder options in the list
    const reorderedItems = Array.from(thisQuestion.categories);
    const [movedItem] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, movedItem);
    setThisQuestion({ ...thisQuestion, categories: reorderedItems });
  };

  // Function to handle drag end for Items
  const handleOnItemDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside a valid droppable, return
    if (!destination) return;

    // Reorder options in the list
    const reorderedItems = Array.from(thisQuestion.items);
    const [movedItem] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, movedItem);
    setThisQuestion({ ...thisQuestion, items: reorderedItems });
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

  // Function to change answer based on items and their categories
  const handleUpdateCorrectAnswer = () => {
    const activeCategories = thisQuestion.categories.map((cat) => cat.value);

    let updatedCorrectAnswer = {};
    for (let cat of activeCategories) {
      const items = thisQuestion.items
        .filter((item) => item.category === cat)
        .map((item) => item.value);
      updatedCorrectAnswer = { ...updatedCorrectAnswer, [cat]: items };
    }

    setThisQuestion({
      ...thisQuestion,
      correctAnswer: { ...updatedCorrectAnswer },
    });
    // Has generated the correct answer
    setHasGeneratedCorrectedAnswer(true);
  };

  // Function to add a new Category
  const handleCategoryAdd = (e) => {
    if (e.target.value.length > 0) {
      setThisQuestion({
        ...thisQuestion,
        categories: [
          ...thisQuestion.categories,
          { id: uuidV4(), label: e.target.value, value: e.target.value },
        ],
      });
    }

    // Need to generate the correct answer again
    setHasGeneratedCorrectedAnswer(false);

    document.getElementById(`newCategory-${id}`).value = "";
    document.getElementById(`newCategory-${id}`).blur();

    // Focus the new input field after adding it
    setTimeout(() => {
      categoryRefs.current[thisQuestion.categories.length]?.focus();
    }, 0);
  };

  // Function to add a new Item
  const handleItemAdd = (e) => {
    if (e.target.value.length > 0) {
      setThisQuestion({
        ...thisQuestion,
        items: [
          ...thisQuestion.items,
          {
            id: uuidV4(),
            value: e.target.value,
            category: thisQuestion.categories[0],
          },
        ],
      });
    }

    // Has to generate the correct answer again
    setHasGeneratedCorrectedAnswer(false);

    document.getElementById(`newItem-${id}`).value = "";
    document.getElementById(`newItem-${id}`).blur();

    // Focus the new input field after adding it
    setTimeout(() => {
      itemRefs.current[thisQuestion.items.length]?.focus();
    }, 0);
  };

  // Function to edit a Category in place
  const handleCategoryEdit = (e, id) => {
    const thisCategory = thisQuestion.categories.find(
      (category) => category.id === id,
    );
    const thisCategoryIndex = thisQuestion.categories.findIndex(
      (category) => category.id === id,
    );

    const startCategories = thisQuestion.categories.slice(0, thisCategoryIndex);
    const endCategories = thisQuestion.categories.slice(
      thisCategoryIndex + 1,
      thisQuestion.categories.length,
    );

    setThisQuestion({
      ...thisQuestion,
      items: [
        ...thisQuestion.items.map((item) =>
          item.category === thisCategory.value
            ? { ...item, category: e.target.value }
            : item,
        ),
      ],
      categories: [
        ...startCategories,
        { id: thisCategory.id, label: e.target.value, value: e.target.value },
        ...endCategories,
      ],
    });

    // Has to generate the correct answer again
    setHasGeneratedCorrectedAnswer(false);
  };

  // Function to edit an Item in place
  const handleItemEdit = (e, id) => {
    const thisItem = thisQuestion.items.find((item) => item.id === id);
    const thisItemIndex = thisQuestion.items.findIndex(
      (item) => item.id === id,
    );

    const startItems = thisQuestion.items.slice(0, thisItemIndex);
    const endItems = thisQuestion.items.slice(
      thisItemIndex + 1,
      thisQuestion.items.length,
    );

    setThisQuestion({
      ...thisQuestion,
      items: [
        ...startItems,
        { ...thisItem, value: e.target.value },
        ...endItems,
      ],
    });

    // Has to generate the correct answer again
    setHasGeneratedCorrectedAnswer(false);
  };

  // Function to change the category of an item
  const handleItemCategoryChange = (id, option) => {
    const thisItem = thisQuestion.items.find((item) => item.id === id);
    const thisItemIndex = thisQuestion.items.findIndex(
      (item) => item.id === id,
    );

    const startItems = thisQuestion.items.slice(0, thisItemIndex);
    const endItems = thisQuestion.items.slice(
      thisItemIndex + 1,
      thisQuestion.items.length,
    );

    setThisQuestion({
      ...thisQuestion,
      items: [
        ...startItems,
        { ...thisItem, category: option.value },
        ...endItems,
      ],
    });

    // Has to generate the correct answer again
    setHasGeneratedCorrectedAnswer(false);
  };

  // Function to delete an option on click of delete button
  const handleCategoryDelete = (id, length) => {
    const thisCategory = thisQuestion.categories.find((cat) => cat.id === id);
    if (length > 2) {
      setThisQuestion({
        ...thisQuestion,
        items: [
          ...thisQuestion.items.map((item) =>
            item.category === thisCategory.value
              ? { ...item, category: null }
              : item,
          ),
        ],
        categories: [
          ...thisQuestion.categories.filter((category) => category.id !== id),
        ],
      });

      // Has to generate the correct answer again
      setHasGeneratedCorrectedAnswer(false);
    }
  };
  // Function to delete an option on click of delete button
  const handleItemDelete = (id, length) => {
    if (length > 2) {
      setThisQuestion({
        ...thisQuestion,
        items: [...thisQuestion.items.filter((item) => item.id !== id)],
      });

      // Has to generate the correct answer again
      setHasGeneratedCorrectedAnswer(false);
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
          <div className="flex h-fit w-full flex-[2] flex-col items-start gap-y-8">
            {/* Editor */}
            <ReactQuill
              className="w-full"
              placeholder="Enter the text of the Question"
              value={thisQuestion.questionText}
              onChange={handleEditorChange}
            />

            {/* Categories List and Create Button */}
            <div className="flex flex-col gap-y-4">
              <p className="font-semibold">Categories</p>
              {/* Draggable Categories list */}
              <DragDropContext onDragEnd={handleOnCategoryDragEnd}>
                <Droppable droppableId="droppable-list">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex w-fit flex-col gap-y-4 rounded-lg"
                    >
                      {thisQuestion.categories?.map((category, index) => (
                        <Draggable
                          key={category.id}
                          draggableId={category.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              tabIndex={-1}
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
                              {/* Radio and category Inputs */}
                              <div className="flex items-center gap-x-1">
                                <input
                                  ref={(el) =>
                                    (categoryRefs.current[index] = el)
                                  }
                                  className="h-10 rounded-md border border-neutral-300 pl-1"
                                  style={{
                                    backgroundColor: snapshot.isDragging
                                      ? "#e1f5fe"
                                      : "#ffffff",
                                  }}
                                  type="text"
                                  placeholder={
                                    index < 2
                                      ? `Category ${(index + 1).toString().padStart(2, "0")}`
                                      : `Category ${(index + 1).toString().padStart(2, "0")}(Optional)`
                                  }
                                  value={category.value}
                                  onChange={(e) =>
                                    handleCategoryEdit(e, category.id)
                                  }
                                />
                              </div>
                              {/* Icon to delete the option */}
                              <Button
                                onClick={() =>
                                  handleCategoryDelete(
                                    category.id,
                                    thisQuestion.categories.length,
                                  )
                                }
                                disabled={thisQuestion.categories.length < 3}
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

              {/* Add new Category ---------------------- */}
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
                {/* Category Input */}
                <div className="flex items-center gap-x-1">
                  <input
                    className="h-10 rounded-md border border-neutral-300 pl-1"
                    placeholder="Add New Category"
                    id={`newCategory-${id}`}
                    style={{
                      backgroundColor: "#ffffff",
                    }}
                    type="text"
                    onChange={(e) => handleCategoryAdd(e)}
                  />
                </div>
                {/* Icon to delete the option */}
                <Button className="rounded-full border-none bg-white p-1 text-white hover:bg-red-400">
                  <IoClose size={18} />
                </Button>
              </div>
            </div>

            {/* Items List and Create Button */}
            <div className="flex w-full flex-col gap-y-4">
              <div className="flex h-10 w-full items-center">
                <p className="flex-1 p-1 font-semibold">Items</p>
                <p className="flex-1 p-1 font-semibold">BelongsTo</p>
              </div>
              {/* Draggable Options list */}
              <DragDropContext onDragEnd={handleOnItemDragEnd}>
                <Droppable droppableId="droppable-list">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex w-full flex-col gap-y-4 rounded-lg"
                    >
                      {thisQuestion.items?.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              tabIndex={-1}
                              style={{
                                userSelect: "none",
                                display: "flex",
                                width: "100%",
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
                              <div className="flex flex-1 items-center justify-between gap-x-2 p-1">
                                {/* Icon to help dragging */}
                                <PiSquaresFour
                                  size={24}
                                  className="text-sky-700"
                                />
                                {/* category Inputs */}
                                <div className="flex items-center gap-x-1">
                                  <input
                                    ref={(el) => (itemRefs.current[index] = el)}
                                    className="h-10 rounded-md border border-neutral-300 pl-1"
                                    style={{
                                      backgroundColor: snapshot.isDragging
                                        ? "#e1f5fe"
                                        : "#ffffff",
                                    }}
                                    type="text"
                                    placeholder={
                                      index < 2
                                        ? `Item ${(index + 1).toString().padStart(2, "0")}`
                                        : `Item ${(index + 1).toString().padStart(2, "0")}`
                                    }
                                    value={item.value}
                                    onChange={(e) => handleItemEdit(e, item.id)}
                                  />
                                </div>
                                {/* Icon to delete the option */}
                                <Button
                                  onClick={() =>
                                    handleItemDelete(
                                      item.id,
                                      thisQuestion.items.length,
                                    )
                                  }
                                  disabled={thisQuestion.items.length < 3}
                                  className="rounded-full border-none bg-neutral-400 p-1 text-white hover:bg-red-400 disabled:invisible"
                                >
                                  <IoClose size={18} />
                                </Button>
                              </div>
                              <div className="flex-1 p-1">
                                <Select
                                  value={item.category.value}
                                  options={thisQuestion.categories}
                                  onChange={(option) =>
                                    handleItemCategoryChange(item.id, option)
                                  }
                                />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              {/* Add new Item ---------------------- */}
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
                <div className="ic flex flex-1 justify-between p-1">
                  {/* Icon to help dragging */}
                  <PiSquaresFour size={24} className="text-white" />
                  {/* Category Input */}
                  <div className="flex items-center gap-x-1">
                    <input
                      className="h-10 rounded-md border border-neutral-300 pl-1"
                      placeholder="Add New Item"
                      id={`newItem-${id}`}
                      style={{
                        backgroundColor: "#ffffff",
                      }}
                      type="text"
                      onChange={(e) => handleItemAdd(e)}
                    />
                  </div>
                  {/* Icon to delete the option */}
                  <Button className="rounded-full border-none bg-white p-1 text-white">
                    <IoClose size={18} />
                  </Button>
                </div>
                <div className="flex-1 p-1">
                  <Select isDisabled />
                </div>
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
                  className="h-auto w-full rounded-md object-cover"
                  src={URL.createObjectURL(thisQuestion.questionImg)}
                  alt={thisQuestion.questionText}
                />
              )}
            </div>
          </div>
        </div>

        {/* Save changes to the question */}
        {isSelected && (
          <div className="flex w-full justify-end gap-x-4">
            <Button
              disabled={hasGeneratedCorrectAnswer}
              onClick={handleUpdateCorrectAnswer}
              className="border-none bg-sky-500 text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-neutral-500"
            >
              Generate Correct Answer
            </Button>
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

  return (
    <div className="flex h-fit w-full">
      <div className="flex flex-[2] flex-col gap-y-8 p-4">
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

        <div className="flex w-full flex-col gap-y-4">
          <div className="flex w-full">
            <p className="flex-1">Item</p>
            <p className="flex-1">Belongs To</p>
          </div>
          {thisQuestion.items?.map((item) => (
            <div key={item.id} className="flex w-full">
              <p className="flex-1">{item.value}</p>
              <p className="flex-1">{item.category}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex h-full flex-[1] flex-col gap-y-8 p-1">
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

Categorise.propTypes = {
  id: PropTypes.string,
  isSelected: PropTypes.bool,
  setAreEqual: PropTypes.func,
};

export default Categorise;
