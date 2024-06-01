"use client";
// Hooks
import { useState, useEffect } from "react";

// Component
import { Carousel } from "react-responsive-carousel";
import { ColorRing } from "react-loader-spinner";

// Icon
import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";
// Types
import { IAnswer, IQuizAnswer, IQuizExam, IQuizQuestion } from "@/types/quiz";
import Header from "../../../components/Header";
import dynamic from "next/dynamic";
import AxiosInstance from "@/config/axios";
const CountdownTimer = dynamic(() => import("@/components/CountdownTimer"), {
  ssr: false,
});

export default function QuizPage({ params }: { params: { id: string } }) {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quizQuestion, setQuizQuestion] = useState<any[] | []>([]);
  const [totalTime, setTotalTime] = useState<number>(0);
  useEffect(() => {
    const getQuizExam = async () => {
      const res = await AxiosInstance.post(
        "https://e-learming-be.onrender.com/quiz-exam/get/quiz-exam",
        {
          quiz_id: params.id,
        },
      );

      setQuizAnswer((prev) => ({
        ...prev,
        quiz_exam_id: res.data.res.quiz_exam_id,
      }));

      setTimeRemaining(Math.floor(Number(res.data.res.time_remaining)));
      setTotalTime(res.data.res.total_time);
      if (res.data.res.isFirst) {
        setQuizQuestion(res.data.res.dataExam);
      } else {
        setQuizQuestion(res.data.res.dataExam.map((x: any) => x.question));
      }
    };

    getQuizExam();
  }, []);

  const [quizAnswer, setQuizAnswer] = useState<IQuizAnswer>(() => {
    return {
      quiz_exam_id: "",
      answers: quizQuestion?.map((x: IQuizQuestion) => ({
        question: {
          _id: x.id,
        },
        answer_select: 0,
      })),
    };
  });

  const handleUpdateAnswer = async (next: "next" | null) => {
    if (quizAnswer.answers.length > 0) {
      setIsLoading(true);
      await AxiosInstance.post(
        "https://e-learming-be.onrender.com/quiz-answer/update-quiz-answer",
        quizAnswer,
      );
      setIsLoading(false);
      if (next === "next") {
        setCurrentSlide((prev) =>
          prev < quizQuestion.length ? prev + 1 : prev,
        );
      }
    }
  };

  const checkAnswer = (id: number, index: number) => {
    const listIdAnswer = quizAnswer.answers.map((x: any) => ({
      question: { _id: x.question._id },
      answer_select: x.answer_select,
    }));

    const check = listIdAnswer.findIndex(
      (x) => x.question._id === id && x.answer_select === index,
    );
    return check !== -1;
  };

  const checkAnswerNav = (id: number) => {
    const listIdAnswer = quizAnswer.answers.map((x: any) => ({
      question: { _id: x.question._id },
      answer_select: x.answer_select,
    }));

    const check = listIdAnswer.findIndex(
      (x) => x.question._id === id && x.answer_select !== null,
    );
    return check !== -1;
  };

  const handleSelectAnswer = (id: string, answer_select: number) => {
    const newListAnswer = [...quizAnswer.answers];

    const questionIndex = newListAnswer.findIndex((x) => x.question._id === id);

    if (questionIndex !== -1) {
      const updatedList: IAnswer[] = newListAnswer.map((x) =>
        x.question._id === id
          ? {
              ...x,
              answer_select:
                x.answer_select === answer_select ? null : answer_select,
            }
          : x,
      );
      setQuizAnswer({
        ...quizAnswer,
        answers: updatedList,
      });
    } else {
      setQuizAnswer((prev) => ({
        ...prev,
        answers: [
          ...prev.answers,
          {
            question: {
              _id: id,
            },
            answer_select,
          },
        ],
      }));
    }
  };
  return (
    <div className="h-screen bg-[--background-surface-color]">
      <Header />
      <div className="h-full w-full pt-[2rem]">
        <div className="flex justify-center gap-4 pr-[1.5rem] md:pl-[2.5rem]">
          <div className="relative flex-1 rounded bg-[--background-primary-main] px-[1rem] pb-[2.5rem] pt-[2rem] shadow-md">
            <div className="mb-3 text-lg font-semibold">Môn: Toán cao cấp</div>

            <div className="mb-3 bg-[--background-primary-main] font-semibold text-primary">
              Chế độ: <span className="font-bold">Thi trắc nghiệm</span>
            </div>
            <div className="mb-3 bg-[--background-primary-main] font-semibold text-primary">
              Thời gian làm bài:{" "}
              <span className="font-bold">{totalTime} phút</span>
            </div>
          </div>
          <div className="quiz-slide relative w-full max-w-[45rem] rounded-lg bg-white pb-[1rem] shadow-md xl:max-w-[45rem] [&_.carousel-slider]:rounded-md [&_.control-arrow]:hover:bg-transparent">
            <Carousel
              renderArrowPrev={(clickHandler, hasNext, labelNext) =>
                hasNext && <div></div>
              }
              renderArrowNext={(clickHandler, hasNext, labelNext) =>
                hasNext && <div></div>
              }
              transitionTime={0}
              showIndicators={false}
              selectedItem={currentSlide}
              emulateTouch={false}
              showStatus={false}
              showArrows={true}
              showThumbs={false}>
              {quizQuestion.map((quiz: any, slide: number) => {
                const { _id, question, quiz_question_id, answer } = quiz;
                return (
                  <div
                    key={quiz._id}
                    className="h-full bg-[--background-primary-main] pb-[1.5rem]">
                    <div className="flex min-h-[23rem] flex-col justify-between text-primary">
                      <div className="bg-white text-left font-medium">
                        <div className="px-[2rem] py-[1.5rem] text-left text-2xl font-semibold text-primary">
                          <h3 className="mb-2 text-left">Câu {slide + 1}:</h3>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: `${question}`,
                            }}
                          />
                        </div>
                        <div className="border-break h-[1px] w-full"></div>
                      </div>
                      <div className="mt-[3rem] px-[2.5rem]">
                        <h4 className="mb-4 text-left text-sm font-semibold md:text-base">
                          Chọn định nghĩa đúng
                        </h4>
                        <div className="grid grid-cols-1 gap-6">
                          {answer.map((x: any, index: number) => {
                            const label = ["a", "b", "c", "d", "e", "f"];
                            const { content } = x;
                            return (
                              <button
                                onClick={() => {
                                  handleSelectAnswer(_id, index);
                                }}
                                key={content}
                                className={`${checkAnswer(_id, index) ? "bg-gray-300 text-primary opacity-85 hover:opacity-100" : "hover:bg-gray-100"} flex gap-2 rounded border border-[--border-primary-main] bg-[--background-primary-main] p-3 text-left font-semibold text-primary shadow-sm transition`}>
                                <span className="font-bold">
                                  {label[index].toUpperCase()}.
                                </span>
                                <div
                                  className="text-wrap"
                                  dangerouslySetInnerHTML={{
                                    __html: `${content}`,
                                  }}
                                />
                              </button>
                            );
                          })}
                        </div>
                        <div className="mt-8 flex w-full items-center justify-between">
                          <button
                            disabled={!(currentSlide > 0)}
                            onClick={() => {
                              setCurrentSlide((prev) =>
                                prev > 0 ? prev - 1 : prev,
                              );
                            }}
                            className={`${!(currentSlide > 0) && "opacity-25"} flex items-center gap-2 rounded-md bg-[--color-text-link] px-4 py-2.5 font-medium text-white`}>
                            <span className="rounded-full bg-white text-[--color-text-link]">
                              <GrFormPreviousLink />
                            </span>
                            <span>Trước</span>
                          </button>
                          {isLoading ? (
                            <button className="flex items-center gap-2 rounded-md bg-[--color-text-link] px-4 py-2 font-medium text-white">
                              <ColorRing
                                visible={true}
                                height="30"
                                width="30"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={[
                                  "#fff",
                                  "#fff",
                                  "#fff",
                                  "#fff",
                                  "#fff",
                                ]}
                              />
                            </button>
                          ) : (
                            <button
                              disabled={
                                !(currentSlide < quizQuestion.length - 1)
                              }
                              onClick={() => {
                                handleUpdateAnswer("next");
                              }}
                              className={`${!(currentSlide < quizQuestion.length - 1) && "opacity-25"} flex items-center gap-2 rounded-md bg-[--color-text-link] px-4 py-2.5 font-medium text-white`}>
                              <span>Sau</span>
                              <span className="rounded-full bg-white text-[--color-text-link]">
                                <GrFormNextLink />
                              </span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
          <div className="relative flex-1 rounded bg-[--background-primary-main] px-[1rem] pb-[2.5rem] pt-[2rem] shadow-md">
            <div className="mb-4 flex items-center gap-2 text-xl font-bold text-primary">
              <span>Thời gian:</span>
              {timeRemaining && (
                <CountdownTimer targetDate={timeRemaining * 1000} />
              )}
            </div>
            <div className="mb-4 text-lg font-semibold">Mục lục câu hỏi</div>
            <div className="mb-4 flex w-full flex-wrap items-center gap-3">
              {quizQuestion.map((x, index) => {
                const { _id } = x;

                return (
                  <button
                    className={`${isLoading ? "opacity-40" : "opacity-100"}`}
                    disabled={isLoading}
                    onClick={() => {
                      handleUpdateAnswer(null);
                      setCurrentSlide(index);
                    }}
                    key={index}>
                    <div
                      className={`${currentSlide === index ? "border-[2px] border-black" : "border border-black"} border font-semibold text-primary shadow-sm`}>
                      <p className="h-[2rem] w-[1.75rem]">{index + 1}</p>
                    </div>
                    <div
                      className={`h-[0.75rem] w-full border-t-0 ${currentSlide === index ? "border-[2px] border-black" : "border border-black"} ${checkAnswerNav(_id) ? "bg-[#52bcec]" : ""}`}></div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={async () => {
                const res = await AxiosInstance.post(
                  "https://e-learming-be.onrender.com/quiz-answer/update-final",
                  {
                    id: "663862ad00835358849aee99",
                  },
                );
                console.log(res.data);
              }}
              className="mb-3 rounded bg-[--color-text-link] px-3 py-2 font-semibold text-white transition duration-200 hover:scale-110">
              Nộp bài...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
