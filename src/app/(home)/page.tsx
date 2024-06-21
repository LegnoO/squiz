"use client";

// Hooks
import { useEffect, useState } from "react";

// Components
import CourseList from "@/components/CourseList";

// Fake Data
import AxiosInstance from "@/config/axios";
import { ICourseList } from "@/types/course";
import { useRouterPush } from "@/hooks/useRouterPush";

export default function Home() {
  const pushRoute = useRouterPush();
  const [courseList, setCourseList] = useState<ICourseList[]>([]);


  useEffect(() => {
    const getCourse = async () => {
      const res = await AxiosInstance.get(
        "https://e-learming-be.onrender.com/course/get-course/student",
      );
      setCourseList(res.data.data);
    };
    getCourse();
  }, []);

  const handleEnterQuizPage = (id: string) => {
    if (id) {
      pushRoute(`/list-exam/${id}`);
    }
  };

  return (
    <>
      <CourseList onClick={handleEnterQuizPage} courseList={courseList} />
    </>
  );
}
