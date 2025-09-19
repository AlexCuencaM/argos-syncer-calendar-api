import { Response, Request } from "express";
import { IReminderCalendarRepository } from "../../../domain/repositories/reminder-calendar.repository";
import { GetAllRemindersDb } from "../../../domain/use-cases/reminder-calendar/get_reminder-calendar";
import { PostReminderCalendar } from "../../../domain/use-cases/reminder-calendar/create_reminder-calendar";
import { CreateReminderDto } from "../../../domain/dtos/reminder-calendar/create_reminders-calendar.dto";
export class ReminderCalendarController {
    constructor(
        private readonly repository:IReminderCalendarRepository
    ){
    }
    public getAsync = (req: Request, res: Response) => {
        new GetAllRemindersDb(this.repository)
        .execute()
        .then(data => res.json(data))
        .catch(err => res.status(400).json({ err }));
    }
    public postAsync = (req: Request, res: Response) => {
        const [error, reminderDto] = CreateReminderDto.create(req.body);
        if ( error ) return res.status( 400 ).json( { error } );

        new PostReminderCalendar(this.repository)
        .execute(reminderDto!)
        .then(data => res.json(data))
        .catch(err => res.status(400).json({ err }));
    }
    
}