"use client";

import { TOKEN_POST, TOKEN_VALIDATE_POST, MESSAGES_GET } from "@/api/api";
import { redirect, useRouter } from "next/navigation";
import React from "react";

export interface UserContextType {
  userLogin: (nome: string, senha: string) => Promise<void>;
  userLogout: () => Promise<void>;
  data: null;
  error: string | null;
  login: boolean;
  loading: boolean;
}

export const UserContext = React.createContext<UserContextType | null>(null);

export default function UserStorage({ children }: any) {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  const userLogout = React.useCallback(async function () {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("avatar");
    window.localStorage.removeItem("nome");
  }, []);

  async function getUser(token: string) {
    const { url, options } = MESSAGES_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
  }

  async function userLogin(nome: string, senha: string) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ nome, senha });
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`);
      const { token, usuario } = await tokenRes.json();
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("avatar", usuario.avatar);
      window.localStorage.setItem("nome", usuario.nome);
      await getUser(token);
      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      setLogin(false);
    } finally {
      setLoading(false);
      setLogin(true);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token inválido");
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
          setLogin(true);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, login, loading }}
    >
      {children}
    </UserContext.Provider>
  );
}
