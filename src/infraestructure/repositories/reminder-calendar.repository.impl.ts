import { ReminderCalendarDataSource } from "../../domain/datasources/reminder-calendar.datasource";
import { CreateReminderDto } from "../../domain/dtos/reminder-calendar/create_reminders-calendar.dto";
import { Reminder } from "../../domain/entities/reminder.entity";
import { ReminderCalendarRepository } from "../../domain/repositories/reminder-calendar.repository";

export class ReminderCalendarRepositoryImpl implements ReminderCalendarRepository{
    constructor(
        private readonly datasource:ReminderCalendarDataSource
    ){}
    postAsync(newReminder: CreateReminderDto): Promise<CreateReminderDto> {
        return this.datasource.postAsync(newReminder);
    }
    getAllAsync(): Promise<Reminder[]> {
        return this.datasource.getAllAsync();
    }
}