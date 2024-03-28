"use client";
// Icons
import { IoIosArrowUp } from "react-icons/io";

export default function ButtonDropdown({
  name,
  children,
  isOpenDropdown,
  setIsOpenDropdown,
}: {
  name: string;
  children: React.ReactNode;
  isOpenDropdown: boolean;
  setIsOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsOpenDropdown((prev) => !prev);
        }}
        className="flex items-center gap-1 rounded border border-[--border-primary-main] p-2 transition duration-200 hover:bg-[--background-secondary-light]">
        {name}
        <span>
          <IoIosArrowUp
            className={`${isOpenDropdown ? "rotate-180" : ""} transition duration-200`}
          />
        </span>
      </button>

      <div className="absolute left-0 right-0 top-full mt-2 rounded border border-[--border-primary-main]">
        {children}
      </div>
    </div>
  );
}
