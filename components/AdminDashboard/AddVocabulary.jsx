/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useUser } from "@/contexts/userContext";
import api from "@/utils/api";
import React, { useState } from "react";

export default function AddVocabulary() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    word: "",
    pronunciation: "",
    when: "",
    lesson: null,
    adminEmail: user?.email,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const lessonNum = parseInt(formData.lesson);
    setFormData({ ...formData, lesson: lessonNum });
    // console.log({ ...formData, lessonNumber: lessonNum });
    await api
      .post("/admin/add-vocabulary", formData)
      .then((data) => console.log(data.data))
      .catch((err) => console.log(err));
  };
  //   console.log(formData);
  return (
    <div>
      <form class="mx-auto max-w-sm" onSubmit={handleSubmit}>
        <p className="text-center font-bold">Add lesson</p>
        <div class="mb-5">
          <label
            for="word"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Word
          </label>
          <input
            type="text"
            id="word"
            name="word"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="eg. 1"
            required
            onChange={handleChange}
          />
        </div>
        <div class="mb-5">
          <label
            for="pronunciation"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Pronunciation
          </label>
          <input
            type="text"
            id="pronunciation"
            name="pronunciation"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
            placeholder="eg. Hola Japan"
            onChange={handleChange}
          />
        </div>
        <div class="mb-5">
          <label
            for="when"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            When to say
          </label>
          <input
            type="text"
            id="when"
            name="when"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
            placeholder="eg. Hola Japan"
            onChange={handleChange}
          />
        </div>
        <div class="mb-5">
          <label
            for="lesson"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Lesson Number
          </label>
          <input
            type="number"
            id="lesson"
            name="lesson"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
            placeholder="eg. Hola Japan"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
