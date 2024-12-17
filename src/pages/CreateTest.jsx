import { MdUploadFile, MdCloudUpload } from "react-icons/md";
import Question from "../components/questions/Question";
import Button from "../components/Button";
import useTestStore from "../store/test.store";
import { getNewQuestion } from "../data";

const CreateTest = () => {
  const questions = useTestStore((state) => state.questions);
  const addQuestion = useTestStore((state) => state.addQuestion);
  const addQuestionAtIndex = useTestStore((state) => state.addQuestionAtIndex);
  const selectedQuestionId = useTestStore((state) => state.selectedQuestionId);

  const handleAddQuestion = () => {
    addQuestion(getNewQuestion());
  };

  // Function to handle adding a new question below the selected question
  const handleAddQuestionBelow = (questionNumber) => {
    addQuestionAtIndex(questionNumber - 1, getNewQuestion());
  };

  return (
    <div className="flex flex-1 flex-col gap-y-4 overflow-y-auto p-8">
      <div className="flex h-fit w-full justify-end border-b-2 border-neutral-300">
        Controls
      </div>
      <div className="flex h-fit w-full flex-col gap-y-8 py-8">
        {questions?.map((question, index) => (
          <Question
            key={question.id}
            id={question.id}
            questionNumber={index + 1}
            questionType={question.questionType}
            isSelected={selectedQuestionId === question.id}
            handleAddQuestionBelow={handleAddQuestionBelow}
          >
            {question.questionType === "mcq" && (
              <Question.MCQ
                id={question.id}
                isSelected={selectedQuestionId === question.id}
              />
            )}
            {question.questionType === "categorise" && (
              <Question.Categorise
                id={question.id}
                isSelected={selectedQuestionId === question.id}
              />
            )}
            {question.questionType === "cloze" && (
              <Question.Cloze
                id={question.id}
                isSelected={selectedQuestionId === question.id}
              />
            )}
            {question.questionType === "comprehension" && (
              <Question.Comprehension
                id={question.id}
                questionNumber={index + 1}
                isSelected={selectedQuestionId === question.id}
              />
            )}
          </Question>
        ))}
      </div>
      <div className="flex h-fit w-full items-center justify-center gap-x-8">
        <Button
          className="flex items-center gap-x-2 border-sky-700 text-sky-700 hover:border-sky-900 hover:text-sky-900"
          onClick={handleAddQuestion}
        >
          <MdUploadFile size={20} />
          Add Question
        </Button>
        <Button className="flex items-center gap-x-2 border-none bg-sky-700 text-white hover:bg-sky-900">
          <MdCloudUpload size={20} />
          Save
        </Button>
      </div>
    </div>
  );
};

export default CreateTest;
