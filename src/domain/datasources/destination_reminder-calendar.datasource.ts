import { CreateReminderDto } from "../dtos/reminder-calendar/create_reminders-calendar.dto";
export interface DestinationReminderCalendarDatasource{
    postMultipleRemindersAsync(newReminder: CreateReminderDto[]): Promise<CreateReminderDto[]>; // for X calendar
}