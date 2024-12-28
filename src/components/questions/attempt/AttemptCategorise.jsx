import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const AttemptCategorise = ({ thisQuestion, solutions, setSolutions }) => {
  const [items, setItems] = useState(thisQuestion.items);
  const [answer, setAnswer] = useState({});

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleOnDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    console.log("Initial Solutions: ", solutions);

    // If destination is invalid,then don't do anything.
    if (!destination) return;

    // Reordering if source and destination are same in Items list
    if (destination.droppableId === source.droppableId)
      if (source.droppableId === "items-list") {
        setItems(reorder(items, source.index, destination.index));
        return;
      }

    // Moving from Item list to category
    if (source.droppableId === "items-list") {
      const thisItem = items.find((item) => item.id === draggableId);

      if (answer[destination.droppableId]) {
        let thisList = answer[destination.droppableId];
        thisList = [...thisList, thisItem];
        setAnswer({
          ...answer,
          [destination.droppableId]: thisList,
        });
      } else {
        setAnswer({
          ...answer,
          [destination.droppableId]: [thisItem],
        });
      }

      setItems(items.filter((item) => item.id !== draggableId));
      return;
    }

    // Moving items within categories
    if (source.droppableId !== destination.droppableId) {
      const thisItem = answer[source.droppableId].find(
        (item) => item.id === draggableId,
      );
      let thisList = answer[destination.droppableId];
      let updatedList = thisList ? [...thisList, thisItem] : [thisItem];
      let removedList = answer[source.droppableId].filter(
        (item) => item.id !== draggableId,
      );
      setAnswer({
        ...answer,
        [source.droppableId]: removedList,
        [destination.droppableId]: updatedList,
      });
    }
  };

  useEffect(() => {
    let final = {};
    Object.keys(answer).forEach((key) => {
      const test = answer[key];
      const output = test.map((el) => el.value);
      final = { ...final, [key]: output };
    });
    setSolutions({
      ...solutions,
      [thisQuestion._id]: {
        submitted: final,
        correctAnswer: thisQuestion.correctAnswer,
        points: thisQuestion.points,
        type: "categorise",
      },
    });
  }, [answer]);

  return (
    <div className="flex h-fit w-full gap-x-2">
      {/* Question Details */}
      <div className="flex flex-[2] flex-col gap-y-4">
        <p
          className="text-2xl font-semibold"
          dangerouslySetInnerHTML={{ __html: thisQuestion.questionText }}
        ></p>

        {/* Question Options */}
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {/* Items Holding */}
          <Droppable droppableId="items-list" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex h-fit min-h-16 w-full gap-x-4 rounded-md bg-neutral-200 p-4 shadow-inner"
              >
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
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
                        {item.value}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="flex flex-1 justify-evenly gap-x-4">
            {thisQuestion.categories.map((category, index) => (
              <div
                key={`${category.id}-container`}
                className="flex flex-col items-center gap-y-2"
              >
                <p className="text-lg">{category.label}</p>
                <Droppable key={`cat-${index}`} droppableId={category.value}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex h-fit min-h-[300px] w-[200px] flex-col gap-y-2 rounded-md bg-neutral-200 p-2 shadow-inner"
                    >
                      {answer[category.label]?.length > 0 &&
                        answer[category.label]?.map((element, index) => (
                          <Draggable
                            key={element?.id}
                            draggableId={element?.id}
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
                                {element?.value}
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* Question Metadata */}
      <div className="flex flex-[1] flex-col">
        {thisQuestion.questionImg && (
          <img src={thisQuestion.questionImg} className="rounded-md" />
        )}
      </div>
    </div>
  );
};

AttemptCategorise.propTypes = {
  thisQuestion: PropTypes.object,
  solutions: PropTypes.object,
  setSolutions: PropTypes.func,
};

export default AttemptCategorise;
