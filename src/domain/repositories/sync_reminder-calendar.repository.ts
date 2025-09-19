import { CreateReminderDto } from "../dtos/reminder-calendar/create_reminders-calendar.dto";
import { Reminder } from "../entities/reminder.entity";

export interface ISyncReminderCalendarRepository{
    getAllAsync(): Promise<Reminder[]>; // For url
    postMultipleRemindersAsync(newReminders: Reminder[]): Promise<CreateReminderDto[]>; // for X calendar
}