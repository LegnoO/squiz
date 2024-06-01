"use client";

// Hooks
import { useEffect, useState } from "react";
// Components
import ClickOutsideHandler from "@/components/ClickAwayListenerCustom";
import Modal from "@/components/Modal";
import CourseList from "@/components/CourseList";
// Fake Data
import { CourseListData } from "@/FakeData/CourseList";
import { redirect, useRouter } from "next/navigation";
import AxiosInstance from "@/config/axios";
import { ICourseList } from "@/types/course";

export default function Home() {
  const router = useRouter();
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
      router.push(`/list-exam/${id}`);
    }
  };

  return (
    <>
      <CourseList onClick={handleEnterQuizPage} courseList={courseList} />
    </>
  );
}
