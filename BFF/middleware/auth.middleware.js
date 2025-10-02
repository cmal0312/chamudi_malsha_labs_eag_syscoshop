import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const client = jwksClient({
  //expose public keys
  jwksUri: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_axWJexQyC/.well-known/jwks.json",
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      console.error("[Auth] Failed to get signing key:", err.message);
      return callback(err);
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

export const authMiddleware = (req, res, next) => {
  if(!req.cookies){
    console.warn("[Auth] no cookies found");
  }
  const token = req.cookies?.access_token;
  if (!token) {
    console.warn("[Auth] No access_token cookie found");
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(
    token,
    getKey,
    {
      algorithms: ["RS256"],
      issuer: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_axWJexQyC", // must match "iss" claim
    },
    (err, decoded) => {
      if (err) {
        console.error("[Auth] JWT verification failed:", err.message);
        return res.status(401).json({ error: "Unauthorized" });
      }

      console.log("[Auth] JWT verified successfully");
      console.log("[Auth] Decoded token:", {
        sub: decoded.sub,
        username: decoded.username,
        groups: decoded["cognito:groups"],
        exp: decoded.exp,
      });

      req.user = decoded;
      next();
    }
  );
};
