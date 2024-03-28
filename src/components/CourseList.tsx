import Image from "next/image";
import Link from "next/link";
import { CourseListType } from "@/types/course";

export default function CourseList({
  courseList,
  title,
}: {
  courseList: CourseListType;
  title: string;
}) {
  return (
    <>
      <div className="container py-10">
        <div className="font-large mb-6 px-4 text-left md:px-0">
          <h2 className="text-2xl text-primary">{title}</h2>
        </div>
        <div className="font-large grid grid-cols-2 gap-6 px-4 transition-all md:grid-cols-3 md:px-0 xl:grid-cols-4">
          {courseList.map((course, index) => {
            const { name, owner, link } = course;
            return (
              <div
                key={index}
                className="rounded-md bg-[--background-secondary-main] shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-md">
                <Link href={link}>
                  <Image
                    src="/assets/thumbnail_course_1.svg"
                    alt="course thumbnails"
                    width={100}
                    height={100}
                    className="mb-2 h-[7.5rem] w-full rounded-md object-cover"
                  />
                </Link>
                <div className="mb-4 px-4 pt-2 text-[0.9375rem]">
                  <span className="text-secondary">Giáo viên: {owner}</span>
                  <Link href={link}>
                    <h3 className="mt-1 text-primary">{name}</h3>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
