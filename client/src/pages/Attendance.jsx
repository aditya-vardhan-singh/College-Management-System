import { useEffect, useState } from "react";
import AttendanceForm from "../components/Attendance/AttendanceForm";
import AttendanceTable from "../components/Attendance/AttendanceTable";
import TitleBar from "../components/Attendance/TitleBar";

export default function Mark_Attendance({ selectNavButton }) {
  /* Constants */
  const defaultTitle = "Attendance Records";
  const defaultBody = "table";

  /* States */
  const [title, setTitle] = useState(defaultTitle);
  const [body, setBody] = useState(defaultBody);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const filterTable = (dateFrom, dateTo) => {
    setDateFrom(dateFrom);
    setDateTo(dateTo);
  };

  /* Functions */
  const cancel = () => {
    setTitle(defaultTitle);
    setBody(defaultBody);
  };
  const checkBody = (value) => {
    return body === value;
  };

  /* Constants */
  const showAttendanceTable = checkBody("table");
  const showAttendanceForm = checkBody("mark-attendance-form");

  /* Effects */
  useEffect(() => selectNavButton, [selectNavButton]);

  /* Render */
  return (
    <div className="min-h-[90vh] flex flex-col items-center">
      {/* Title and Buttons */}
      <TitleBar
        title={title}
        defaultTitle={defaultTitle}
        changeTitle={(newTitle) => setTitle(newTitle)}
        changeBody={(newBody) => setBody(newBody)}
        filterTable={filterTable}
      />

      {/* Attendance Table */}
      {showAttendanceTable && (
        <AttendanceTable dateFrom={dateFrom} dateTo={dateTo} />
      )}

      {/* Attendance Form */}
      {showAttendanceForm && <AttendanceForm cancel={cancel} />}
    </div>
  );
}
