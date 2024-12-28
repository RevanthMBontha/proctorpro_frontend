import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./../axios.js";
import { useNavigate } from "react-router";
import { FiSearch } from "react-icons/fi";
import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";
import Loading from "../components/Loading";

const Home = () => {
  const columns = ["name", "settings", "created at", "attempts", ""];

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const response = await api.get(`/tests`);
      return response.data;
    },
  });

  const createTestMutation = useMutation({
    mutationFn: async () => {
      //create a test and get it's id back - Make sure to create the id here only
      //get the newly created test back
      const response = await api.post(`/tests`, {
        title: "",
        description: "",
        testImg: "",
        questions: [],
        createdBy: "",
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

  if (isError) console.log(error);
  if (isError) return <div>Something went wrong! Check the console.</div>;

  return (
    <div className="flex flex-grow flex-col gap-y-8 overflow-y-auto p-8">
      {/* Introduction Section to user */}
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <p className="text-2xl font-semibold">Hey, {user.firstName} 👋</p>
          <p className="text-sm text-neutral-400">
            You can see all your tests below
          </p>
        </div>

        <Button
          onClick={createTestMutation.mutate}
          className="border-none bg-sky-500 text-white hover:bg-sky-700"
        >
          Create Test
        </Button>
      </div>

      {/* Search functionality for Tests */}
      <div className="w-[450px]">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<FiSearch />}
          placeholder="Search for a test"
        />
      </div>

      {/* Table to view the Tests */}
      <div className="h-full w-full overflow-y-auto">
        <Table searchTerm={search} columns={columns} rows={data.tests} />
      </div>
    </div>
  );
};

export default Home;
