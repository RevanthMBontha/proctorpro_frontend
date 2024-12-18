import { FiSearch } from "react-icons/fi";
import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";

const Home = () => {
  const columns = ["name", "settings", "created at", "started", "finished", ""];

  return (
    <div className="flex flex-grow flex-col gap-y-8 overflow-y-auto p-8">
      {/* Introduction Section to user */}
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <p className="text-2xl font-semibold">Hey, User 👋</p>
          <p className="text-sm text-neutral-400">
            You can see all your tests below
          </p>
        </div>

        <Button className="border-none bg-sky-500 text-white hover:bg-sky-700">
          Create Test
        </Button>
      </div>

      {/* Search functionality for Tests */}
      <div className="w-[450px]">
        <Input icon={<FiSearch />} placeholder="Search for a test" />
      </div>

      {/* Table to view the Tests */}
      <div className="h-full w-full overflow-y-auto">
        <Table columns={columns} />
      </div>
    </div>
  );
};

export default Home;
