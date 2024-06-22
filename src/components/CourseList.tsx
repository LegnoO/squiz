"use client";
// Next
import Image from "next/image";
import Link from "next/link";
// Types
import { ICourseList } from "@/types/Course";

// Components

export default function CourseList({
  courseList,
  onClick,
}: {
  courseList: ICourseList[];
  onClick: (id: string) => void;
}) {
  return (
    <>
      <div className="container py-10">
        <div className="mb-3 px-4 text-left text-2xl font-semibold text-primary md:px-0">
          <h2>Khóa học</h2>
        </div>
        <div className="xxl:grid-cols-5 grid grid-cols-1 gap-8 px-4 font-medium transition-all sm:grid-cols-2 md:grid-cols-3 md:px-0 xl:grid-cols-4">
          {courseList.map((course, index) => {
            const { name, _id } = course;
            return (
              <div
                key={index}
                className="h-[22.5rem] rounded border-[0.125rem] border-[border-primary-main] bg-[--background-primary-main] shadow transition duration-300">
                <div className="mb-3 flex h-full flex-col text-[0.9375rem] font-semibold text-primary">
                  <Link className="relative" href="">
                    <div className="absolute bottom-0 left-0 h-[4rem] w-[4rem] translate-x-[40%] translate-y-[50%] overflow-hidden border border-[#E1E1E1] bg-white p-[0.35rem]">
                      <Image
                        // src="/assets/thumbnail_course_1.svg"
                        src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/16/ff7d736fe7440b882e9d4c1ccd997c/coursera-wordmark-logo-full-rgb.png?auto=compress&dpr=1&w=72&h=72"
                        alt="course thumbnails"
                        loading="lazy"
                        width={50}
                        height={50}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div
                      className="h-[7.5rem] w-full bg-cover bg-center object-cover"
                      style={{
                        backgroundImage:
                          "url('https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/63/fbabccd21040019eb0a5d36a3d4216/image-16-.png?auto=compress&dpr=1&w=268')",
                      }}></div>
                  </Link>
                  <div className="flex h-full flex-col justify-between px-3.5 pb-[1rem] pt-[3rem]">
                    <div className="mb-2 h-[4rem] text-primary">
                      <div className="mb-4">
                        <Link href="#">
                          <h4 className="line-clamp-2 text-xl">{name}</h4>
                        </Link>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onClick(_id);
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
