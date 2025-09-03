import { Auth, google, calendar_v3 } from "googleapis";
import { DestinationReminderCalendarDatasource } from "../../domain/datasources/destination_reminder-calendar.datasource";
import { CreateReminderDto } from "../../domain/dtos/reminder-calendar/create_reminders-calendar.dto";
import { Reminder } from "../../domain/entities/reminder.entity";
import authorize from "../../data/google-cloud";
export class GoogleCalendarDataSource implements DestinationReminderCalendarDatasource{
    private authClient!: Auth.OAuth2Client;
    private readonly calendarId: string = 'primary';
    private calendar!: calendar_v3.Calendar; 
    constructor(){
        // Initialize Google Calendar API client with the provided API key
        
    }
    async postMultipleRemindersAsync(newReminder: Reminder[]): Promise<CreateReminderDto[]> {
        const client = await authorize();
        this.authClient = client!;
        this.calendar = google.calendar({ version: 'v3', auth: this.authClient });
        const eventsReminder: CreateReminderDto[] = [];
        for (const [, reminder] of newReminder.entries()) {
            const event = {
                'summary': reminder.title,
                'description': reminder.message,
                'start': {
                    'dateTime': reminder.startDate.toISOString(),
                    'timeZone': 'America/Guayaquil',
                },
                'end': {
                    'dateTime': reminder.endDate.toISOString(),
                    'timeZone': 'America/Guayaquil',
                },
            };
            const [, dto] = CreateReminderDto.create({
                userId: reminder.userId,
                title: reminder.title,
                remindAt: reminder.remindAt,
                startDate: reminder.startDate,
                endDate: reminder.endDate,
                createdAt: reminder.createdAt,
                updatedAt: reminder.updatedAt,
                message: reminder.message,
                id: reminder.id
            });
            await this.calendar.events.insert({
                calendarId: this.calendarId,
                requestBody: event,
            }, (err: any, res: any) => {
                if (err) {
                    console.error('Error creating event: ', err);
                    return;
                }
                eventsReminder.push(dto!);
                console.log('Event created: %s', res?.data.htmlLink);
            });
        }
        return eventsReminder;
    }
}