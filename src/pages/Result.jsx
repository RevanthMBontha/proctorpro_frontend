import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import api from "../axios";
import Loading from "../components/Loading";

const Result = () => {
  const { id } = useParams();
  console.log(id);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["attempts", `${id}`],
    queryFn: async () => {
      const response = await api.get(`/attempts/${id}`);
      return response.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loading />
      </div>
    );

  if (isError) console.log("Error: ", error);
  if (isError) return <div>Something went wrong! Check your console!</div>;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-4">
      <p className="text-2xl font-semibold">
        Your score is: {data?.attempt?.score} out of {data?.attempt?.total}
      </p>
      <p>
        The ability to view which questions went wrong is under development and
        will be available soon!
      </p>
    </div>
  );
};

export default Result;
