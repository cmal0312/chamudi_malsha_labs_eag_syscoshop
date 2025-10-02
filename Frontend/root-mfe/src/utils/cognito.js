export const getCognitoLoginUrl = () => {
  const domain = "https://us-east-1axwjexqyc.auth.us-east-1.amazoncognito.com";
  const clientId = "4t86eak5206ojuoqu03s4m653s";
  //after login user is redirected to this 
  const redirectUri = encodeURIComponent("http://localhost:9001/auth/callback");
  const responseType = "code";
  const scope = encodeURIComponent("openid email phone");

  return `${domain}/login?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
};
