import { IDestinationReminderCalendarDatasource } from "../../domain/datasources/destination_reminder-calendar.datasource";
import { IOriginReminderCalendarDatasource } from "../../domain/datasources/origin_reminder-calendar.datasource";
import { CreateReminderDto } from "../../domain/dtos/reminder-calendar/create_reminders-calendar.dto";
import { Reminder } from "../../domain/entities/reminder.entity";
import { ISyncReminderCalendarRepository } from "../../domain/repositories/sync_reminder-calendar.repository";
export class SyncReminderRepositoryImpl implements ISyncReminderCalendarRepository{
    constructor(
        private readonly originDatasource: IOriginReminderCalendarDatasource,
        private readonly destinationDatasource: IDestinationReminderCalendarDatasource
    ){}
    
    getAllAsync(): Promise<Reminder[]> {
        return this.originDatasource.getAllAsync();
    }
    postMultipleRemindersAsync(reminders: Reminder[]): Promise<CreateReminderDto[]> {
        return this.destinationDatasource.postMultipleRemindersAsync(reminders);
    }
}