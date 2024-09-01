import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Teacher from "./pages/Teacher";
import Student from "./pages/Student";
import Footer from "./components/Footer";
import Attendance from "./pages/Attendance";
import Marksheet from "./pages/Marksheet";
import Empty from "./pages/Empty";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App = () => {
  const [navButton, setNavButton] = useState("");
  const [view, setView] = useState(true);

  return (
    <div className="bg-indigo-200 min-h-screen">
      {view && <NavBar name={navButton} />}

      <Routes>
        <Route
          path="/"
          element={
            <Student
              selectNavButton={() => {
                setNavButton("Students");
              }}
            />
          }
        />
        <Route
          path="/teachers"
          element={
            <Teacher
              selectNavButton={() => {
                setNavButton("Teachers");
              }}
            />
          }
        />
        <Route
          path="/attendance"
          element={
            <Attendance
              selectNavButton={() => {
                setNavButton("Attendance");
              }}
            />
          }
        />
        <Route
          path="/marksheet"
          element={
            <Marksheet
              selectNavButton={() => {
                setNavButton("Marksheet");
              }}
              toggleView={() => {
                setView(!view);
              }}
            />
          }
        />
        <Route path="/empty" element={<Empty />} />
      </Routes>

      {view && <Footer />}
    </div>
  );
};

export default App;
