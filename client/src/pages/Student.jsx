import { useEffect, useState } from "react";
import {
  RegisterStudentForm,
  DeleteStudentForm,
  FindStudentForm,
  StudentTitle,
  StudentTable,
} from "../components/AllComponents";

export default function Student({ selectNavButton }) {
  /* States */
  const [page, setPage] = useState("");
  const [title, setTitle] = useState("Student Records");

  /* Functions */
  const findAndSetTitle = (page) => {
    let value = "";
    switch (page) {
      case "register":
        value = "Register New Student";
        break;
      case "delete":
        value = "Delete Student";
        break;
      case "update":
        value = "Update Student";
        break;
      default:
        value = "Student Records";
        break;
    }
    setTitle(value);
  };
  const selectBack = (page) => {
    setPage(page);
    findAndSetTitle(page);
  };
  const checkPage = (value) => {
    return page === value;
  };

  /* Effects */
  useEffect(() => selectNavButton(), [selectNavButton]);

  /* Constants */
  const showStudentTable = checkPage("");
  const showRegisterStudentForm = checkPage("register");
  const showDeleteStudentForm = checkPage("delete");
  const showFindStudentForm = checkPage("update");

  /* Render */
  return (
    <div className="my-4 mx-8">
      {/* Title */}
      <StudentTitle
        title={title}
        selectPage={(page) => {
          setPage(page);
          findAndSetTitle(page);
        }}
      />
      {/* Subpages */}
      {showStudentTable && <StudentTable />}
      {showRegisterStudentForm && (
        <RegisterStudentForm selectBack={() => selectBack("")} />
      )}
      {showDeleteStudentForm && (
        <DeleteStudentForm selectBack={() => selectBack("")} />
      )}
      {showFindStudentForm && (
        <FindStudentForm selectBack={() => selectBack("")} />
      )}
    </div>
  );
}
