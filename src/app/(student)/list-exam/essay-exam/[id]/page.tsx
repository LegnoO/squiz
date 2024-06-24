"use client";

// ** Next Imports
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

// ** React Imports
import { useState, useEffect } from "react";

// **  Hooks
import { useRouter } from "next-nprogress-bar";
import { useDropzone } from "react-dropzone";

// **  Component
import Header from "@/components/Header";
import ReactDraftWysiwyg from "@/components/react-draft-wysiwyg";
const CountdownTimer = dynamic(() => import("@/components/CountdownTimer"), {
  ssr: false,
});

// ** Icon
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaRegFileWord } from "react-icons/fa";

// ** Lib Imports
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";

// ** Config
import AxiosInstance from "@/config/axios";

// ** Utils
import { handleAxiosError } from "@/utils/errorHandler";
import { htmlToDraftBlocks } from "@/utils/draft";
import { useExam } from "@/context/ExamContext";

// ** Types
interface IFileProp {
  name: string;
  type: string;
  size: number;
}

interface IEssayExam {
  _id: string;
  total_time: string;
  files: string;
  title: string;
  content: string;
  total_time_left: string;
}

interface IEssayExamData {
  _id: string;
  essay_exam_id: string;
  student_id: string;
  content_answers: string;
  file_upload: string[];
  status: string;
  createAt: Date | null;
  time_out: Date | null;
}

// test[test.length - 2].concat(" ",test[test.length - 1].slice(0, test[test.length - 1].lastIndexOf(".")))
export default function EssayExamPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { essayExam, fetchEssayExam } = useExam();
  const searchParams = useSearchParams();
  const [dataAnswer, setDataAnswer] = useState<IEssayExamData>({
    _id: "",
    essay_exam_id: "",
    student_id: "",
    content_answers: "",
    file_upload: [],
    status: "",
    createAt: null,
    time_out: null,
  });
  const [isFirstJoin, setFirstJoin] = useState<boolean>(true);
  const [idAnswer, setIdAnswer] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [content, setContent] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,

    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)));
    },
  });
  const img = files.map((file: IFileProp) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={file.name}
      alt={file.name}
      className="single-file-image"
      src={URL.createObjectURL(file as any)}
    />
  ));

  const courseId = searchParams.get("idCourse");
  const [essayDataExam, setEssayDataExam] = useState<Partial<IEssayExam>>();

  useEffect(() => {
    if (essayExam) {
      console.log("🚀 ~ useEffect ~ essayExam:", essayExam);
      setTimeLeft(Math.floor(essayExam.data.total_time_left));
      setEssayDataExam(essayExam.data.data_test);
      if (essayExam.data.isFirst) {
        setIdAnswer(essayExam.data.essay_exam_answer_id);
      } else {
        setFirstJoin(false);
        setDataAnswer(essayExam.data.data_answer);
        setContent(dataAnswer.content_answers);
        setIdAnswer(essayExam.data.data_test._id);
        setEditorState(
          htmlToDraftBlocks(essayExam.data.data_answer.content_answers),
        );
      }
    } else {
      fetchEssayExam(params.id, courseId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [essayExam]);

  function handleChangeContent(contentState: EditorState) {
    const rawState = convertToRaw(contentState.getCurrentContent());
    const markup = draftToHtml(rawState);

    setContent(markup);
    setEditorState(contentState);
  }

  useEffect(() => {}, [files]);

  async function handleSubmit() {
    const formData = new FormData();

    try {
      if (isFirstJoin) {
        formData.append("content_answers", content);
        formData.append("file_essay_answer", files[0]);
        console.log(formData);
        await AxiosInstance.post(
          `https://e-learming-be.onrender.com/essay-exam-answer/submit-essay-exam-answer/${idAnswer}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      } else {
        formData.append("content_answers", content);
        formData.append(
          "file_essay_answer",
          files[0] || dataAnswer.file_upload[0],
        );
        console.log(formData);
        await AxiosInstance.put(
          `https://e-learming-be.onrender.com/essay-exam-answer/update-essay-exam-answer/${idAnswer}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      }

      router.back();
    } catch (error) {
      handleAxiosError(error);
    }
  }
  {
    /* <button
                onClick={() => {
                  const formData = new FormData();
                  formData.append("file", files[0]);

                  AxiosInstance.post(
                    "https://e-learming-be.onrender.com/upload-image",
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    },
                  );
                }}>
                Upload
              </button> */
  }

  if (!essayDataExam) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[--background-surface-color]">
      <Header />
      <div className="h-full w-full pb-[3rem] pt-[2rem]">
        <div className="flex justify-center gap-4 pr-[1.5rem] md:pl-[2.5rem]">
          {/* <div className="relative flex-1 rounded bg-[--background-primary-main] px-[1rem] pb-[2.5rem] pt-[2rem] shadow-md">
            <div className="mb-3 text-lg font-semibold">
              Môn: Toán cao cấp
            </div>
            <div className="mb-3 bg-[--background-primary-main] font-semibold text-primary">
              Chế độ: <span className="font-bold">Thi trắc nghiệm</span>
            </div>
            <div className="mb-3 bg-[--background-primary-main] font-semibold text-primary">
              Thời gian làm bài: <span className="font-bold">60 phút</span>
            </div>

          </div> */}
          <div className="essay-slide relative min-h-[35rem] w-[70%] rounded-lg bg-white pb-[1rem] shadow-lg [&_.carousel-slider]:rounded-md [&_.control-arrow]:hover:bg-transparent">
            <div className="flex flex-col gap-8 p-4">
              <div className="flex flex-col gap-[6rem] pt-2 font-bold">
                <div
                  dangerouslySetInnerHTML={{
                    __html: essayDataExam?.content || "<></>",
                  }}
                />
              </div>
              <div className="mt-[6rem] flex w-1/2 items-center justify-between">
                <button
                  onClick={() => {
                    window.open(essayDataExam.files);
                  }}
                  className="flex items-center gap-1 px-2 text-[--color-text-link]">
                  <FaRegFileWord className="h-[1.25rem] w-[1.25rem] text-base" />
                  <span>File bài làm.docs</span>
                </button>
              </div>
              <h2 className="mt-4 font-bold">Phần bài làm của thí sinh</h2>
              <div className="&_.rdw-editor-wrapper_.rdw-editor-main]:border-gray-300 [&_.rdw-editor-wrapper_.DraftEditor-editorContainer]:h-[200px] [&_.rdw-editor-wrapper_.rdw-editor-main]:border-2 [&_.rdw-editor-wrapper_.rdw-editor-main]:p-[0.5rem] ">
                <ReactDraftWysiwyg
                  placeholder="Nhập câu trả lời..."
                  editorState={editorState}
                  onEditorStateChange={handleChangeContent}
                />
              </div>
              <p className="font-bold">
                *** SINH VIÊN UPLOAD FILE WORD/HÌNH ẢNH VÀO KHUNG BÊN DƯỚI
              </p>
              <div className="justify-content flex w-full flex-col items-center justify-center border-[3px] border-dashed border-gray-300 [&_.dropzone]:h-[150px] [&_.dropzone]:w-full">
                <div
                  {...getRootProps({
                    className:
                      "dropzone cursor-pointer flex items-center justify-center",
                  })}>
                  {files.length ? (
                    img[0].key
                  ) : dataAnswer.file_upload.length > 0 ? (
                    dataAnswer.file_upload
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <AiOutlineCloudUpload className="h-[2rem] w-[2rem]" />
                      {isDragActive ? (
                        <p>Drop the files here ...</p>
                      ) : (
                        <p>
                          {
                            "Drag 'n' drop some files here, or click to select files"
                          }
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <input {...getInputProps()} />
              </div>
            </div>
          </div>
          <div className="relative flex-1 rounded bg-[--background-primary-main] px-[1rem] pb-[2.5rem] pt-[2rem] shadow-md">
            <div className="mb-3 text-lg font-semibold">
              Môn: {essayDataExam.title}
            </div>
            <div className="mb-3 bg-[--background-primary-main] font-semibold text-primary">
              Chế độ: <span className="font-bold">Thi tự luận</span>
            </div>
            <div className="mb-3 bg-[--background-primary-main] text-base font-semibold text-primary">
              Thời gian làm bài:{" "}
              <span className="font-bold">{essayDataExam.total_time} phút</span>
            </div>
            <div className="mb-4 flex items-center gap-2 text-xl font-bold text-primary">
              <span className="font-medium">Thời gian:</span>
              {timeLeft && <CountdownTimer targetDate={timeLeft * 1000} />}
            </div>
            <button
              onClick={handleSubmit}
              className="mb-3 rounded bg-[--color-text-link] px-3 py-2 font-semibold text-white transition duration-200 hover:scale-110">
              Nộp bài...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
