"use client";
import { DeltaStatic, Sources } from "quill";
import React, { memo, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { IoSaveOutline } from "react-icons/io5";
import { RiDeleteBin7Line } from "react-icons/ri";

import { IoIosCheckboxOutline } from "react-icons/io";
import ReactQuill from "react-quill";
import ClickOutsideHandler from "@/components/ClickOutsideHandler";

const CustomReactQuill = ({
  value,
  setClose,
  onClick,
  classField,
  isTexting,
  setOpen,
  onChange,
  isChecked,
  onDelete,
  setChecked,
}: {
  onChange: (
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: ReactQuill.UnprivilegedEditor,
  ) => void;
  setChecked: () => void;

  setClose: () => void;
  setOpen: () => void;
  onClick?: () => void;
  onDelete?: () => void;
  classField: "answer-field" | "question-field";
  isTexting?: boolean;
  value: string;
  isChecked?: boolean;
  testId?: string;
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
      matchVisual: false, // toggle to add extra line breaks when pasting HTML:
    },
  };
  
  useEffect(() => {
    const containerElement = quillRef.current.getEditor().container;
    const editorDiv = quillRef.current.getEditor().root;
    const toolbarDiv = quillRef.current
      .getEditor()
      .container.parentNode.querySelector(".ql-toolbar");
    const newSpanElement = document.createElement("span");
    const newSpanElement2 = document.createElement("span");
    const newButtonElement = document.createElement("button");
    const newButtonSaveElement = document.createElement("button");
    const newButtonDeleteElement = document.createElement("button");
    const newSaveIconComponent = React.createElement(IoSaveOutline);
    const newDeleteIconComponent = React.createElement(RiDeleteBin7Line);
    const newCheckBoxIconComponent = React.createElement(IoIosCheckboxOutline);

    toolbarDiv.appendChild(newSpanElement);
    if (quillRef.current && toolbarDiv && containerElement) {
      // Add Classes
      toolbarDiv.classList.add("flex");
      newSpanElement.className = "ql-formats !mr-0";
      newSpanElement2.className = "ml-auto ql-formats !mr-[0.25rem]";
      // Add span to .toolbar
      toolbarDiv.appendChild(newSpanElement2);
      toolbarDiv.appendChild(newSpanElement);
      // Add button to span
      newSpanElement2.appendChild(newButtonDeleteElement);
      newSpanElement.appendChild(newButtonSaveElement);
      // Button Delete
      newButtonDeleteElement.classList.add("button-delete");
      newButtonSaveElement.classList.add("button-save");
      // Add icon to butotn
      createRoot(newButtonSaveElement).render(newSaveIconComponent);
      createRoot(newButtonDeleteElement).render(newDeleteIconComponent);

      containerElement.classList.add("relative");

      containerElement.appendChild(newButtonElement);
      newButtonElement.onclick = (event) => {
        event.stopPropagation();
        setChecked();
      };
      newButtonElement.className =
        "quill-checkbox absolute top-1/2 -translate-y-1/2 ml-[0.25rem] left-0 [&>svg]:h-[1.5rem] [&>svg]:w-[1.5rem]";
      createRoot(newButtonElement).render(newCheckBoxIconComponent);

      newButtonSaveElement.className = "ql-clean text-[var(--color-info-dark)]";
      newButtonSaveElement.onclick = (event) => {
        event.stopPropagation();
        // setOpen();
      };

      newButtonDeleteElement.className =
        "ql-clean text-[var(--color-error-dark)]";
      newButtonDeleteElement.onclick = (event) => {
        event.stopPropagation();
        if (onDelete) {
          onDelete();
        }
      };
    }
  }, []);

  return (
    <>
      <ClickOutsideHandler onOutsideClick={setClose}>
        <div onClick={setOpen}>
          <ReactQuill
            ref={quillRef}
            modules={modules}
            className={`React-Quill-Root ${classField} ${isChecked ? "field-active" : ""} rounded shadow-sm ${!isTexting ? "[&>.ql-toolbar]:hidden" : "active"}`}
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

export default memo(CustomReactQuill);
