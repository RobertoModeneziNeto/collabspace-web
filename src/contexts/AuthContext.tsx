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
  signIn(data: SigInRequest): Promise<SigInResponse>;
  signOut(): void;
}

interface AuthenticationProviderProps {
  children: ReactNode;
}

const AuthenticationContext = createContext<AuthenticationContextType>(
  {} as AuthenticationContextType,
);

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const [user, setUser] = useState<Partial<User> | null>(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

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
    [],
  );

  const signOut = () => {
    setUser(null);
    setToken("");
  };

  return (
    <AuthenticationContext.Provider
      value={{
        signed: !!user,
        loading,
        user,
        token,
        signIn,
        signOut,
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
