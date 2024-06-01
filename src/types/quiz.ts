// Teacher
type TTeacherID = string;
// Quiz
type TQuizID = string;
type TQuizQuestionID = string;
type TQuizExamID = string;
type TQuizStoreID = string;
type TQuizQuestionStoreID = string;
type TQuizAnswerID = string;

export interface IQuizQuestion {
  id: TQuizQuestionID;
  quiz_store_id: TQuizStoreID;
  level: "easy" | "middle" | "hard";
  question: string;
  answer: [{ content: string; score: number }];
}

export interface IQuizExam {
  id?: TQuizExamID;
  quiz_id: TQuizID;
  questions: TQuizQuestionID[];
}

export interface IQuizQuestionStore {
  id?: TQuizQuestionStoreID;
  title: string;
  owner: TTeacherID;
  is_share: boolean;
}

export interface IQuizAnswer {
  id?: TQuizAnswerID;
  quiz_exam_id: TQuizExamID;
  answers: IAnswer[];
}

export interface IAnswer {
  question: {
    _id: TQuizQuestionID;
  };
  answer_select: number | null;
}



export interface IQuizList {
  _id: string;
  teacher_id: string;
  title: string;
  course_id: string;
  total_question_hard: number;
  total_question_middle: number;
  total_question_easy: number;
  total_time: number;
  max_score: number;
  time_begin: Date;
  time_end: Date;
  createAt: Date;
  status: string;
}

