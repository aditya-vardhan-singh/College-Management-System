import axios from "axios";
import React, { useEffect, useState } from "react";
import ReportCard from "./ReportCard";
import { baseURL } from "../AllComponents";
import { Toaster, toast } from "sonner";

export default function MarksheetForm({ toggleView }) {
  /* States */
  const [rollNumber, setRollNumber] = useState("");
  const [rollNumberSubmitted, setRollNumberSubmitted] = useState(false);
  const [student, setStudent] = useState({
    name: "",
    age: "",
    gender: "",
    fatherName: "",
    classTeacher: "",
  });
  const [subjects, setSubjects] = useState([]);
  const [total, setTotal] = useState(0);
  const [principal, setPrincipal] = useState("Mrs. Abha Anant");
  const [showReportCard, setShowReportCard] = useState(false);

  /* Functions */
  const handleSubmit = async () => {
    // await axios
    //   .post(baseURL + "/marks/register", {
    //     rollNo: rollNumber,
    //     subjects: subjects,
    //   })
    //   .then((response) => {
    //     toast.success(response.data.message);
    //     setTimeout(() => {
    //       toast.success("Preparing Report Card...");
    //     }, 1000 * 3);
    //   })
    //   .catch((error) => {
    //     toast.error(
    //       error.response
    //         ? error.response.data.message
    //         : "Error occured while submitting marks."
    //     );
    //   });
    // setTimeout(() => {
    //   toast.success("Preparing Report Card...");
    // }, 1000 * 3);
    // toggleView();
    setShowReportCard(true);
  };

  const printReportCard = () => {
    window.print();
  };

  /* Effects */
  useEffect(() => {
    let sum = 0;
    subjects.forEach((element) => {
      sum += element.marks ? parseInt(element.marks, 10) : 0;
    });
    setTotal(sum);
  }, [subjects]);

  const handleMarksChange = (index, newMarks) => {
    const updatedSubjects = subjects.map((subject, i) =>
      i === index ? { ...subject, marks: parseInt(newMarks, 10) } : subject
    );
    setSubjects(updatedSubjects);
  };

  const handleRollNumberSubmit = async () => {
    if (rollNumber !== "") {
      // Get student information
      let found = true;
      await axios
        .get(baseURL + "/students/find", { params: { rollNo: rollNumber } })
        .then((response) => {
          setStudent(response.data.student);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          found = false;
          console.log("We are here");
        });

      if (found) {
        // Get subjects in which student is enrolled
        await axios
          .get(baseURL + "/students/subjects", {
            params: { rollNo: rollNumber },
          })
          .then((response) => {
            let studentSubjects = response.data.subjects;
            let subjectsList = [];
            studentSubjects.forEach((subject) => {
              subjectsList = [
                ...subjectsList,
                { id: subject.id, subject: subject.name, marks: "" },
              ];
            });
            setSubjects(subjectsList);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
        return false;
      } else {
        return true;
      }
    }
  };

  const submitRollNumber = async () => {
    if (rollNumber === "") {
      toast.info("Please enter roll number");
      return;
    }
    const error = await handleRollNumberSubmit();
    if (!error) {
      setRollNumberSubmitted(true);
    }
  };

  /* Render */
  return (
    <div className="flex flex-col items-center justify-center pb-8">
      <Toaster richColors />
      {!showReportCard && (
        <>
          <div className="min-h-[90vh] mb-11">
            <div className="flex flex-row justify-center mt-4">
              <h2 className="text-4xl font-bold px-8 py-4">
                Generate Marksheet
              </h2>
            </div>
            <form
              className="w-full max-w-7xl bg-white p-8 rounded-lg shadow-md mt-4"
              onSubmit={handleSubmit}
            >
              <div className="space-y-12">
                <div>
                  <h3 className="text-lg font-bold">Student Details</h3>

                  {/* Get Roll No */}
                  <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="roll-no"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Roll Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="roll-no"
                          name="roll-no"
                          type="number"
                          min={0}
                          autoComplete="roll-no"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={rollNumber}
                          onChange={(e) => setRollNumber(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {rollNumberSubmitted && (
                      <>
                        <div className="sm:col-span-6">
                          <label
                            htmlFor="full-name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Full Name
                          </label>
                          <div className="mt-2">
                            <input
                              id="full-name"
                              name="full-name"
                              type="text"
                              min={0}
                              autoComplete="full-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-500 bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              value={student.name}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="age"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Age
                          </label>
                          <div className="mt-2">
                            <input
                              id="age"
                              name="age"
                              type="text"
                              min={0}
                              autoComplete="age"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-500 bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              value={student.age}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="gender"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Gender
                          </label>
                          <div className="mt-2">
                            <input
                              id="gender"
                              name="gender"
                              type="text"
                              min={0}
                              autoComplete="gender"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-500 bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              value={student.gender}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-5">
                          <label
                            htmlFor="father-name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Father name
                          </label>
                          <div className="mt-2">
                            <input
                              id="father-name"
                              name="father-name"
                              type="text"
                              min={0}
                              autoComplete="father-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-500 bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              value={student.fatherName}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-5">
                          <label
                            htmlFor="class-teacher"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Class Teacher
                          </label>
                          <div className="mt-2">
                            <input
                              id="class-teacher"
                              name="class-teacher"
                              type="text"
                              min={0}
                              autoComplete="class-teacher"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-500 bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              value={student.classTeacher}
                              disabled
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {!rollNumberSubmitted && (
                    <>
                      {/* Submit Roll Number */}
                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                          type="button"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={submitRollNumber}
                        >
                          Fetch Details
                        </button>
                      </div>
                    </>
                  )}

                  {rollNumberSubmitted && (
                    <>
                      {/* Get Subject Marks */}
                      <h3 className="mt-7 text-lg font-bold">Subject Marks</h3>
                      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-12">
                        {subjects.map((element, index) => (
                          <div key={element.subject} className="sm:col-span-3">
                            <label
                              htmlFor={element.subject}
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              {element.subject}
                            </label>
                            <div className="mt-2">
                              <input
                                id={element.subject}
                                name={element.subject}
                                type="number"
                                min={0}
                                max={100}
                                autoComplete={element.subject}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={element.marks}
                                onChange={(e) =>
                                  handleMarksChange(index, e.target.value)
                                }
                                required
                              />
                            </div>
                          </div>
                        ))}
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="total"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            TOTAL (Max: {subjects.length * 100})
                          </label>
                          <div className="mt-2">
                            <input
                              id="total"
                              name="total"
                              type="text"
                              min={0}
                              autoComplete="total"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-500 bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              value={
                                subjects.some((subj) => subj.marks === "")
                                  ? ""
                                  : total
                              }
                              disabled
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="percentage"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            PERCENTAGE (%)
                          </label>
                          <div className="mt-2">
                            <input
                              id="percentage"
                              name="percentage"
                              type="text"
                              min={0}
                              autoComplete="percentage"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-500 bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              value={
                                subjects.some((subj) => subj.marks === "")
                                  ? ""
                                  : Math.round(
                                      (total / subjects.length) * 100
                                    ) / 100
                              }
                              disabled
                            />
                          </div>
                        </div>
                      </div>

                      {/* Get Principal Name */}
                      <h3 className="mt-7 text-lg font-bold">Other Details</h3>
                      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="principal"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Principal's Name
                          </label>
                          <div className="mt-2">
                            <input
                              id="principal"
                              name="principal"
                              type="text"
                              autoComplete="principal"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              value={principal}
                              onChange={(e) => setPrincipal(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/****** Report Card Section ******/}
              {rollNumberSubmitted && (
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={() => {
                      setRollNumberSubmitted(false);
                      setShowReportCard(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Generate
                  </button>
                </div>
              )}
            </form>
          </div>
        </>
      )}

      {/**** Report Card Submit Section *****/}
      {showReportCard && (
        <>
          <ReportCard
            student={student}
            subjects={subjects}
            total={total}
            percentage={Math.round((total / subjects.length) * 100) / 100}
            principal={principal}
          />
          <div className="mt-4 text-center">
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={printReportCard}
            >
              Print Report Card
            </button>
          </div>
        </>
      )}
    </div>
  );
}
