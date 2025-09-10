import { Router } from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { createEvent } from '../controllers/eventController.js';

const eventRouter = Router();

eventRouter.use(protectRoute);

eventRouter.post('/create', createEvent)

export default eventRouter;