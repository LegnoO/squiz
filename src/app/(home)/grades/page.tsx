"use client";

// Hooks
import { useState } from "react";
// Components
import ClickOutsideHandler from "@/components/ClickAwayListenerCustom";
import Modal from "@/components/Modal";
import CourseList from "@/components/CourseList";

export default function GradePage() {
  const [id, setId] = useState<string | number>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      {openModal && (
        <Modal>
          <ClickOutsideHandler onClickAway={handleCloseModal}>
            <div className="w-[380px] rounded-lg bg-white p-[1.5rem] shadow-lg"></div>
          </ClickOutsideHandler>
        </Modal>
      )}

      <CourseList
        onClick={handleOpenModal}
        courseList={CourseListData}
        title="Kết quả"
        buttonTitle="Xem điểm"
      />
    </>
  );
}
