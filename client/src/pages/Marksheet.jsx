import { useEffect } from "react";
import MarksheetForm from "../components/Marksheet/MarksheetForm";

export default function Generate_Marksheet({ selectNavButton, toggleView }) {
  /* Effects */
  useEffect(() => selectNavButton, [selectNavButton]);

  /* Render */
  return (
    <>
      <MarksheetForm
        toggleView={() => {
          toggleView();
        }}
      />
    </>
  );
}
