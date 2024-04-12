"use client";
// Hooks
import { useState, useEffect } from "react";

// Component
import { Carousel } from "react-responsive-carousel";
import { ColorRing } from "react-loader-spinner";

// Types
import { IAnswer, IQuizAnswer, IQuizExam, IQuizQuestion } from "@/types/quiz";
import Header from "../_components/Header";
import dynamic from "next/dynamic";
const CountdownTimer = dynamic(() => import("@/components/CountdownTimer"), {
  ssr: false,
});
export default function QuizPage({ params }: { params: { id: string } }) {
  const [quizExam, setQuizExam] = useState<IQuizExam | []>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [quizQuestion, setQuizQuestion] = useState<any[] | []>([
    {
      id: "cc",
      quiz_store_id: 1,
      level: "easy",
      question: "Lorem 1",
      answer: [
        { score: 9, content: "E" },
        { score: 0, content: "F" },
        { score: 0, content: "G" },
        { score: 0, content: "H" },
      ],
    },
    {
      id: "aa",
      quiz_store_id: 1,
      level: "easy",
      question: "Lorem 2",
      answer: [
        { score: 9, content: "E" },
        { score: 0, content: "F" },
        { score: 0, content: "G" },
        { score: 0, content: "H" },
      ],
    },
    {
      id: "bb",
      quiz_store_id: 1,
      level: "easy",
      question: "Lorem 3",
      answer: [
        { score: 9, content: "E" },
        { score: 0, content: "F" },
        { score: 0, content: "G" },
        { score: 0, content: "H" },
      ],
    },
  ]);

  const [quizAnswer, setQuizAnswer] = useState<IQuizAnswer>(() => {
    return {
      quiz_exam_id: "",
      student_id: "",
      answers: quizQuestion?.map((x: IQuizQuestion) => ({
        quiz_question_id: x.id,
        question: x.question,
        answer_select: "",
        score: 0,
      })),

      total_score: 0,
    };
  });

  // const handleNext = async (clickHandler: () => void) => {
  //   setIsLoading(true);
  //   await axios.get("https://jsonplaceholder.typicode.com/todos/1");
  //   setIsLoading(false);
  //   clickHandler();
  // };

  const checkAnswer = (id: number, content: string) => {
    const listIdAnswer = quizAnswer.answers.map((x: any) => ({
      quiz_question_id: x.quiz_question_id,
      answer_select: x.answer_select,
    }));

    const check = listIdAnswer.findIndex(
      (x) => x.quiz_question_id === id && x.answer_select === content,
    );
    return check !== -1;
  };

  const checkAnswerNav = (id: number) => {
    const listIdAnswer = quizAnswer.answers.map((x: any) => ({
      quiz_question_id: x.quiz_question_id,
      answer_select: x.answer_select,
    }));

    const check = listIdAnswer.findIndex(
      (x) => x.quiz_question_id === id && x.answer_select !== "",
    );
    return check !== -1;
  };

  console.log(quizAnswer);
  const handleSelectAnswer = (
    id: string,
    question: string,
    answer_select: string,
    score: number,
  ) => {
    const newListAnswer = [...quizAnswer.answers];
    const questionIndex = newListAnswer.findIndex(
      (x) => x.quiz_question_id === id,
    );

    if (questionIndex !== -1) {
      const updatedList: IAnswer[] = newListAnswer.map((x) =>
        x.quiz_question_id === id
          ? {
              ...x,
              answer_select:
                x.answer_select === answer_select ? "" : answer_select,
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
          { quiz_question_id: id, question, answer_select, score },
        ],
      }));
    }
  };

  return (
    <div className="h-screen bg-[--background-surface-color]">
      <Header />
      <div className="h-full w-full pt-[2rem]">
        <div className="flex justify-center gap-4 px-[1.5rem] py-[1.5rem] pr-[1.5rem] md:pl-[2.5rem]">
          <div className="relative flex-1 rounded bg-[--background-primary-main] px-[1rem] pb-[2.5rem] pt-[2rem] shadow-md">
            <div className="mb-3 text-lg font-semibold">Môn: Toán cao cấp</div>

            <div className="mb-3 bg-[--background-primary-main] font-semibold text-primary">
              Chế độ: <span className="font-bold">Thi trắc nghiệm</span>
            </div>
            <div className="mb-3 bg-[--background-primary-main] font-semibold text-primary">
              Thời gian làm bài: <span className="font-bold">60 phút</span>
            </div>
          </div>
          <div className="quiz-slide relative w-full max-w-[45rem] rounded-lg bg-white pb-[2rem] shadow-md xl:max-w-[45rem] [&_.carousel-slider]:rounded-md [&_.control-arrow]:hover:bg-transparent">
            <Carousel
              renderArrowPrev={(clickHandler, hasNext, labelNext) =>
                hasNext && (
                  <>
                    <button
                      className="control-arrow control-prev"
                      onClick={() => {
                        // handleNext(clickHandler);
                        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
                      }}></button>
                  </>
                )
              }
              renderArrowNext={(clickHandler, hasNext, labelNext) =>
                hasNext && (
                  <>
                    {isLoading ? (
                      <button className="control-arrow control-next before:!content-none">
                        <ColorRing
                          visible={true}
                          height="30"
                          width="30"
                          ariaLabel="color-ring-loading"
                          wrapperStyle={{}}
                          wrapperClass="color-ring-wrapper"
                          colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                        />
                      </button>
                    ) : (
                      <button
                        className="control-arrow control-next"
                        onClick={() => {
                          // handleNext(clickHandler);
                          setCurrentSlide((prev) =>
                            prev < quizQuestion.length ? prev + 1 : prev,
                          );
                        }}></button>
                    )}
                  </>
                )
              }
              transitionTime={0}
              showIndicators={false}
              selectedItem={currentSlide}
              emulateTouch={false}
              showStatus={false}
              showArrows={true}
              showThumbs={false}>
              {quizQuestion.map((quiz: any, slide: number) => {
                const { id, question, answer } = quiz;
                return (
                  <div
                    key={quiz.id}
                    className="h-full bg-[--background-primary-main] pb-[1.5rem]">
                    <div className="flex min-h-[23rem] flex-col justify-between text-primary">
                      <div className="bg-[#52bcec] text-left font-medium">
                        <div className="px-[2rem] py-[1.5rem] text-left text-2xl font-semibold text-white">
                          <h3 className="text-left">
                            Câu {slide + 1}: {question}
                          </h3>
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
                            const { content, score } = x;
                            return (
                              <button
                                onClick={() => {
                                  handleSelectAnswer(
                                    id,
                                    question,
                                    content,
                                    score,
                                  );
                                }}
                                key={content}
                                className={`${checkAnswer(id, content) ? "bg-gray-300 text-primary opacity-85 hover:opacity-100" : "hover:bg-gray-100"} flex gap-2 rounded border border-[--border-primary-main] bg-[--background-primary-main] p-3 text-left font-semibold text-primary shadow-sm transition`}>
                                <span className="font-bold">
                                  {label[index].toUpperCase()}.
                                </span>
                                <p className="text-wrap">{content}</p>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
          <div className="relative flex-1 rounded bg-[--background-primary-main] px-[1rem] pb-[2.5rem] pt-[2rem] shadow-md">
            <div className="flex items-center mb-4 gap-2 text-xl font-bold text-primary">
              <span>Thời gian:</span>
              <CountdownTimer targetDate={1714252240000} />
            </div>
            <div className="mb-4 text-lg font-semibold">Mục lục câu hỏi</div>
            <div className="mb-4 flex w-full flex-wrap items-center gap-3">
              {quizQuestion.map((x, index) => {
                const { id } = x;
                return (
                  <div key={index}>
                    <div
                      className={`border ${currentSlide === index ? "border-2 border-black" : "border border-black"}  font-semibold text-primary shadow-sm`}>
                      <button
                        onClick={() => setCurrentSlide(index)}
                        className="h-[2rem] w-[1.75rem]">
                        {index + 1}
                      </button>
                    </div>
                    <div
                      className={`h-[0.75rem] w-full border-t-0 ${currentSlide === index ? "border-2 border-black" : "border border-black"} ${checkAnswerNav(id) ? "bg-[#52bcec]" : ""}`}></div>
                  </div>
                );
              })}
            </div>

            <button className="mb-3 bg-[--background-primary-main] font-semibold text-[--color-text-link] transition duration-200 hover:scale-110">
              Nộp bài...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
