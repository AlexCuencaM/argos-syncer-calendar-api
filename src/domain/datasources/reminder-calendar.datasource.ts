import { Reminder } from "../entities/reminder.entity";
export interface ReminderCalendarDataSource{
    getAllAsync(): Promise<Reminder[]>;
}