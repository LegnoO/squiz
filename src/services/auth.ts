import AxiosInstance from "@/config/axios";
import type { AxiosError } from "axios";
import { IUser } from "@/types/User";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type TokenType = { access_token: string; refresh_token: string };

export const getUserInfo = async (): Promise<IUser> => {
  const response = await AxiosInstance.post(`${API_URL}/user/get-data`);
  const data: IUser = response.data;
  localStorage.setItem("userData", JSON.stringify(data));
  return data;
};

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<void> {
  const response = await AxiosInstance.post(`${API_URL}/auth/user/signin`, {
    email,
    password,
  });
  const data: TokenType = response.data;
  const access_token: string = data.access_token;
  const refresh_token: string = data.refresh_token;

  localStorage.setItem("jwt", access_token);
  localStorage.setItem("refresh_token", refresh_token);
}

export async function registerUser({
  email,
  password,
  role,
}: {
  email: string;
  password: string;
  role: string;
}): Promise<void> {
  await AxiosInstance.post(`${API_URL}/auth/user/signup`, {
    email,
    password,
    role,
  });
}

export async function forgotPassword({
  email,
}: {
  email: string;
}): Promise<void> {
  await AxiosInstance.post(`${API_URL}/auth/forget-password/send-otp`, {
    email,
  });
}

export async function verifyOtp({
  email,
  otp,
}: {
  email: string;
  otp: string;
}): Promise<void> {
  await AxiosInstance.post(`${API_URL}/auth/forget-password/verify-otp`, {
    email,
    otp,
  });
}

export async function resetPassword({
  email,
  otp,
  newPassword,
  confirmNewPassword,
}: {
  email: string;
  otp: string;
  newPassword: string;
  confirmNewPassword: string;
}): Promise<void> {
  await AxiosInstance.post(`${API_URL}/auth/forget-password/reset-password`, {
    email,
    otp,
    newPassword,
    confirmNewPassword,
  });
}

export async function updateUserProfile({
  username,
  email,
  codeAccount,
  phoneNumber,
}: {
  username: string;
  email: string;
  codeAccount: string;
  phoneNumber: string;
}): Promise<{
  message?: string;
  error?: string;
}> {
  try {
    const response = await AxiosInstance.post(
      `${API_URL}/auth/forget-password/reset-password`,
      {
        username,
        email,
        code_account: codeAccount,
        phone_number: phoneNumber,
      },
    );
    const message: string = response.data;
    return { message };
  } catch (error) {
    const err = error as AxiosError<any>;
    return { error: err.response?.data };
  }
}

export async function changePassword({
  oldPassword,
  newPassword,
  confirmPassword,
}: {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<{
  message?: string;
  error?: string;
}> {
  try {
    const response = await AxiosInstance.post(
      `${API_URL}/auth/change-password-user/change-password`,
      {
        password: oldPassword,
        newPassword,
        confirmNewPassword: confirmPassword,
      },
    );
    const message: string = response.data;
    return { message };
  } catch (error) {
    const err = error as AxiosError<any>;

    return { error: err.response?.data.message };
  }
}
