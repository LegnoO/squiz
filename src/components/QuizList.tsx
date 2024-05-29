"use client";
// Hooks
import { Dispatch, SetStateAction, useState } from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/navigation";

// Components
import ClickOutsideHandler from "./ClickAwayListenerCustom";
import Modal from "./Modal";

// Icon
import { CiClock2 } from "react-icons/ci";

export default function QuizList({
  courseList,
  onClick,
}: {
  courseList: any;
  onClick: (id: string) => void;
}) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  return (
    <>
      {openModal && (
        <Modal>
          <ClickOutsideHandler onClickAway={() => setOpenModal(false)}>
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
                  // onClick={handleCloseModal}
                  className="rounded bg-gray-200 px-4 py-2 font-medium transition hover:bg-gray-300">
                  Hủy bỏ
                </button>
                <button
                  onClick={() => onClick(id)}
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
          <h2>Khóa học</h2>
        </div>
        <div className="grid grid-cols-2 gap-6 px-4 font-medium transition-all md:grid-cols-3 md:px-0 xl:grid-cols-4">
          {courseList.map((course, index) => {
            const {
              title,
              total_time,
              max_score,
              time_begin,
              time_end,
              teacher_name,
              _id,
            } = course;

            return (
              <div
                key={index}
                className=" rounded border-[0.125rem] border-[border-primary-main] bg-[--background-primary-main] shadow transition duration-300">
                <div className="flex h-full flex-col text-[0.9375rem] font-semibold text-primary">
                  <div className="h-full px-3.5 pb-[1rem] pt-4">
                    <div className="mb-3">
                      <Link href="#">
                        <h4 className="line-clamp-2 text-xl">{title}</h4>
                      </Link>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="mw-fit text-sm font-medium">
                        <p>
                          Số lượng câu hỏi:{" "}
                          <span className="font-bold">60 câu</span>
                        </p>
                      </div>
                      <div className="mw-fit font-medium">
                        <span>
                          Thời gian làm bài:{" "}
                          <span className="font-bold">120 Phút</span>
                        </span>
                      </div>
                      <div className="mw-fit text-sm font-medium">
                        <p>
                          Thời gian bắt đầu:{" "}
                          <span className="font-bold">
                            {new Date(time_begin).getMonth() + 1}
                            {new Date(time_begin).toString().slice(7, 24)}
                          </span>
                        </p>
                      </div>
                      <div className="mw-fit text-sm font-medium">
                        <p>
                          Thời gian kết thúc:{" "}
                          <span className="font-bold">
                            {new Date(time_end).getMonth() + 1}
                            {new Date(time_end).toString().slice(7, 24)}
                          </span>
                        </p>
                      </div>
                      <div className="mw-fit text-sm font-medium">
                        <p>
                          Trạng thái:{" "}
                          {new Date(time_end) > new Date() ? (
                            <span className="font-bold">đang mở</span>
                          ) : (
                            <span className="font-bold">đã đóng</span>
                          )}
                        </p>
                      </div>
                    </div>
                    {new Date(time_end) > new Date() ? (
                      <button
                        onClick={() => {
                          setOpenModal(true);
                          setId(_id);
                        }}
                        className="mt-6 w-full self-end rounded bg-[--color-text-link] px-4 py-2 text-center font-medium text-white transition duration-300 hover:scale-105">
                        Bắt đầu làm bài
                      </button>
                    ) : (
                      <div className="mt-6 w-full self-end rounded bg-gray-500 px-4 py-2 text-center font-medium text-white">
                        Hêt thời gian
                      </div>
                    )}
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
