import { Reminder } from "../../entities/reminder.entity";
import { SyncReminderCalendarRepository } from "../../repositories/sync_reminder-calendar.repository";
export interface GetAllRemindersCalendarUsecase{
    execute(): Promise<Reminder[]>
} 
export class GetRemindersCalendar implements GetAllRemindersCalendarUsecase{
    constructor(
        private readonly repository:SyncReminderCalendarRepository
    ){ }
    execute(): Promise<Reminder[]> {
        return this.repository.getAllAsync();
    }
}