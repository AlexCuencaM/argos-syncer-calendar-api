import { Reminder } from "../../entities/reminder.entity";
import { ReminderCalendarRepository } from "../../repositories/reminder-calendar.repository";

export interface PostReminderCalendarUsecase{
    execute(newReminder:Reminder): Promise<void>;
}

export class PostReminderCalendar implements PostReminderCalendarUsecase{
    constructor(
        private readonly repository: ReminderCalendarRepository
    ){}
    execute(newReminder: Reminder): Promise<void> {
        return this.repository.postAsync(newReminder);
    }
    
}