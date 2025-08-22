import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { setAccessToken as storeToken } from "@/lib/tokenStore";
import { IUser } from "@/types";
import { getCurrentUser, refreshToken } from "@/lib/api/user";

export const INITIAL_USER: IUser = {
  id: "",
  name: "",
  username: "",
  email: "",
  avatar: "",
  bio: "",
};

const INITIAL_STATE = {
  accessToken: null,
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => { },
  setIsAuthenticated: () => { },
  checkAuthUser: async () => false as boolean,
  setAccessToken: () => { },
};

type IContextType = {
  accessToken: string | null;
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: (token?: string | null) => Promise<boolean>;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // keep global helper in sync with state
    storeToken(accessToken);
  }, [accessToken]);

  // Try to fetch new token on app start
  const initializeAuth = async () => {
    try {
      // ask server for new access token using HttpOnly cookie
      const newToken = await refreshToken();
      if (newToken) {
        setAccessToken(newToken);
        await checkAuthUser(newToken); // fetch profile
      }
    } catch (err) {
      console.log("User not authenticated:", err);
      navigate("/sign-in");
    }
  };

  const checkAuthUser = async (token?: string | null) => {
    setIsLoading(true);
    try {
      const currentAccount: IUser = await getCurrentUser(token ?? accessToken);
      if (currentAccount) {
        setUser({
          id: currentAccount.id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          avatar: currentAccount.avatar,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  const value = {
    accessToken,
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
    setAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
