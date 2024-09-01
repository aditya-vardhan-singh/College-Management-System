import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { baseURL } from "../AllComponents";

export default function FindTeacherForm({ selectBack }) {
  /* States */
  const [teacherId, setTeacherId] = useState("");

  /* Functions */
  const handleSearch = async () => {
    await axios
      .get(baseURL + "/teachers/find", {
        params: { teacherId: teacherId },
      })
      .then((response) => {
        toast.success(response.data.message);
        setTeacherId("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  /* Render */
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-indigo-200 mt-4">
      <Toaster richColors />
      <div className="w-full max-w-7xl bg-white p-8 rounded-lg shadow-md">
        <div className="space-y-12">
          <div className="pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Teacher Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Enter teacher's id to search in records.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="roll_no"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Teacher's ID <span style={{ color: "red" }}>*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="teacher-id"
                    name="teacher-id"
                    type="number"
                    autoComplete="age"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                    onChange={(e) => setTeacherId(e.target.value)}
                    value={teacherId}
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
            onClick={selectBack}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSearch}
          >
            Find
          </button>
        </div>
      </div>
    </div>
  );
}
