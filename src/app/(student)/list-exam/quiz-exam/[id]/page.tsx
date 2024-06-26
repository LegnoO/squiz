"use client";

// ** React Imports
import { useState, useEffect } from "react";

// ** Next Imports
import dynamic from "next/dynamic";

// **  Component
import Header from "@/components/Header";
import { Carousel } from "react-responsive-carousel";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-toastify";
const CountdownTimer = dynamic(() => import("@/components/CountdownTimer"), {
  ssr: false,
});

// ** Icon
import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";

// ** Config
import AxiosInstance from "@/config/axios";

// ** Types
import { IAnswer, IQuizAnswer, IQuizQuestion } from "@/types/Quiz";

// ** Utils
import { handleAxiosError } from "@/utils/errorHandler";

// ** Hooks
import { useRouter } from "next-nprogress-bar";

// ** Context
import { useExam } from "@/context/ExamContext";

export default function QuizExamPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { quizExam, fetchQuizExam } = useExam();
  const [quizAnswerId, setQuizAnswerId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quizQuestion, setQuizQuestion] = useState<any[] | []>([]);
  const [totalTime, setTotalTime] = useState<number>(0);

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

  useEffect(() => {
    if (quizExam) {
      setTitle(quizExam.data.res.title);
      setQuizAnswerId(quizExam.data.res.quiz_answer_id);
      setQuizAnswer((prev) => ({
        ...prev,
        quiz_exam_id: quizExam.data.res.quiz_exam_id,
      }));

      setTimeRemaining(Math.floor(Number(quizExam.data.res.time_remaining)));
      setTotalTime(quizExam.data.res.total_time);
      if (quizExam.data.res.isFirst) {
        setQuizQuestion(quizExam.data.res.dataExam);
      } else {
        setQuizQuestion(quizExam.data.res.dataExam.map((x: any) => x.question));

        setQuizAnswer((prev) => ({
          ...prev,
          answers: quizExam.data.res.dataExam,
        }));
      }
    } else {
      fetchQuizExam(params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizExam]);

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

  async function handleSubmit() {
    try {
      await AxiosInstance.post(
        "https://e-learming-be.onrender.com/quiz-answer/update-final",
        {
          id: quizAnswerId,
        },
      );
      toast.success("Nộp bài thành công");
      router.back();
    } catch (error) {
      handleAxiosError(error);
    }
  }

  return (
    <div className="h-screen bg-white">
      <div className="min-h-full w-full py-[2rem]">
        <div className="flex flex-col justify-center gap-4 px-[1rem] lg:flex-row lg:px-[1.5rem]">
          <div className="border relative flex-1 rounded bg-[--background-primary-main] px-[1rem] pt-[2rem] shadow-md">
            <div className="mb-3 text-lg font-semibold">Môn: {title}</div>

            <div className="mb-3 bg-[--background-primary-main] font-semibold text-primary">
              Chế độ: <span className="font-bold">Thi trắc nghiệm</span>
            </div>
            <div className="mb-3 bg-[--background-primary-main] font-semibold text-primary">
              Thời gian làm bài:{" "}
              <span className="font-bold">{totalTime} phút</span>
            </div>
            <button
              onClick={() => router.back()}
              className="mb-3 rounded bg-destructive px-3 py-2 font-semibold text-destructive-foreground transition duration-200 hover:scale-110">
              Rời khỏi
            </button>
          </div>
          <div className="border quiz-slide relative w-full max-w-[45rem] rounded-lg bg-white shadow-md xl:max-w-[45rem] [&_.carousel-slider]:rounded-md [&_.control-arrow]:hover:bg-transparent">
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
                        <div className="px-[1rem] py-[1.5rem] text-left text-2xl font-semibold text-primary lg:px-[2rem]">
                          <h3 className="mb-2 text-left">Câu {slide + 1}:</h3>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: `${question}`,
                            }}
                          />
                        </div>
                        <div className="border-break h-[1px] w-full"></div>
                      </div>
                      <div className="mt-[3rem] px-[1rem] lg:px-[2.5rem]">
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
                                className={`${checkAnswer(_id, index) ? "bg-gray-200 text-primary opacity-85 hover:opacity-100" : "hover:bg-gray-300"} flex gap-2 rounded border border-[--border-primary-main] bg-[--background-primary-main] p-3 text-left font-semibold text-primary shadow-sm transition`}>
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
                            className={`${!(currentSlide > 0) && "opacity-25"} flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 font-medium text-primary-foreground`}>
                            <span className="rounded-full bg-white text-primary">
                              <GrFormPreviousLink />
                            </span>
                            <span>Trước</span>
                          </button>
                          {isLoading ? (
                            <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground">
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
                              className={`${!(currentSlide < quizQuestion.length - 1) && "opacity-25"} flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 font-medium text-primary-foreground`}>
                              <span>Sau</span>
                              <span className="rounded-full bg-white text-primary">
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
          <div className="border relative flex-1 rounded bg-[--background-primary-main] px-[1rem] pt-[2rem] shadow-md">
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
                    className={`flex items-center justify-center rounded px-2.5 py-1.5 outline outline-2 ${isLoading ? "opacity-40" : "opacity-100"} ${currentSlide === index ? "outline-primary" : "outline-secondary"} ${checkAnswerNav(_id) ? "bg-secondary" : ""}`}
                    disabled={isLoading}
                    onClick={() => {
                      handleUpdateAnswer(null);
                      setCurrentSlide(index);
                    }}
                    key={index}>
                    <div
                      className={`font-semibold text-secondary-foreground shadow-sm`}>
                      <p className="">{index + 1}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleSubmit}
              className="mb-3 rounded bg-[--color-text-link] px-3 py-2 font-semibold text-white transition duration-200 hover:scale-110">
              Nộp bài...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
