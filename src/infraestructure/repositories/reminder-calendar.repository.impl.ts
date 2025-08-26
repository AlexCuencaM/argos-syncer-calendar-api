import { ReminderCalendarDataSource } from "../../domain/datasources/reminder-calendar.datasource";
import { Reminder } from "../../domain/entities/reminder.entity";
import { ReminderCalendarRepository } from "../../domain/repositories/reminder-calendar.repository";

export class ReminderCalendarRepositoryImpl implements ReminderCalendarRepository{
    constructor(
        private readonly datasource:ReminderCalendarDataSource
    ){}
    postAsync(newReminder: Reminder): Promise<void> {
        return this.postAsync(newReminder);
    }
    getAllAsync(): Promise<Reminder[]> {
        return this.datasource.getAllAsync();
    }
}