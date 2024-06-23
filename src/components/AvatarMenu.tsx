"use client";

// ** Next Imports
import Image from "next/image";
import Link from "next/link";

// ** Components
import Popper from "@/components/Popper";

// ** Icons
import { MdLogin } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { ImTable2 } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";

// ** Context
import { useAuth } from "@/context/AuthContext";
const AvatarMenu = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="flex cursor-pointer items-center gap-2">
        <Image
          src="/images/avatar-default.png"
          className="rounded-full"
          width={35}
          height={35}
          alt="Picture of the author"
        />
        <IoIosArrowDown className="h-[1.15rem] w-[1.15rem]" />
        <Popper width="min-w-[12rem]">
          <div className="cursor-default">
            <div className="flex w-[95%] items-center gap-3 px-4 py-3">
              <Image
                src="/images/avatar-default.png"
                className="rounded-full"
                width={55}
                height={55}
                alt="Picture of the author"
                loading="lazy"
              />
              <div>
                <p className="text font-bold">
                  <span>{user?.username || user?.email || "Guest"}</span>
                </p>
                <p className="text-xs text-gray-700">
                  <span>Welcome back</span>
                </p>
              </div>
            </div>
            <div className="border-break leading-[1rem]">
              <div className="flex flex-col items-center text-sm font-medium text-gray-600">
                <div className="w-full text-left hover:bg-gray-100">
                  <Link href="/settings">
                    <button className="flex w-full items-center gap-2 px-4 py-3 text-left">
                      <FaUser /> Hồ sơ
                    </button>
                  </Link>
                </div>
                <div className="w-full text-left hover:bg-gray-100">
                  <Link href="/grades">
                    <button className="flex w-full items-center gap-2 px-4 py-3 text-left">
                      <ImTable2 /> Kết quả
                    </button>
                  </Link>
                </div>
              </div>

              <div className="border-break w-full text-left text-sm font-medium hover:bg-gray-100">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-3 text-left">
                    <RiLogoutBoxLine /> Đăng xuất
                  </button>
                ) : (
                  <Link href="/signin">
                    <button className="flex w-full items-center gap-2 px-4 py-3 text-left">
                      <MdLogin /> Đăng nhập
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Popper>
      </div>
    </>
  );
};

export default AvatarMenu;
