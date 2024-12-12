"use client";
import api from "@/utils/api";
import React, { useEffect, useState } from "react";
import EditVocabularyModal from "./EditVocabularyModal";
export default function ViewLesson() {
  const [vocabulary, setVocabulary] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState();
  const [editStatus, setEditStatus] = useState(false);
  const [id, setId] = useState();
  const [lessonNum, setLessonNum] = useState();
  const [resetFilter, setResetFilter] = useState(false);
  useEffect(() => {
    api
      .get("/admin/get-all-vocabulary")
      .then((data) => setVocabulary(data.data.vocabulary))
      .catch((err) => console.log(err));
  }, [editStatus, resetFilter]);
  //   console.log(vocabulary);
  const handleDelete = async (id) => {
    // console.log(id);

    if (confirm("Press a button!\nEither OK or Cancel.")) {
      await api
        .post("/admin/delete-vocabulary", { _id: id })
        .then((data) => {
          if (data.data.status) {
            setEditStatus(!editStatus);
          }
        })
        .catch((err) => console.log(err));
    }
    console.log(res);
    /* */
  };

  const handleFilter = (e) => {
    e.preventDefault();

    const parsedLesson = parseInt(lessonNum);

    if (parsedLesson && !NaN) {
      const filteredVocabulary = vocabulary.filter(
        (item) => item.lesson === parsedLesson,
      );
      setVocabulary(filteredVocabulary);
    }
  };
  return (
    <>
      <div class="relative overflow-x-scroll">
        <form onSubmit={handleFilter}>
          <label
            for="lesson"
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Filter by lesson
          </label>
          <input
            name="lesson"
            type="number"
            id="lesson"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            onChange={(e) => setLessonNum(e.target.value)}
          />
          <button
            type="submit"
            class="my-5 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          >
            Submit
          </button>
          <button
            class="mx-5 my-5 w-full rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
            onClick={() => setResetFilter(!resetFilter)}
          >
            Reset filter
          </button>
        </form>
        <table class=" w-[80%] text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Word
              </th>

              <th scope="col" class="px-6 py-3">
                Pronunciation
              </th>
              <th scope="col" class="px-6 py-3">
                When to say
              </th>
              <th scope="col" class="px-6 py-3">
                Lesson number
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {vocabulary.map((vocabulary) => (
              <tr
                class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                key={vocabulary}
              >
                <th
                  scope="row"
                  class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {vocabulary?.word}
                </th>
                <td class="px-6 py-4">{vocabulary?.pronunciation} </td>
                <td class="px-6 py-4">{vocabulary?.when}</td>
                <td class="px-6 py-4">{vocabulary?.lesson}</td>
                <td class="px-6 py-4">
                  <span
                    className="cursor-pointer font-bold"
                    onClick={() => {
                      handleDelete(vocabulary?._id);
                    }}
                  >
                    Delete
                  </span>
                  <span
                    className="cursor-pointer font-bold"
                    onClick={() => {
                      setModalOpen(true);
                      setEdit({
                        word: vocabulary?.word,
                        pronunciation: vocabulary?.pronunciation,
                        when: vocabulary?.when,
                        lesson: vocabulary?.lesson,
                      });
                      setId(vocabulary?._id);
                    }}
                  >
                    Edit
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EditVocabularyModal
          isOpen={isModalOpen}
          edit={edit}
          setEdit={setEdit}
          setEditStatus={setEditStatus}
          editStatus={editStatus}
          id={id}
          onClose={() => setModalOpen(false)}
          title="Modal Title"
        ></EditVocabularyModal>
      </div>
    </>
  );
}
