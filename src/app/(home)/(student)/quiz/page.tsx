"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Carousel } from "react-responsive-carousel";
import { ColorRing } from "react-loader-spinner";

export default function QuizPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quizAnswer, setQuizAnswer] = useState<
    { quizId: number; idAnswer: number | null }[]
  >([]);

  useEffect(() => {
    console.log(quizAnswer);
  }, [quizAnswer]);

  const handleNext = async (clickHandler: () => void) => {
    setIsLoading(true);
    await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    setIsLoading(false);
    clickHandler();
  };

  const checkAnswer = (idQuiz: number) => {
    const listIdAnswer = quizAnswer.map((x) => x.idAnswer);
    return listIdAnswer.includes(idQuiz);
  };

  const handleSelectAnswer = (quizId: number, answerId: number) => {
    const newListAnswer = [...quizAnswer];
    const questionIndex = newListAnswer.findIndex((x) => x.quizId === quizId);
    if (questionIndex !== -1) {
      const updatedList = newListAnswer.map((x) =>
        x.quizId === quizId
          ? { ...x, idAnswer: x.idAnswer === answerId ? null : answerId }
          : x,
      );
      setQuizAnswer(updatedList);
    } else {
      newListAnswer.push({ quizId: quizId, idAnswer: answerId });
      console.log(newListAnswer);
      setQuizAnswer(newListAnswer);
    }
  };

  const quizQuestion = [
    {
      id: 111,
      question:
        "Lorem Ipsum is simply dummy text of the printing andtypesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s",
      answer: [
        { id: 1, content: "A" },
        { id: 2, content: "B" },
        { id: 3, content: "C" },
        { id: 4, content: "D" },
      ],
    },
    {
      id: 22,
      question:
        "Lorem Ipsum is simply dummy text of the printing andtypesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s",
      answer: [
        { id: 5, content: "E" },
        { id: 6, content: "F" },
        { id: 7, content: "G" },
        { id: 8, content: "H" },
      ],
    },
    {
      id: 2,
      question:
        "Lorem Ipsum is simply dummy text of the printing andtypesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s",
      answer: [
        { id: 9, content: "E" },
        { id: 10, content: "F" },
        { id: 11, content: "G" },
        { id: 12, content: "H" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-[--background-primary-main]">
      <div className="relative w-full text-[--color-primary-main]">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="">
            <button className="flex items-center rounded border border-[--border-primary-main] p-2 transition duration-200 hover:bg-[--background-secondary-light]">
              <IoCloseSharp className="h-6 w-6" />
            </button>
          </div>
          <div className="border border-[--border-primary-main] px-4 py-2 font-medium">
            10:10
          </div>
          <div className="">
            <button className="color-[--color-primary-main] rounded border border-[--border-primary-main] px-4 py-2 font-bold transition duration-200 hover:bg-[--background-secondary-light]">
              Nộp bài
            </button>
          </div>
        </div>
      </div>

      <div className="h-full w-full">
        <div className="h-full px-[2rem] py-[1.5rem] md:px-[1.5rem]">
          <div className="quiz-slide relative mx-auto max-w-[45rem] rounded-md xl:max-w-[55rem] [&_.carousel-slider]:rounded-md [&_.control-arrow]:hover:bg-transparent">
            <Carousel
              showIndicators={false}
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
                          handleNext(clickHandler);
                        }}></button>
                    )}
                  </>
                )
              }
              emulateTouch={false}
              showStatus={false}
              showArrows
              showThumbs={false}>
              {quizQuestion.map((quiz: any, slide: number) => {
                const { question, answer } = quiz;
                return (
                  <div
                    key={quiz.id}
                    className="h-full bg-[--background-secondary-main] px-[2rem] pb-[2.5rem] pt-[1.5rem]">
                    <div className="flex min-h-[24rem] flex-col justify-between text-[--color-primary-main]">
                      <div className="text-left font-medium">
                        <div className="mb-3 text-center text-lg font-medium text-primary">
                          <p>
                            {slide + 1}/{quizQuestion.length}
                          </p>
                        </div>
                        <h4>{question}</h4>
                      </div>
                      <div className="">
                        <h4 className="mb-4 text-left text-sm font-medium md:text-base">
                          Chọn định nghĩa đúng
                        </h4>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          {answer.map((y: any, i: number) => {
                            const { content } = y;
                            return (
                              <button
                                onClick={() => {
                                  handleSelectAnswer(quiz.id, y.id);
                                }}
                                key={y.id}
                                className={`${checkAnswer(y.id) ? "bg-[--color-success-dark]" : ""} color-[--color-primary-main] border-primary-main rounded border border-[--border-primary-main] bg-[--background-secondary-main] p-3 text-left font-medium shadow-sm transition duration-200 hover:border-[--border-primary-light]`}>
                                <span className="mr-3">{i + 1}.</span>
                                <span>{content}</span>
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
        </div>
      </div>
    </div>
  );
}
