import { createContext, ReactNode, useEffect, useState } from "react";
import Router from 'next/router'
import { setCookie, parseCookies } from 'nookies';
import { api } from "../services/api";

type User = {
  email: string;
  name: string;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const { 'auth.token': token } = parseCookies()

  //   if (token) {
  //     api.post(`/oauth/token?grant_type=password&username=${email}&password=${password}`, null, {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //         "Authorization": "Basic d2ViY2xpZW50OmNsaWVudEB3ZWI=",
  //         "Access-Control-Allow-Origin": "*"
  //       }
  //     }).then((response) => {
  //       const { email, name } = response.data

  //       setUser({ email, name })
  //     })
  //   }
  // }, [])

  async function signIn({ email, password }: SingInCredentials) {
    try {
      const response = await api.post(`/oauth/token?grant_type=password&username=${email}&password=${password}`, null, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": "Basic d2ViY2xpZW50OmNsaWVudEB3ZWI=",
          "Access-Control-Allow-Origin": "*"
        }
      }).then(response => {
        const data = response.data
        console.log(data);

        const { access_token, refresh_token, user_email, user_name } = response.data;

        setCookie(undefined, 'auth.token', access_token, {
          maxAge: 60 * 60 * 24 * 30, // 30 dias
          path: '/'
        })

        setCookie(undefined, 'auth.refreshToken', refresh_token, {
          maxAge: 60 * 60 * 24 * 30, // 30 dias
          path: '/'
        })

        setUser({
          email: user_email,
          name: user_name
        });

        api.defaults.headers['Authorization'] = `Bearer ${access_token}`;
        setIsAuthenticated(true);

        Router.push('/dashboard')
      })
    } catch (err) {
      console.error(err);
    }
  }

  function singOut() {

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