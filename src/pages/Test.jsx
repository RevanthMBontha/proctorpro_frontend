import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MdUpload, MdUploadFile } from "react-icons/md";
import Question from "../components/questions/Question";
import Button from "../components/Button";
import TestDetails from "../components/TestDetails";
import TestControls from "../components/TestControls";
import Loading from "../components/Loading";
import api from "../axios";

const Test = () => {
  const testBg =
    "https://images.pexels.com/photos/29820973/pexels-photo-29820973/free-photo-of-close-up-shot-of-dark-green-nettle-leaves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  const { testId } = useParams();
  const queryClient = useQueryClient();

  const [thisTest, setThisTest] = useState({
    title: "",
    description: "",
    testImg: "",
    questions: [],
  });
  const [imageSelected, setImageSelected] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  console.log(thisTest);

  // Hook to get the test data
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["tests", `${testId}`],
    queryFn: async () => {
      const response = await api.get(`/tests/${testId}`);
      return response.data;
    },
  });

  // Hook to update the test data
  const addQuestionMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post(`/tests/${testId}/addQuestion`, {
        type: "mcq",
        questionText: "",
        options: [],
        correctAnswer: "",
        clozeText: "",
        subQuestions: [],
        categories: [],
        items: [],
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tests", `${testId}`]);
    },
  });

  // Hook to update the test data
  const updateQuestionMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();

      formData.append("title", JSON.stringify(thisTest.title));
      formData.append("description", JSON.stringify(thisTest.description));
      formData.append("testImg", JSON.stringify(thisTest.testImg));
      formData.append("questions", JSON.stringify(thisTest.questions));

      formData.append("file", imageSelected);

      console.log("Form Data", formData);
      const response = await api.patch(`/tests/${testId}`, formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tests", `${testId}`]);
    },
  });

  useEffect(() => {
    if (data) {
      setThisTest(data.test);
    }
  }, [data]);

  if (isLoading) return <Loading />;

  if (isError) console.log("Error: ", error);
  if (isError) return <div>Something went wrong! Check the console.</div>;

  return (
    <div className="flex flex-1 flex-col gap-y-4 overflow-y-auto pb-16">
      {/* Test Details */}
      <div className="relative flex h-[300px] w-full items-end justify-between border-b-2 border-neutral-300">
        <img
          className="h-full w-full object-cover object-center"
          src={
            imageSelected
              ? URL.createObjectURL(imageSelected)
              : thisTest.testImg?.length > 0
                ? thisTest.testImg
                : testBg
          }
          alt="testBackground Image"
        />
        <TestDetails test={thisTest} setTest={setThisTest} />
        <TestControls
          imageSelected={imageSelected}
          setImageSelected={setImageSelected}
          testId={thisTest._id}
        />
      </div>

      {/* Test Questions */}
      <div className="flex h-fit w-full flex-col gap-y-8 px-8 py-8">
        {data.test.questions.map((question, index) => (
          <Question
            key={question._id}
            id={question._id}
            questionNumber={index + 1}
            isSelected={selectedQuestionId === question._id}
            setSelected={setSelectedQuestionId}
          />
        ))}
      </div>

      {/* Add questions and Save test */}
      <div className="flex h-fit w-full items-center justify-center gap-x-8">
        <Button
          className="flex items-center gap-x-2 border-sky-700 text-sky-700 hover:border-sky-900 hover:text-sky-900"
          onClick={addQuestionMutation.mutate}
        >
          <MdUploadFile size={20} />
          Add Question
        </Button>
        <Button
          className="flex items-center gap-x-2 border-none bg-sky-700 text-white hover:bg-sky-900"
          onClick={updateQuestionMutation.mutate}
        >
          <MdUpload size={20} />
          Save Details
        </Button>
      </div>
    </div>
  );
};

export default Test;
