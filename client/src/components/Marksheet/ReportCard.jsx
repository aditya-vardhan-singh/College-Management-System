import React from "react";

export default function ReportCard({
  student,
  subjects,
  total,
  percentage,
  principal,
}) {
  return (
    <div className="mt-11 w-full max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center mb-6">Report Card</h2>

      <div className="mb-4">
        <h3 className="font-semibold">Student Details</h3>
        <p>Name: {student.fullName}</p>
        <p>Age: {student.age}</p>
        <p>Gender: {student.gender}</p>
        <p>Father's Name: {student.fatherName}</p>
        <p>Class Teacher: {student.classTeacher}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Subject Marks</h3>
        <ul>
          {subjects.map((subject, index) => (
            <li key={index}>
              {subject.subject}: {subject.marks}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Total and Percentage</h3>
        <p>Total Marks: {total}</p>
        <p>Percentage: {percentage}%</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Principal's Signature</h3>
        <p>{principal}</p>
      </div>
    </div>
  );
}
