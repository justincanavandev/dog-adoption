import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import axios from "axios";
import type { AxiosResponse } from "axios";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { createContext, useState, useEffect } from "react";

type AuthContextType = {
  accessToken: string | null;
  baseUrl: string;
};

type AuthOResponse = {
  access_token: string | null;
  token_type: string;
  expires_in: number;
};

export const AuthContext = createContext({} as AuthContextType);

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const baseUrl = "https://api.petfinder.com/v2";

  useEffect(() => {
    const fetchAccessToken: () => Promise<void> = async () => {
      try {
        const res: AxiosResponse<AuthOResponse> =
          await axios.get("/api/oauth-token");
        console.log("res", res);
        const data: AuthOResponse = res.data;
        const { access_token } = data;
        setAccessToken(access_token);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchAccessToken();
  }, []);

  return (
    <SessionProvider session={session}>
      <AuthContext.Provider value={{ accessToken, baseUrl }}>
        <Component {...pageProps} />
      </AuthContext.Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
