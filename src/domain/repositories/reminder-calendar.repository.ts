import { CreateReminderDto } from "../dtos/reminder-calendar/create_reminders-calendar.dto";
import { Reminder } from "../entities/reminder.entity";

export interface IReminderCalendarRepository{
    getAllAsync(): Promise<Reminder[]>;
    postAsync(newReminder:CreateReminderDto): Promise<CreateReminderDto>;
    postMultipleRemindersAsync(newReminder: Reminder[]): Promise<Reminder[]>;
    deleteMultipleRemindersAsync(newReminders: CreateReminderDto[]): Promise<string>; // for X calendar
}