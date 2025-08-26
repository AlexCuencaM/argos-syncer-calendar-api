import { Reminder } from "../entities/reminder.entity";

export interface ReminderCalendarRepository{
    getAllAsync(): Promise<Reminder[]>;
}