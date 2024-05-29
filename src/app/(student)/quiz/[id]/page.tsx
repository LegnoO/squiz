"use client";

// Hooks
import { useEffect, useState } from "react";
// Components
import ClickOutsideHandler from "@/components/ClickAwayListenerCustom";
import Modal from "@/components/Modal";
import QuizList from "@/components/QuizList";
// Fake Data
import { CourseListData } from "@/FakeData/CourseList";
import { redirect, useRouter } from "next/navigation";
import AxiosInstance from "@/config/axios";

export default function QuizPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [courseList, setCourseList] = useState<any>({});
  const [typeExam, setTypeExaxm] = useState<string>("dataQuizNotExpire");

  useEffect(() => {
    const getCourse = async () => {
      const res = await AxiosInstance.get(
        `https://e-learming-be.onrender.com/course/get-exam?course_id=${params.id}`,
      );

      setCourseList(res.data.res);
    };

    getCourse();
  }, [params.id]);

  const handleEnterQuizPage = (id: string) => {
    if (id) {
      router.push(`/quiz/exam/${id}`);
    }
  };

  return (
    <>
      {courseList.length < 1 && (
        <>
          <form className="w-[200px]">
            <select
              id="countries"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500">
              <option selected>Choose a country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
            </select>
          </form>
          Chưa có dữ liệu
        </>
      )}
      {typeExam === "dataQuizNotExpire" ? (
        <>
          {/* <QuizList
            onClick={handleEnterQuizPage}
            courseList={courseList[typeExam]}
          /> */}
        </>
      ) : (
        <>
          {" "}
          {/* <QuizList
        onClick={handleEnterQuizPage}
        courseList={courseList[typeExam]}
      /> */}
        </>
      )}
    </>
  );
}
