"use client";
// Hooks
import { useState, useEffect } from "react";
import { DeltaStatic, Sources } from "quill";
import ReactQuill from "react-quill";
// Icons
import { VscClose } from "react-icons/vsc";
import { FiPlus } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoChevronBackOutline } from "react-icons/io5";

// Libs
import { v4 as uuidv4 } from "uuid";

// Components
import CustomReactQuill from "@/components/CustomReactQuill";
import ButtonDropdown from "@/components/ButtonDropdown";

export default function QuizPage() {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false, // toggle to add extra line breaks when pasting HTML:
    },
  };

  const [quizData, setQuizData] = useState<
    {
      id: string;
      content: string;
      isAnswer: boolean;
    }[]
  >([
    {
      id: uuidv4(),
      content: "",
      isAnswer: false,
    },
    {
      id: uuidv4(),
      content: "",
      isAnswer: false,
    },
  ]);

  useEffect(() => {
    const newList = [...quizData];
    const result = newList.map((x) => ({
      id: x.id,
      isOpen: false,
    }));
    setOpenAnswerField(result);
  }, [quizData]);

  const [openAnswerField, setOpenAnswerField] = useState<
    {
      id: string;
      isOpen: boolean;
    }[]
  >(() => {
    const newList = [...quizData];
    const result = newList.map((x) => ({
      id: x.id,
      isOpen: false,
    }));

    return result;
  });
  const [question, setQuestion] = useState<string>("");
  const [openOptionDropdown, setOptionDropdown] = useState<boolean>(false);

  const handleCheckTextEditor = (id: string) => {
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
  };

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
            content: value.replace("<p><br></p>", ""),
          };
        }
        return item;
      }),
    );
  };

  const handleAddQuiz = () => {
    setQuizData((prev) => {
      const updatedQuizData = [...prev];
      updatedQuizData.push({
        id: uuidv4(),
        content: "",
        isAnswer: false,
      });

      return updatedQuizData;
    });
  };

  const handleToggleEditor = (status: boolean, id?: string) => {
    setOpenAnswerField((prev) => {
      return prev.map((x) => {
        if (x.id === id) {
          return { ...x, isOpen: status };
        } else {
          return x;
        }
      });
    });
  };

  return (
    <>
      <div className="bg-white shadow-md">
        <div className="flex items-center justify-between px-[1.5rem] py-[0.5rem]">
          <div className="flex items-center gap-4">
            <button className="border-1 rounded border bg-gray-200 p-[0.25rem]">
              <IoChevronBackOutline />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button className="border-1 rounded border bg-[--color-info-dark] p-[0.25rem] px-2.5 font-medium text-white">
              Lưu
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 pb-[4rem]">
        <div className="px-[2rem] py-[1.5rem] md:px-[1.5rem]">
          <div className="relative mx-auto max-w-[45rem] rounded-md bg-white shadow-lg xl:max-w-[55rem]">
            <div className="mt-[5rem] rounded-md border px-8 py-4">
              <div className="py-[2rem]">
                <div className="Quest-Quill mb-8">
                  <h4 className="mb-3 font-medium">Phần nhập câu hỏi</h4>
                  <div className="flex flex-col gap-4">
                    <ReactQuill
                      modules={modules}
                      className={`React-Quill-Root shadow-sm  [&>.ql-container]:!h-[8rem]`}
                      placeholder="Nhập câu trả lời vào đây"
                      theme="snow"
                      value={question}
                      onChange={setQuestion}
                    />
                  </div>
                </div>
                <div className="List-Answer-Quill">
                  <h4 className="mb-3 font-medium">Phần nhập câu trả lời</h4>
                  <div className="flex flex-col gap-4">
                    {quizData.map((data, index) => {
                      const { id, content } = data;
                      return (
                        <div key={id}>
                          <CustomReactQuill
                            onDelete={() => handleDeleteQuiz(id)}
                            setClose={() => {
                              handleToggleEditor(false, id);
                            }}
                            setOpen={() => {
                              handleToggleEditor(true, id);
                            }}
                            isTexting={
                              openAnswerField.find((x) => x.id === id)
                                ?.isOpen ||
                              content.length > 1 ||
                              false
                            }
                            isChecked={
                              quizData.find((x) => x.id === id)?.isAnswer ||
                              false
                            }
                            setChecked={() => {
                              handleCheckTextEditor(id);
                            }}
                            classField="answer-field"
                            value={content}
                            onChange={(value: string) => {
                              onEditorChange(id, value);
                            }}
                          />
                        </div>
                      );
                    })}
                    {quizData.length > -1 && quizData.length < 4 ? (
                      <button
                        onClick={handleAddQuiz}
                        className="duration flex w-full cursor-pointer items-center justify-center rounded border border-[#ccc] px-[15px] py-[12px] text-center shadow-md transition hover:bg-gray-100">
                        <FiPlus className="h-[1.5rem] w-[1.5rem]" />
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
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
