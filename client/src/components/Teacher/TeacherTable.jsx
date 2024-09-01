import axios from "axios";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { baseURL } from "../AllComponents";

export default function TeacherTable() {
  /* Effects */
  useEffect(() => {
    axios
      .get(baseURL + "/teachers/get")
      .then((response) => {
        setTeachers(response.data.teachers);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, []);

  /* States */
  const [teachers, setTeachers] = useState([
    {
      id: "",
      name: "",
      work_experience: "",
    },
  ]);

  /* Render */
  return (
    <div className="flex flex-col items-center">
      <Toaster richColors />
      <div className="flex flex-col w-full">
        <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Teacher ID / Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Work Experience
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teachers.map((teacher) => (
                    <tr key={teacher.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-500">
                              {teacher.id}
                            </div>
                            <div className="text-base text-gray-900">
                              {teacher.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-base text-gray-900">
                          {teacher.workExperience}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
