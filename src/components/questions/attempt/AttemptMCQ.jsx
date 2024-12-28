import PropTypes from "prop-types";

const AttemptMCQ = ({ thisQuestion, solutions, setSolutions }) => {
  const handleAnswerChange = (e, option) => {
    e.stopPropagation();
    setSolutions({
      ...solutions,
      [thisQuestion._id]: {
        submitted: option.value,
        correctAnswer: thisQuestion.correctAnswer,
        points: thisQuestion.points,
        type: "mcq",
      },
    });
  };

  return (
    <div className="flex w-full gap-x-2">
      <div className="flex flex-[2] flex-col gap-y-4">
        {/* Question */}
        <div
          className="text-2xl font-semibold"
          dangerouslySetInnerHTML={{ __html: thisQuestion.questionText }}
        ></div>

        <div className="flex flex-col gap-y-4 p-4">
          {thisQuestion.options.map((option) => (
            <div key={option.id} className="flex items-center gap-x-3">
              <input
                checked={
                  solutions[thisQuestion._id]?.submitted === option.value
                }
                onChange={(e) => handleAnswerChange(e, option)}
                className="h-5 w-5 cursor-pointer"
                type="radio"
              />
              <p className="text-xl">{option.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-[1]">
        <div className="h-full w-full">
          {thisQuestion.questionImg && (
            <img
              className="h-full w-full rounded-md object-cover"
              src={thisQuestion.questionImg}
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
};

AttemptMCQ.propTypes = {
  thisQuestion: PropTypes.object,
  solutions: PropTypes.object,
  setSolutions: PropTypes.func,
};

export default AttemptMCQ;
