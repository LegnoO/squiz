"use client";
import { Suspense, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import { isEmptyString } from "@/utils/stringEmpty";
import { loginUser } from "@/actions/auth";
import ButtonSubmit from "@/components/ButtonSubmit";
import useSWR from "swr";
import Link from "next/link";

export default function Login() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [state, formAction] = useFormState(loginUser, { token: "" });

  // const { data, error, isLoading } = useSWR(
  //   "https://jsonplaceholder.typicode.com/todos",
  // );
  async function fetchData() {
    const res = await fetch("https://sgarden-v2.onrender.com/order", {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpbm5lIiwic3ViIjoiNjVlOGNiMzg5ZThjMTgzMGEyNzQ0ZDhjIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzEwNzMxMTYyLCJleHAiOjE3MTA4MTc1NjJ9.wA4_GW6Ntkw0xcmcW_E-T4VumHJnHGKOO-qY0U4axmU`,
      },
    });
    return await res.json();
  }

  return (
    <>
      <form
        className="mx-auto w-full md:max-w-[30rem] max-w-[35rem] px-[4.8rem] py-[2.4rem]"
        action={formAction}>
        <div className="bg-white">
          <h1 className="text-medium mb-3 text-base font-bold text-primary">
            Đăng nhập vào tài khoản SQuiz của bạn
          </h1>
          <div className="group relative mb-3 md:w-auto border border-[#2d2f31]">
            <input
              name="username"
              type="text"
              id="email-input"
              spellCheck={false}
              className="h-[55px] w-full px-4 pb-4 pt-5 font-medium text-primary md:w-auto"
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
          <div className="group relative mb-3 md:w-auto border border-[#2d2f31]">
            <input
              name="password"
              type="password"
              id="email-input"
              spellCheck={false}
              className="h-[55px] w-full px-4 pb-4 pt-5 md:w-auto"
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
            <ButtonSubmit>Đăng nhập</ButtonSubmit>
          </div>
          <div className="mb-3 text-center">
            <p>
              hoặc{" "}
              <span className="link-underline font-bold text-[#5624d0]">
                <Link href="">Quên mật khẩu</Link>
              </span>
            </p>
          </div>

          <div className="border-break pt-3 text-center text-sm leading-6">
            <p>
              Bạn không có tài khoản?{" "}
              <span className="link-underline font-bold text-[#5624d0]">
                <Link href="/signup">Hãy đăng ký</Link>
              </span>
            </p>
            <p>
              <span className="link-underline font-bold text-[#5624d0]">
                <Link href="sigin"> Đăng nhập bằng tên tổ chức của bạn</Link>
              </span>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
