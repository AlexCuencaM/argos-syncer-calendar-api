import { Reminder } from "../../entities/reminder.entity";
import { ReminderCalendarRepository } from "../../repositories/reminder-calendar.repository";
export interface GetAllRemindersDbUsecase{
    execute(): Promise<Reminder[]>
} 
export class GetAllRemindersDb implements GetAllRemindersDbUsecase{
    constructor(
        private readonly repository:ReminderCalendarRepository
    ){ }
    execute(): Promise<Reminder[]> {
        return this.repository.getAllAsync();
    }
}