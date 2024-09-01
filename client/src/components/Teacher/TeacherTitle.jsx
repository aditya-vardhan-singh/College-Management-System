import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function TeacherTitle({ title, selectPage }) {
  /* Render */
  return (
    <>
      <div className="flex flex-row justify-between mt-6 mx-0 items-center">
        <div className="flex flex-row items-center">
          {title !== "Teacher Records" ? (
            <button
              type="button"
              className="text-white bg-indigo-700 hover:bg-indigo-500 focus:ring-4 focus:ring-indigo-400 font-medium rounded-lg text-sm px-3 py-2.5 dark:bg-indigo-700 dark:hover:bg-indigo-500 focus:outline-none dark:focus:ring-indigo-400 flex justify-center"
              onClick={() => selectPage("")}
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="h-5 w-5 text-white"
              />
              {/* Back */}
            </button>
          ) : null}
          <div className="text-4xl ml-4 font-semibold">{title}</div>
        </div>
        <div id="buttons" className="">
          <button
            type="button"
            class="text-white bg-indigo-700 hover:bg-indigo-500 focus:ring-4 focus:ring-indigo-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-0 dark:bg-indigo-700 dark:hover:bg-indigo-500 focus:outline-none dark:focus:ring-indigo-400"
            onClick={() => selectPage("register")}
          >
            <FontAwesomeIcon
              icon={faUserPlus}
              style={{ marginRight: "8px" }}
              className="h-5 w-5 text-white"
            />
            New Teacher
          </button>
          <button
            type="button"
            class="text-white bg-indigo-700 hover:bg-indigo-500 focus:ring-4 focus:ring-indigo-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-0 dark:bg-indigo-700 dark:hover:bg-indigo-500 focus:outline-none dark:focus:ring-indigo-400"
            onClick={() => selectPage("delete")}
          >
            <FontAwesomeIcon
              icon={faTrash}
              style={{ marginRight: "8px" }}
              className="h-5 w-5 text-white mr-2"
            />
            Delete Teacher
          </button>
          <button
            type="button"
            class="text-white bg-indigo-700 hover:bg-indigo-500 focus:ring-4 focus:ring-indigo-400 font-medium rounded-lg text-sm px-5 py-2.5 me-0 mb-0 dark:bg-indigo-700 dark:hover:bg-indigo-500 focus:outline-none dark:focus:ring-indigo-400"
            onClick={() => selectPage("update")}
          >
            <FontAwesomeIcon
              icon={faEdit}
              style={{ marginRight: "8px" }}
              className="h-5 w-5 text-white mr-2"
            />
            Update Existing Teacher
          </button>
        </div>
      </div>
    </>
  );
}
