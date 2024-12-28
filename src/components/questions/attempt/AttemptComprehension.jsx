import PropTypes from "prop-types";
import AttemptQuestion from "./AttemptQuestion";

const AttemptComprehension = ({
  thisQuestion,
  thisQuestionNumber,
  solutions,
  setSolutions,
}) => {
  return (
    <div className="flex w-full flex-col gap-y-8">
      {/* Question Details */}
      <div className="flex w-full gap-x-2">
        <div className="flex flex-[2] flex-col gap-y-4">
          <p className="text-2xl font-semibold">
            Read the comprehension and answer the following questions.
          </p>
          <p
            dangerouslySetInnerHTML={{ __html: thisQuestion?.questionText }}
          ></p>
        </div>
        <div className="flex flex-[1] flex-col">
          {thisQuestion?.questionImg && (
            <img
              className="h-fit w-full rounded-md object-cover"
              src={thisQuestion.questionImg}
              alt=""
            />
          )}
        </div>
      </div>
      {/* Questions */}
      {thisQuestion?.subQuestions?.map((question, index) => (
        <AttemptQuestion
          key={`${thisQuestion._id}-sub-${index + 1}`}
          id={question._id}
          questionNumber={`${thisQuestionNumber}.${index + 1}`}
          solutions={solutions}
          setSolutions={setSolutions}
        />
      ))}
    </div>
  );
};

AttemptComprehension.propTypes = {
  thisQuestion: PropTypes.object,
  thisQuestionNumber: PropTypes.string,
  solutions: PropTypes.object,
  setSolutions: PropTypes.func,
};

export default AttemptComprehension;
