import { Reminder } from "../entities/reminder.entity";

export interface OriginReminderCalendarDatasource{
    getAllAsync(): Promise<Reminder[]>; // For url
}