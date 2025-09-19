import { CreateReminderDto } from "../dtos/reminder-calendar/create_reminders-calendar.dto";
import { Reminder } from "../entities/reminder.entity";
export interface IReminderCalendarDataSource{
    getAllAsync(): Promise<Reminder[]>;
    postAsync(reminder: CreateReminderDto): Promise<CreateReminderDto>;
    postMultipleRemindersAsync(newReminder: Reminder[]): Promise<Reminder[]>;
    deleteMultipleRemindersAsync(reminderIds: CreateReminderDto[]): Promise<string>;
}