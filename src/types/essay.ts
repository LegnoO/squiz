export interface IEssayList {
    _id: string;
    teacher_id: string;
    course_id: string;
    total_time: number;
    time_start: Date;
    time_end: Date;
    title: string;
    content: string;
    max_score: number;
    files: string[];
    createAt: Date;
    status: string | null;
  }