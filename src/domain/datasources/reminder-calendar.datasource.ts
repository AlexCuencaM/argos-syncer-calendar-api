import { CreateReminderDto } from "../dtos/reminder-calendar/create_reminders-calendar.dto";
import { Reminder } from "../entities/reminder.entity";
export interface ReminderCalendarDataSource{
    getAllAsync(): Promise<Reminder[]>;
    postAsync(reminder: CreateReminderDto): Promise<CreateReminderDto>;
}