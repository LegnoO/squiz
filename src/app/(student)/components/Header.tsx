"use client";

// ** Next Imports
import Image from "next/image";

// **Icons
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next-nprogress-bar";
import { Navbar } from "@/components/ui/Nav";
import AvatarMenu from "@/components/AvatarMenu";

const Header = () => {
  const router = useRouter();
  return (
    <Navbar>
      <div className="relative flex-1 text-[--color-primary-main]">
        <div className="flex items-center justify-between">
          <div className="">
            <button
              onClick={() => {
                router.back();
              }}
              className="flex items-center gap-2 rounded border border-[--border-primary-main] bg-[--background-primary-main] p-2 transition duration-200 hover:bg-gray-100">
              <IoMdArrowBack className="h-6 w-6" />
              <span className="font-medium">Quay lại</span>
            </button>
          </div>
          <AvatarMenu />
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
