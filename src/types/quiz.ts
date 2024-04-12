// Teacher
type TTeacherID = string;
type TStudentID = string;
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
  student_id: TStudentID;
  answers: IAnswer[];
  total_score: number;
}

export interface IAnswer {
  quiz_question_id: TQuizQuestionID;
  question: string;
  answer_select: string;
  score: number;
}
