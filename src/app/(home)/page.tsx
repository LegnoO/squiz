"use client";

// ** React Imports
import { useEffect, useState } from "react";

// ** Hooks
import { useRouter } from "next-nprogress-bar";

// ** Components
import CourseList from "@/components/CourseList";

// ** Config
import AxiosInstance from "@/config/axios";

// ** Types
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
