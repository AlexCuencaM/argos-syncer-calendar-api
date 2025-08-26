import { Response, Request } from "express";
import { ReminderCalendarRepository } from "../../domain/repositories/reminder-calendar.repository";
import { GetReminderCalendar } from "../../domain/use-cases/reminder-calendar/get_reminder-calendar";
export class ReminderCalendarController {
    constructor(
        private readonly repository:ReminderCalendarRepository
    ){
    }
    public getAsync = (req: Request, res: Response) => {
        new GetReminderCalendar(this.repository)
        .execute()
        .then(data => res.json(data))
        .catch(err => res.status(400).json({ err }));
    }
}