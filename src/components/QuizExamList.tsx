// ** Next Imports
import { useRouter } from "next-nprogress-bar";

// ** Shadcn UI components
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ** Types
import { IQuizList } from "@/types/Quiz";

// ** Config
import AxiosInstance from "@/config/axios";

const QuizExamList = ({ quizList }: { quizList: IQuizList[] }) => {
  const router = useRouter();
  async function enterExam(quizID: string) {
    router.push(`/list-exam/quiz-exam/${quizID}`);
  }

  return (
    <section className="list-quiz">
      <div className="mb-4 text-2xl font-semibold">
        Danh sách đề thi trắc nghiệm
      </div>
      {quizList.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {quizList.map((quiz) => (
            <Card key={quiz._id}>
              <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div>
                    <strong>Total Time:</strong>{" "}
                    <span className="font-medium">
                      {quiz.total_time} minutes
                    </span>
                  </div>
                  <div>
                    <strong>Time Begin:</strong>{" "}
                    <span className="font-medium">
                      {new Date(quiz.time_begin).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <strong>Time End:</strong>{" "}
                    <span className="font-medium">
                      {new Date(quiz.time_end).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <strong>Hình thức thi:</strong>{" "}
                    <span className="font-medium">Trắc nghiệm</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => enterExam(quiz._id)}
                  className="w-full text-lg">
                  Bắt đầu thi
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <>Chưa có đề thi</>
      )}
    </section>
  );
};

export default QuizExamList;
