import { useNavigate } from "react-router";
import { FaEllipsisVertical, FaPlus } from "react-icons/fa6";
import Button from "../components/Button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./../axios.js";
import Loading from "../components/Loading";

const CreateTest = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const user = JSON.parse(localStorage.getItem("user"));

  // Hook to get all the tests
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const response = await api.get(`/tests`);
      return response.data;
    },
  });

  // Hook to create a new test
  const createTestMutation = useMutation({
    mutationFn: async () => {
      //create a test and get it's id back - Make sure to create the id here only
      //get the newly created test back
      const response = await api.post(`/tests`, {
        title: "",
        description: "",
        testImg: "",
        questions: [],
        createdBy: user._id,
        attempts: [],
      });

      return response.data;
    },
    onSuccess: (data) => {
      navigate(`/test-admin/create/${data.test._id}`);
      queryClient.invalidateQueries(["tests"]);
    },
  });

  if (isLoading) return <Loading />;

  if (isError) console.log("Error: ", error);
  if (isError) return <div>Something went wrong! Check the console!</div>;

  return (
    <div className="flex flex-grow flex-col gap-y-8 overflow-y-auto p-8">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">My Tests</h1>
        <hr className="border-neutral-300" />
      </div>

      {/* List of created Tests */}
      <div className="grid flex-1 grid-cols-3 gap-4 p-4">
        {/* Create new Test */}
        <Button
          onClick={createTestMutation.mutate}
          className="flex h-28 w-full cursor-pointer rounded-lg border-2 border-dashed border-sky-700 bg-neutral-200 p-0"
        >
          <div className="flex h-full flex-[1] flex-col items-center justify-center p-2">
            <FaPlus className="aspect-square h-full w-full text-green-700" />
            <span className="text-lg text-green-700">Add New</span>
          </div>
          <div className="flex h-full flex-[2] items-start justify-start p-2 text-start text-sm">
            MCQs, Categorizations, Fill in the Blanks, and Comprehensions are
            supported.
          </div>
        </Button>

        {/* Get a list of created Tests */}
        {data.tests.map((item, index) => (
          <Button
            key={index + 1}
            onClick={() => navigate(`/test-admin/create/${item._id}`)}
            className="flex h-28 w-full cursor-pointer rounded-lg border-none bg-neutral-200 p-0"
          >
            <div className="flex h-full flex-[1] flex-col items-center justify-center rounded-md rounded-r-none bg-pink-400 p-2">
              <p className="text-6xl text-white">{index + 1}</p>
            </div>
            <div className="relative flex h-full flex-[2] flex-col items-start justify-start gap-y-1 p-2 text-start text-base">
              <p className="text-2xl">
                {item.title ? item.title : "Untitled Test"}
              </p>
              <p className="text-sm">
                {item.description ? item.description : "No description given"}
              </p>
              <span className="absolute right-2 top-2 border-none p-1">
                <FaEllipsisVertical />
              </span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CreateTest;
