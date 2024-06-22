"use client";

// React Imports
import { useState, useRef } from "react";

// ** Next Imports
import Link from "next/link";
import { useRouter } from "next/navigation";

// ** Icons
import { FcGoogle } from "react-icons/fc";

// ** Components
import Button from "@/components/Button";
import Input from "@/components/Input";

// ** Utils
import { isEmptyString } from "@/utils/stringEmpty";

// ** Services
import { forgotPassword, resetPassword, verifyOtp } from "@/services/auth";

const ForgotPassword = ({}) => {
  const newPasswordFieldRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const emailFieldRef = useRef<HTMLInputElement>(null);
  const otpFieldRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageField, setMessageField] = useState<{
    success?: string;
    error?: string;
  }>({
    success: "",
    error: "",
  });
  const [step, setStep] = useState<number>(1);

  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);

    if (step === 1) {
      const { message } = await forgotPassword({ email });
      if (message) {
        setMessageField(() => {
          return { success: "Mã OTP đã được gửi đến email của bạn." };
        });
        setStep(2);
      } else {
        setMessageField(() => {
          return { error: "Email không tồn tại." };
        });
      }
    }
    if (step === 2) {
      setMessageField({});
      const { message } = await verifyOtp({ otp, email });
      if (message) {
        setMessageField(() => {
          return { success: "Mã OTP đã được gửi đến email của bạn." };
        });
        setStep(3);
      } else {
        setMessageField(() => {
          return { error: "Mã OTP không hợp lệ." };
        });
      }
      setMessageField({});
    }

    if (step === 3) {
      setMessageField({});
      if (newPassword === confirmPassword) {
        const { error, message } = await resetPassword({
          otp,
          email,
          newPassword,
          confirmNewPassword: confirmPassword,
        });
        if (message) {
          setMessageField(() => {
            return { success: message };
          });
          setStep(2);
        } else {
          setMessageField(() => {
            return { error };
          });
        }
      } else {
        setMessageField(() => {
          return { error: "Mật khẩu không trùng khớp" };
        });
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-[--background-primary-main] py-12">
      <form className="mx-auto w-full max-w-[35rem] px-[4.8rem] py-[2.4rem] md:max-w-[30rem]">
        <div className="">
          <h1 className="text-medium mb-3 text-base font-bold text-primary">
            Tìm Email của bạn
          </h1>

          {step == 1 && (
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
          )}

          {step == 2 && (
            <>
              <div className="group relative mb-3 rounded md:w-auto">
                <Input
                  required
                  ref={otpFieldRef}
                  value={otp}
                  name="otp"
                  type="text"
                  id="otp-input"
                  spellCheck={false}
                  className={`text-primary outline-1 outline-[--border-secondary-main]`}
                  onChange={(event) => setOtp(event.target.value)}
                />
                <label
                  className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none font-medium transition-[transform,font-size] duration-300 group-focus-within:-translate-y-[1.8rem] group-focus-within:font-medium ${!isEmptyString(otp) ? "-translate-y-[1.8rem] font-medium" : ""}`}
                  htmlFor="email-input">
                  <span
                    className={`px-4 text-sm text-gray-500 duration-300 group-focus-within:text-xs `}>
                    Nhập mã OTP
                  </span>
                </label>
              </div>
            </>
          )}

          <div
            className={`${messageField.error && "text-[--color-error-dark]"} mb-3 text-sm font-semibold`}>
            {messageField.success || messageField.error}
          </div>
          {step == 3 && (
            <>
              <div className="group relative mb-3 rounded md:w-auto">
                <Input
                  required
                  ref={newPasswordFieldRef}
                  value={newPassword}
                  name="newPassword"
                  type="text"
                  id="newPassword-input"
                  spellCheck={false}
                  className={`text-primary outline-1 outline-[--border-secondary-main]`}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
                <label
                  className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none font-medium transition-[transform,font-size] duration-300 group-focus-within:-translate-y-[1.8rem] group-focus-within:font-medium ${!isEmptyString(newPassword) ? "-translate-y-[1.8rem] font-medium" : ""}`}
                  htmlFor="email-input">
                  <span
                    className={`px-4 text-sm text-gray-500 duration-300 group-focus-within:text-xs `}>
                    Nhập mật khẩu mới
                  </span>
                </label>
              </div>

              <div className="group relative mb-3 rounded md:w-auto">
                <Input
                  required
                  ref={confirmPasswordRef}
                  value={confirmPassword}
                  name="confirmPassword"
                  type="text"
                  id="confirmPassword-input"
                  spellCheck={false}
                  className={`text-primary outline-1 outline-[--border-secondary-main]`}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <label
                  className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none font-medium transition-[transform,font-size] duration-300 group-focus-within:-translate-y-[1.8rem] group-focus-within:font-medium ${!isEmptyString(confirmPassword) ? "-translate-y-[1.8rem] font-medium" : ""}`}
                  htmlFor="email-input">
                  <span
                    className={`px-4 text-sm text-gray-500 duration-300 group-focus-within:text-xs `}>
                    Xác nhận lại mật khẩu
                  </span>
                </label>
              </div>
            </>
          )}

          <div className="mb-3 mt-5">
            <Button onClick={handleSubmit} isLoading={isLoading}>
            Gửi yêu cầu
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;

// <div className="border-break pt-3 text-center text-sm leading-6">
//   <p>
//     Bạn đã có tài khoản? Hãy{" "}
//     <span className="link-underline font-bold text-[#5624d0]">
//       <Link href="/signin">đăng nhập</Link>
//     </span>
//   </p>
// </div>
