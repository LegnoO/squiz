import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next-nprogress-bar";

import { Button } from "@/components/ui/button";
import { IEssayList } from "@/types/essay";
import AxiosInstance from "@/config/axios";
import { toast } from "react-toastify";
import { handleAxiosError } from "@/utils/errorHandler";

const EssayExamList = ({ essayList }: { essayList: IEssayList[] }) => {
  const router = useRouter();

  async function enterExam(essayId: string, courseId: string) {
    router.push(`/list-exam/essay-exam/${essayId}?idCourse=${courseId}`);
  }

  return (
    <section className="list-essay">
      <div className="mb-4 text-2xl font-semibold">
        Danh sách đề thi tự luận
      </div>
      {essayList.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {essayList.map((essay) => (
            <Card key={essay._id}>
              <CardHeader>
                <CardTitle>{essay.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-[144px] grid gap-2">
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
