import { Router } from "express";
import { deleteMessage, getMessage, sendMessage } from "../controllers/contactController.js";

const contactRouter = Router();

contactRouter.get('/', getMessage)
contactRouter.post('/send', sendMessage)
contactRouter.delete('/send', deleteMessage)

export default contactRouter;