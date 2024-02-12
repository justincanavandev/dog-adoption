export type AuthContextType = {
    accessToken: string | null;
    API_BASE_URL: string;
  };
  
  export type AuthOResponse = {
    access_token: string | null;
    token_type: string;
    expires_in: number;
  };