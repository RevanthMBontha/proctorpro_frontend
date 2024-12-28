import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../axios";
import { useNavigate, useParams } from "react-router";
import Loading from "../components/Loading";
import Button from "../components/Button";
import AttemptQuestion from "../components/questions/attempt/AttemptQuestion";

const AttemptTest = () => {
  const { id } = useParams();
  const [solutions, setSolutions] = useState({});
  const navigate = useNavigate();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["tests", `${id}`],
    queryFn: async () => {
      const response = await api.get(`/tests/${id}`);
      return response.data;
    },
  });

  const addAttemptMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post(`/attempts`, {
        attemptData: { ...solutions },
        testId: id,
      });
      return response.data;
    },
    onSuccess: (data) => {
      navigate(`/result/${data.attempt._id}`);
    },
  });

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loading />
      </div>
    );

  if (isError) console.log("Error: ", error);
  if (isError) <div>Something went wrong! Check the console.</div>;

  return (
    <div className="flex w-full flex-col gap-y-4 p-0">
      {/* Test Details */}
      <div className="relative flex w-full items-center justify-between text-white">
        {data?.test?.testImg ? (
          <img src={data.test.testImg} className="h-[300px] w-full" />
        ) : (
          <img />
        )}
        {/* Test Name and Description */}
        <div className="absolute bottom-2 left-2 flex min-w-72 flex-col gap-y-2 rounded-md border border-neutral-300 bg-black bg-opacity-40 p-2">
          <p className="text-3xl font-bold">{data.test.title}</p>
          <p className="text-sm">{data.test.description}</p>
        </div>

        {/* Test Score */}
        <div className="absolute bottom-2 right-2 h-fit rounded-md border border-neutral-300 p-2 text-2xl font-semibold">
          Total Score:{" "}
          {data?.test?.questions
            .map((question) => question.points)
            .reduce((acc, cv) => acc + cv)}
        </div>
      </div>

      {/* Test Questions */}
      <div className="flex w-full flex-col gap-y-4 px-4">
        {data?.test?.questions?.map((question, index) => (
          <AttemptQuestion
            id={question._id}
            questionNumber={`${index + 1}`}
            key={index}
            solutions={solutions}
            setSolutions={setSolutions}
          />
        ))}
      </div>

      {/* Button to submit test */}
      <div className="flex w-full justify-center pb-8">
        <Button
          onClick={addAttemptMutation.mutate}
          className="border-none bg-sky-700 text-white hover:bg-sky-900"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AttemptTest;
