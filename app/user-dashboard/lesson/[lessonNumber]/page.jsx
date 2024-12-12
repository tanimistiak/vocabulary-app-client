/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import SingleLessonVocabulary from "../../../../components/UserDashboard/SingleLesson/SingleLessonVocabulary";
import { useParams } from "next/navigation";
import api from "@/utils/api";
export default function page() {
  const { lessonNumber } = useParams();

  const parsed = parseInt(lessonNumber);
  const [lessons, setLessons] = useState();
  useEffect(() => {
    api
      .get(`/user/get-lessons/${parsed}`)
      .then((data) => setLessons(data.data.lesson))
      .catch((err) => console.log(er));
  }, [parsed]);
  return (
    <div>
      {lessons?.length > 0 ? (
        <SingleLessonVocabulary lessons={lessons} />
      ) : (
        <p>No vocabularies found for this lesson</p>
      )}
    </div>
  );
}
