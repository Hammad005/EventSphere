import { Router } from "express";
import { deactivate, getAllUsers, login, logout, signup, update } from "../controllers/authController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

authRouter.get('/getAllUsers', protectRoute, getAllUsers);

authRouter.put('/update', protectRoute, update);
authRouter.patch('/switchActivation/:id', protectRoute, deactivate);

authRouter.get('/me', protectRoute, (req, res) => res.status(200).json(req.user));

export default authRouter;