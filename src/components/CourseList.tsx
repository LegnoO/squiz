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
        <div className="mb-4 px-4 text-left text-2xl font-semibold text-primary md:px-0">
          <h2>{title}</h2>
        </div>
        <div className="grid grid-cols-2 gap-6 px-4 font-medium transition-all md:grid-cols-3 md:px-0 xl:grid-cols-4">
          {courseList.map((course, index) => {
            const { name, owner, link } = course;
            return (
              <div
                key={index}
                className="min-h-[10.5rem] cursor-pointer rounded-lg border-[0.125rem] border-[border-primary-main] bg-[--background-primary-main] transition duration-300 hover:-translate-y-2">
                {/* <Link href={link}>
                  <Image
                    src="/assets/thumbnail_course_1.svg"
                    alt="course thumbnails"
                    width={100}
                    height={100}
                    className="mb-2 h-[7.5rem] w-full rounded-md object-cover"
                  />
                </Link> */}
                <div className="mb-4 flex h-full flex-col justify-between p-4 text-[0.9375rem] font-semibold text-primary">
                  <div>
                    <Link href={link}>
                      <h4 className="line-clamp-2 text-base">{name}</h4>
                    </Link>
                    <div className="mt-[1rem] w-fit rounded-2xl bg-[--background-primary-color] px-[0.5rem] py-[0.25rem] text-xs">
                      <span>Thi tự luận</span>
                    </div>
                  </div>

                  <div>
                    <span className="mt-auto text-sm">Giáo viên: {owner}</span>
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
