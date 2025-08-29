import { OriginReminderCalendarDatasource } from "../../domain/datasources/origin_reminder-calendar.datasource";
import { Reminder } from "../../domain/entities/reminder.entity";
export type ICSConverter = (icsData: string) => Record<string, string>[];
export class BlackboardCalendarDataSource implements OriginReminderCalendarDatasource {
    // Implement methods to interact with Blackboard Calendar API
    constructor(
        private readonly fileLocation: string,
         private readonly converter: ICSConverter) 
    {}
    async getAllAsync(): Promise<Reminder[]> {
        const icsRes = await fetch(this.fileLocation);
        const icsData = await icsRes.text();
        // Convert
        const data = this.converter(icsData);
        return[];
    }
}