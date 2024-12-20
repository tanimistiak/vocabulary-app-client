/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import api from "@/utils/api";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function page() {
  const [formData, setFormData] = useState({
    lessonName: "",
    lessonNumber: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const lessonNum = parseInt(formData.lessonNumber);
    setFormData({ ...formData, lessonNumber: lessonNum });
    // console.log({ ...formData, lessonNumber: lessonNum });
    setLoading(true);
    await api
      .post("/admin/add-lesson", formData)
      .then((data) => {
        toast(data.data.message);
      })
      .catch((err) => toast(err.message))
      .finally(() => setLoading(false));
  };
  // console.log(formData);
  return (
    <div>
      <form class="mx-auto max-w-sm" onSubmit={handleSubmit}>
        <p className="text-center font-bold">Add lesson</p>
        <div class="mb-5">
          <label
            for="email"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Lesson Number
          </label>
          <input
            type="number"
            id="lessonNumber"
            name="lessonNumber"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="eg. 1"
            required
            onChange={handleChange}
          />
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Lesson Name
          </label>
          <input
            type="text"
            id="name"
            name="lessonName"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
            placeholder="eg. Hola Japan"
            onChange={handleChange}
          />
        </div>
        {!loading ? (
          <button
            type="submit"
            class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          >
            Submit
          </button>
        ) : (
          <LoadingSpinner />
        )}
      </form>
      <ToastContainer />
    </div>
  );
}
