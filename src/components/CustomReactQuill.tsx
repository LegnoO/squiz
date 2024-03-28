"use client";
import { DeltaStatic, Sources } from "quill";
import React, { useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { IoSaveOutline } from "react-icons/io5";
import { RiDeleteBin7Line } from "react-icons/ri";

import { IoIosCheckboxOutline } from "react-icons/io";
import ReactQuill from "react-quill";
import ClickOutsideHandler from "@/components/ClickOutsideHandler";

const CustomReactQuill = ({
  value,
  onClick,
  classField,
  isTexting,
  setOpen,
  onChange,
  test,
}: {
  onChange: (
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: ReactQuill.UnprivilegedEditor,
  ) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
  classField: "answer-field" | "question-field";
  isTexting: boolean;
  value: string;
  test: boolean;
}) => {
  const quillRef = useRef<any>(null);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  useEffect(() => {
    const toolbarDiv = document.querySelector(".ql-toolbar");
    const containerElement = document.querySelector(".ql-container");
    if (quillRef.current && toolbarDiv && containerElement) {
      toolbarDiv.classList.add("flex");
      const newSpanElement = document.createElement("span");
      const newSpanElement2 = document.createElement("span");
      const newButtonElement = document.createElement("button");
      const newButtonSaveElement = document.createElement("button");
      const newButtonDeleteElement = document.createElement("button");
      const newSaveIconComponent = React.createElement(IoSaveOutline);
      const newDeleteIconComponent = React.createElement(RiDeleteBin7Line);
      const newCheckBoxIconComponent =
        React.createElement(IoIosCheckboxOutline);

      newSpanElement.className = "ml-auto ql-formats !mr-[0.25rem]";
      newSpanElement2.className = "ql-formats !mr-0";

      newButtonSaveElement.className = "ql-clean";
      newButtonSaveElement.onclick = (event) => {
        event.stopPropagation();
        setOpen(false);
      };

      newButtonDeleteElement.className = "ql-clean";
      newButtonDeleteElement.onclick = (event) => {
        event.stopPropagation();
        setOpen(false);
      };

      toolbarDiv.appendChild(newSpanElement);
      toolbarDiv.appendChild(newSpanElement2);

      newSpanElement.appendChild(newButtonSaveElement);
      newSpanElement2.appendChild(newButtonDeleteElement);

      createRoot(newButtonSaveElement).render(newSaveIconComponent); // icon save button

      createRoot(newButtonDeleteElement).render(newDeleteIconComponent); // icon delete button

      containerElement.classList.add("relative");
      newButtonElement.onclick = (event) => {
        event.stopPropagation();
      };

      newButtonElement.className =
        "quill-checkbox absolute top-1/2 -translate-y-1/2 ml-[0.25rem] left-0 [&>svg]:h-[1.5rem] [&>svg]:w-[1.5rem]";
      containerElement.appendChild(newButtonElement);
      createRoot(newButtonElement).render(newCheckBoxIconComponent);
    }
  }, []);
  console.log(test);
  return (
    <>
      <ClickOutsideHandler onOutsideClick={setOpen}>
        <div
          onClick={() => {
            setOpen(true);
            test = true;
            console.log(test);
          }}>
          <ReactQuill
            ref={quillRef}
            modules={modules}
            className={`${test ? "border border-red-700" : ""} React-Quill-Root ${classField} rounded ${!isTexting ? "[&>.ql-toolbar]:hidden" : "active"}`}
            placeholder="Nhập câu trả lời vào đây"
            theme="snow"
            value={value}
            onChange={onChange}
          />
        </div>
      </ClickOutsideHandler>
    </>
  );
};

export default CustomReactQuill;
