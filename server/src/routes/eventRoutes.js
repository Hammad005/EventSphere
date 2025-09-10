import { Router } from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { allEvents, approveEvent, cancelEvent, createEvent, deleteEvent, editEvent, eventFeedback, registerInEvent } from '../controllers/eventController.js';

const eventRouter = Router();

eventRouter.get('/getAllEvents', allEvents);

eventRouter.post('/create', protectRoute, createEvent);

eventRouter.put('/edit/:id', protectRoute, editEvent);
eventRouter.patch('/cancel/:id', protectRoute, cancelEvent);
eventRouter.patch('/approve/:id', protectRoute, approveEvent);

eventRouter.delete('/delete/:id', protectRoute, deleteEvent);

eventRouter.post('/register/:id', protectRoute, registerInEvent);
eventRouter.post('/feedback/:id', protectRoute, eventFeedback);

export default eventRouter;