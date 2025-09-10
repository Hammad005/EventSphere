import { Router } from "express";
import { login, logout, signup, update } from "../controllers/authController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

authRouter.put('/update', protectRoute, update);

export default authRouter;