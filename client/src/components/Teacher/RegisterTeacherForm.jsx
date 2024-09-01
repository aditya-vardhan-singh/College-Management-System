import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { baseURL } from "../AllComponents";

export default function RegisterTeacherForm({ selectBack }) {
  /* States */
  const [teacher, setTeacher] = useState({
    fName: "",
    mName: "",
    lName: "",
    workExperience: "",
    designation: "Mr.",
  });

  /* Functions */
  async function handleSubmit() {
    if (teacher.workExperience < 0) {
      toast.info("Work experience cannot be negative");
      return;
    }
    await axios
      .post(baseURL + "/teachers/register", teacher)
      .then((response) => {
        toast.success(response.data.message);
        setTeacher({
          fName: "",
          mName: "",
          lName: "",
          workExperience: "",
          designation: "",
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-indigo-200 mt-8">
      <Toaster richColors />
      <form className="w-full max-w-7xl bg-white p-8 rounded-lg shadow-md">
        <div className="space-y-12">
          <div className="pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First Name <span style={{ color: "red" }}>*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                    value={teacher.fName}
                    onChange={(e) =>
                      setTeacher((prev) => {
                        return { ...prev, fName: e.target.value };
                      })
                    }
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="middle-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Middle Name
                </label>
                <div className="mt-2">
                  <input
                    id="middle-name"
                    name="middle-name"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={teacher.mName}
                    onChange={(e) =>
                      setTeacher((prev) => {
                        return { ...prev, mName: e.target.value };
                      })
                    }
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last Name <span style={{ color: "red" }}>*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                    value={teacher.lName}
                    onChange={(e) =>
                      setTeacher((prev) => {
                        return { ...prev, lName: e.target.value };
                      })
                    }
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Work Experience <span style={{ color: "red" }}>*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="work-experience"
                    name="work-experience"
                    type="number"
                    autoComplete="work-experience"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                    value={teacher.workExperience}
                    onChange={(e) =>
                      setTeacher((prev) => {
                        return { ...prev, workExperience: e.target.value };
                      })
                    }
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Designation <span style={{ color: "red" }}>*</span>
                </label>
                <div className="mt-2">
                  <select
                    name="designation"
                    id="designation"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={teacher.designation}
                    onChange={(e) =>
                      setTeacher((prev) => {
                        return { ...prev, designation: e.target.value };
                      })
                    }
                  >
                    <option>Mr.</option>
                    <option>Ms.</option>
                    <option>Mrs.</option>
                  </select>
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
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
