import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshToken = async (): Promise<string> => {
  try {
    const refreshToken: string = localStorage.getItem("refresh_token")!;
    const response = await axios.post(
      `${API_URL}/auth/user/refresh`,
      {},
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
      },
    );

    const newAccessToken = response.data.access_token;
    localStorage.setItem("jwt", newAccessToken);
    return newAccessToken;
  } catch (error) {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userData");
    localStorage.removeItem("refresh_token");
    throw error;
  }
};

AxiosInstance.interceptors.request.use((config) => {
  const accessToken: string = localStorage.getItem("jwt")!;

  if (accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.response?.config?.url?.includes("signin") &&
      !error.response?.config?.url?.includes("/auth/user/refresh")
    ) {
      try {
        const newAccessToken = await refreshToken();
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;

        return axios.request(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default AxiosInstance;
