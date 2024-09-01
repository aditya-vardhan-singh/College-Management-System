import axios from "axios";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { baseURL } from "../AllComponents";

export default function StudentTable() {
  // Effects
  useEffect(() => {
    axios
      .get(baseURL + "/students/get")
      .then((response) => {
        setStudent(response.data["students"]);
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Error occured getting students"
        );
      });
  }, []);

  // States
  const [student, setStudent] = useState([
    {
      rollNumber: "",
      name: "",
      age: "",
      gender: "",
      fatherName: "",
      classTeacher: "",
    },
  ]);

  // Render
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
                      Rollno / Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Gender / Age
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Father's Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Class Teacher
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {student.map((person) => (
                    <tr key={person.rollNumber}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-500">
                              {person.rollNumber}
                            </div>
                            <div className="text-base text-gray-900">
                              {person.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {person.gender}
                        </div>
                        <div className="text-base text-gray-900">
                          {person.age}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-base text-gray-900">
                          {person.fatherName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                        {person.classTeacher}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View
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
