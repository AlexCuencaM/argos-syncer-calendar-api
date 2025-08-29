import { CreateReminderDto } from "../../dtos/reminder-calendar/create_reminders-calendar.dto";
import { SyncReminderCalendarRepository } from "../../repositories/sync_reminder-calendar.repository";

export interface PostRemindersCalendarUsecase{
    execute(newReminder:CreateReminderDto[]): Promise<CreateReminderDto[]>;
}

export class PostReminderCalendar implements PostRemindersCalendarUsecase{
    constructor(
        private readonly repository: SyncReminderCalendarRepository
    ){}
    execute(newReminders: CreateReminderDto[]): Promise<CreateReminderDto[]> {
        return this.repository.postMultipleRemindersAsync(newReminders);
    }
    
}