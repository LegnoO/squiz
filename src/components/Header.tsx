"use client";
// Hooks
import { useRouter } from "next/navigation";
import { clearUserData } from "@/redux/features/userSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useAppSelector } from "@/redux/hooks";
import useRouteChange from "./RouteChangeListener";
// Components
import Image from "next/image";
import Link from "next/link";
import Sidebar from "./Sidebar";
import Popper from "@/components/Popper";
// Icons
import { MdLogin } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { ImTable2 } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import { BsPlus } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa6";
import { GrNotification } from "react-icons/gr";
import { IoIosMenu } from "react-icons/io";
import { TfiSearch } from "react-icons/tfi";
import { RiLogoutBoxLine } from "react-icons/ri";

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);

  const user = useAppSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const [mobileNav, setMobileNav] = useState<boolean>(false);
  const isMobileScreen = useMediaQuery({ query: "(max-width: 800px)" });
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearUserData());
    router.replace("/signin");
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMobileScreen) {
      setMobileNav(false);
    }
  }, [isMobileScreen]);

  if (isMounted) {
    return (
      <>
        <div className="relative z-20 hidden border-b-[0.0625rem] border-b-[--border-primary-main] bg-[--background-primary-main] px-4 shadow-sm md:flex">
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-primary">
              <div className="my-auto ml-4 mr-2">
                <Link href="/">
                  <h1 className="text-lg font-semibold xl:text-2xl">SQUIZ</h1>
                </Link>
              </div>
            </div>

            <div className="flex h-[3.5rem] items-center gap-4 pr-2">
              {/* <button>
              <BsPlus className="h-[2rem] w-[2rem] rounded-full bg-[#4255ff] text-sm text-white" />
            </button>
            <div className="relative h-[2rem] w-[2rem] rounded-full border border-[#586380] bg-transparent p-2 text-black">
              <button>
                <span className="absolute -top-3.5 left-1/2 h-[1rem] w-[1rem] rounded-full bg-[red] text-center text-xs font-medium leading-[1.7] text-white">
                  7
                </span>
                <GrNotification className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg text-primary" />
              </button>
            </div> */}
              <div className="group relative flex h-[70px] cursor-pointer items-center rounded">
                <div className="relative flex h-[60px] cursor-pointer items-center gap-2 rounded">
                  {user ? (
                    <p className="font-medium text-[--color-text-link]">
                      197CT09794 - Minh Khôi - HTML
                    </p>
                  ) : (
                    <p className="font-medium text-[--color-text-link]">
                      You are not logged in.
                    </p>
                  )}

                  {user && (
                    <Image
                      src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t1.6435-1/139131444_3393715627406941_8376925531107375232_n.jpg?stp=c0.0.200.200a_dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeElVGQvtfcOvMLiikwk_sN0-93hX0BTTBD73eFfQFNMEFCHvxt4v-r5af3_QzPpz5EN6KCcE820BUiwV24oApZu&_nc_ohc=HiiP0XEe37kAX_uigNm&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfDGbsoMRfkKZ7cD3o8HzDKlvPVp-CfSbfEBqI3cLxVuyA&oe=6618D625"
                      className="rounded-full"
                      width={35}
                      height={35}
                      alt="Picture of the author"
                      loading="lazy"
                    />
                  )}
                  <IoIosArrowDown className="h-[1.15rem] w-[1.15rem]" />
                </div>
                <Popper width="min-w-[12rem]">
                  <div className="cursor-default">
                    <div className="flex w-[95%] items-center gap-3 px-4 py-3">
                      <Image
                        src={`${user ? "https://scontent.fsgn5-12.fna.fbcdn.net/v/t1.6435-1/139131444_3393715627406941_8376925531107375232_n.jpg?stp=c0.0.200.200a_dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeElVGQvtfcOvMLiikwk_sN0-93hX0BTTBD73eFfQFNMEFCHvxt4v-r5af3_QzPpz5EN6KCcE820BUiwV24oApZu&_nc_ohc=HiiP0XEe37kAX_uigNm&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfDGbsoMRfkKZ7cD3o8HzDKlvPVp-CfSbfEBqI3cLxVuyA&oe=6618D625" : "/assets/avatar-default.svg"}`}
                        className="rounded-full"
                        width={55}
                        height={55}
                        alt="Picture of the author"
                        loading="lazy"
                      />
                      <div>
                        <p className="text font-bold">
                          <span>
                            {user?.username || user?.email || "Guest"}
                          </span>
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
  } else {
    return <div className="h-[3.5rem] w-full animate-pulse bg-gray-500"></div>;
  }
};

export default Header;
