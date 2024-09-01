import { useState } from "react";
import React from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";

const AttendanceForm = ({ cancel }) => {
  /* Constants */
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  /* States */
  const [date, setDate] = useState(formattedDate);
  const [rollNumbers, setRollNos] = useState("");

  /* Functions */
  const handleSubmit = (e) => {
    e.preventDefault();
    let combinedRollNos = [];
    console.log(date);

    if (rollNumbers) {
      combinedRollNos = rollNumbers
        .replace(/[\n,]+/g, " ")
        .split(" ")
        .filter(Boolean);
    }

    if (date === "") {
      toast.info("Please select a date");
      return;
    }

    if (rollNumbers === "") {
      toast.info("Please enter roll numbers");
      return;
    }

    if (date > formattedDate) {
      toast.info("Date cannot be after today: " + formattedDate);
      return;
    }

    axios
      .post("http://127.0.0.1:5000/students/attendance", {
        date: date,
        rollNumbers: combinedRollNos,
      })
      .then((response) => {
        toast.success(response.data.message);
        setRollNos("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  /* Render */
  return (
    <div className="flex items-center justify-center bg-indigo-200 mt-4">
      <Toaster richColors />
      <form className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <div className="space-y-12">
          <div className="pb-8">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Mark by roll number:
            </h2>
            <p className="text-sm text-gray-500">
              Enter roll number of all students present, separated by commas, or
              space, or enter/newline.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Enter Date:
                </label>
                <div className="mt-2">
                  <input
                    id="date"
                    name="date"
                    type="date"
                    max={formattedDate}
                    autoComplete="given-name"
                    className="block w-full row-span-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Enter Roll Numbers: (separate values using: comma, space,
                  newline/enter key)
                </label>
                <div className="mt-2">
                  <textarea
                    id="roll-nos"
                    name="roll-nos"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full row-span-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                    rows={3}
                    value={rollNumbers}
                    onChange={(e) => setRollNos(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={cancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSubmit}
          >
            Mark
          </button>
        </div>
      </form>
    </div>
  );
};

export default AttendanceForm;
