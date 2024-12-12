"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/api.jsx";
import EditUserModal from "./EditUserModal";
export default function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState();
  const [editStatus, setEditStatus] = useState(false);
  useEffect(() => {
    api
      .get("/admin/get-users")
      .then((data) => setUsers(data.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to fetch users"),
      );
  }, [editStatus]);
  return (
    <div>
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6 text-2xl font-bold text-gray-700">All Users</h1>

          {error && (
            <div className="mb-4 rounded bg-red-100 p-4 text-red-800">
              {error}
            </div>
          )}

          <div className="overflow-x-auto rounded-lg shadow">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-600">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-4 font-medium text-gray-700">Email</th>
                  <th className="px-6 py-4 font-medium text-gray-700">
                    Display Name
                  </th>
                  <th className="px-6 py-4 font-medium text-gray-700">Role</th>
                  <th className="px-6 py-4 font-medium text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.uid}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.displayName || "N/A"}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                          user.role === "admin"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setEdit(user);
                          setModalOpen(true);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <EditUserModal
        isOpen={isModalOpen}
        edit={edit}
        setEdit={setEdit}
        setEditStatus={setEditStatus}
        editStatus={editStatus}
        onClose={() => setModalOpen(false)}
        title="Modal Title"
      ></EditUserModal>
    </div>
  );
}
