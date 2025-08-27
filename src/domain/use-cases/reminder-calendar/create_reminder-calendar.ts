import { CreateReminderDto } from "../../dtos/reminder-calendar/create_reminders-calendar.dto";
import { Reminder } from "../../entities/reminder.entity";
import { ReminderCalendarRepository } from "../../repositories/reminder-calendar.repository";

export interface PostReminderCalendarUsecase{
    execute(newReminder:CreateReminderDto): Promise<void>;
}

export class PostReminderCalendar implements PostReminderCalendarUsecase{
    constructor(
        private readonly repository: ReminderCalendarRepository
    ){}
    execute(newReminder: CreateReminderDto): Promise<void> {
        return this.repository.postAsync(newReminder);
    }
    
}