"use client";
// Hooks
import { useState } from "react";
import { DeltaStatic, Sources } from "quill";
import ReactQuill from "react-quill";
// Icons

import { VscClose } from "react-icons/vsc";
import { FiPlus } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";

// Libs
import { v4 as uuidv4 } from "uuid";

// Components
import CustomReactQuill from "@/components/CustomReactQuill";
import ButtonDropdown from "@/components/ButtonDropdown";
import ClickOutsideHandler from "@/components/ClickOutsideHandler";

export default function QuizPage() {
  const [openAnswerField, setOpenAnswerField] = useState<boolean>(false);

  const [openOptionDropdown, setOptionDropdown] = useState<boolean>(false);
  const [quizData, setQuizData] = useState<
    {
      id: string;
      isAnswer: boolean;
      content: string;
      isOpen: boolean;
      // setOpenAnswerField: React.Dispatch<React.SetStateAction<boolean>>;
    }[]
  >([
    {
      id: uuidv4(),
      isAnswer: false,
      content: "",
      isOpen: false,
      // isOpen: openAnswerField,
      // setOpenAnswerField: setOpenAnswerField,
    },
  ]);

  const handleDeleteQuiz = (id: string) => {
    setQuizData((prev) => {
      return prev.filter((x) => x.id !== id);
    });
  };

  const onEditorChange = (
    id: string,
    value: string,
    delta?: DeltaStatic,
    source?: Sources,
    editor?: ReactQuill.UnprivilegedEditor,
  ) => {
    setQuizData((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            content: value,
          };
        }
        return item;
      }),
    );
  };

  // const handleAddQuiz = () => {
  //   setQuizData((prev) => {
  //     const updatedQuizData = [...prev];
  //     updatedQuizData.push({
  //       id: uuidv4(),
  //       isAnswer: false,
  //       content: "",
  //     });

  //     return updatedQuizData;
  //   });
  // };

  console.log(quizData);

  return (
    <>
      <div className="pb-[4rem]">
        <div className="px-[2rem] py-[1.5rem] md:px-[1.5rem]">
          <div className="relative mx-auto max-w-[45rem] rounded-md shadow-md xl:max-w-[55rem]">
            <div className="mt-[5rem] border px-6 py-4">
              <div className="py-[2rem]">
                <h4 className="mb-3 font-medium">Nhập câu trả lời</h4>
                <div className="">
                  {quizData.map((data, index) => {
                    const { id, content, isAnswer, isOpen } = data;
                    return (
                      <CustomReactQuill
                        key={index}
                        onClick={() => {
                          setOpenAnswerField(true);
                        }}
                        setOpen={setOpenAnswerField}
                        isTexting={openAnswerField}
                        classField="answer-field"
                        value={content}
                        test={isOpen}
                        onChange={(
                          value: string,
                          delta: DeltaStatic,
                          source: Sources,
                          editor: ReactQuill.UnprivilegedEditor,
                        ) => {
                          onEditorChange(id, value);
                        }}
                      />
                    );
                  })}

                  {/* <div
                          key={id}
                          className={`flex h-[5rem] rounded border border-[--border-primary-main] ${isAnswer ? "outline outline-2 outline-[--color-success-dark]" : ""}`}>
                          <div className="flex h-full flex-grow items-center gap-2 px-2">

                            <textarea
                          
                              value={content}
                              placeholder="Nhập câu trả lời vào đây"
                              spellCheck={false}
                              className={`${content ? "" : "pt-[1.45rem]"} max-h-[72px] flex-1 resize-none overflow-hidden bg-transparent text-[--color-primary-main] outline-none`}></textarea>
                          </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* */}
      {/* <div className="relative w-full text-[--color-primary-main]">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="">
              <ClickOutsideHandler onOutsideClick={setOptionDropdown}>
                <ButtonDropdown
                  setIsOpenDropdown={setOptionDropdown}
                  isOpenDropdown={openOptionDropdown}
                  name="Nhiều lựa chọn">
                  <ul className="flex w-full flex-col gap-2 py-2">
                    <li className="w-full px-3">Trắc nghiệm</li>
                    <li className="w-full px-3">Tự luận</li>
                  </ul>
                </ButtonDropdown>
              </ClickOutsideHandler>
            </div>
            <div className="border border-[--border-primary-main] px-4 py-2 font-medium">
              z
            </div>
            <div className="flex items-center gap-4">
              <button className=""></button>
              <button className="color-[--color-primary-main] rounded border border-[--border-primary-main] px-4 py-2 text-sm font-bold transition duration-200 hover:bg-[--background-secondary-light]">
                Lưu câu hỏi
              </button>
            </div>
          </div>
        </div> */}

      {/* <div className="mt-[4rem]">
          <div className="h-full px-[2rem] py-[1.5rem] md:px-[1.5rem]">
            <div className="zzzmin-h-[36rem] relative mx-auto max-w-[45rem] rounded-md xl:max-w-[55rem]">
              <div className="h-full rounded bg-[--background-secondary-main] px-[2rem]">
                <div className="flex flex-col justify-between py-[2.5rem] text-[--color-primary-main]">
                  <div className="text-center text-xl font-medium">
                    <h2>Soạn câu hỏi</h2>
                    <div className="mb-6"> */}
      {/* <textarea
                        placeholder="Nhập câu hỏi vào đây"
                        maxLength={900}
                        className="h-[18rem] w-full resize-none rounded border border-[--border-primary-main] bg-transparent p-4 pr-2 focus:outline-none"
                      /> */}
      {/* <ReactQuill
                        modules={modules}
                        placeholder="Nhập câu hỏi vào đây"
                        className="React-Quill-Root question-field w-full resize-none rounded"
                        theme="snow"
                        value={quillValue}
                        onChange={setQuillValue}
                      /> */}
      {/* </div>
                  </div> */}

      {/* <div className="flex items-center gap-3">
                    {quizData.map((data, _index) => {
                      const { id, content, isAnswer } = data;
                      return ( 
                        // <div
                        //   key={id}
                        //   className={`flex h-[5rem] rounded border border-[--border-primary-main] ${isAnswer ? "outline outline-2 outline-[--color-success-dark]" : ""}`}>
                        //   <div className="flex h-full flex-grow items-center gap-2 px-2">

                        //     <textarea
                        //       onChange={(event) => {
                        //         setQuizData((prev) =>
                        //           prev.map((item) => {
                        //             if (item.id === id) {
                        //               return {
                        //                 ...item,
                        //                 content: event.target.value,
                        //               };
                        //             }
                        //             return item;
                        //           }),
                        //         );
                        //       }}
                        //       value={content}
                        //       placeholder="Nhập câu trả lời vào đây"
                        //       spellCheck={false}
                        //       className={`${content ? "" : "pt-[1.45rem]"} max-h-[72px] flex-1 resize-none overflow-hidden bg-transparent text-[--color-primary-main] outline-none`}></textarea>
                        //   </div>
                        //   {quizData.length < 3 ? (
                        //     <></>
                        //   ) : (

                        //   )}
                        // </div>
                        <div
                          className="gap--4 flex h-[8rem] w-full items-center"
                          key={_index}>
                          {/* <button
                            className="h-full border border-[--border-primary-main] px-6"
                            onClick={() => {
                              setQuizData((prev) =>
                                prev.map((item) => {
                                  if (item.id === id) {
                                    return {
                                      ...item,
                                      isAnswer: !item.isAnswer,
                                    };
                                  } else {
                                    item.isAnswer = false;
                                  }
                                  return item;
                                }),
                              );
                            }}>
                            <IoIosCheckboxOutline
                              className={`h-[2.5rem] w-[2.5rem] font-bold ${isAnswer ? "text-[--color-success-light]" : "bg-transparent text-[--color-primary-main]"}`}
                            />
                          </button> */}

      {/* <button
                            onClick={() => {
                              handleDeleteQuiz(id);
                            }}
                            className="h-full rounded border border-[--border-primary-main] bg-[--background-secondary-main] px-6 hover:bg-[--color-error-dark]">
                            <VscClose className="color-[--color-primary-main] h-[2.5rem] w-[2.5rem]" />
                          </button> */}

      {/* {quizData.length < 4 ? (
                            <button
                              onClick={handleAddQuiz}
                              className="mt-[1rem] h-full cursor-pointer rounded">
                              <HiOutlineDotsVertical className="h-[2rem] w-[2rem]" />
                            </button>
                          ) : (
                            <></>
                          )}
                        </div> */}
      {/* );
                    })}
                  </div> */}
      {/* </div>
              </div>
            </div>
          </div>
        </div>
      */}
    </>
  );
}
