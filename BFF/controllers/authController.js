import axios from "axios";
import jwt from "jsonwebtoken";

const COGNITO_DOMAIN =
  "https://us-east-1axwjexqyc.auth.us-east-1.amazoncognito.com";
const CLIENT_ID = "4t86eak5206ojuoqu03s4m653s";

const REDIRECT_URI_FOR_TOKEN_EXCHANGE = "http://localhost:9001/auth/callback";
const LOGOUT_REDIRECT_URI = "http://localhost:9001/";

const GROUP_ROLE_MAP = {
  customer: "customer",
  supplier: "supplier",
  admin: "admin",
};

export const login = async (req, res) => {
  const { code } = req.body;
  if (!code) {
    console.warn("[Auth] Missing code in request body");
    return res.status(400).json({ error: "Code is required" });
  }

  try {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", CLIENT_ID);
    params.append("code", code);
    params.append("redirect_uri", REDIRECT_URI_FOR_TOKEN_EXCHANGE);

    const tokenResponse = await axios.post(
      `${COGNITO_DOMAIN}/oauth2/token`,
      params.toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const { id_token, access_token, refresh_token } = tokenResponse.data;

    if (!id_token) {
      console.error("[Auth] No id_token in response!");
      return res.status(500).json({ error: "No ID token received" });
    }

    const decoded = jwt.decode(id_token);
    const username = decoded?.["cognito:username"];
    const groups = decoded?.["cognito:groups"] || [];
    let role = null;
    for (const group of groups) {
      if (GROUP_ROLE_MAP[group]) {
        role = GROUP_ROLE_MAP[group];
        break;
      }
    }

    if (!role) {
      console.warn("[Auth] User has no valid role. Groups:", groups);
      return res.status(403).json({ error: "User has no valid role" });
    }

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    if (refresh_token) {
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });
    }

    res.json({
      role,
      userId: username,
    });
  } catch (err) {
    console.error("[Auth] Cognito token exchange failed");
    console.error("  Message:", err.message);
    console.error("  Response:", err.response?.data);
    console.error("  Status:", err.response?.status);
    res.status(500).json({ error: "Failed to login" });
  }
};

export const logout = async (req, res) => {
  
    console.log("[Auth] /logout started");
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.clearCookie("id_token", { 
      httpOnly: true, 
      sameSite: "lax" });

    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    const logoutUrl = `${COGNITO_DOMAIN}/logout?client_id=${CLIENT_ID}&logout_uri=${encodeURIComponent(
      LOGOUT_REDIRECT_URI
    )}`;
    console.log("[Auth] Redirecting to logout URL:", logoutUrl);

    res.json({
      success: true,
      logoutUrl
    });
};

export const me = async (req, res) => {
  try {
    console.log("[Auth] /me started");
    if (!req.user) {
      console.warn("[Auth] No user info in request");
      return res.status(401).json({ error: "Unauthorized" });
    }

    res.json({
      userId: req.user.sub,
      username: req.user["cognito:username"],
      role: (req.user["cognito:groups"] || [])[0] || null,
    });
  } catch (err) {
    console.error("[Auth] Failed to return current user::", err);
    res.status(500).json({ error: "Failed to fetch user info" });
  }
};
