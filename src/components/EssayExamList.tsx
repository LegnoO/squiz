import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { IEssayList } from "@/types/essay";
import AxiosInstance from "@/config/axios";
import { toast } from "react-toastify";
import { handleAxiosError } from "@/utils/errorHandler";

const EssayExamList = ({ essayList }: { essayList: IEssayList[] }) => {
  const router = useRouter();

  async function enterExam(essayId: string, courseId: string) {
    try {
      const res = await AxiosInstance.post(
        `https://e-learming-be.onrender.com/essay-exam-answer/join-essay-exam/${essayId}?idCourse=${courseId}`,
      );

      const idExam = res.data.essay_exam_answer_id;
      router.push(`/essay/${idExam}`);
    } catch (error) {
      // "66599c3b2cec0299e028902e"
      handleAxiosError(error);
    }
  }

  return (
    <section className="list-essay">
      <div className="mb-4 text-2xl font-semibold">
        Danh sách đề thi tự luận
      </div>
      {essayList.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {essayList.map((essay) => (
            <Card key={essay._id}>
              <CardHeader>
                <CardTitle>{essay.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div>
                    <strong>Total Time:</strong>{" "}
                    <span className="font-medium">
                      {essay.total_time} minutes
                    </span>
                  </div>
                  <div>
                    <strong>Time Begin:</strong>{" "}
                    <span className="font-medium">
                      {new Date(essay.time_start).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <strong>Time End:</strong>{" "}
                    <span className="font-medium">
                      {new Date(essay.time_end).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <strong>Hình thức thi:</strong>{" "}
                    <span className="font-medium">Tự luận</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => enterExam(essay._id, essay.course_id)}
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

export default EssayExamList;
