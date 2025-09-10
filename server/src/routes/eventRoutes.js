import { Router } from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { allEvents, createEvent, deleteEvent, editEvent } from '../controllers/eventController.js';

const eventRouter = Router();

eventRouter.get('/getAllEvents', allEvents);

eventRouter.post('/create', protectRoute, createEvent);

eventRouter.put('/edit/:id', protectRoute, editEvent);

eventRouter.delete('/delete/:id', protectRoute, deleteEvent);

export default eventRouter;