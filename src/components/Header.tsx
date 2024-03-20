"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa6";
import { GrNotification } from "react-icons/gr";
import { IoIosMenu } from "react-icons/io";
import { TfiSearch } from "react-icons/tfi";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

import Search from "./Search";
import Sidebar from "./Sidebar";
import Popper from "@/components/Popper";

const Header = () => {
  const [mobileNav, setMobileNav] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const isMobileScreen = useMediaQuery({ query: "(max-width: 800px)" });

  useEffect(() => {
    if (!isMobileScreen) {
      setMobileNav(false);
    }
  }, [isMobileScreen]);

  return (
    <>
      <div className="relative z-20 hidden px-6 shadow-md md:flex">
        <div className="flex w-full items-center gap-4">
          <div className="my-auto">
            {/* <Image
            // src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
            src={logo}
            width={91}
            alt="logo"
            loading="lazy"
            className="object-cover"
          /> */}
            <Link href="/">
              <h1 className="md:text-xl">SQUIZ</h1>
            </Link>
          </div>
          <ul className="flex items-center gap-4 text-sm text-primary">
            <li>
              <button>Trang chủ</button>
            </li>
            <li>
              <button>Khóa học của tôi</button>
            </li>
            <li>
              <button>Chuyên mục</button>
            </li>
          </ul>
          <Search />
          <div className="flex h-[4rem] items-center gap-4 pr-2">
            <button>
              <BsPlus className="h-9 w-9 rounded-full bg-[#4255ff] text-sm text-white" />
            </button>
            <div className="relative h-9 w-9 rounded-full border border-[#586380] bg-transparent p-2 text-black">
              <button className="">
                <span className="absolute -top-3.5 left-1/2 h-5 w-5 rounded-full bg-[red] text-center text-xs font-medium leading-[1.9] text-white">
                  7
                </span>
                <GrNotification className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg" />
              </button>
            </div>
            <div className="group relative h-[70px] cursor-pointer flex items-center">
              <Image
                src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t1.6435-1/139131444_3393715627406941_8376925531107375232_n.jpg?stp=c0.0.200.200a_dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeElVGQvtfcOvMLiikwk_sN0-93hX0BTTBD73eFfQFNMEFCHvxt4v-r5af3_QzPpz5EN6KCcE820BUiwV24oApZu&_nc_ohc=HiiP0XEe37kAX_uigNm&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfDGbsoMRfkKZ7cD3o8HzDKlvPVp-CfSbfEBqI3cLxVuyA&oe=6618D625"
                className="rounded-full"
                width={35}
                height={35}
                alt="Picture of the author"
                loading="lazy"
              />
              <Popper>
                <div className="cursor-default">
                  <div className="flex w-[95%] items-center gap-3 px-4 py-3">
                    <Image
                      src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t1.6435-1/139131444_3393715627406941_8376925531107375232_n.jpg?stp=c0.0.200.200a_dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeElVGQvtfcOvMLiikwk_sN0-93hX0BTTBD73eFfQFNMEFCHvxt4v-r5af3_QzPpz5EN6KCcE820BUiwV24oApZu&_nc_ohc=HiiP0XEe37kAX_uigNm&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfDGbsoMRfkKZ7cD3o8HzDKlvPVp-CfSbfEBqI3cLxVuyA&oe=6618D625"
                      className="rounded-full"
                      width={55}
                      height={55}
                      alt="Picture of the author"
                      loading="lazy"
                    />
                    <div>
                      <p className="text font-bold">
                        <span>Minh Khoi</span>
                      </p>
                      <p className="text-xs text-gray-700">
                        <span>Welcome back</span>
                      </p>
                    </div>
                  </div>
                  <div className="border-break py-3">
                    <div className="px-3 pb-2">
                      <button className="my-1 text-sm font-medium text-primary">
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </Popper>
            </div>
          </div>
        </div>
      </div>

      <div className="nav_mobile relative z-10 block w-full py-2 shadow-md md:hidden">
        <div className="flex justify-between px-4">
          <button>
            <IoIosMenu
              className="h-7 w-7"
              onClick={() => {
                setMobileNav(true);
              }}
            />
          </button>
          <h1>SQUIZ</h1>
          <div className="item-centers flex gap-4">
            <button>
              <TfiSearch className="h-5 w-5" />
            </button>
            <button>
              <FaGraduationCap className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      <Sidebar isOpen={mobileNav} toggleSidebar={setMobileNav} />
    </>
  );
};

export default Header;
