"use client";

// Hook
import { useState, useRef } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
// Icons
import { FcGoogle } from "react-icons/fc";
// Components
import Button from "@/components/Button";
import Input from "@/components/Input";

// Utils
import { isEmptyString } from "@/utils/stringEmpty";
// Services
import { registerUser, getUserInfo } from "@/services/auth";
import { updateInfoUser } from "@/redux/features/userSlice";
import { playToast } from "@/utils/ToastMessage";

const Register = ({}) => {
  const fullNameFieldRef = useRef<HTMLInputElement>(null);
  const emailFieldRef = useRef<HTMLInputElement>(null);
  const passwordFieldRef = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    const access_token = await registerUser({
      email,
      password,
      role: "student",
    });
    setIsLoading(false);
    if (access_token) {
      const { data } = await getUserInfo();

      if (data) {
        dispatch(updateInfoUser({ userInfo: data }));
        playToast("success", "Đăng ký thành công");
        router.push("/");
      }
    }
  };

  return (
    <div className="bg-[--background-primary-main] py-12">
      <form className="mx-auto w-full max-w-[35rem] px-[4.8rem] py-[2.4rem] md:max-w-[30rem]">
        <div className="">
          <h1 className="text-medium mb-3 text-base font-bold text-primary">
            Bắt đầu đăng ký
          </h1>
          {/* <div className="mb-3 hidden rounded border border-[--border-secondary-main] bg-[--background-primary-main] py-3 transition hover:bg-gray-100">
            <button className="flex items-center gap-2 px-4">
              <FcGoogle className="h-[2rem] w-[2rem]" />
              <p className="text-medium text-base font-bold text-primary">
                Tiếp tục bằng tài khoản Google
              </p>
            </button>
          </div> */}
          <div className="group relative mb-3 rounded md:w-auto">
            <Input
              required
              ref={fullNameFieldRef}
              value={fullName}
              name="email"
              type="text"
              id="fullName-input"
              spellCheck={false}
              className={`text-primary outline-1 outline-[--border-secondary-main]`}
              onChange={(event) => setFullName(event.target.value)}
            />
            <label
              className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none font-medium transition-[transform,font-size] duration-300 group-focus-within:-translate-y-[1.8rem] group-focus-within:font-medium ${!isEmptyString(fullName) ? "-translate-y-[1.8rem] font-medium" : ""}`}
              htmlFor="email-input">
              <span
                className={`px-4 text-sm text-gray-500 duration-300 group-focus-within:text-xs `}>
                FullName
              </span>
            </label>
          </div>

          <div className="group relative mb-3 rounded md:w-auto">
            <Input
              required
              ref={emailFieldRef}
              value={email}
              name="email"
              type="text"
              id="email-input"
              spellCheck={false}
              className={`text-primary outline-1 outline-[--border-secondary-main]`}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label
              className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none font-medium transition-[transform,font-size] duration-300 group-focus-within:-translate-y-[1.8rem] group-focus-within:font-medium ${!isEmptyString(email) ? "-translate-y-[1.8rem] font-medium" : ""}`}
              htmlFor="email-input">
              <span
                className={`px-4 text-sm text-gray-500 duration-300 group-focus-within:text-xs `}>
                Email
              </span>
            </label>
          </div>

          <div className="group relative mb-3 rounded md:w-auto">
            <Input
              required
              ref={passwordFieldRef}
              value={password}
              name="password"
              type="password"
              id="password-input"
              spellCheck={false}
              className={`text-primary outline-1 outline-[--border-secondary-main]`}
              onChange={(event) => setPassword(event.target.value)}
            />

            <label
              className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none font-medium transition-[transform,font-size] duration-300 group-focus-within:-translate-y-[1.8rem] group-focus-within:font-medium ${!isEmptyString(password) ? "-translate-y-[1.8rem] font-medium" : ""}`}
              htmlFor="email-input">
              <span
                className={`px-4 text-sm text-gray-500 duration-300 group-focus-within:text-xs`}>
                Password
              </span>
            </label>
          </div>
          <div className="mb-3 mt-5">
            <Button onClick={handleSubmit} isLoading={isLoading}>
              Đăng ký
            </Button>
          </div>

          <div className="mt-6 border-t border-t-[--border-primary-main] pt-3 text-center text-sm leading-6">
            <p>
              Bạn đã có tài khoản? Hãy{" "}
              <span className="link-underline font-bold text-[#5624d0]">
                <Link href="/signin">đăng nhập</Link>
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;

// <div className="border-break pt-3 text-center text-sm leading-6">
//   <p>
//     Bạn đã có tài khoản? Hãy{" "}
//     <span className="link-underline font-bold text-[#5624d0]">
//       <Link href="/signin">đăng nhập</Link>
//     </span>
//   </p>
// </div>
