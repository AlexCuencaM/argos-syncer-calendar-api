import { DestinationReminderCalendarDatasource } from "../../domain/datasources/destination_reminder-calendar.datasource";
import { CreateReminderDto } from "../../domain/dtos/reminder-calendar/create_reminders-calendar.dto";

export class GoogleCalendarDataSource implements DestinationReminderCalendarDatasource{
    postMultipleRemindersAsync(newReminder: CreateReminderDto[]): Promise<CreateReminderDto[]> {
        throw new Error("Method not implemented.");
    }
    // Implement Google Calendar specific methods here
}