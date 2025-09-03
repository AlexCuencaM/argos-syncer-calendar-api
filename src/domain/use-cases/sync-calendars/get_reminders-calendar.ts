import { Reminder } from "../../entities/reminder.entity";
import { SyncReminderCalendarRepository } from "../../repositories/sync_reminder-calendar.repository";
export interface GetAllRemindersCalendarUsecase{
    execute(from?: Date): Promise<Reminder[]>
} 
export class GetLastRemindersCalendar implements GetAllRemindersCalendarUsecase{
    constructor(
        private readonly repository:SyncReminderCalendarRepository
    ){ }
    async execute(from: Date = new Date()): Promise<Reminder[]> {
        const allReminders = await this.repository.getAllAsync();
        return allReminders.filter(r => r.startDate.getMonth() >= from.getMonth())
    }
}