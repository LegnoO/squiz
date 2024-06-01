"use client";
import { useState, useEffect } from "react";
// import { socket } from "@/app/socket";
import Link from "next/link";
import axios from "axios";
import { tryCatchAsync } from "@/utils/tryCatchUtil";

export default function SlideShowPage() {
 
  // useEffect(() => {
  //   socket.emit("hello world", "hello world");
  //   socket.on("hello world", (msg) => {
  //     setTest(msg);
  //   });
  // }, []);

  return (
    <>
      <div className="border-red quiz-slide flex min-h-[100vh] w-full flex-col rounded-lg bg-gray-50 shadow-md">
        <div className="flex flex-1 flex-col justify-between text-primary">
          <div className="border-red bg-white px-[2rem] py-[2rem] text-center text-2xl font-semibold text-primary shadow-md"></div>
          <div className="flex flex-col">
            <div className="border-red p-[1rem]">
              <div className="grid grid-cols-2 gap-2">
                {[1, 1, 1, 1].map((x, i) => (
                  <button
                    key={i}
                    className={`true ? "bg-gray-300 hover:opacity-100" : "hover:bg-gray-100"} flex gap-2 rounded border border-[--border-primary-main] bg-[--background-primary-main] p-4 text-left font-semibold text-primary text-primary opacity-85 shadow-sm shadow-sm transition`}>
                    <span className="font-bold">1.</span>
                    <div
                      className="text-wrap"
                      dangerouslySetInnerHTML={{
                        __html: `<p>sss</p>`,
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between p-[0.5rem] md:p-[1rem]">
              <div>Legno</div>
              <div>2</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
