import express from "express";
import { login, me, logout } from "../controllers/authController.js"; 
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, me);

export default router;
