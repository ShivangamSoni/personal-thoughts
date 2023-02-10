import { createContext, ComponentChildren } from "preact";
import { useEffect, useContext } from "preact/hooks";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import axios from "../axios";

import { IUserCredentials } from "../components/LoginModal";
import { useLocalState } from "../hooks/useLocalState";
import { AxiosError, AxiosResponse } from "axios";

interface IUser {
  name: string;
  email: string;
  membership: string;
}

const AuthContext = createContext<{
  user: IUser | null | undefined;
  login: {
    mutate: (userCred: IUserCredentials) => AxiosResponse;
    error: string;
  };
  logout: () => void;
  join: () => void;
}>({
  user: null,
  login: {
    // @ts-expect-error
    mutate: () => {},
    error: "",
  },
  logout: () => {},
  join: () => {},
});

export default function AuthProvider({
  children,
}: {
  children: ComponentChildren;
}) {
  const [token, setToken] = useLocalState<string>("token", "");

  const client = useQueryClient();

  const { mutateAsync: mutate, error } = useMutation({
    mutationFn: (userCred: IUserCredentials) => {
      return axios.post("/api/auth/login", userCred);
    },
    onSuccess(data) {
      setToken(data.data.token);
    },
  });

  const { mutate: joinMutate } = useMutation({
    mutationFn: () => {
      return axios.post(
        "/api/user/membership/join",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess(data) {
      refetch();
      client.invalidateQueries("thoughts", {
        refetchActive: true,
        refetchInactive: false,
      });
    },
  });

  const { data, refetch } = useQuery<
    IUser | null,
    AxiosError<{ message: string }>
  >({
    queryKey: "user",
    queryFn: async () => {
      try {
        const { data } = await axios.get("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data;
      } catch {
        return null;
      }
    },
    retry: 0,
  });

  function logout() {
    setToken("");
  }

  function join() {}

  useEffect(() => {
    refetch();
    client.invalidateQueries("thoughts", {
      refetchActive: true,
      refetchInactive: false,
    });
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user: data,
        login: {
          // @ts-expect-error
          mutate,
          // @ts-expect-error
          error: error ? error.response.data.message : "",
        },
        logout,
        join: joinMutate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthCtx = () => useContext(AuthContext);
