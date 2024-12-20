"use client";
import api from "@/utils/api";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import LoadingSpinner from "../LoadingSpinner";
export default function ViewLesson() {
  const [lessons, setLessons] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState();
  const [editStatus, setEditStatus] = useState(false);
  const [deleteLesson, setDeleteLesson] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    api
      .get("/admin/get-vocabulary")
      .then((data) => setLessons(data.data.lesson))
      .catch((err) => console.log(err));
  }, [editStatus]);
  //   console.log(lessons);
  const handleDelete = async (id) => {
    // console.log(id);
    setLoading(true);
    if (confirm("Press a button!\nEither OK or Cancel.")) {
      await api
        .post("/admin/delete-lesson", { _id: id })
        .then((data) => {
          if (data.data.status) {
            setEditStatus(!editStatus);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
    console.log(res);
    /* */
  };
  return (
    <>
      <div class="relative overflow-x-scroll">
        <table class=" w-[100%] text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
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
              <th scope="col" class="px-6 py-3">
                Action
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
                  <span
                    className="cursor-pointer font-bold"
                    onClick={() => {
                      setEdit({
                        lessonNumber: lesson?._doc?.lessonNumber,
                        _id: lesson?._doc?._id,
                      });
                      setModalOpen(true);
                    }}
                  >
                    Edit
                  </span>
                </th>
                <td class="px-6 py-4">
                  {lesson?._doc?.lessonName}{" "}
                  <span
                    className="cursor-pointer font-bold"
                    onClick={() => {
                      setEdit({
                        lessonName: lesson?._doc?.lessonName,
                        _id: lesson?._doc?._id,
                      });
                      setModalOpen(true);
                    }}
                  >
                    Edit
                  </span>
                </td>
                <td class="px-6 py-4">{lesson?.vocabularyLength}</td>
                <td class="px-6 py-4">
                  {!loading ? (
                    <span
                      className="cursor-pointer font-bold"
                      onClick={() => {
                        handleDelete(lesson?._doc?._id);
                      }}
                    >
                      Delete
                    </span>
                  ) : (
                    <LoadingSpinner />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          isOpen={isModalOpen}
          edit={edit}
          setEdit={setEdit}
          setEditStatus={setEditStatus}
          editStatus={editStatus}
          onClose={() => setModalOpen(false)}
          title="Modal Title"
        ></Modal>
      </div>
    </>
  );
}
