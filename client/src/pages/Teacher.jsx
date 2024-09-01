import { useEffect, useState } from "react";
import {
  TeacherTable,
  TeacherTitle,
  RegisterTeacherForm,
  DeleteTeacherForm,
  FindTeacherForm,
} from "../components/AllComponents";

export default function Teacher({ selectNavButton }) {
  /* States */
  const [page, setPage] = useState("");
  const [title, setTitle] = useState("Teacher Records");

  /* Functions */
  const findAndSetTitle = (page) => {
    switch (page) {
      case "register":
        setTitle("Register New Teacher");
        break;
      case "delete":
        setTitle("Delete Teacher");
        break;
      case "update":
        setTitle("Update Teacher");
        break;
      default:
        setTitle("Teacher Records");
        break;
    }
  };
  const selectBack = (page) => {
    setPage(page);
    findAndSetTitle(page);
  };
  const checkPage = (value) => {
    return page === value;
  };

  /* Constant */
  const showTeacherTable = checkPage("");
  const showRegisterTeacherForm = checkPage("register");
  const showDeleteTeacherForm = checkPage("delete");
  const showFindTeacherForm = checkPage("update");

  /* Effects */
  useEffect(() => {
    selectNavButton();
  }, [selectNavButton]);

  /* Render */
  return (
    <div className="my-4 mx-8">
      {/* Title */}
      <TeacherTitle
        title={title}
        selectPage={(page) => {
          setPage(page);
          findAndSetTitle(page);
        }}
      />

      {/* Subpages */}
      {showTeacherTable && <TeacherTable />}
      {showRegisterTeacherForm && (
        <RegisterTeacherForm selectBack={() => selectBack("")} />
      )}
      {showDeleteTeacherForm && (
        <DeleteTeacherForm selectBack={() => selectBack("")} />
      )}
      {showFindTeacherForm && (
        <FindTeacherForm selectBack={() => selectBack("")} />
      )}
    </div>
  );
}
