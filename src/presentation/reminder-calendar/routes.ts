import { Router } from "express";
import { ReminderCalendarController } from "./controller";
import { ReminderCalendarDatasourceFirestore } from "../../infraestructure/datasources/firebase_reminder-calendar.datasource";
import { ReminderCalendarRepositoryImpl } from "../../infraestructure/repositories/reminder-calendar.repository.impl";

export class ReminderCalendarRoutes{
    static get routes(): Router{
        const router = Router();
        const datasource = new ReminderCalendarDatasourceFirestore();
        const repository = new ReminderCalendarRepositoryImpl(datasource);
        const reminderCalendarController = new ReminderCalendarController(repository);
        
        router.get('/', reminderCalendarController.getAsync);
        router.post('/', reminderCalendarController.postAsync);
        return router;
    }
}