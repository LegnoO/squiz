"use client";
import { useState } from "react";
import Image from "next/image";
import { changePassword, updateUserProfile } from "@/services/auth";
import { playToast } from "@/utils/ToastMessage";
import useMount from "@/components/useMount";
import { useAuth } from "@/context/AuthContext";

export default function SettingPage() {
  const isMounted = useMount(false);

  const [tab, setTab] = useState<number>(0);
  const [messageStatus, setMessageStatus] = useState<{}>({
    message: null,
    error: null,
  });
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [codeAccount, setCodeAccount] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const {user} = useAuth()

  const handleUpdateProfile = async () => {
    // const { data } = await updateUserProfile({
    //   username,
    //   email,
    //   codeAccount,
    //   phoneNumber,
    // });
    // if (data) {
    //   dispatch(updateInfoUser(data));
    // }
  };
  const handleChangePassword = async () => {
    const { message, error } = await changePassword({
      oldPassword,
      newPassword,
      confirmPassword,
    });
    if (message) {
      setMessageStatus({
        message,
        error: null,
      });
      playToast("success", "Đổi mật khẩu thành công");
    }
    if (error) {
      setMessageStatus({
        message: null,
        error,
      });
      playToast("error", error);
    }
  };

  const tabs = [{ title: "Hồ sơ" }, { title: "Bảo mật" }];

  return (
    <div className="bg-gray-50 pb-[8rem] pt-[4rem]">
      <div className="mx-auto flex w-full max-w-[50rem] gap-8 md:max-w-[60rem]">
        <div className="rounded border border-[--border-primary-main] bg-white shadow-md">
          <div className="px-[4rem] py-[1.25rem]">
            <div className="flex items-center justify-center">
              {isMounted ? (
                <Image
                  src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t1.6435-1/139131444_3393715627406941_8376925531107375232_n.jpg?stp=c0.0.200.200a_dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeElVGQvtfcOvMLiikwk_sN0-93hX0BTTBD73eFfQFNMEFCHvxt4v-r5af3_QzPpz5EN6KCcE820BUiwV24oApZu&_nc_ohc=HiiP0XEe37kAX_uigNm&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfDGbsoMRfkKZ7cD3o8HzDKlvPVp-CfSbfEBqI3cLxVuyA&oe=6618D625"
                  className="mb-2 rounded-full"
                  width={100}
                  height={100}
                  alt="Picture of the author"
                  loading="lazy"
                />
              ) : (
                <span className="mb-2 h-[100px] w-[100px] animate-pulse rounded-full bg-gray-500"></span>
              )}
            </div>
            <h4
              className={`${!isMounted && "h-[0.625rem] w-[8rem] animate-pulse rounded-lg bg-gray-500 text-center"} text-center text-lg font-medium text-primary`}>
              {isMounted && user ? user?.username : ""}
            </h4>
          </div>
          <ul className="mt-2 flex flex-col font-medium text-gray-600">
            {tabs.map((x, index) => (
              <li
                key={index}
                className={`${tab === index ? "bg-[#ccc] text-white" : "text-primary"}`}>
                <button
                  onClick={() => setTab(index)}
                  className="w-full px-[1.25rem] py-[0.5rem] text-left">
                  {x.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 rounded border border-[--border-primary-main] bg-white shadow-md">
          <div className="">
            <div className="border-b border-[--border-primary-main] px-[1.75rem] py-[1.25rem]">
              <h2 className="mb-3 text-center text-3xl font-medium text-primary">
                Cài đặt
              </h2>
              <p className="mb-2 text-center text-lg font-medium text-secondary">
                Thông tin cá nhân
              </p>
            </div>
            {tab === 0 && (
              <div className="px-[1.75rem] py-[1.25rem]">
                <div className="px-[1.25rem] py-[0.75rem]">
                  <div className="flex w-full flex-col gap-2">
                    <label className="font-medium text-primary">
                      Mã tài khoản
                    </label>
                    <input
                      onChange={(event) => {
                        setCodeAccount(event.target.value);
                      }}
                      name="code_account"
                      spellCheck={false}
                      type="text"
                      className="w-full rounded bg-gray-100 p-4 text-sm font-medium text-secondary outline outline-1 outline-gray-400 focus:outline-gray-600"
                      placeholder="Mã tài khoản..."
                      // defaultValue={user?.codeAccount}
                      readOnly
                    />
                  </div>
                </div>

                <div className="px-[1.25rem] py-[0.75rem]">
                  <div className="flex w-full flex-col gap-2">
                    <label className="font-medium text-primary">Email</label>
                    <input
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      name="email"
                      spellCheck={false}
                      type="text"
                      className="w-full rounded bg-gray-100 p-4 text-sm font-medium text-secondary outline outline-1 outline-gray-400 focus:outline-gray-600"
                      defaultValue={user?.email}
                      placeholder="Email..."
                      readOnly
                    />
                  </div>
                </div>

                <div className="px-[1.25rem] py-[0.75rem]">
                  <div className="flex w-full flex-col gap-2">
                    <label className="font-medium text-primary">
                      Tên người dùng
                    </label>
                    <input
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                      name="username"
                      spellCheck={false}
                      type="text"
                      className="w-full rounded p-4 text-sm font-medium text-secondary outline outline-1 outline-gray-400 focus:outline-gray-600"
                      defaultValue={user?.username}
                      placeholder="Username..."
                    />
                  </div>
                </div>

                <div className="px-[1.25rem] py-[0.75rem]">
                  <div className="flex w-full flex-col gap-2">
                    <label className="font-medium text-primary">
                      Số điện thoại
                    </label>
                    <input
                      onChange={(event) => {
                        setPhoneNumber(event.target.value);
                      }}
                      name="phoneNumber"
                      spellCheck={false}
                      type="text"
                      className="w-full rounded p-4 text-sm font-medium text-secondary outline outline-1 outline-gray-400 focus:outline-gray-600"
                      defaultValue={user?.phone_number}
                      placeholder="Phone number..."
                    />
                  </div>
                </div>
                <div className="mt-3 px-[1.25rem] py-[0.75rem]">
                  <button
                    className="rounded bg-[--color-text-link] px-5 py-2.5 text-lg font-medium text-white"
                    onClick={handleUpdateProfile}>
                    Save
                  </button>
                </div>
              </div>
            )}

            {tab === 1 && (
              <div className="px-[1.75rem] py-[1.25rem]">
                <div className="px-[1.25rem] py-[0.75rem]">
                  <div className="flex w-full flex-col gap-2">
                    <label className="font-medium text-primary">
                      Mật khẩu cũ
                    </label>
                    <input
                      onChange={(event) => {
                        setOldPassword(event.target.value);
                      }}
                      name="oldPassword"
                      spellCheck={false}
                      type="password"
                      className="w-full rounded p-4 text-sm font-medium text-secondary outline outline-1 outline-gray-400 focus:outline-gray-600"
                      placeholder="Nhập mật khẩu cũ..."
                      value={oldPassword}
                    />
                  </div>
                </div>

                <div className="px-[1.25rem] py-[0.75rem]">
                  <div className="flex w-full flex-col gap-2">
                    <label className="font-medium text-primary">
                      Mật khẩu mới
                    </label>
                    <input
                      onChange={(event) => {
                        setNewPassword(event.target.value);
                      }}
                      name="newPassword"
                      spellCheck={false}
                      type="password"
                      className="w-full rounded p-4 text-sm font-medium text-secondary outline outline-1 outline-gray-400 focus:outline-gray-600"
                      placeholder="Nhập mật khẩu mới..."
                      value={newPassword}
                    />
                  </div>
                </div>

                <div className="px-[1.25rem] py-[0.75rem]">
                  <div className="flex w-full flex-col gap-2">
                    <label className="font-medium text-primary">
                      Xác nhận mật khẩu
                    </label>
                    <input
                      onChange={(event) => {
                        setConfirmPassword(event.target.value);
                      }}
                      name="confirmPassword"
                      spellCheck={false}
                      type="password"
                      className="w-full rounded p-4 text-sm font-medium text-secondary outline outline-1 outline-gray-400 focus:outline-gray-600"
                      placeholder="Xác nhận mật khẩu..."
                      value={confirmPassword}
                    />
                  </div>
                </div>

                <div className="mt-3 px-[1.25rem] py-[0.75rem]">
                  <button
                    className="rounded bg-[--color-text-link] px-5 py-2.5 text-lg font-medium text-white"
                    onClick={handleChangePassword}>
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
