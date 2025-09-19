import { Reminder } from "../entities/reminder.entity";

export interface IOriginReminderCalendarDatasource{
    getAllAsync(): Promise<Reminder[]>; // For url
}