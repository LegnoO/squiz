"use client";
// Hooks
import { useState, useEffect } from "react";

// Component
import { Carousel } from "react-responsive-carousel";
import { ColorRing } from "react-loader-spinner";
import ReactDraftWysiwyg from "@/components/react-draft-wysiwyg";
//
import axios from "axios";

// Icon
import { GrFormNextLink } from "react-icons/gr";
import { GrFormPreviousLink } from "react-icons/gr";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaRegFileWord } from "react-icons/fa";

// Types
import { IAnswer, IQuizAnswer, IQuizExam, IQuizQuestion } from "@/types/quiz";
import Header from "../../components/Header";
import dynamic from "next/dynamic";
const CountdownTimer = dynamic(() => import("@/components/CountdownTimer"), {
  ssr: false,
});

// ** Third Party Imports
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";

// Lib
import { useDropzone } from "react-dropzone";
import AxiosInstance from "@/config/axios";

interface IFileProp {
  name: string;
  type: string;
  size: number;
}

// test[test.length - 2].concat(" ",test[test.length - 1].slice(0, test[test.length - 1].lastIndexOf(".")))
export default function QuizPage({ params }: { params: { id: string } }) {
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

  function handleChangeContent(contentState: EditorState) {
    const rawState = convertToRaw(contentState.getCurrentContent());
    const markup = draftToHtml(rawState);

    setContent(markup);
    setEditorState(contentState);
  }

  useEffect(() => {}, [files]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("id_essay_exam_answer", "id test");
    formData.append("content_answers", content);
    formData.append("file_essay_answer", files[0]);
  };
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
                <h2 className="">
                  Bạn hãy vẽ sơ đồ tư duy về kế hoạch học tập của bản thân?
                </h2>

                <p>
                  *** SINH VIÊN UPLOAD FILE WORD/HÌNH ẢNH VÀO KHUNG BÊN DƯỚI
                </p>
              </div>
              <div className="flex w-1/2 items-center justify-between">
                <button className="flex items-center gap-1 px-2 text-[--color-text-link]">
                  <FaRegFileWord className="h-[1.25rem] w-[1.25rem]" />
                  <span>test.docs</span>
                </button>
                <span>21 September 2023, 1:56 PM</span>
              </div>
              <h2 className="mt-4 font-bold">Phần bài làm của thí sinh</h2>
              <div className="&_.rdw-editor-wrapper_.rdw-editor-main]:border-gray-300 [&_.rdw-editor-wrapper_.DraftEditor-editorContainer]:h-[200px] [&_.rdw-editor-wrapper_.rdw-editor-main]:border-2 [&_.rdw-editor-wrapper_.rdw-editor-main]:p-[0.5rem] ">
                <ReactDraftWysiwyg
                  placeholder="Nhập câu trả lời..."
                  editorState={editorState}
                  onEditorStateChange={handleChangeContent}
                />
              </div>
              <div className="justify-content flex w-full flex-col items-center justify-center border-[3px] border-dashed border-gray-300 [&_.dropzone]:h-[150px] [&_.dropzone]:w-full">
                <div
                  {...getRootProps({
                    className:
                      "dropzone cursor-pointer flex items-center justify-center",
                  })}>
                  {files.length ? (
                    img[0].key
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
            <div className="mb-3 text-lg font-semibold">Môn: Toán cao cấp</div>
            <div className="mb-3 bg-[--background-primary-main] font-semibold text-primary">
              Chế độ: <span className="font-bold">Thi tự luận</span>
            </div>
            <div className="mb-3 bg-[--background-primary-main] font-semibold text-primary">
              Thời gian làm bài: <span className="font-bold">60 phút</span>
            </div>
            <div className="mb-4 flex items-center gap-2 text-xl font-bold text-primary">
              <span className="font-medium">Thời gian:</span>
              <CountdownTimer targetDate={1714252240000} />
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
