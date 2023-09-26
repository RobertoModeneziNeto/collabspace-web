import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { User } from "../services/Sessions/types";
import { session } from "../services/Sessions";
import api from "../services/Api/api";
import usePersistedState from "../hooks/usePersistedState";
import { useNavigate } from "react-router-dom";

interface SigInRequest {
  email: string;
  password: string;
}

interface SigInResponse {
  result: "success" | "error";
  message: string;
}

interface AuthenticationContextType {
  signed: boolean;
  loading: boolean;
  user: Partial<User> | null;
  token: string;
  loggedEmail: string;
  handleLoggedEmail: (email: string) => void;
  signIn(data: SigInRequest): Promise<SigInResponse>;
  handleAvatarUrl: (avatarUrl: string) => void;
  handleCoverUrl: (coverUrl: string) => void;
  signOut(): void;
  me(id?: string): void;
}

interface AuthenticationProviderProps {
  children: ReactNode;
}

const AuthenticationContext = createContext<AuthenticationContextType>(
  {} as AuthenticationContextType,
);

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const [user, setUser] = usePersistedState<Partial<User> | null>("user", null);
  const [token, setToken] = usePersistedState("token", "");

  const [loading, setLoading] = useState(false);
  const [loggedEmail, setLoggedEmail] = useState<string>("");

  const handleLoggedEmail = useCallback(
    (email: string) => {
      setLoggedEmail(email);
    },
    [setLoggedEmail],
  );

  const navigate = useNavigate();

  const signIn = useCallback(
    async ({ email, password }: SigInRequest): Promise<SigInResponse> => {
      setLoading(true);

      try {
        const { result, message, data } = await session({ email, password });

        if (result === "success") {
          if (data) {
            setUser(data?.user);
            setToken(data?.token);

            api.defaults.headers.authorization = `Bearer ${data.token}`;
          }
        }

        setLoading(false);

        return { result, message };
      } catch (error: any) {
        setLoading(false);
        return { result: "error", message: error.message };
      }
    },
    [setUser, setToken],
  );

  const handleAvatarUrl = useCallback(
    (avatarUrl: string) => {
      setUser((prevState) => ({
        ...prevState,
        avatarUrl,
      }));
    },
    [setUser],
  );

  const handleCoverUrl = useCallback(
    (coverUrl: string) => {
      setUser((prevState) => ({
        ...prevState,
        coverUrl,
      }));
    },
    [setUser],
  );

  const signOut = () => {
    setUser(null);
    setToken("");
  };

  const me = (id: string) => {
    if (id) navigate(`/me/${id}`);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        signed: !!user,
        loading,
        user,
        token,
        loggedEmail,
        handleLoggedEmail,
        signIn,
        handleAvatarUrl,
        handleCoverUrl,
        signOut,
        me,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

function useAuthentication(): AuthenticationContextType {
  return useContext(AuthenticationContext);
}

export { AuthenticationProvider, useAuthentication };
