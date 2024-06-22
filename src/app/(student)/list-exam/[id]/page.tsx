"use client";

// ** React Imports
import { useEffect, useState } from "react";

// **  Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuizExamList from "@/components/QuizExamList";
import EssayExamList from "@/components/EssayExamList";

// **  Config
import AxiosInstance from "@/config/axios";

// **  Types
import { IQuizList } from "@/types/quiz";
import { IEssayList } from "@/types/essay";


export default function ListExamPage({ params }: { params: { id: string } }) {
  const [quizList, setQuizList] = useState<IQuizList[]>([]);
  const [essayList, setEssayList] = useState<IEssayList[]>([]);

  useEffect(() => {
    const getCourse = async () => {
      const res = await AxiosInstance.get(
        `https://e-learming-be.onrender.com/course/get-exam?course_id=${params.id}`,
      );
      setQuizList(res.data.res.dataQuizNotExpire);
      setEssayList(res.data.res.dataEssayExamNotExpire);
    };

    getCourse();
  }, [params.id]);



  return (
    <>
      <Header />
      <div className="py-12 px-8">
        <QuizExamList quizList={quizList} />
        <div className="my-12" />
        <EssayExamList essayList={essayList} />
      </div>
      <Footer />
    </>
  );
}
