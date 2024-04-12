// Hooks
import { useState } from "react";

// Next
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// Types
import { CourseListType } from "@/types/course";

// Components
import ClickOutsideHandler from "./ClickAwayListenerCustom";
import Modal from "./Modal";

export default function CourseList({
  courseList,
  title,
}: {
  courseList: CourseListType;
  title: string;
}) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [id, setId] = useState<string | number>("");

  const handleEnterExam = () => {
    console.log(id);    
    router.push(`/quiz/${id}`);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      {openModal && (
        <Modal>
          <ClickOutsideHandler onClickAway={handleCloseModal}>
            <div className="w-[380px] rounded-lg bg-white p-[1.5rem] shadow-lg">
              <div className="mb-[1.5rem] flex flex-col gap-2 text-left">
                <h3 className="mb-2 text-2xl font-medium">Toán cao cấp</h3>
                <p>
                  Hình thức thi: <span className="font-bold">Trắc nghiệm</span>
                </p>
                <p>
                  Số lượng câu hỏi: <span className="font-bold">10 câu</span>
                </p>
                <p>
                  Thời gian làm bài: <span className="font-bold">60 phút</span>
                </p>
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={handleCloseModal}
                  className="rounded bg-gray-200 px-4 py-2 font-medium transition hover:bg-gray-300">
                  Hủy bỏ
                </button>
                <button
                  onClick={handleEnterExam}
                  className="rounded bg-[--color-text-link] px-4 py-2 font-medium text-white transition hover:scale-105">
                  Bắt đầu làm bài
                </button>
              </div>
            </div>
          </ClickOutsideHandler>
        </Modal>
      )}

      <div className="container py-10">
        <div className="mb-3 px-4 text-left text-2xl font-semibold text-primary md:px-0">
          <h2>{title}</h2>
        </div>
        <div className="grid grid-cols-2 gap-8 px-4 font-medium transition-all md:grid-cols-3 md:px-0 xl:grid-cols-4">
          {courseList.map((course, index) => {
            const { name, owner, link } = course;
            return (
              <div
                key={index}
                className="h-[23.5rem] rounded border-[0.125rem] border-[border-primary-main] bg-[--background-primary-main] shadow transition duration-300">
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
                    {/* <Image
                      // src="/assets/thumbnail_course_1.svg"
                      src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/63/fbabccd21040019eb0a5d36a3d4216/image-16-.png?auto=compress&dpr=1&w=268"
                      loading="lazy"
                      alt="course thumbnails"
                      width={100}
                      height={100}
                      className="h-[7.5rem] w-full object-cover"
                    /> */}
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
                    </div>
                    <button
                      onClick={() => {
                        setOpenModal(true);
                        setId(index)
                      }}
                      className="w-full self-end rounded bg-[--color-text-link] px-4 py-2 text-center font-medium text-white transition duration-300 hover:scale-105">
                      Chi tiết
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
