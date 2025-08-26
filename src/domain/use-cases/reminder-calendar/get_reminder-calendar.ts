import { Reminder } from "../../entities/reminder.entity";
import { ReminderCalendarRepository } from "../../repositories/reminder-calendar.repository";
export interface GetAllReminderCalendarUsecase{
    execute(): Promise<Reminder[]>
} 
export class GetReminderCalendar implements GetAllReminderCalendarUsecase{
    constructor(
        private readonly repository:ReminderCalendarRepository
    ){ }
    execute(): Promise<Reminder[]> {
        return this.repository.getAllAsync();
    }
}