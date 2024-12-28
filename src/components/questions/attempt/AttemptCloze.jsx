import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const AttemptCloze = ({ thisQuestion, solutions, setSolutions }) => {
  const [options, setOptions] = useState(thisQuestion.options);
  const [answer, setAnswer] = useState(
    thisQuestion.clozeText.split("____").map(() => null),
  );

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleOnDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (destination.droppableId === source.droppableId) {
      setOptions(reorder(options, source.index, destination.index));
      return;
    }

    if (destination.droppableId !== "options-list") {
      const thisItem = thisQuestion.options.find(
        (option) => option.id === draggableId,
      );

      const destId = parseInt(destination.droppableId.split("-")[1]);

      let newAnswer = [...answer];
      newAnswer[destId] = thisItem;
      setAnswer(newAnswer);

      const listedIds = newAnswer.map((answer) => (answer ? answer.id : null));

      setOptions(
        thisQuestion.options.filter((option) => !listedIds.includes(option.id)),
      );

      return;
    }

    if (destination.droppableId === "options-list") {
      const srcId = parseInt(source.droppableId.split("-")[1]);

      let newAnswer = [...answer];
      newAnswer[srcId] = null;
      setAnswer(newAnswer);

      const listedIds = newAnswer.map((answer) => (answer ? answer.id : null));

      setOptions(
        thisQuestion.options.filter((option) => !listedIds.includes(option.id)),
      );
      return;
    }
  };

  useEffect(() => {
    let finalAnswer = answer.slice(0, answer.length - 1);

    setSolutions({
      ...solutions,
      [thisQuestion._id]: {
        submitted: finalAnswer.map((ans) => (ans?.value ? ans?.value : null)),
        correctAnswer: thisQuestion.correctAnswer,
        points: thisQuestion.points,
        type: "cloze",
      },
    });
  }, [answer]);

  return (
    <div className="flex h-fit w-full gap-x-2">
      <div className="flex flex-[2] flex-col gap-y-4">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="flex h-12 items-center gap-x-2">
            {thisQuestion.clozeText.split("____").map((item, index) => {
              if (index === thisQuestion.clozeText.split("____").length - 1) {
                return (
                  <p key={index} className="text-2xl font-semibold">
                    {item}
                  </p>
                );
              } else {
                return (
                  <div key={index} className="flex items-center gap-x-2">
                    <p className="text-2xl font-semibold">{item}</p>
                    <Droppable droppableId={`blank-${index}`}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="h-12 w-24 rounded-md bg-neutral-200 p-2 shadow-inner"
                        >
                          {answer[index] && (
                            <Draggable
                              index={index}
                              draggableId={answer[index]?.id}
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
                                  className="flex h-full w-full items-center justify-center border-neutral-300"
                                >
                                  {answer[index]?.value}
                                </div>
                              )}
                            </Draggable>
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                );
              }
            })}
          </div>

          <Droppable droppableId="options-list" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex w-full items-center gap-x-4 rounded-md bg-neutral-200 p-2 shadow-inner"
              >
                {options.map((item, index) => (
                  <Draggable index={index} draggableId={item.id} key={item.id}>
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
                        className="h-fit w-fit border-neutral-300 p-2 px-4"
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
        </DragDropContext>
      </div>
      <div className="flex flex-[1] flex-col gap-y-4">
        {thisQuestion.questionImg && (
          <img
            className="h-fit w-full rounded-md object-cover"
            src={thisQuestion.questionImg}
            alt=""
          />
        )}
      </div>
    </div>
  );
};

AttemptCloze.propTypes = {
  thisQuestion: PropTypes.object,
  solutions: PropTypes.object,
  setSolutions: PropTypes.func,
};

export default AttemptCloze;
