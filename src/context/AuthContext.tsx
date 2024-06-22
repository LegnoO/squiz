"use client";

// ** React Imports
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// ** Utils
import { handleAxiosError } from "@/utils/errorHandler";

// ** Components
import { useRouter } from "next-nprogress-bar";

// ** Services
import { getUserInfo, loginUser } from "@/services/auth";

// ** Hooks
import { useNavigationEvent } from "@/hooks/useNavigationEvent";

// ** Types
import { IUser } from "@/types/User";

// type AuthValuesType = {
//     loading: boolean
//     logout: () => void
//     user: UserDataType | null
//     setLoading: (value: boolean) => void
//     setUser: (value: UserDataType | null) => void
//     login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
// }

const defaultProvider: any = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useNavigationEvent(() => {
    if (loading) setLoading(false);
  });

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jwt")! : "";

    const initAuth = async () => {
      if (token) {
        try {
          setLoading(true);
          const userData = await getUserInfo();
          setUser(userData);
          setLoading(false);
        } catch (error) {
          setUser(null);
          setLoading(false);
          handleAxiosError(error);
        }
      } else {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  async function handleLogin(email: string, password: string) {
    try {
      setLoading(true);
      await loginUser({ email, password });
      const userData = await getUserInfo();
      setUser(userData);
      router.push("/");
    } catch (error) {
      handleAxiosError(error);
      setLoading(false);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userData");
    localStorage.removeItem("refresh_token");
    setUser(null);
    router.push("/signin");
  };

  const values = {
    user,
    loading,
    // setUser,
    // setLoading,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext, AuthProvider };
