import { IReminderCalendarDataSource } from "../../domain/datasources/reminder-calendar.datasource";
import { CreateReminderDto } from "../../domain/dtos/reminder-calendar/create_reminders-calendar.dto";
import { Reminder } from "../../domain/entities/reminder.entity";
import { IReminderCalendarRepository } from "../../domain/repositories/reminder-calendar.repository";

export class ReminderCalendarRepositoryImpl implements IReminderCalendarRepository{
    constructor(
        private readonly datasource:IReminderCalendarDataSource
    ){}
    deleteMultipleRemindersAsync(newReminders: CreateReminderDto[]): Promise<string> {
        return this.datasource.deleteMultipleRemindersAsync(newReminders);
    }
    postMultipleRemindersAsync(newReminder: Reminder[]): Promise<Reminder[]> {
        return this.datasource.postMultipleRemindersAsync(newReminder);
    }
    postAsync(newReminder: CreateReminderDto): Promise<CreateReminderDto> {
        return this.datasource.postAsync(newReminder);
    }
    getAllAsync(): Promise<Reminder[]> {
        return this.datasource.getAllAsync();
    }
}