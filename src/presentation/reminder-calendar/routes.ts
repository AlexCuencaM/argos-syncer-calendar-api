import { Router } from "express";
import { ReminderCalendarController } from "./controller";

export class ReminderCalendarRoutes{
    static get routes(): Router{
        const router = Router();
        const reminderCalendarController = new ReminderCalendarController();
        router.get('/', reminderCalendarController.getAsync);
        return router;
    }
}