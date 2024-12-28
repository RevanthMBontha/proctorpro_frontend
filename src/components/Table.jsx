import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { IoSettingsSharp } from "react-icons/io5";
import Button from "./Button";
import { FaEye } from "react-icons/fa6";

function formatDate(date) {
  if (!(date instanceof Date)) {
    throw new Error("Invalid input, expected a Date object.");
  }

  const options = {
    weekday: "long", // e.g., "Monday"
    year: "numeric", // e.g., "2023"
    month: "long", // e.g., "December"
    day: "numeric", // e.g., "25"
    hour: "2-digit", // e.g., "09" (with leading zero)
    minute: "2-digit", // e.g., "05" (with leading zero)
    second: "2-digit", // e.g., "30" (with leading zero)
    hour12: true, // 12-hour clock with AM/PM
  };

  return date.toLocaleDateString("en-US", options);
}

const TestRow = ({ row }) => {
  const navigate = useNavigate();

  const handleAttempt = (e) => {
    e.stopPropagation();
    navigate(`/attempt/${row._id}`);
  };
  return (
    <div
      onClick={() => navigate(`/test-admin/create/${row._id}`)}
      className="flex h-fit w-full cursor-pointer rounded-md bg-neutral-100"
    >
      {/* Test Details */}
      <div className="flex flex-1 flex-col items-center justify-center gap-y-2 py-2">
        <p className="text-3xl font-semibold">
          {row.title ? row.title : "Untitled Test"}
        </p>
        <p className="text-sm">
          {row.description ? row.description : "No description given"}
        </p>
      </div>

      {/* Test Settings */}
      <div className="flex flex-1 flex-col items-center justify-center gap-y-2 py-2">
        <Button
          disabled={true}
          className="border-none p-0 disabled:cursor-not-allowed disabled:text-neutral-300"
        >
          <IoSettingsSharp size={28} />
        </Button>
      </div>

      {/* Created At */}
      <div className="flex flex-1 flex-col items-center justify-center gap-y-2 py-2">
        <p className="text-center text-sm">
          {formatDate(new Date(row.createdAt))}
        </p>
      </div>

      {/* Number of Attempts */}
      <div className="flex flex-1 flex-col items-center justify-center gap-y-2 py-2">
        <p className="text-center text-3xl font-semibold">
          {row.attempts.length}
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-y-2 py-2">
        <Button
          onClick={handleAttempt}
          className="border-none p-0 text-sky-700 hover:text-sky-900"
        >
          <FaEye size={28} />
        </Button>
      </div>
    </div>
  );
};

TestRow.propTypes = {
  row: PropTypes.object,
};

const Table = ({ columns, rows, searchTerm }) => {
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto">
      <div className="flex items-center justify-start border-b border-neutral-200">
        {columns.map((column, index) => (
          <div
            key={`column-${index}`}
            className="flex h-10 flex-1 items-center justify-center p-4 text-base uppercase text-neutral-400"
          >
            {column}
          </div>
        ))}
      </div>
      {/* If no tests are created yet */}
      {rows.length === 0 && (
        <div className="flex h-full w-full items-center justify-center text-neutral-300">
          No tests created yet!
        </div>
      )}

      {/* If tests have been created */}
      {rows.length > 0 && (
        <div className="flex h-full max-h-[450px] w-full flex-col gap-y-2 overflow-y-auto py-2">
          {rows
            .filter(
              (row) =>
                row.title.includes(searchTerm) ||
                row.description.includes(searchTerm),
            )
            .map((row) => (
              <TestRow key={row._id} row={row} />
            ))}
        </div>
      )}
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  searchTerm: PropTypes.string,
};

export default Table;
