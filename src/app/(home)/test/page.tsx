import Image from "next/image";
import Link from "next/link";

import thumbnail_1 from "@/assets/thumbnail_course_1.svg";
import thumbnail_2 from "@/assets/thumbnail_course_2.svg";
import thumbnail_3 from "@/assets/thumbnail_course_3.svg";
import thumbnail_4 from "@/assets/thumbnail_course_4.svg";
import thumbnail_5 from "@/assets/thumbnail_course_5.svg";

export default function Page({
  title = "Đề thi",
  name = "IELTS Simulation Listening test 1",
  owner = "Minh Khôi",
  link = "/",
}) {
  const thumbnails = [
    thumbnail_1,
    thumbnail_2,
    thumbnail_3,
    thumbnail_4,
    thumbnail_5,
  ];

  return (
    <div>
      <h2 className="text-center mb-3 text-xl font-medium text-primary">{title}</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {[1, 1, 1, 1, 1].map((card, index): React.ReactNode => {
          const randomThumbnail = Math.floor(Math.random() * 4);
          return (
            <div
              key={index}
              className="rounded-md border border-gray-200 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-md">
              <Link href={link}>
                <Image
                  src={thumbnails[randomThumbnail]}
                  alt="course thumbnails"
                  className="mb-2 h-[7.5rem] w-full object-cover"
                />
              </Link>
              <div className="mb-4 px-4 pt-2 text-[0.9375rem]">
                <span className="text-gray-500">Giáo viên: {owner}</span>
                <Link href={link}>
                  <h3 className="mt-1 text-primary">{name}</h3>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
