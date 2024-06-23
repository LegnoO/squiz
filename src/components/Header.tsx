"use client";

// ** React Imports
import { useEffect, useState } from "react";

// ** Hooks
import { useMediaQuery } from "react-responsive";

// ** Next Imports
import Link from "next/link";

// ** Components
import Sidebar from "./Sidebar";

// ** Icons
import { IoIosMenu } from "react-icons/io";
import { FaGraduationCap } from "react-icons/fa6";
import { TfiSearch } from "react-icons/tfi";

// ** Components
import { Navbar } from "./ui/Nav";
import AvatarMenu from "./AvatarMenu";

// ** Context
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { user } = useAuth();
  const [mobileNav, setMobileNav] = useState<boolean>(false);
  const isMobileScreen = useMediaQuery({ query: "(max-width: 800px)" });



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
      <Navbar>
        <div className="relative z-20 hidden flex-1 md:flex">
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-primary">
              <div className="my-auto ml-4 mr-2">
                {user ? (
                  <Link href="/">
                    <h1 className="text-lg font-semibold xl:text-2xl">SQUIZ</h1>
                  </Link>
                ) : (
                  <h1 className="select-none text-lg font-semibold xl:text-2xl">
                    SQUIZ
                  </h1>
                )}
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
              <div className="group relative flex h-[70px] items-center rounded">
                <div className="relative flex h-[60px] items-center gap-2 rounded">
                  {user ? (
                    <></>
                  ) : (
                    <p className="font-medium text-[--color-text-link]">
                      You are not logged in.
                    </p>
                  )}

                  {user && <AvatarMenu />}
                </div>
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
      </Navbar>
    );
  }
};

export default Header;
