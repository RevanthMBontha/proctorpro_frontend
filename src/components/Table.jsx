import PropTypes from "prop-types";

const Table = ({ columns, rows }) => {
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto">
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
      {/* If no tests are created yet */}
      {rows.length === 0 && (
        <div className="flex h-full w-full items-center justify-center text-neutral-300">
          No tests created yet!
        </div>
      )}

      {/* If tests have been created */}
      {rows.length > 0 && (
        <div className="flex h-full max-h-[450px] w-full flex-col gap-y-2 overflow-y-auto py-2">
          {rows.map((row, index) => (
            <p key={index} className="rounded-md bg-neutral-200 p-2">
              Testing
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};

export default Table;
