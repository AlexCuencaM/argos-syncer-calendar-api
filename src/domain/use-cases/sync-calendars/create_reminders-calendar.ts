import { CreateReminderDto } from "../../dtos/reminder-calendar/create_reminders-calendar.dto";
import { Reminder } from "../../entities/reminder.entity";
import { SyncReminderCalendarRepository } from "../../repositories/sync_reminder-calendar.repository";

export interface PostRemindersCalendarUsecase{
    execute(newReminder:Reminder[]): Promise<CreateReminderDto[]>;
}

export class PostRemindersCalendar implements PostRemindersCalendarUsecase{
    constructor(
        private readonly repository: SyncReminderCalendarRepository
    ){}
    execute(newReminders: Reminder[]): Promise<CreateReminderDto[]> {
        return this.repository.postMultipleRemindersAsync(newReminders);
    }
    
}