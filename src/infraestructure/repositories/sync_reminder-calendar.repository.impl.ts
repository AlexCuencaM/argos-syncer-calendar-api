import { DestinationReminderCalendarDatasource } from "../../domain/datasources/destination_reminder-calendar.datasource";
import { OriginReminderCalendarDatasource } from "../../domain/datasources/origin_reminder-calendar.datasource";
import { CreateReminderDto } from "../../domain/dtos/reminder-calendar/create_reminders-calendar.dto";
import { Reminder } from "../../domain/entities/reminder.entity";
import { ISyncReminderCalendarRepository } from "../../domain/repositories/sync_reminder-calendar.repository";
export class SyncReminderRepositoryImpl implements ISyncReminderCalendarRepository{
    constructor(
        private readonly originDatasource: OriginReminderCalendarDatasource,
        private readonly destinationDatasource: DestinationReminderCalendarDatasource
    ){}
    getAllAsync(): Promise<Reminder[]> {
        return this.originDatasource.getAllAsync();
    }
    postMultipleRemindersAsync(reminders: Reminder[]): Promise<CreateReminderDto[]> {
        const newReminders: CreateReminderDto[] = reminders.map( r => ({
            ...r,
            createdAt: r.createdAt ?? new Date()
        } as unknown as CreateReminderDto));
        return this.destinationDatasource.postMultipleRemindersAsync(reminders);
    }
}