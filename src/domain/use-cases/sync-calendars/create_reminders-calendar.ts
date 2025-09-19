import { CreateReminderDto } from "../../dtos/reminder-calendar/create_reminders-calendar.dto";
import { Reminder } from "../../entities/reminder.entity";
import { ISyncReminderCalendarRepository } from "../../repositories/sync_reminder-calendar.repository";

export interface IPostRemindersCalendarUsecase{
    execute(newReminder:Reminder[]): Promise<CreateReminderDto[]>;
}

export class PostRemindersCalendar implements IPostRemindersCalendarUsecase{
    constructor(
        private readonly repository: ISyncReminderCalendarRepository
    ){}
    execute(newReminders: Reminder[]): Promise<CreateReminderDto[]> {
        return this.repository.postMultipleRemindersAsync(newReminders);
    }
    
}