"use client";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import { isEmptyString } from "@/utils/stringEmpty";
// import { loginUser } from "@/actions/auth";
import ButtonSubmit from "@/components/Button";
import Link from "next/link";

export default function Login() {
  const [fullName, setFullName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <>
      <form
        className="mx-auto w-full max-w-[35rem] px-[4.8rem] py-[2.4rem] md:max-w-[30rem]"
        >
        <div className="w-full bg-white">
          <h1 className="text-medium mb-3 text-base font-bold text-primary">
            Đăng ký và bắt đầu học
          </h1>
          <div className="group relative mb-3 border border-[#2d2f31]">
            <input
              name="fullname"
              type="text"
              id="email-input"
              spellCheck={false}
              className="h-[55px] w-full px-4 pb-4 pt-5 font-medium text-primary"
              onChange={(event) => {
                setFullName(event.target.value);
              }}
            />
            <label
              className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none font-bold transition-[transform,font-size] duration-300 group-focus-within:-translate-y-[1.8rem] group-focus-within:font-medium ${!isEmptyString(fullName) ? "-translate-y-[1.8rem] font-medium" : ""}`}
              htmlFor="email-input">
              <span
                className={`px-4 text-sm duration-300 group-focus-within:text-xs ${!isEmptyString(fullName) ? "text-xs" : ""}`}>
                FullName
              </span>
            </label>
          </div>
          <div className="group relative mb-3 border border-[#2d2f31]">
            <input
              name="username"
              type="text"
              id="email-input"
              spellCheck={false}
              className="h-[55px] w-full px-4 pb-4 pt-5 font-medium text-primary"
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
            <label
              className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none font-bold transition-[transform,font-size] duration-300 group-focus-within:-translate-y-[1.8rem] group-focus-within:font-medium ${!isEmptyString(userName) ? "-translate-y-[1.8rem] font-medium" : ""}`}
              htmlFor="email-input">
              <span
                className={`px-4 text-sm duration-300 group-focus-within:text-xs ${!isEmptyString(userName) ? "text-xs" : ""}`}>
                Username
              </span>
            </label>
          </div>
          <div className="group relative mb-3 border border-[#2d2f31]">
            <input
              name="password"
              type="password"
              id="email-input"
              spellCheck={false}
              className="h-[55px] w-full px-4 pb-4 pt-5"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <label
              className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 font-bold transition-[transform,font-size] duration-300 group-focus-within:-translate-y-[1.8rem] group-focus-within:font-medium ${!isEmptyString(password) ? "-translate-y-[1.8rem] font-medium" : ""}`}
              htmlFor="email-input">
              <span
                className={`select-none px-4 text-sm duration-300 group-focus-within:text-xs ${!isEmptyString(password) ? "text-xs" : ""}`}>
                Password
              </span>
            </label>
          </div>
          <div className="mb-3 mt-5">
            {/* <ButtonSubmit>Đăng ký</ButtonSubmit> */}
          </div>

          <div className="border-break pt-3 text-center text-sm leading-6">
            <p>
              Bạn đã có tài khoản? Hãy{" "}
              <span className="link-underline font-bold text-[#5624d0]">
                <Link href="/signin">đăng nhập</Link>
              </span>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
