import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { baseURL } from "../AllComponents";

export default function Register_Student_Form({ selectBack }) {
  /* Effects */
  useEffect(() => {
    axios
      .get(baseURL + "/teachers/get")
      .then((response) => setTeachers(response.data.teachers))
      .catch((error) => toast.error(error.response.data.message));
    axios
      .get(baseURL + "/subjects/get")
      .then((response) => setSubjects(response.data.subjects))
      .catch((error) => toast.error(error.response.data.message));
  }, []);

  /* States */
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [student, setStudent] = useState({
    fName: "",
    mName: "",
    lName: "",
    age: "",
    gender: "",
    fatherName: "",
    classTeacher: "",
  });

  /* Functions */
  const handleSubjectChange = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((sub) => sub !== subject)
        : [...prev, subject]
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (student.gender === "") {
      toast.info("Please select gender");
      return;
    }

    if (student.classTeacher === "") {
      toast.info("Please select class teacher");
      return;
    }

    if (student.age < 3 || student.age > 20) {
      toast.info("Student age must be between 3 to 20");
      return;
    }

    const studentData = {
      ...student,
      subjects: selectedSubjects,
    };

    await axios
      .post(baseURL + "/students/register", studentData)
      .then((response) => {
        toast.success(response.data.message);
        setStudent({
          fName: "",
          mName: "",
          lName: "",
          age: "",
          gender: "",
          fatherName: "",
          classTeacher: "",
        });
        setSelectedSubjects([]);
      })
      .catch((err) => toast.error("Error registering student:" + err.message));
  };

  // Render
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-indigo-200 my-8">
      <Toaster richColors />
      <form
        className="w-full max-w-7xl bg-white p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-lg font-semibold leading-7 text-gray-900">
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
                    autoComplete="first-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={student.fName}
                    onChange={(e) =>
                      setStudent((prev) => {
                        return { ...prev, fName: e.target.value };
                      })
                    }
                    required
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
                    value={student.mName}
                    onChange={(e) =>
                      setStudent((prev) => {
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
                    value={student.lName}
                    onChange={(e) =>
                      setStudent((prev) => {
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
                  Age <span style={{ color: "red" }}>*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="age"
                    name="age"
                    type="number"
                    autoComplete="age"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                    value={student.age}
                    onChange={(e) =>
                      setStudent((prev) => {
                        return { ...prev, age: e.target.value };
                      })
                    }
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gender <span style={{ color: "red" }}>*</span>
                </label>
                <div className="mt-2">
                  <select
                    id="gender"
                    name="gender"
                    autoComplete="gender"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={student.gender}
                    onChange={(e) =>
                      setStudent((prev) => {
                        return { ...prev, gender: e.target.value };
                      })
                    }
                  >
                    <option></option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="father-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Father's Name <span style={{ color: "red" }}>*</span>
                </label>
                <div className="mt-2">
                  <input
                    id="father-name"
                    name="father-name"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                    value={student.fatherName}
                    onChange={(e) =>
                      setStudent((prev) => {
                        return { ...prev, fatherName: e.target.value };
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className=" pb-12">
            <h2 className="text-lg font-semibold leading-7 text-gray-900">
              Class Information
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* Class Teacher */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Class Teacher <span style={{ color: "red" }}>*</span>
                </label>
                <div className="mt-2">
                  <select
                    id="class-teacher"
                    name="class-teacher"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
                    value={student.classTeacher}
                    onChange={(e) =>
                      setStudent((prev) => {
                        return { ...prev, classTeacher: e.target.value };
                      })
                    }
                  >
                    <option></option>
                    {teachers.map((teacher, index) => (
                      <option key={index}>{teacher.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Subjects */}
            <div className="grid grid-cols-12 mt-5">
              <div className="sm:col-span-12">
                <label
                  htmlFor="subjects"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Subjects <span style={{ color: "red" }}>*</span>
                </label>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {subjects.map((subject, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        id={`subject-${index}`}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        value={subject.name}
                        onChange={() => handleSubjectChange(subject.name)}
                        checked={selectedSubjects.includes(subject.name)}
                      />
                      <label
                        htmlFor={`subject-${index}`}
                        className="ml-3 block text-sm leading-6 text-gray-900"
                      >
                        {subject.name}
                      </label>
                    </div>
                  ))}
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
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
