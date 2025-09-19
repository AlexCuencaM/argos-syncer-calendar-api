import { IOriginReminderCalendarDatasource } from "../../domain/datasources/origin_reminder-calendar.datasource";
import { Reminder } from "../../domain/entities/reminder.entity";
export interface DateProvider{
    parseDate: (dateString: string, format: string) => Date;
    addDays: (date: string, days: number, format: string) => Date;
}
export interface ICSConverter2Json{
    [key: string]: string | string[] | VCalendar | VCalendar[] | ICSConverter2Json[]
}
interface VCalendar{
    PRODID: string;
    VERSION: string;
    CALSCALE: string;
    METHOD: string;
    VEVENT: VEvent[] | VEvent;
}
interface VEvent{
    UID: string;
    DTSTAMP: string;    
    'DTSTART;TZID=America/Guayaquil': string;
    'DTEND;TZID=America/Guayaquil': string;
    SUMMARY: string;
    DESCRIPTION?: string;
}

export type ICSConverter = (icsData: string) => ICSConverter2Json;
export class BlackboardCalendarDataSource implements IOriginReminderCalendarDatasource {
    // Implement methods to interact with Blackboard Calendar API
    constructor(
        private readonly fileLocation: string,
        private readonly dateProvider: DateProvider,
        private readonly converter: ICSConverter) 
    {}
    async getAllAsync(): Promise<Reminder[]> {
        const customFormat = "YYYYMMDDTHHmmss";
        const icsRes = await fetch(this.fileLocation);
        const icsData = await icsRes.text();
        const data = this.converter(icsData);
        //I will move to DTO later
        if(data['VCALENDAR']===undefined) return[];
        if(Array.isArray(data['VCALENDAR'])===false) return[];
        const events = (data.VCALENDAR[0] as VCalendar).VEVENT as VEvent[];
        const reminders = events.map( (event) => ({
            id: event.UID,
            userId: 'blackboard-user', // Static userId for now
            title: event.SUMMARY,
            message: event.DESCRIPTION??'No description',
            startDate: this.dateProvider.parseDate(event['DTSTART;TZID=America/Guayaquil'],customFormat),//new Date(),
            endDate: this.dateProvider.parseDate(event['DTEND;TZID=America/Guayaquil'], customFormat),//new Date( ),
            remindAt: this.dateProvider.addDays(event['DTSTART;TZID=America/Guayaquil'], -1, customFormat), // One day before startDate
            updatedAt: null, // No update info in ICS
            createdAt: this.dateProvider.parseDate(event.DTSTAMP, customFormat), // No creation date in ICS, using current date
            //I can add more fields if needed
        }) as Reminder);
        //end DTO logic
        return reminders;
    }
}