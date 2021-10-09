import { createContext, ReactNode, useEffect, useState } from "react";
import Router from 'next/router'
import { setCookie, parseCookies } from 'nookies';
import { api } from "../services/api";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
}

type SingInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credentials: SingInCredentials): Promise<void>;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'auth.token': token } = parseCookies()

    if (token) {
      api.get('/me').then((response) => {
        const { email, permissions, roles } = response.data

        setUser({ email, permissions, roles })
      })
    }
  }, [])

  async function signIn({ email, password }: SingInCredentials) {
    try {


      const response = await api.post(`/oauth/token?grant_type=password&username=${email}&password=${password}`, null)

      // const { token, refreshToken, permissions, roles } = response.data;

      // setCookie(undefined, 'auth.token', token, {
      //   maxAge: 60 * 60 * 24 * 30, // 30 dias
      //   path: '/'
      // })

      // setCookie(undefined, 'auth.refreshToken', refreshToken, {
      //   maxAge: 60 * 60 * 24 * 30, // 30 dias
      //   path: '/'
      // })

      // setUser({
      //   email,
      //   permissions,
      //   roles
      // });

      // api.defaults.headers['Authorization'] = `Bearer ${token}`;

      // Router.push('/dashboard')
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  function singOut() {

  }

  function forgotPassword() {

  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}