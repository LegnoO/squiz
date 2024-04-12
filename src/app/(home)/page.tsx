"use client";

// Hooks
import { useState } from "react";
// Components
import CourseList from "@/components/CourseList";
// Fake Data
import { CourseListData } from "@/FakeData/CourseList";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  console.log(CourseListData.filter((x) => ["2", "5", "1"].includes(x._id)));
  return (
    <>
      <div className="">
        <CourseList courseList={CourseListData} title="Đề thi" />
      </div>
    </>
  );
}
