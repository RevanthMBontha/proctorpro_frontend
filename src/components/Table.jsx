import PropTypes from "prop-types";

const Table = ({ columns }) => {
  return (
    <div className="flex-grow overflow-y-auto">
      <div className="flex items-center justify-start border-b border-neutral-200">
        {columns.map((column, index) => (
          <div
            key={`column-${index}`}
            className="flex h-10 flex-1 items-center text-base uppercase text-neutral-400"
          >
            {column}
          </div>
        ))}
      </div>
      <div className="flex h-full max-h-[450px] w-full flex-col gap-y-2 overflow-y-auto py-2">
        <p className="rounded-md bg-neutral-200 p-2">Testing</p>
      </div>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
};

export default Table;
