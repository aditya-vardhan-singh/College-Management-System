import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { baseURL } from "../AllComponents";

export default function FindStudentForm({ selectBack }) {
  /* States */

  // Input roll number
  const [searchMode, setFindMode] = useState(true);
  const [rollNo, setRollNo] = useState("");
  const [student, setStudent] = useState({
    name: "",
    age: "",
    gender: "",
    fatherName: "",
    classTeacher: "",
  });
  const [subjects, setSubjects] = useState([]);
  const [studentSubjects, setStudentSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);

  /* Functions */

  // Find student by roll number in records
  const handleSearch = async () => {
    if (rollNo !== "") {
      let found = true;
      // Get student details
      await axios
        .get(baseURL + "/students/find", { params: { rollNo: rollNo } })
        .then((response) => {
          toast.success(response.data.message);
          const student = response.data.student;
          setStudent({
            name: student.name.trim(),
            age: student.age,
            gender: student.gender === "M" ? "Male" : "Female",
            fatherName: student.fatherName.trim(),
            classTeacher: student.classTeacher.trim(),
          });
        })
        .catch((error) => {
          toast.error(
            error.response?.data?.message ||
              "An error occurred getting student's details"
          );
          found = false;
        });
      if (found) {
        // Get student's subjects
        axios
          .get(baseURL + "/students/subjects", { params: { rollNo: rollNo } })
          .then((response) => {
            let studentSubjectsJson = response.data.subjects;
            let studentSubjects = [];
            studentSubjectsJson.forEach((subject) => {
              studentSubjects = [...studentSubjects, subject.name];
            });
            setStudentSubjects(studentSubjects);
          })
          .catch((error) => {
            toast.error(
              error.response?.data?.message ||
                "An error occurred getting student's subjects"
            );
          });
        // Get all teachers
        axios
          .get(baseURL + "/teachers/get")
          .then((response) => setTeachers(response.data.teachers))
          .catch((error) =>
            toast.error(
              error.response?.data?.message ||
                "An error occurred getting teachers"
            )
          );
        // Get all subjects
        axios
          .get(baseURL + "/subjects/get")
          .then((response) => {
            let subjectsJson = response.data.subjects;
            let subjects = [];
            subjectsJson.forEach((subject) => {
              subjects = [...subjects, subject.name];
            });
            setSubjects(subjects);
          })
          .catch((error) => {
            toast.error(
              error.response?.data?.message ||
                "An error occurred getting subjects"
            );
          });
        setFindMode(!searchMode);
      }
    } else {
      toast.info("Please enter roll number!");
    }
  };

  const handleSubjectChange = (subject) => {
    setStudentSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((sub) => sub !== subject)
        : [...prev, subject]
    );
  };

  const handleSubmit = () => {
    axios
      .post(baseURL + "/students/update", {
        rollNo: rollNo,
        student: student,
        subjects: studentSubjects,
      })
      .then((response) => {
        toast.success(response.data?.message || "Student updated successfully");
      })
      .catch((error) => {
        toast.error(error?.message || "Error updating student");
      });
    // selectBack();
  };

  /* Render */
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-indigo-200 mt-4">
      <Toaster richColors />
      <div className="w-full max-w-7xl bg-white p-8 rounded-lg shadow-md">
        {/* Form body */}

        <div className="space-y-12">
          <div className="pb-12">
            {/* Title */}
            {searchMode && (
              <>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Student Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Enter student's roll number to search in records.
                </p>
              </>
            )}
            {!searchMode && (
              <>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Update Information
                </h2>
              </>
            )}

            {/* Input box container */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
              {/* Roll number field */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="roll_no"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Student's roll number
                </label>
                <div className="mt-2">
                  <input
                    id="roll-no"
                    name="roll-no"
                    type="number"
                    autoComplete="roll-no"
                    className={
                      searchMode
                        ? "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        : "block w-full rounded-md border-0 py-1.5 text-gray-500 bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    }
                    required
                    readOnly={!searchMode}
                    onChange={(e) => setRollNo(e.target.value)}
                    value={rollNo}
                  />
                </div>
              </div>

              {/* Student detail fields */}
              {!searchMode && (
                <>
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="full-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        id="full-name"
                        name="full-name"
                        type="text"
                        autoComplete="full-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={student.name}
                        onChange={(e) => {
                          setStudent({ ...student, name: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
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
                        min={0}
                        autoComplete="age"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-5">
                    <label
                      htmlFor="father-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Father name <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        id="father-name"
                        name="father-name"
                        type="text"
                        autoComplete="father-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={student.fatherName}
                        onChange={(e) =>
                          setStudent((prev) => {
                            return { ...prev, fatherName: e.target.value };
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-5">
                    <label
                      htmlFor="class-teacher"
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
                        <option value="">Select</option>
                        {teachers.map((teacher, index) => (
                          <option key={index}>{teacher.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Student subject fields */}
              {!searchMode && (
                <div className="sm:col-span-12">
                  {/* Get Subject Marks */}
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
                              id={`subject.name-${index}`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              value={subject}
                              onChange={() => handleSubjectChange(subject)}
                              checked={studentSubjects.some(
                                (studentSubject) => studentSubject === subject
                              )}
                            />
                            <label
                              htmlFor={`subject.name-${index}`}
                              className="ml-3 block text-sm leading-6 text-gray-900"
                            >
                              {subject}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Find Buttons */}
        {searchMode && (
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
        )}

        {!searchMode && (
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
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
