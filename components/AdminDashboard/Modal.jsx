import api from "@/utils/api";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";

export default function Modal({
  isOpen,
  onClose,
  edit,
  setEdit,
  setEditStatus,
  editStatus,
}) {
  if (!isOpen) return null;
  const handleChange = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };
  const [loading, setLoading] = useState(false);
  //   console.log(edit);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await api
      .put("/admin/update-lesson", edit)
      .then((data) => {
        if (data.data.status) {
          setEditStatus(!editStatus);
        }
        toast(data.data.message);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b px-4 py-2">
          <h2 className="text-lg font-semibold text-gray-800">
            Edit {edit?.lessonName ? "lesson name" : "lesson number"}
          </h2>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4">
          <div class="mb-5">
            <form onSubmit={handleSubmit}>
              <label
                for="email"
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                {edit?.lessonName ? "Lesson name" : "Lesson number"}
              </label>
              <input
                name={edit?.lessonName ? "lessonName" : "lessonNumber"}
                type={edit?.lessonName ? "text" : "number"}
                id="email"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={edit?.lessonName ? edit?.lessonName : edit?.lessonNumber}
                required
                onChange={handleChange}
              />
              {!loading ? (
                <button
                  type="submit"
                  class="my-5 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
                >
                  Submit
                </button>
              ) : (
                <LoadingSpinner />
              )}
            </form>
          </div>
        </div>

        <div className="flex justify-end border-t px-4 py-2">
          <button
            onClick={onClose}
            className="rounded bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
