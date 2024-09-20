import express from "express";

import { login, signup, logout } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/login", login).post("/signup", signup).post("/logout", logout);

export default router;
