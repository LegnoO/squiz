import AxiosInstance from "@/config/axios";
import type { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type TokenType = { access_token: string; refresh_token: string };
type UserDataType = {};

export const getTokenAccess = () => localStorage.getItem("jwt")!;

export const getUserInfo = async (): Promise<{
  data: any | null;
  error: AxiosError | null;
}> => {
  try {
    const tokenTest =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWZjZjJkMGU0YzIzM2RjOTQ3MzhhZGIiLCJ1c2VybmFtZSI6ImxlZ25vIiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3MTExMzM5MzMsImV4cCI6MTcxMTE0NDczM30.0VfrZNSeR9Fn-38l3x-1Z06oYW0fFovR3waXY8QAH-w";
    const { data } = await AxiosInstance.get(
      `https://e-learming-be.onrender.com/user/get/get-data-user`,
      {
        params: {
          token: tokenTest,
        },
      },
    );

    console.log(data);
    return { data, error: null };
  } catch (error) {
    const err = error as AxiosError<any>;
    return { data: null, error: err.response?.data };
  }
};

export async function userLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{
  data: TokenType | null;
  error: AxiosError | null;
}> {
  try {
    const { data } = await AxiosInstance.post(`${API_URL}/auth/user/signin`, {
      email,
      password,
    });

    const token = data.access_token;
    localStorage.setItem("jwt", token);
    return { data, error: null };
  } catch (error) {
    const err = error as AxiosError<any>;
    return { data: null, error: err.response?.data };
  }
}
