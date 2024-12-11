"use client";
import api from "@/utils/api";
import React, { useEffect, useState } from "react";

export default function ViewVocabulary() {
  const [lessons, setLessons] = useState([]);
  useEffect(() => {
    api
      .get("/admin/get-vocabulary")
      .then((data) => setLessons(data.data.lesson))
      .catch((err) => console.log(err));
  }, []);
  //   console.log(lessons);
  return (
    <>
      <div class="relative overflow-x-scroll">
        <table class="ml-[15%] w-[80%] text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Lesson Number
              </th>

              <th scope="col" class="px-6 py-3">
                Lesson Name
              </th>
              <th scope="col" class="px-6 py-3">
                Vocabulary Count
              </th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((lesson) => (
              <tr
                class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                key={lesson}
              >
                <th
                  scope="row"
                  class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {lesson?._doc?.lessonNumber}
                </th>
                <td class="px-6 py-4">
                  {lesson?._doc?.lessonName}{" "}
                  <span className="cursor-pointer font-bold">Edit</span>
                </td>
                <td class="px-6 py-4">{lesson?.vocabularyLength}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
