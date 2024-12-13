import api from "@/utils/api";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";

export default function EditUserModal({
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
  //   console.log(edit);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await api
      .put("/admin/update-user", edit)
      .then((data) => {
        if (data.data.status) {
          //   console.log("hello");
          setEditStatus(!editStatus);
          toast(data.data.message);
        }
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b px-4 py-2">
          <h2 className="text-lg font-semibold text-gray-800">
            Update User Role
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
              <select
                name="role"
                id=""
                onChange={handleChange}
                value={edit?.role}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              {!loading ? (
                <button
                  type="submit"
                  class="my-5 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
                >
                  Update
                </button>
              ) : (
                <LoadingSpinner />
              )}
            </form>
          </div>
        </div>

        {/* Modal Footer */}
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
