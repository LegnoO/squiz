"use client";
// Hooks
import { Dispatch, SetStateAction, useState } from "react";

// Next
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// Types
import { CourseListType } from "@/types/course";

// Components

export default function CourseList({
  courseList,
  onClick,
  setId,
}: {
  courseList: CourseListType;
  onClick: () => void;
  setId?: Dispatch<SetStateAction<string | number>>;
}) {
  return (
    <>
      <div className="container py-10">
        <div className="mb-3 px-4 text-left text-2xl font-semibold text-primary md:px-0">
          <h2>Khóa học</h2>
        </div>
        <div className="grid grid-cols-2 gap-8 px-4 font-medium transition-all md:grid-cols-3 md:px-0 xl:grid-cols-4">
          {courseList.map((course, index) => {
            const { name, owner, link } = course;
            return (
              <div
                key={index}
                className="h-[24.5rem] rounded border-[0.125rem] border-[border-primary-main] bg-[--background-primary-main] shadow transition duration-300">
                <div className="mb-3 flex h-full flex-col text-[0.9375rem] font-semibold text-primary">
                  <Link className="relative" href="">
                    <div
                      className="h-[7.5rem] w-full bg-cover bg-center object-cover"
                      style={{
                        backgroundImage:
                          "url('https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/63/fbabccd21040019eb0a5d36a3d4216/image-16-.png?auto=compress&dpr=1&w=268')",
                      }}></div>
                  </Link>
                  <div className="flex h-full flex-col justify-between px-3.5 pb-[1rem] pt-[3rem]">
                    <div className="mb-2 h-[7.25rem]">
                      <div className="mb-3">
                        <Link href="#">
                          <h4 className="line-clamp-2 text-xl">{name}</h4>
                        </Link>
                      </div>
                      <div className="mb-3 w-fit text-xs text-gray-500">
                        <span>Thi tự luận</span>
                      </div>
                      <p className="mb-4 mt-auto w-full text-left text-sm">
                        Giáo viên: {owner}
                      </p>
                      <p className="mb-4 mt-auto w-full text-left text-sm">
                        Điểm: <span className="font-bold">10</span>
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (setId) {
                          setId(index);
                        }
                        onClick();
                      }}
                      className="w-full self-end rounded bg-[--color-text-link] px-4 py-2 text-center font-medium text-white transition duration-300 hover:scale-105">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
