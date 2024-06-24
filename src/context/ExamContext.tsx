"use client";

// ** React Imports
import { createContext, useContext, useState, ReactNode } from "react";

// ** Next Imports
import { usePathname } from "next/navigation";

// ** Components
import { useRouter } from "next-nprogress-bar";

// ** Hooks
import { useNavigationEvent } from "@/hooks/useNavigationEvent";

// ** Config
import AxiosInstance from "@/config/axios";

// ** Utils
import { handleAxiosError } from "@/utils/errorHandler";

// type AuthValuesType = {
//     loading: boolean
//     logout: () => void
//     user: UserDataType | null
//     setLoading: (value: boolean) => void
//     setUser: (value: UserDataType | null) => void
//     login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
// }

const defaultProvider: any = {
  quizExam: null,
  essayExam: null,
  fetchQuizExam: () => Promise<void>,
  fetchEssayExam: () => Promise<void>,
};

const ExamContext = createContext(defaultProvider);

const ExamProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [quizExam, setQuizExam] = useState<any>(defaultProvider.quizExam);
  const [essayExam, setEssayExam] = useState<any>(defaultProvider.essayExam);
  const pathname = usePathname();

  async function fetchQuizExam(quizId: string) {
    try {
      const res = await AxiosInstance.post(
        "https://e-learming-be.onrender.com/quiz-exam/get/quiz-exam",
        {
          quiz_id: quizId,
        },
      );
      setQuizExam(res);
      if (!pathname.startsWith("/list-exam/quiz-exam")) {
        router.push(`/list-exam/quiz-exam/${quizId}`);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  }

  async function fetchEssayExam(essayId: string, courseId: string) {
    try {
      const data = {
        idEssayExam: essayId,
        idCourse: courseId,
      };
      console.log("🚀 ~ fetchEssayExam ~ data:", data);

      const res = await AxiosInstance.post(
        `https://e-learming-be.onrender.com/essay-exam-answer/join-essay-exam/`,
        data,
      );

      setEssayExam(res);
      if (!pathname.startsWith("/list-exam/essay-exam")) {
        router.push(`/list-exam/essay-exam/${essayId}?idCourse=${courseId}`);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  }

  //   useNavigationEvent(() => {
  //     if (loading) setLoading(false);
  //   });

  const values = {
    quizExam,
    essayExam,
    fetchQuizExam,
    fetchEssayExam,
  };

  return <ExamContext.Provider value={values}>{children}</ExamContext.Provider>;
};

export const useExam = () => useContext(ExamContext);
export { ExamContext, ExamProvider };
