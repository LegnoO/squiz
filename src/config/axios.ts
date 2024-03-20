import axios, { AxiosError } from "axios";
import { GetServerSidePropsContext } from "next";
import Router from "next/router";

const baseURL = process.env.BASE_URL;
let accessToken = "";
const isServer = typeof window === "undefined";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // to send cookie
});

export const setAccessToken = (_accessToken: string) => {
  accessToken = _accessToken;
};

export const getAccessToken = () => accessToken;


api.interceptors.request.use((config) => {
  console.log("axios request")
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});


api.interceptors.response.use(
  (response) => {
    console.log("axios response")
    // Modify the response data here
    return response;
  },
  (error: AxiosError) => {
    // Handle response errors here
    // check conditions to refresh token
    // if (
    //   error.response?.status === 401 &&
    //   !error.response?.config?.url?.includes("auth/refresh") &&
    //   !error.response?.config?.url?.includes("signin")
    // ) {
    //   return refreshToken(error);
    // }
    return Promise.reject(error);
  },
);

export default api;
