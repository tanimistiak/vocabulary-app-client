"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import Link from "next/link";
export default function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    api
      .get("/user/get-lessons")
      .then((data) => setLessons(data.data.lessons))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to fetch lessons"),
      );
  }, []);
  return (
    <div>
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6 text-2xl font-bold text-gray-700">All Lessons</h1>

          {error && (
            <div className="mb-4 rounded bg-red-100 p-4 text-red-800">
              {error}
            </div>
          )}

          <div className="overflow-x-auto rounded-lg shadow">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-600">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-4 font-medium text-gray-700">
                    Lesson Number
                  </th>
                  <th className="px-6 py-4 font-medium text-gray-700">
                    Lesson Name
                  </th>

                  <th className="px-6 py-4 font-medium text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {lessons.map((lesson, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-6 py-4">{lesson?.lessonNumber}</td>
                    <td className="px-6 py-4">{lesson?.lessonName}</td>
                    <td>
                      <Link href="/user-dashboard/lesson">Learn Lesson</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
