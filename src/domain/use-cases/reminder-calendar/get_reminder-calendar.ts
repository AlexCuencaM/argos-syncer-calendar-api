import { Reminder } from "../../entities/reminder.entity";
import { IReminderCalendarRepository } from "../../repositories/reminder-calendar.repository";
export interface IGetAllRemindersDbUsecase{
    execute(): Promise<Reminder[]>
} 
export class GetAllRemindersDb implements IGetAllRemindersDbUsecase{
    constructor(
        private readonly repository:IReminderCalendarRepository
    ){ }
    execute(): Promise<Reminder[]> {
        return this.repository.getAllAsync();
    }
}