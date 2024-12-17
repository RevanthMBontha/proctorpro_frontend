import { MdUploadFile, MdCloudUpload } from "react-icons/md";
import { v4 as uuidV4 } from "uuid";
import Question from "../components/questions/Question";
import Button from "../components/Button";
import useTestStore from "../store/test.store";

const CreateTest = () => {
  const questions = useTestStore((state) => state.questions);
  const addQuestion = useTestStore((state) => state.addQuestion);
  const selectedQuestionId = useTestStore((state) => state.selectedQuestionId);

  console.log(questions);

  const newQuestion = {
    id: uuidV4(),
    questionType: "mcq",
    questionText: "",
    questionImg: "",
    options: [
      { id: uuidV4(), value: "" },
      { id: uuidV4(), value: "" },
    ], //Only forMCQs
    correctAnswer: null, //String for MCQ, Array for Cloze, Object for Categorise
    comprehensionText: "", //String for Comprehension
    subQuestions: [], //Array of sub-questions for Comprehension
    categories: [
      { id: uuidV4(), label: "", value: "" },
      { id: uuidV4(), label: "", value: "" },
    ], //Array of categories for Categorise
    items: [], //For Categorise
    points: 0,
    negPoints: 0,
  };

  const handleAddQuestion = () => {
    addQuestion(newQuestion);
  };

  return (
    <div className="flex flex-1 flex-col gap-y-4 overflow-y-auto p-8">
      <div className="flex h-fit w-full justify-end border-b-2 border-neutral-300">
        Controls
      </div>
      <div className="flex h-fit w-full flex-col gap-y-8 py-8">
        {questions.map((question, index) => (
          <Question
            key={question.id}
            id={question.id}
            questionNumber={index + 1}
            questionType={question.questionType}
            isSelected={selectedQuestionId === question.id}
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
              <Question.Cloze question={question} />
            )}
            {question.questionType === "comprehension" && (
              <Question.Comprehension
                question={question}
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
