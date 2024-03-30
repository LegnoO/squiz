"use client";
// Hooks
import { useState } from "react";

// Components
import CourseList from "@/components/CourseList";
// Fake Data
import { CourseListData } from "@/FakeData/CourseList";

export default function Home() {
  return (
    <>
      <div className="">
        <CourseList courseList={CourseListData} title="Đề thi" />
      </div>
    </>
  );
}
