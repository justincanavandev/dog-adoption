const ZeroAuth = async (req, res) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  if (apiKey && apiSecret) {
    params.append("client_id", apiKey);
    params.append("client_secret", apiSecret);
  }
  try {
    const petfinderRes = await fetch(
      "https://api.petfinder.com/v2/oauth2/token",
      {
        method: "POST",
        body: params,
        // headers: {
        //   "Content-Type": "application/x-www-form-urlencoded",
        // },
      },
    );
    console.log('petfinderRes', petfinderRes)
    const data = await petfinderRes.json();
    res.send(data);
  } catch (e) {
    console.error("There was an error", e);
  }
};

export default ZeroAuth;
