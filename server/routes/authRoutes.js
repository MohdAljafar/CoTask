import express from "express";
import auth from "../middleware/auth.js";

import { register, login, getProfile } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/profile", auth, getProfile);

export default router;
