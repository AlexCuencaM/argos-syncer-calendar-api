import { Reminder } from "../../entities/reminder.entity";
import { ReminderCalendarRepository } from "../../repositories/reminder-calendar.repository";

export interface PostMultipleRemindersDbUsecase{
    execute(newOrExistingReminders:Reminder[], existingReminders: Reminder[]): Promise<Reminder[]>;
}

export class PostMultipleRemindersDb implements PostMultipleRemindersDbUsecase{
    constructor(
        private readonly repository: ReminderCalendarRepository
    ){}
    execute(newOrExistingReminders: Reminder[], existingReminders: Reminder[]): Promise<Reminder[]> {
        const newReminders = newOrExistingReminders.filter(ne =>
            !existingReminders.some(e => e.title === ne.title)
        );
        if(newReminders.length===0) return Promise.resolve([]);
        // const testReminder = [newReminders[0]!];
        return this.repository.postMultipleRemindersAsync(newReminders);
    }
}