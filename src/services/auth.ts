import AxiosInstance from "@/config/axios";
import type { AxiosError } from "axios";
import { IUser } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type TokenType = { access_token: string; refresh_token: string };

export const getTokenAccess = () => localStorage.getItem("jwt")!;

export const getUserInfo = async (): Promise<{
  data?: IUser | null;
  error?: AxiosError | null;
}> => {
  try {
    const { data } = await AxiosInstance.post(
      "https://e-learming-be.onrender.com/user/get-data",
    );

    return { data };
  } catch (error) {
    const err = error as AxiosError<any>;
    return { error: err.response?.data };
  }
};

export async function userLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{
  access_token?: string;
  error?: AxiosError | null;
}> {
  try {
    const response = await AxiosInstance.post(`${API_URL}/auth/user/signin`, {
      email,
      password,
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
