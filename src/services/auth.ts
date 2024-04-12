import AxiosInstance from "@/config/axios";
import type { AxiosError } from "axios";
import { IUser } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type TokenType = { access_token: string; refresh_token: string };

export const getTokenAccess = () => localStorage.getItem("jwt")!;

export const getUserInfo = async (): Promise<{
  data?: IUser | null;
  message?: string;
  error?: string;
}> => {
  try {
    const response = await AxiosInstance.post(`${API_URL}/user/get-data`);
    const data: IUser = response.data;
    const message: string = response.data;
    localStorage.setItem("userData", JSON.stringify(data));
    return { data, message };
  } catch (error) {
    const err = error as AxiosError<any>;
    return { error: err.response?.data };
  }
};

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{
  access_token?: string;
  error?: string;
}> {
  try {
    const response = await AxiosInstance.post(`${API_URL}/auth/user/signin`, {
      email,
      password,
    });
    const data: TokenType = response.data;
    const access_token: string = data.access_token;
    const refresh_token: string = data.refresh_token;

    localStorage.setItem("jwt", access_token);
    localStorage.setItem("refresh_token", refresh_token);

    return { access_token };
  } catch (error) {
    const err = error as AxiosError<any>;
    return { error: err.response?.data.message };
  }
}

export async function registerUser({
  email,
  password,
  role,
}: {
  email: string;
  password: string;
  role: string;
}): Promise<{
  access_token?: string;
  error?: string;
}> {
  try {
    const response = await AxiosInstance.post(`${API_URL}/auth/user/signup`, {
      email,
      password,
      role: "student",
    });
    const data: TokenType = response.data;
    const access_token: string = data.access_token;
    localStorage.setItem("jwt", access_token);
    return { access_token };
  } catch (error) {
    const err = error as AxiosError<any>;
    return { error: err.response?.data };
  }
}

export async function forgotPassword({ email }: { email: string }): Promise<{
  message?: string;
  error?: string;
}> {
  try {
    console.log(email);
    const response = await AxiosInstance.post(
      `${API_URL}/auth/forget-password/send-otp`,
      {
        email,
      },
    );
    const message: string = response.data;
    return { message };
  } catch (error) {
    const err = error as AxiosError<any>;
    console.log(err.response);
    return { error: err.response?.data };
  }
}

export async function verifyOtp({
  email,
  otp,
}: {
  email: string;
  otp: string;
}): Promise<{
  message?: string;
  error?: string;
}> {
  try {
    const response = await AxiosInstance.post(
      `${API_URL}/auth/forget-password/verify-otp`,
      {
        email,
        otp,
      },
    );
    const message: string = response.data;
    return { message };
  } catch (error) {
    const err = error as AxiosError<any>;
    return { error: err.response?.data };
  }
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
}): Promise<{
  message?: string;
  error?: string;
}> {
  try {
    const response = await AxiosInstance.post(
      `${API_URL}/auth/forget-password/reset-password`,
      {
        email,
        otp,
        newPassword,
        confirmNewPassword,
      },
    );
    const message: string = response.data;
    return { message };
  } catch (error) {
    const err = error as AxiosError<any>;
    return { error: err.response?.data };
  }
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
    console.log({
      password: oldPassword,
      newPassword,
      confirmNewPassword: confirmPassword,
    });
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
