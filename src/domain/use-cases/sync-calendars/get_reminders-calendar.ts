import { Reminder } from "../../entities/reminder.entity";
import { ISyncReminderCalendarRepository } from "../../repositories/sync_reminder-calendar.repository";
export interface IGetAllRemindersCalendarUsecase{
    execute(from?: Date): Promise<Reminder[]>
} 
export class GetLastMonthRemindersCalendar implements IGetAllRemindersCalendarUsecase{
    constructor(
        private readonly repository:ISyncReminderCalendarRepository
    ){ }
    async execute(from: Date = new Date()): Promise<Reminder[]> {
        const allReminders = await this.repository.getAllAsync();
        return allReminders.filter(r => r.startDate.getMonth() >= from.getMonth())
    }
}