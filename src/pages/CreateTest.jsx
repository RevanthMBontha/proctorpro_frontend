import { MdUploadFile, MdCloudUpload } from "react-icons/md";
import { FaRegImage, FaEye, FaEllipsisVertical } from "react-icons/fa6";
import Question from "../components/questions/Question";
import Button from "../components/Button";
import useTestStore from "../store/test.store";
import { getNewQuestion } from "../data";
import TestDetails from "../components/TestDetails";

const CreateTest = () => {
  const questions = useTestStore((state) => state.questions);
  const addQuestion = useTestStore((state) => state.addQuestion);
  const selectedQuestionId = useTestStore((state) => state.selectedQuestionId);

  const darkTestBg =
    "https://images.pexels.com/photos/29820973/pexels-photo-29820973/free-photo-of-close-up-shot-of-dark-green-nettle-leaves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  const grayTestBg =
    "https://images.pexels.com/photos/29777332/pexels-photo-29777332/free-photo-of-frost-covered-pine-branch-with-pine-cone-in-winter.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  const lightTestBg =
    "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  const handleAddQuestion = () => {
    addQuestion(getNewQuestion());
  };

  return (
    <div className="flex flex-1 flex-col gap-y-4 overflow-y-auto p-0">
      <div className="relative flex h-[300px] w-full items-end justify-between border-b-2 border-neutral-300">
        <img
          className="h-full w-full object-cover object-center"
          src={darkTestBg}
          alt="testBackground Image"
        />
        <TestDetails />
        <div className="absolute bottom-4 right-4 flex gap-x-2 rounded-md bg-black bg-opacity-40">
          <Button className="aspect-square border-none p-2">
            <FaRegImage className="text-white" size={24} />
          </Button>
          <Button className="aspect-square border-none p-2">
            <FaEye className="text-white" size={24} />
          </Button>
          <Button className="aspect-square border-none p-2">
            <FaEllipsisVertical className="text-white" size={24} />
          </Button>
        </div>
      </div>
      <div className="flex h-fit w-full flex-col gap-y-8 px-8 py-8">
        {questions?.map((question, index) => (
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
