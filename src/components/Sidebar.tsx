"use client";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
export default function Sidebar({
  toggleSidebar,
  isOpen,
}: {
  toggleSidebar: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  return (
    <>
      <div
        onClick={() => {
          toggleSidebar((prev) => !prev);
        }}
        className={`${isOpen ? "overlay fixed inset-0 z-[10] h-full w-full bg-[rgba(0,0,0,0.5)]" : ""}`}>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`sidebar fixed left-0 top-0 z-[20] h-full w-6/12 overflow-y-scroll transition-all duration-300 ${isOpen ? "nav_open visible translate-x-[0] opacity-100" : "nav_close invisible -translate-x-[100%] opacity-0"}`}>
          <div className="bg-[#f7f9fa] p-4 transition-all duration-300">
            <div className="flex items-center">
              <div className="flex w-[95%] items-center gap-3">
                <Image
                  src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t1.6435-1/139131444_3393715627406941_8376925531107375232_n.jpg?stp=c0.0.200.200a_dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeElVGQvtfcOvMLiikwk_sN0-93hX0BTTBD73eFfQFNMEFCHvxt4v-r5af3_QzPpz5EN6KCcE820BUiwV24oApZu&_nc_ohc=HiiP0XEe37kAX_uigNm&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfDGbsoMRfkKZ7cD3o8HzDKlvPVp-CfSbfEBqI3cLxVuyA&oe=6618D625"
                  className="rounded-full"
                  width={60}
                  height={60}
                  alt="Picture of the author"
                  loading="lazy"
                />
                <div>
                  <p className="font-bold">
                    <span>Hi, Minh Khoi</span>
                  </p>
                  <p className="text-sm text-gray-700">
                    <span>Welcome back</span>
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <button className="text-xl">
                  <MdOutlineKeyboardArrowRight />
                </button>
              </div>
            </div>
          </div>
          <div className="h-full w-full bg-white">
            <div className="bg-white py-3">
              <div className="h-[50rem] text-primary">
                <div className="px-3 pb-2">
                  <h2 className="mb-2 text-sm font-bold text-gray-500">
                    Learn
                  </h2>
                  <p className="my-3 font-medium">My learning</p>
                </div>
                <div className="border-break">
                  <div className="p-3">
                    <h2 className="mb-2 text-sm font-bold text-gray-500">
                      Most popular
                    </h2>
                    <div>
                      <div className="mb-3 flex cursor-pointer items-center font-medium">
                        <p>Web Development</p>
                        <div className="flex w-fit flex-1 justify-end">
                          <button className="text-lg text-black">
                            <MdOutlineKeyboardArrowRight />
                          </button>
                        </div>
                      </div>
                      <div className="mb-3 flex cursor-pointer items-center font-medium">
                        <p>Web Development</p>
                        <div className="flex w-fit flex-1 justify-end">
                          <button className="text-lg text-black">
                            <MdOutlineKeyboardArrowRight />
                          </button>
                        </div>
                      </div>
                      <div className="mb-3 flex cursor-pointer items-center font-medium">
                        <p>Web Development</p>
                        <div className="flex w-fit flex-1 justify-end">
                          <button className="text-lg text-black">
                            <MdOutlineKeyboardArrowRight />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-break">
                  <div className="p-3">
                    <h2 className="mb-2 text-sm font-bold text-gray-500">
                      Profile
                    </h2>
                    <div>
                      <div className="mb-3 font-medium">
                        <button>
                          <p>Edit profile</p>
                        </button>
                      </div>
                      <div className="mb-3 font-medium">
                        <button>
                          <p>Logout</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
