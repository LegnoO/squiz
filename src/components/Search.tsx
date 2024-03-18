"use client";
import Image from "next/image";
import { useState } from "react";
import { TfiSearch } from "react-icons/tfi";

export default function Search() {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <>
      <div className="bg-gray-250 relative mr-4 flex flex-1 items-center gap-4 rounded-full border border-[#2d2f31] bg-[#f7f9fa] p-2">
        <input
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
          value={searchValue}
          type="text"
          spellCheck={false}
          placeholder="Tìm kiếm..."
          className="placeholder:black w-full bg-transparent pl-1 text-sm placeholder:text-sm focus:outline-none"
        />
        <button
          className={`mr-2 text-lg ${searchValue ? "cursor-pointer text-black" : "cursor-no-drop text-gray-500"}`}>
          <TfiSearch />
        </button>

        <div
          className={`${searchValue ? "block" : "hidden"} absolute left-0 top-full mt-1.5 w-full border border-[#d1d7dc] bg-white shadow-md`}>
          <div className="w-full px-3 hover:bg-gray-100">
            <div className="py-2">
              <div className="flex gap-3">
                <Image
                  src="https://img-c.udemycdn.com/course/50x50/2640372_5b44_5.jpg"
                  alt="icon course"
                  width={36}
                  height={36}
                  loading="lazy"
                />
                <div>
                  <p className="font-bold text-primary">
                    React, NodeJS, Express & MongoDB - The MERN Fullstack Guide
                  </p>
                  <p className="text-xs">
                    <span className="mr-3 font-bold text-gray-500">Course</span>
                    <span className="font-normal">
                      Academind by Maximilian Schwarzmüller
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
