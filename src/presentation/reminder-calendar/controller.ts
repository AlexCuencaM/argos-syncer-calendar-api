import { Response, Request } from "express";
import { Reminder } from "../../domain/entities/reminder.entity";
const test: Reminder[] = [
    {
        id: "1",
        userId: "1",
        title: "Test Reminder",
        remindAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        message: "This is a test reminder",
        alertAt: new Date()
    }
];
export class ReminderCalendarController {
    constructor(){

    }
    public getAsync = (req: Request, res: Response) => {
        return res.json(test);
    }
}