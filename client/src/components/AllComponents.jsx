/* Student Components */
import RegisterStudentForm from "./Student/RegisterStudentForm";
import DeleteStudentForm from "./Student/DeleteStudentForm";
import FindStudentForm from "./Student/FindStudentForm";
import StudentTitle from "./Student/StudentTitle";
import StudentTable from "./Student/StudentTable";

/* Teacher Components */
import TeacherTitle from "./Teacher/TeacherTitle";
import TeacherTable from "./Teacher/TeacherTable";
import RegisterTeacherForm from "./Teacher/RegisterTeacherForm";
import DeleteTeacherForm from "./Teacher/DeleteTeacherForm";
import FindTeacherForm from "./Teacher/FindTeacherForm";

/* Other */
const baseURL = "http://127.0.0.1:5000";

/* Export all */
export {
  RegisterStudentForm,
  DeleteStudentForm,
  FindStudentForm,
  StudentTitle,
  StudentTable,
  TeacherTitle,
  TeacherTable,
  RegisterTeacherForm,
  DeleteTeacherForm,
  FindTeacherForm,
  baseURL,
};
