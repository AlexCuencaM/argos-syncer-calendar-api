import { CreateReminderDto } from "../../dtos/reminder-calendar/create_reminders-calendar.dto";
import { ReminderCalendarRepository } from "../../repositories/reminder-calendar.repository";

export interface PostReminderCalendarUsecase{
    execute(newReminder:CreateReminderDto): Promise<CreateReminderDto>;
}

export class PostReminderCalendar implements PostReminderCalendarUsecase{
    constructor(
        private readonly repository: ReminderCalendarRepository
    ){}
    execute(newReminder: CreateReminderDto): Promise<CreateReminderDto> {
        return this.repository.postAsync(newReminder);
    }

}