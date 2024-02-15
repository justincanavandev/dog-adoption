import type { NextApiRequest, NextApiResponse } from "next";
import type { AuthOResponse } from "~/types/auth-types";

const ZeroAuth = async (
  req: NextApiRequest,
  res: NextApiResponse<AuthOResponse>,
) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  if (apiKey && apiSecret) {
    params.append("client_id", apiKey);
    params.append("client_secret", apiSecret);
  }
  try {
    const petfinderRes: Response = await fetch(
      "https://api.petfinder.com/v2/oauth2/token",
      {
        method: "POST",
        body: params,
      },
    );
    const data = (await petfinderRes.json()) as AuthOResponse;
    res.send(data);
  } catch (e) {
    console.error("There was an error", e);
  }
};

export default ZeroAuth;
