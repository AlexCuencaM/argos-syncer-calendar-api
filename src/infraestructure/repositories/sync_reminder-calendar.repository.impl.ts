import { DestinationReminderCalendarDatasource } from "../../domain/datasources/destination_reminder-calendar.datasource";
import { OriginReminderCalendarDatasource } from "../../domain/datasources/origin_reminder-calendar.datasource";
import { CreateReminderDto } from "../../domain/dtos/reminder-calendar/create_reminders-calendar.dto";
import { Reminder } from "../../domain/entities/reminder.entity";

export class SyncReminderRepositoryImpl implements SyncReminderRepositoryImpl{
    constructor(
        private readonly originDatasource: OriginReminderCalendarDatasource,
        private readonly destinationDatasource: DestinationReminderCalendarDatasource
    ){}
    getAllAsync(): Promise<Reminder[]> {
        return this.originDatasource.getAllAsync();
    }
    postAsync(reminder: CreateReminderDto[]): Promise<CreateReminderDto[]> {
        return this.destinationDatasource.postMultipleRemindersAsync(reminder);
    }
}