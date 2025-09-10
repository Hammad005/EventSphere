import { Router } from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { allEvents, cancelEvent, createEvent, deleteEvent, editEvent, registerInEvent } from '../controllers/eventController.js';

const eventRouter = Router();

eventRouter.get('/getAllEvents', allEvents);

eventRouter.post('/create', protectRoute, createEvent);

eventRouter.put('/edit/:id', protectRoute, editEvent);
eventRouter.patch('/cancel/:id', protectRoute, cancelEvent);
eventRouter.patch('/approve/:id', protectRoute, approveEvent);

eventRouter.delete('/delete/:id', protectRoute, deleteEvent);

eventRouter.post('/register/:id', protectRoute, registerInEvent);

export default eventRouter;