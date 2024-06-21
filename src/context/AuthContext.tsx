"use client";

// ** React Imports
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// ** Next Imports
import { useRouter, usePathname } from "next/navigation";

// ** Utils
import { handleAxiosError } from "@/utils/errorHandler";

// ** Services
import { getUserInfo, loginUser } from "@/services/auth";
import { IUser } from "@/types/user";
import { useNavigationEvent } from "@/hooks/useNavigationEvent";
import { useRouterPush } from "@/hooks/useRouterPush";

// ** Types
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
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const pushRoute = useRouterPush();

  useNavigationEvent(() => {
    if (loading) setLoading(false);
  });

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("jwt")!
        : "";
        
    const initAuth = async () => {
      if (token) {
        try {
          setLoading(true);
          console.log("test0")
          const userData = await getUserInfo();
          console.log("test1")
          setUser(userData);
          setLoading(false);
        } catch (error) {
          console.log("test2")
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
      pushRoute("/");
    } catch (error) {
      handleAxiosError(error);
      setLoading(false);
    }
  }

  // const logout = () => {
  //     localStorage.removeItem('jwt');
  //     setUser(null);
  //     pushRoute('/signin');
  // };

  const values = {
    user,
    loading,
    // setUser,
    // setLoading,
    login: handleLogin,
    // logout: handleLogout
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext, AuthProvider };
