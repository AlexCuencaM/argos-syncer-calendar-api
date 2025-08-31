import { CreateReminderDto } from "../dtos/reminder-calendar/create_reminders-calendar.dto";
import { Reminder } from "../entities/reminder.entity";
export interface DestinationReminderCalendarDatasource{
    postMultipleRemindersAsync(newReminder: Reminder[]): Promise<CreateReminderDto[]>; // for X calendar
}