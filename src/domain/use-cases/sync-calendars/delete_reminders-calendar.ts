import { CreateReminderDto } from "../../dtos/reminder-calendar/create_reminders-calendar.dto";
import { IReminderCalendarRepository } from "../../repositories/reminder-calendar.repository";

export interface IDeleteRemindersCalendarUsecase{
    execute(newReminder:CreateReminderDto[]): Promise<string>;
}

export class DeleteRemindersCalendar implements IDeleteRemindersCalendarUsecase{
    constructor(
        private readonly repository: IReminderCalendarRepository
    ){}
    execute(newReminders: CreateReminderDto[]): Promise<string> {
        return this.repository.deleteMultipleRemindersAsync(newReminders.filter(r=>!r.isSynced));
    }
}