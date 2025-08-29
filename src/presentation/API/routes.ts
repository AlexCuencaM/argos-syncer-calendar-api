import { Router } from "express";
import { ReminderCalendarRoutes } from "./reminder-calendar/routes";

export class AppRoutes{
    static get routes(): Router{
        const router = Router();
        router.use('/api/reminder-calendar', ReminderCalendarRoutes.routes);
        return router;
    }
}