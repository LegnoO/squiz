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

export default function Home() {
  const router = useRouter();
  const [courseList, setCourseList] = useState<any[]>([]);

  useEffect(() => {
    const getCourse = async () => {
      const res = await AxiosInstance.get(
        "https://e-learming-be.onrender.com/course/get-all",
      );
      setCourseList(res.data);
    };
    getCourse();
  }, []);

  const handleEnterQuizPage = (id: string) => {
    if (id) {
      router.push(`/quiz/${id}`);
    }
  };

  return (
    <>
      <CourseList onClick={handleEnterQuizPage} courseList={courseList} />
    </>
  );
}
