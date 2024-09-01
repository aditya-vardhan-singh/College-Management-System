import { useState } from "react";

export default function TitleBar({
  title,
  defaultTitle,
  changeTitle,
  changeBody,
  filterTable,
}) {
  /* Constants */
  const showButtons = title === defaultTitle;
  const today = new Date().toISOString().split("T")[0];

  /* States */
  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(today);

  /* Render */
  return (
    <div
      className={`flex flex-row py-4 px-12 w-full ${
        showButtons ? "justify-between" : "justify-center"
      }`}
    >
      {/* Heading */}
      <div className="flex flex-row">
        <h2 className="text-4xl font-semibold">{title}</h2>
      </div>

      {/* Filter by date */}
      {showButtons && (
        <div className="ml-4 flex flex-row items-center gap-2">
          <label
            htmlFor="date-from"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            <p className="text-md">From:</p>
          </label>
          <div>
            <input
              id="date-from"
              name="date-from"
              type="date"
              autoComplete="given-name"
              className="block w-full row-span-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              max={dateTo}
            />
          </div>
          <label
            htmlFor="date-to"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            <p className="text-md">To:</p>
          </label>
          <div>
            <input
              id="date-to"
              name="date-to"
              type="date"
              autoComplete="given-name"
              className="block w-full row-span-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              max={today}
            />
          </div>
          <button type="button" onClick={() => filterTable(dateFrom, dateTo)}>
            Update
          </button>
        </div>
      )}

      {/* Buttons */}
      {showButtons && (
        <div className="flex flex-row gap-x-4">
          <button
            type="button"
            className="text-white bg-indigo-700 hover:bg-indigo-500 focus:ring-4 focus:ring-indigo-400 font-medium rounded-lg text-sm px-3 py-2.5 dark:bg-indigo-700 dark:hover:bg-indigo-500 focus:outline-none dark:focus:ring-indigo-400 flex justify-center"
            onClick={() => {
              changeTitle("Mark Attendance");
              changeBody("mark-attendance-form");
            }}
          >
            Mark Attendance
          </button>
        </div>
      )}
    </div>
  );
}
