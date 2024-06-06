"use client";

// Hooks
import { useEffect, useState } from "react";
// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClickOutsideHandler from "@/components/ClickAwayListenerCustom";
import Modal from "@/components/Modal";
import QuizList from "@/components/QuizList";
// Fake Data
import { CourseListData } from "@/FakeData/CourseList";
import { redirect, useRouter } from "next/navigation";
import AxiosInstance from "@/config/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { IQuizList } from "@/types/quiz";
import { IEssayList } from "@/types/essay";
import QuizExamList from "@/components/QuizExamList";
import EssayExamList from "@/components/EssayExamList";

export default function ListExamPage({ params }: { params: { id: string } }) {
  const router = useRouter();
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

  const handleEnterQuizPage = (id: string) => {
    if (id) {
      router.push(`/quiz/exam/${id}`);
    }
  };

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
