import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Confetti from "react-confetti";
export default function SingleLessonVocabulary({ lessons }) {
  const router = useRouter();
  const width = window.innerWidth;
  const height = window.innerHeight;
  const [count, setCount] = useState(0);
  const [lesson, setLesson] = useState(lessons[count]);
  const [completeButton, setCompleteButton] = useState(
    lessons.length > 1 ? false : true,
  );
  const [completeStatus, setCompleteStatus] = useState(false);
  const handlePrev = () => {
    setCompleteButton(false);
    setCount((prev) => {
      setCompleteButton(false);
      console.log(prev);
      if (prev > 0) {
        setLesson(lessons[prev - 1]);
        return prev - 1;
      } else {
        return prev;
      }
    });
  };
  const handlePronounce = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "ja-JP";
    window.speechSynthesis.speak(utterance);
  };
  const handleNext = () => {
    setCount((prev) => {
      console.log(prev + 1);
      if (prev + 1 === lessons.length - 1) {
        setCompleteButton(true);
        // return prev;
      }
      if (prev + 1 < lessons.length) {
        setLesson(lessons[prev + 1]);
        return prev + 1;
      }
    });
  };
  return (
    <div className="mx-auto max-w-md space-y-4 rounded-lg bg-white p-6 shadow-md">
      <div
        className="word cursor-pointer"
        onClick={() => handlePronounce(lesson.word)}
      >
        <p className="text-lg font-semibold text-gray-800">{lesson?.word}</p>
      </div>
      <div className="pronunciation">
        <p className="text-sm italic text-gray-600">{lesson?.pronunciation}</p>
      </div>
      <div className="when">
        <p className="text-sm text-gray-500">{lesson?.when}</p>
      </div>
      <div className="flex justify-between pt-4">
        <div className="prev-button">
          {count > 0 && (
            <button
              className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
              onClick={handlePrev}
            >
              Previous
            </button>
          )}
        </div>
        <div className="next-button">
          {!completeButton ? (
            <button
              className="rounded-lg bg-green-500 px-4 py-2 text-white shadow hover:bg-green-600"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <button
              className="rounded-lg bg-green-500 px-4 py-2 text-white shadow hover:bg-green-600"
              onClick={() => setCompleteStatus(true)}
            >
              Complete
            </button>
          )}
        </div>
      </div>
      {completeStatus && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          onConfettiComplete={() => router.push("/user-dashboard/lesson")}
        />
      )}
    </div>
  );
}
