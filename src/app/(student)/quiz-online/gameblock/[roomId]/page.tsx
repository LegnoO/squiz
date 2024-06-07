"use client";

// ** Next
import { useRouter } from "next/navigation";
import Link from "next/link";

// ** Socket
import { socket } from "@/app/socket";

// ** React
import { useState, useEffect } from "react";

// ** Utils
import { hexToRGBA } from "@/utils/hex-to-rgba";

// ** Components
import Loading from "@/components/Loading";

// ** Icons
import Icon from "@/components/Icon";

// ** Types
interface IAnswerCorrect {
  correctAnswerIndex: number | null;
}

interface ICurrentListQuestion {
  question: string;
  answers: string[];
}

interface IQuizState {
  questions: ICurrentListQuestion | null;
  timeLeft: number | null;
}

export default function GameBlockPage({
  params,
}: {
  params: { roomId: string };
}) {
  const router = useRouter();
  const [selectAnswer, setSelectAnswer] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questionLength, setQuestionLength] = useState<number>(0);
  const [answerLength, setAnswerLength] = useState<number>(0);
  const [answerCorrect, setAnswerCorrect] = useState<IAnswerCorrect>({
    correctAnswerIndex: null,
  });

  function handleAnswerSelect(index: number) {
    console.log({
      roomId: params.roomId,
      answerIndex: index,
    })
    if (answerCorrect.correctAnswerIndex === null && selectAnswer === null) {
      setSelectAnswer(index);

      socket.emit("answer", {
        roomId: params.roomId,
        answerIndex: index,
      });

    }
  }

  function getButtonStyle(
    index = 3,
    opacity: number,
  ): {
    icon: JSX.Element;
    backgroundColor: string;
    name: (typeof nameColors)[number];
  } {
    const nameColors = ["error", "info", "warning", "success"] as const;
    const colors = ["#FF4C51", "#00BAD1", "#FF9F43", "#28C76F"] as const;
    const iconNames = [
      "mdi:triangle",
      "mdi:rhombus",
      "material-symbols:circle",
      "material-symbols:square",
    ] as const;

    const buttonStyles = {
      name: nameColors[index],
      icon: <Icon icon={iconNames[index]} />,
      backgroundColor: hexToRGBA(colors[index], opacity),
    };

    return buttonStyles;
  }

  const renderLoading = () => {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="grid place-items-center gap-4">
          <div className="text-2xl font-bold text-black drop-shadow">
            Get Ready!
          </div>
          <Loading />
          <div className="font-bold text-black">Loading...</div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    socket.on("newQuestion", ({ questions, timeLeft }) => {
      setAnswerLength(questions.answers.length);
    });

    socket.on("quizStarted", (questionLength) => {
      if (questionLength) {
        setQuestionLength(questionLength);
        setIsLoading(false);
      }
    });

    socket.on("countdown", (countdown) => {
      setCountdown(countdown);
      if (countdown > 0 && questionLength === 0) {
        setIsLoading(true);
      }
    });

    socket.on("timeUp", ({ correctAnswerIndex }) => {
      setSelectAnswer(null);
      setAnswerCorrect({ correctAnswerIndex });
    });

    socket.on("newQuestion", () => {
      setAnswerCorrect({ correctAnswerIndex: null });
      setCurrentQuestionIndex((prev) => prev + 1);
    });

    socket.on("quizEnd", ({ personalScore, top5 }) => {
      window.history.pushState({ personalScore }, "", null);
      router.push("/quiz-online/result");
    });

    // Error
    return () => {
      socket.off("newQuestion");
      socket.off("quizStarted");
      socket.off("countdown");
      socket.off("timeUp");
      socket.off("quizEnd");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return renderLoading();
  }

  return (
    <>
      <div className="bg-red flex h-full flex-col">
        <main
          className="flex w-full flex-col overflow-hidden bg-gray-200"
          style={{ flex: "1 0 auto" }}>
          <div className="my-4 h-[30px] w-full px-4">
            <div className="flex items-center justify-between font-semibold">
              <div className="font-sm flex h-[35px] w-[35px]  items-center justify-center rounded-full bg-white">
                {currentQuestionIndex}
              </div>
              <div className="font-sm flex h-[35px] items-center justify-center rounded-full bg-white px-[13px]">
                Quiz
              </div>
            </div>
          </div>
          <div className="w-full p-4">
            <div className="flex flex-1 flex-col flex-wrap">
              <div className="grid grid-cols-2 gap-2">
                {Array.from(
                  { length: answerLength },
                  (_, index) => index + 1,
                ).map((_x, i) => {
                  const { backgroundColor, icon } = getButtonStyle(i, 1);
                  // const correctIndex = answerCorrect.correctAnswerIndex;
                  // const opacity = i === correctIndex ? 1 : 0.4

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswerSelect(i)}
                      className={`flex items-center justify-center rounded-sm ${answerCorrect.correctAnswerIndex === null ? "hover:opacity-40 " : ""}${answerCorrect.correctAnswerIndex !== null && answerCorrect.correctAnswerIndex !== i ? "opacity-40 " : ""}${selectAnswer !== null && selectAnswer === i ? "opacity-40 " : ""}`}
                      style={{ backgroundColor }}>
                      <span className="h-[230px] w-[200px] p-4 text-white">
                        {icon}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="h-full w-full bg-white">
            <div className="flex h-full items-center justify-center shadow">
              <p className="font-bold">Legno</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
